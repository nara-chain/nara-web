import { getDb } from '../../../lib/db';

export async function GET() {
  try {
    const db = getDb();
    const logs = db.all(
      'SELECT * FROM activity_logs ORDER BY block_time DESC LIMIT 100'
    );
    return Response.json(logs);
  } catch (error) {
    console.error('Logs query error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
