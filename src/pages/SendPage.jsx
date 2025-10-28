import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SendPage.module.css';

export default function SendPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const currentBalance = 320.0;

  function SendBackButton() {
    const navigate = useNavigate();
    return (
      <button type="button" className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Go back">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
    );
  }

  const validateAddress = () => {
    // In real app, use proper blockchain address validation
    const isValid = walletAddress.length > 10;
    setAddressError(!isValid);
    return isValid;
  };

  const validateAmount = () => {
    const amt = parseFloat(amount);
    const isValid = amt > 0 && amt <= currentBalance;
    setAmountError(!isValid);
    return isValid;
  };

  const handleMax = () => {
    setAmount(currentBalance.toFixed(2));
    setAmountError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAddress() && validateAmount()) {
      setSending(true);
      // Simulate transaction delay
      setTimeout(() => {
        alert(`Successfully sent ${amount} OTTR to ${walletAddress}`);
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
      <div className={styles.sendContainer}>
        <SendBackButton />
        <div className={styles.sendHeader}>
          <h1 className={styles.sendTitle}>Send Otter</h1>
          <p>Transfer Otter Coins to another wallet</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="walletAddress" className={styles.inputLabel}>Wallet Address</label>
            <input
              type="text"
              id="walletAddress"
              required
              placeholder="0x..."
              className={styles.inputField}
              value={walletAddress}
              onChange={e => setWalletAddress(e.target.value)}
              onBlur={validateAddress}
            />
            <div
              className={styles.errorMessage}
              style={{ display: addressError ? 'block' : 'none' }}
            >
              Invalid wallet address
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="amount" className={styles.inputLabel}>Amount</label>
            <input
              type="number"
              id="amount"
              required
              placeholder="0.00"
              step="0.01"
              min="0"
              className={styles.inputField}
              value={amount}
              onChange={e => setAmount(e.target.value)}
              onBlur={validateAmount}
            />
            <div className={styles.amountControls}>
              <span style={{ fontSize: '0.8rem' }}>OTTR</span>
              <button type="button" className={styles.maxBtn} onClick={handleMax}>
                Max
              </button>
            </div>
            <div
              className={styles.errorMessage}
              style={{ display: amountError ? 'block' : 'none' }}
            >
              Amount exceeds balance
            </div>
          </div>
          <div className={styles.balanceInfo}>
            Total Balance: <span>{currentBalance.toFixed(2)}</span> OTTR
          </div>
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={sending}
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </>
  );
}
