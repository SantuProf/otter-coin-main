// Lightweight Bitquery GraphQL client for the browser
// Supports an in-memory override API key (useful when running in-browser and storing the key in localStorage)
let _overrideApiKey = null;

export function setBitqueryApiKey(key) {
  _overrideApiKey = key || null;
}

export function getBitqueryApiKey() {
  return _overrideApiKey || import.meta.env.VITE_BITQUERY_API_KEY || null;
}

export async function runBitquery(query, variables = {}) {
  const apiKey = getBitqueryApiKey();
  if (!apiKey) {
    throw new Error('VITE_BITQUERY_API_KEY is not set. Add it to your .env file or set it in the UI.');
  }

  const res = await fetch('https://graphql.bitquery.io/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': apiKey,
    },
    body: JSON.stringify({ query, variables }),
  });

  let payload;
  try {
    payload = await res.json();
  } catch (err) {
    throw new Error('Failed to parse JSON response from Bitquery');
  }

  if (!res.ok || payload.errors) {
    const err = payload.errors || { message: `HTTP ${res.status}` };
    throw new Error(JSON.stringify(err));
  }

  return payload.data;
}
