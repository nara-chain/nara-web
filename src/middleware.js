import { NextResponse } from 'next/server';

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/agents', '/aapps', '/docs', '/tokenomics', '/learn', '/press', '/overview'],
};
