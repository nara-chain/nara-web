const _memCache = {};

export async function withCache(request, handler, ttl = 300) {
  // Try Cloudflare Cache API first (available in Workers runtime)
  try {
    const cache = caches.default;
    const cacheKey = new Request(request.url, { method: 'GET' });

    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    const data = await handler();
    const response = Response.json(data, {
      headers: { 'Cache-Control': `public, max-age=${ttl}` },
    });

    await cache.put(cacheKey, response.clone());
    return response;
  } catch {
    // Fallback: in-memory cache (dev or unsupported runtime)
    const key = request.url;
    const now = Date.now();
    if (_memCache[key] && now - _memCache[key].ts < ttl * 1000) {
      return Response.json(_memCache[key].data);
    }

    const data = await handler();
    _memCache[key] = { data, ts: now };
    return Response.json(data, {
      headers: { 'Cache-Control': `public, max-age=${ttl}` },
    });
  }
}
