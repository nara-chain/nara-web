import { getDb } from '../../../lib/db';

export async function GET() {
  try {
    const db = await getDb();
    const logs = await db.all(
      'SELECT * FROM activity_logs ORDER BY block_time DESC LIMIT 100'
    );
    return Response.json(logs);
  } catch (error) {
    console.error('Logs query error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
