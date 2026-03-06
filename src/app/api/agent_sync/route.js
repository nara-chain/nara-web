import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getDb } from '../../../lib/db';
import { syncActivityLogs } from '../../../lib/sync';

export async function POST(request) {
  const { env } = getCloudflareContext();
  const secret = env.SYNC_SECRET;

  if (!secret || request.headers.get('x-sync-secret') !== secret) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const db = await getDb();
    const result = await syncActivityLogs(db);
    return Response.json(result);
  } catch (error) {
    console.error('Sync error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
