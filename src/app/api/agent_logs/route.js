import { getDb } from '../../../lib/db';
import { withCache } from '../../../lib/cache';

export async function GET(request) {
  return withCache(request, async () => {
    const db = await getDb();
    const topAgents = await db.all(
      `SELECT agent_id, COUNT(*) as cnt FROM activity_logs
       GROUP BY agent_id ORDER BY cnt DESC LIMIT 50`
    );
    if (topAgents.length === 0) return [];
    const placeholders = topAgents.map(() => '?').join(',');
    const agentIds = topAgents.map(a => a.agent_id);
    return db.all(
      `SELECT * FROM activity_logs
       WHERE agent_id IN (${placeholders})
       ORDER BY block_time DESC`,
      agentIds
    );
  }, 300);
}
