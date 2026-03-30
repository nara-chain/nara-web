import { getDb } from '../../../lib/db';

export async function GET() {
  try {
    const db = await getDb();
    // Get top 50 agents by activity count, then fetch their recent logs
    const topAgents = await db.all(
      `SELECT agent_id, COUNT(*) as cnt FROM activity_logs
       GROUP BY agent_id ORDER BY cnt DESC LIMIT 50`
    );
    if (topAgents.length === 0) {
      return Response.json([]);
    }
    const placeholders = topAgents.map(() => '?').join(',');
    const agentIds = topAgents.map(a => a.agent_id);
    const logs = await db.all(
      `SELECT * FROM activity_logs
       WHERE agent_id IN (${placeholders})
       ORDER BY block_time DESC`,
      agentIds
    );
    return Response.json(logs);
  } catch (error) {
    console.error('Logs query error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
