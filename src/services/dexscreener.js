// Small Dexscreener helper
// Public API (no key required): returns search results or pair details.
// Note: Dexscreener's public endpoints are subject to change; handle fetch errors gracefully.

export async function searchDexscreener(query) {
  if (!query) return { pairs: [] };
  const url = `https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Dexscreener search failed: ${res.status} ${text}`);
  }
  return res.json();
}

export async function getPair(pairId) {
  // pairId format from search results; we attempt to call the pair endpoint
  const url = `https://api.dexscreener.com/latest/dex/pairs/${encodeURIComponent(pairId)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Dexscreener pair fetch failed: ${res.status} ${text}`);
  }
  return res.json();
}
