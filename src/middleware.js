import { NextResponse } from 'next/server';

const CACHE_TTL = 300;

export async function middleware(request) {
  // Skip non-GET, skip if already a cache-fetch (prevent loop)
  if (request.method !== 'GET' || request.headers.get('x-no-cache')) {
    return NextResponse.next();
  }

  try {
    const cache = caches.default;
    const cacheKey = new Request(request.url, { method: 'GET' });

    // Try cache
    const cached = await cache.match(cacheKey);
    if (cached) {
      const resp = new Response(cached.body, cached);
      return resp;
    }

    // Miss — fetch origin with bypass header
    const origin = new Request(request.url, request);
    origin.headers.set('x-no-cache', '1');
    const resp = await fetch(origin);

    // Only cache HTML 200 responses
    if (resp.status === 200 && resp.headers.get('content-type')?.includes('text/html')) {
      const body = await resp.arrayBuffer();
      const toCache = new Response(body, {
        status: 200,
        headers: new Headers(resp.headers),
      });
      toCache.headers.set('Cache-Control', `public, max-age=${CACHE_TTL}`);
      await cache.put(cacheKey, toCache.clone());
      return toCache;
    }

    return resp;
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/', '/agents', '/aapps', '/docs', '/tokenomics', '/learn', '/press', '/overview'],
};
