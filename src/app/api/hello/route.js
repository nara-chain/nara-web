export async function GET() {
  return Response.json({ status: 'ok', chain: 'nara', network: 'testnet' });
}
