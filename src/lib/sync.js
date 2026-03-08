import { Connection, PublicKey } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import NaraAgentRegistryIDL from 'nara-sdk/src/idls/nara_agent_registry.json';

const RPC_URL = 'https://testnet-api.nara.build/';
const ADDRESS = new PublicKey('AgentRegistry111111111111111111111111111111');
const SYSTEM_PROGRAM = '11111111111111111111111111111111';
const QUEST_PROGRAM = 'Quest11111111111111111111111111111111111111';
const ZKID_PROGRAM = 'ZKidentity111111111111111111111111111111111';

const connection = new Connection(RPC_URL, 'confirmed');
const provider = new anchor.AnchorProvider(
  connection,
  {
    publicKey: PublicKey.default,
    signTransaction: async (tx) => tx,
    signAllTransactions: async (txs) => txs,
  },
  { commitment: 'confirmed' }
);
const program = new anchor.Program(NaraAgentRegistryIDL, provider);

function bn(v) {
  if (v && typeof v === 'object' && v.toNumber) return v.toNumber();
  if (typeof v === 'bigint') return Number(v);
  return Number(v);
}

function extractNaraAmount(tx) {
  const outerIxs = tx.transaction?.message?.instructions || [];
  const innerIxs = tx.meta?.innerInstructions?.flatMap(i => i.instructions) || [];
  for (const ix of [...outerIxs, ...innerIxs]) {
    if (
      (ix.programId?.toBase58?.() === SYSTEM_PROGRAM || ix.programId === SYSTEM_PROGRAM) &&
      ix.parsed?.type === 'transfer' &&
      ix.parsed?.info?.lamports
    ) {
      return ix.parsed.info.lamports / 1e9;
    }
  }
  return 0;
}

function extractZkInfo(tx) {
  const instructions = tx.transaction?.message?.instructions || [];
  const innerIxs = tx.meta?.innerInstructions?.flatMap(i => i.instructions) || [];
  const allIxs = [...instructions, ...innerIxs];

  for (const ix of allIxs) {
    const pid = ix.programId?.toBase58?.() || ix.programId;

    if (pid === QUEST_PROGRAM) {
      let proofHash = null;
      if (ix.data) {
        proofHash = ix.data.slice(0, 32);
      }
      return { zkType: 'quest_answer', zkProofHash: proofHash };
    }

    if (pid === ZKID_PROGRAM) {
      let proofHash = null;
      if (ix.data) {
        proofHash = ix.data.slice(0, 32);
      }
      const logs = tx.meta?.logMessages || [];
      if (logs.some(l => l.includes('withdraw'))) return { zkType: 'zk_withdraw', zkProofHash: proofHash };
      if (logs.some(l => l.includes('deposit'))) return { zkType: 'zk_deposit', zkProofHash: proofHash };
      if (logs.some(l => l.includes('register'))) return { zkType: 'zk_register', zkProofHash: proofHash };
      return { zkType: 'zk_id', zkProofHash: proofHash };
    }
  }

  return { zkType: null, zkProofHash: null };
}

export async function syncActivityLogs(db) {
  const stats = await db.get('SELECT tx_count, last_tx FROM agent_stats WHERE id = 1');
  const lastTx = stats?.last_tx || undefined;

  const opts = { limit: 1000 };
  if (lastTx) opts.until = lastTx;

  const signatures = await connection.getSignaturesForAddress(ADDRESS, opts);

  if (signatures.length === 0) {
    return { synced: 0, total: stats?.tx_count || 0 };
  }

  let synced = 0;
  let newestSig = null;

  for (const sigInfo of signatures.reverse()) {
    if (sigInfo.err) continue;

    if (!newestSig) newestSig = sigInfo.signature;

    const tx = await connection.getParsedTransaction(sigInfo.signature, {
      maxSupportedTransactionVersion: 0,
    });
    if (!tx?.meta?.logMessages) continue;

    const dataLogs = tx.meta.logMessages.filter((l) => l.startsWith('Program data: '));
    const { zkType, zkProofHash } = extractZkInfo(tx);

    for (const log of dataLogs) {
      const base64 = log.slice('Program data: '.length);
      try {
        const decoded = program.coder.events.decode(base64);
        if (decoded?.name === 'activityLogged' || decoded?.name === 'ActivityLogged') {
          const e = decoded.data;
          const blockTime = sigInfo.blockTime || Math.floor(Date.now() / 1000);
          const naraAmount = extractNaraAmount(tx);

          const result = await db.run(
            `INSERT OR IGNORE INTO activity_logs
              (tx_signature, agent_id, authority, model, activity, log, referral_id,
               points_earned, referral_points_earned, nara_amount, block_time, zk_type, zk_proof_hash)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              sigInfo.signature,
              e.agentId,
              e.authority?.toBase58?.() || String(e.authority),
              e.model,
              e.activity,
              e.log,
              e.referralId || null,
              bn(e.pointsEarned),
              bn(e.referralPointsEarned),
              naraAmount,
              blockTime,
              zkType,
              zkProofHash,
            ]
          );

          if (result.meta?.changes > 0) {
            synced++;
            await db.run(
              `INSERT OR REPLACE INTO agent_ids (agent_id, last_active_at) VALUES (?, ?)`,
              [e.agentId, blockTime]
            );
          }
        }
      } catch {
        // not our event
      }
    }

    newestSig = sigInfo.signature;
  }

  if (synced > 0 && newestSig) {
    await db.run(
      `UPDATE agent_stats SET tx_count = tx_count + ?, last_tx = ? WHERE id = 1`,
      [synced, newestSig]
    );
  }

  // Cleanup records older than 24h
  const cutoff = Math.floor(Date.now() / 1000) - 86400;
  await db.run(`DELETE FROM activity_logs WHERE block_time < ?`, [cutoff]);
  await db.run(`DELETE FROM agent_ids WHERE last_active_at < ?`, [cutoff]);

  const updated = await db.get('SELECT tx_count FROM agent_stats WHERE id = 1');
  return { synced, total: updated?.tx_count || 0 };
}
