import { getDb } from '../../../lib/db';
import { withCache } from '../../../lib/cache';

export async function GET(request) {
  return withCache(request, async () => {
    const db = await getDb();
    const stats = await db.get('SELECT tx_count, last_tx FROM agent_stats WHERE id = 1');
    const agentCount = await db.get('SELECT COUNT(*) as count FROM agent_ids');
    const active24h = await db.get(
      'SELECT COUNT(*) as count FROM agent_ids WHERE last_active_at > unixepoch() - 86400'
    );
    const naraSum = await db.get(
      'SELECT COALESCE(SUM(nara_amount), 0) as total FROM activity_logs'
    );
    return {
      tx_count: stats?.tx_count || 0,
      last_tx: stats?.last_tx || null,
      agent_count: agentCount?.count || 0,
      active_24h: active24h?.count || 0,
      total_nara_amount: naraSum?.total || 0,
    };
  }, 300);
}
