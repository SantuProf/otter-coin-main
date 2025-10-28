import React, { useState } from 'react';
import { searchDexscreener, getPair } from '../services/dexscreener';
import styles from '../styles/DexScreener.module.css';

export default function DexScreenerPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  async function doSearch(e) {
    e && e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await searchDexscreener(query.trim());
      setResults(data);
    } catch (err) {
      setError(String(err));
      setResults(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h2>Dexscreener</h2>
      <form onSubmit={doSearch} className={styles.form}>
        <input
          placeholder="Search token symbol, pair or address (e.g. CAKE, 0x...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && <div className={styles.error}>Error: {error}</div>}

      {results && (
        <div className={styles.results}>
          <h3>Results</h3>
          {Array.isArray(results.pairs) && results.pairs.length === 0 && <div>No pairs found.</div>}
          {Array.isArray(results.pairs) && (
            <ul>
              {results.pairs.map((p) => (
                <li key={p.pairAddress || p.pairId} className={styles.pair}>
                  <div className={styles.pairHeader}>
                    <strong>{p.baseToken?.symbol || p.pairName || p.pairId}</strong>
                    <span className={styles.chain}>{p.chain || ''}</span>
                    <span className={styles.change}>{p.priceChange?.toFixed ? p.priceChange.toFixed(2) : p.priceChange}</span>
                  </div>
                  <div className={styles.meta}>
                    <small>{p.pairAddress || p.pairId}</small>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Fallback: show raw JSON when structure differs */}
          {!Array.isArray(results.pairs) && (
            <pre>{JSON.stringify(results, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}
