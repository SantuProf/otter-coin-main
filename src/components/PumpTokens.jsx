import React, { useEffect, useState, useRef } from 'react';
import { runBitquery, setBitqueryApiKey, getBitqueryApiKey } from '../services/bitquery';
import styles from '../styles/PumpTokens.module.css';

// PumpTokens: small UI to run a Bitquery GraphQL query and show top tokens by price change.
// It supports a default query placeholder; you can paste the full Bitquery query from the IDE link.

const DEFAULT_QUERY = `# Paste your GraphQL query here. Example placeholder:
query MyQuery {
  ethereum {
    dexTrades(first: 10, sort: {priceChangeInPeriod: DESC}) {
      baseCurrency {
        symbol
        address
      }
      quoteCurrency {
        symbol
      }
      priceChangeInPeriod
      maximum_price
      minimum_price
    }
  }
}`;

export default function PumpTokens() {
  const [apiKey, setApiKey] = useState('');
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [polling, setPolling] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // initialize api key from localStorage or Vite env
    const stored = localStorage.getItem('VITE_BITQUERY_API_KEY');
    const envKey = getBitqueryApiKey();
    if (stored) {
      setApiKey(stored);
      setBitqueryApiKey(stored);
    } else if (envKey) {
      setApiKey(envKey);
    }
  }, []);

  async function fetchOnce() {
    setError(null);
    setLoading(true);
    try {
      const res = await runBitquery(query);
      setData(res);
    } catch (err) {
      setError(String(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (polling) {
      // start polling every 30s
      fetchOnce();
      timerRef.current = setInterval(fetchOnce, 30_000);
      return () => clearInterval(timerRef.current);
    }
    return () => {};
  }, [polling, query]);

  function togglePolling() {
    setPolling((s) => {
      if (s && timerRef.current) clearInterval(timerRef.current);
      return !s;
    });
  }

  function saveKey() {
    if (!apiKey) {
      localStorage.removeItem('VITE_BITQUERY_API_KEY');
      setBitqueryApiKey(null);
      return;
    }
    localStorage.setItem('VITE_BITQUERY_API_KEY', apiKey);
    setBitqueryApiKey(apiKey);
  }

  const renderResults = () => {
    if (!data) return null;
    // Try common shapes: search for dexTrades, ethereum, etc.
    if (data.ethereum?.dexTrades) {
      const list = data.ethereum.dexTrades.slice(0, 10);
      return (
        <ul className={styles.list}>
          {list.map((t, i) => (
            <li key={i} className={styles.item}>
              <div className={styles.row}>
                <strong>{t.baseCurrency?.symbol || 'N/A'}</strong>
                <span className={styles.change}>{t.priceChangeInPeriod ?? '—'}</span>
              </div>
              <div className={styles.small}>
                {t.baseCurrency?.address || ''} • max {t.maximum_price} • min {t.minimum_price}
              </div>
            </li>
          ))}
        </ul>
      );
    }

    // fallback: show JSON
    return <pre className={styles.pre}>{JSON.stringify(data, null, 2)}</pre>;
  };

  return (
    <div className={styles.container}>
      <h2>Pump Tokens (Bitquery)</h2>
      <p className={styles.help}>Paste the Bitquery GraphQL query from the IDE you mentioned (or use the placeholder) and click Run.</p>

      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Bitquery API key (optional)"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          style={{ padding: 8, width: '60%', marginRight: 8 }}
        />
        <button onClick={saveKey} className={styles.buttonAlt}>Save Key</button>
      </div>

      <textarea className={styles.textarea} value={query} onChange={(e) => setQuery(e.target.value)} rows={10} />
      <div className={styles.controls}>
        <button onClick={fetchOnce} disabled={loading} className={styles.button}>{loading ? 'Running…' : 'Run'}</button>
        <button onClick={togglePolling} className={styles.buttonAlt}>{polling ? 'Stop Poll' : 'Start Poll (30s)'}</button>
      </div>

      {error && <div className={styles.error}>Error: {error}</div>}

      <div className={styles.results}>{renderResults()}</div>
    </div>
  );
}
