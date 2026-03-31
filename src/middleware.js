import { NextResponse } from 'next/server';

export function middleware() {
  const response = NextResponse.next();
  // Tell Cloudflare edge to cache this response for 5 minutes
  response.headers.set('CDN-Cache-Control', 'max-age=300');
  return response;
}

export const config = {
  matcher: ['/', '/agents', '/aapps', '/docs', '/tokenomics', '/learn', '/press', '/overview'],
};
