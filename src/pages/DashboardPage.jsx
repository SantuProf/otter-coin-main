import React, { useState, useRef, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/DashboardPage.module.css';
import NavBar from '../components/NavBar';

function Logo() {
  return (
    <div className={styles.logo}>
      <h1 className={styles.logoTitle}>Otter Coin</h1>
    </div>
  );
}

function BalanceCard({ balance }) {
  return (
    <div className={styles.balanceCard}>
      <div className={styles.balanceTitle}>Total Balance</div>
      <div className={styles.balanceAmount}>
        {balance.toFixed(2)} <span className={styles.balanceCurrency}>Otter coin</span>
      </div>
    </div>
  );
}

function MiningStats({ miningRate, timer }) {
  return (
    <div className={styles.miningStats}>
      <div className={styles.statCard}>
        <div className={styles.statTitle}>Mining Ratio</div>
        <div className={`${styles.statValue} ${styles.positive}`}>+{miningRate.toFixed(2)} Otter coin</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statTitle}>Timer</div>
        <div className={`${styles.statValue} ${styles.timer}`}>{timer}</div>
      </div>
    </div>
  );
}

function MiningButton({ isMining, onClick }) {
  return (
    <button
      className={`${styles.miningBtn} ${isMining ? styles.miningActive : ''}`}
      onClick={onClick}
    >
      {isMining ? 'Mining...' : 'Start Mining'}
    </button>
  );
}

function MiningStatus({ status }) {
  return <div className={styles.miningStatus}>{status}</div>;
}


function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function DashboardPage() {
  const [isMining, setIsMining] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(12 * 3600);
  const [balance, setBalance] = useState(0);
  const [status, setStatus] = useState('Ready to start mining');
  const miningRate = 80;
  const miningIntervalRef = useRef(null);
  const balanceIntervalRef = useRef(null);

  useEffect(() => {
    if (isMining) {
      setStatus('Mining in progress...');
      miningIntervalRef.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(miningIntervalRef.current);
            miningComplete();
            return 12 * 3600;
          }
          return prev - 1;
        });
      }, 1000);
      balanceIntervalRef.current = setInterval(() => {
        setBalance(prev => prev + miningRate / (12 * 3600));
      }, 1000);
    } else {
      clearInterval(miningIntervalRef.current);
      clearInterval(balanceIntervalRef.current);
    }
    return () => {
      clearInterval(miningIntervalRef.current);
      clearInterval(balanceIntervalRef.current);
    };
    // eslint-disable-next-line
  }, [isMining]);

  const miningComplete = () => {
    setIsMining(false);
    setStatus('Mining complete!');
    setBalance(prev => prev + miningRate);
  };

  const handleMiningClick = () => {
    if (isMining) {
      setIsMining(false);
      setStatus('Mining paused');
    } else {
      setIsMining(true);
    }
  };

  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
      <div className={styles.dashboard}>
        <Logo />
        <BalanceCard balance={balance} />
        <MiningStats miningRate={miningRate} timer={formatTime(secondsRemaining)} />
        <MiningButton isMining={isMining} onClick={handleMiningClick} />
        <MiningStatus status={status} />
      </div>
  <NavBar active="dashboard" />
    </>
  );
}
