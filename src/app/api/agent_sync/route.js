import { getDb } from '../../../lib/db';
import { syncActivityLogs } from '../../../lib/sync';

export async function POST() {
  try {
    const db = await getDb();
    const result = await syncActivityLogs(db);
    return Response.json(result);
  } catch (error) {
    console.error('Sync error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
