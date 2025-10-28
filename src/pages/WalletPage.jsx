import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/WalletPage.module.css';

function WalletDecorations() {
  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
    </>
  );
}

function WalletBackButton() {
  const navigate = useNavigate();
  return (
    <div className={styles.button} onClick={() => navigate('/profile')}>
      <i className="fa-solid fa-arrow-left"></i>
    </div>
  );
}

function WalletActions() {
  const navigate = useNavigate();
  const hasWallet = typeof window !== 'undefined' && window.localStorage && localStorage.getItem('hasWallet') === 'true';
  return (
    <div className={styles.containers1}>
      <button onClick={() => navigate('/create')}>Create Wallet</button>
      <button onClick={() => navigate('/import')}>Import Wallet</button>
      {hasWallet && (
        <button onClick={() => navigate('/walletdashboard')}>Wallet Dashboard</button>
      )}
    </div>
  );
}

export default function WalletPage() {
  return (
    <section className="container-fluid">
      <WalletBackButton />
      <WalletDecorations />
      <WalletActions />
    </section>
  );
}
