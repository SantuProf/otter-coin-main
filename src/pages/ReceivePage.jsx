import React, { useRef, useState } from 'react';
import styles from '../styles/ReceivePage.module.css';
import { useNavigate } from 'react-router-dom';

function ReceiveBackButton() {
  const navigate = useNavigate();
  return (
    <button type="button" className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Go back">
      <i className="fa-solid fa-arrow-left"></i>
    </button>
  );
}

export default function ReceivePage() {
  // In a real app, this would come from the user's wallet
  const walletAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
  const [tooltip, setTooltip] = useState('Copy Address');
  const addressRef = useRef();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setTooltip('Address copied!');
      setTimeout(() => setTooltip('Copy Address'), 1500);
    } catch (err) {
      setTooltip('Failed to copy');
      setTimeout(() => setTooltip('Copy Address'), 1500);
    }
  };

  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
      <div className={styles.receiveContainer}>
        <ReceiveBackButton />
        <div className={styles.receiveHeader}>
          <h1 className={styles.receiveTitle}>Receive</h1>
          <h2 className={styles.receiveSubtitle}>Otter Address</h2>
          <div className={styles.qrCode}>
            QR Code Generator<br />Would Appear Here
          </div>
        </div>
        <div className={styles.addressContainer} ref={addressRef}>
          {walletAddress}
        </div>
        <button className={`${styles.copyBtn} ${styles.tooltip}`} onClick={handleCopy}>
          <span>Copy Address</span>
          <span className={styles.tooltipText}>{tooltip}</span>
        </button>
        <div style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
          Share this address to receive Otter Coins
        </div>
      </div>
    </>
  );
}
