import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/TransactionPhrasePage.module.css';

export default function TransactionPhrasePage() {
  const navigate = useNavigate();
  return (
    <section className="container-fluid" style={{ position: 'relative' }}>
      <div className={styles.containers1} style={{ position: 'relative' }}>
        <div
          className={styles.button + ' ' + styles.backButton}
          onClick={() => navigate('/setting')}
          role="button"
          tabIndex={0}
          aria-label="Back to Settings"
        >
          <i className="fa-solid fa-arrow-left" />
        </div>
        <button onClick={() => navigate('/transaction')}>
          Transaction History
        </button>
        <button onClick={() => navigate('/phrase')}>
          Phrase
        </button>
      </div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
    </section>
  );
}
