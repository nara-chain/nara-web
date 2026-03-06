import { getDb } from '../../../lib/db';

export async function GET() {
  try {
    const db = getDb();

    const stats = db.get('SELECT tx_count, last_tx FROM agent_stats WHERE id = 1');
    const agentCount = db.get('SELECT COUNT(*) as count FROM agent_ids');
    const active24h = db.get(
      'SELECT COUNT(*) as count FROM agent_ids WHERE last_active_at > unixepoch() - 86400'
    );
    const naraSum = db.get(
      'SELECT COALESCE(SUM(nara_amount), 0) as total FROM activity_logs'
    );

    return Response.json({
      tx_count: stats?.tx_count || 0,
      last_tx: stats?.last_tx || null,
      agent_count: agentCount?.count || 0,
      active_24h: active24h?.count || 0,
      total_nara_amount: naraSum?.total || 0,
    });
  } catch (error) {
    console.error('Stats query error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
