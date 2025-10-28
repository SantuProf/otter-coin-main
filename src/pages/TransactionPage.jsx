import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/TransactionPage.module.css';

const sampleTransactions = [
  {
    id: '1',
    type: 'Received',
    from: '0x3f...7d4a',
    amount: 50.0,
    date: '2025-06-10 14:30',
    status: 'Completed',
  },
  {
    id: '2',
    type: 'Sent',
    to: '0x8b...2e9f',
    amount: 20.5,
    date: '2025-06-09 09:15',
    status: 'Completed',
  },
  {
    id: '3',
    type: 'Mining Reward',
    from: 'Network',
    amount: 5.25,
    date: '2025-06-08 00:45',
    status: 'Completed',
  },
];

export default function TransactionPage() {
  const [search, setSearch] = useState('');
  const [transactions] = useState(sampleTransactions);
  const navigate = useNavigate();

  const filtered = transactions.filter((tx) =>
    tx.type.toLowerCase().includes(search.toLowerCase()) ||
    (tx.from && tx.from.toLowerCase().includes(search.toLowerCase())) ||
    (tx.to && tx.to.toLowerCase().includes(search.toLowerCase())) ||
    tx.amount.toString().includes(search)
  );

  const showTransactionDetails = (tx) => {
    let details = `Type: ${tx.type}\nAmount: ${tx.amount} OTTR\nDate: ${tx.date}\nStatus: ${tx.status}`;
    if (tx.from) details += `\nFrom: ${tx.from}`;
    if (tx.to) details += `\nTo: ${tx.to}`;
    alert(details);
  };

  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
      <div className={styles.historyContainer} style={{ position: 'relative' }}>
        <div
          className={styles.button + ' ' + (styles.backButton || '')}
          onClick={() => navigate(-1)}
          role="button"
          tabIndex={0}
          aria-label="Back"
          style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}
        >
          <i className="fa-solid fa-arrow-left" />
        </div>
        <div className={styles.historyHeader}>
          <h1 className={styles.historyTitle}>Transaction History</h1>
        </div>
        <div className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                // Optionally trigger search
              }
            }}
          />
          <button className={styles.searchBtn} onClick={() => {}}>
            🔍
          </button>
        </div>
        <div className={styles.transactions}>
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>No transactions found</div>
          ) : (
            filtered.map((tx) => {
              const isIncoming = tx.type === 'Received' || tx.type === 'Mining Reward';
              return (
                <div
                  key={tx.id}
                  className={styles.transaction}
                  onClick={() => showTransactionDetails(tx)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.transactionInfo}>
                    <div className={styles.transactionType}>{tx.type}</div>
                    <div className={styles.transactionDate}>{tx.date}</div>
                  </div>
                  <div
                    className={
                      isIncoming
                        ? `${styles.transactionAmount} ${styles.incoming}`
                        : `${styles.transactionAmount} ${styles.outgoing}`
                    }
                  >
                    {isIncoming ? '+' : '-'}{tx.amount} OTTR
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
