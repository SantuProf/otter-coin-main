import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/WalletDashboardPage.module.css';

export default function WalletDashboardPage() {
  const navigate = useNavigate();
  const balance = 320.0; // In a real app, fetch from blockchain

  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
      <div className={styles.dashboardContainer}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Back">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className={styles.dashboard}>
          <div className={styles.header}>
            <h1 className={styles.headerTitle}>Otter</h1>
            <div className={styles.x2Case}>X 2 case</div>
          </div>
          <div className={styles.balanceCard}>
            <div className={styles.balanceTitle}>Total Balance</div>
            <div className={styles.balanceAmount}>
              {balance.toFixed(2)} <span className={styles.balanceCurrency}>Otters</span>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.actionBtn} onClick={() => navigate('/send')}>
              <span className={styles.actionIcon}>↑</span>
              <span>Send</span>
            </button>
            <button className={styles.actionBtn} onClick={() => navigate('/receive')}>
              <span className={styles.actionIcon}>↓</span>
              <span>Receive</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
