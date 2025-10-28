import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CreateWalletPage.module.css';

function CreateWalletDecorations() {
  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
    </>
  );
}

function CreateWalletBackButton() {
  const navigate = useNavigate();
  return (
    <div className={styles.button} onClick={() => navigate('/profile')}>
      <i className="fa-solid fa-arrow-left"></i>
    </div>
  );
}

function CreateWalletHeader() {
  return (
    <div className={styles.backupHeader}>
      <h1>Your Recovery Phrase</h1>
      <p>This phrase is the only way to restore your wallet. Save it securely.</p>
    </div>
  );
}

function RecoveryPhraseBox({ phrase }) {
  return (
    <div className={styles.recoveryPhrase} style={{ wordBreak: 'keep-all', whiteSpace: 'normal' }}>
      {phrase}
    </div>
  );
}

function WarningBox() {
  return (
    <div className={styles.warningBox}>
      <strong>⚠️ Important Security Warning:</strong>
      <div style={{ margin: '0.5em 0 0 0', display: 'flex', flexDirection: 'column', gap: '0.3em' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span style={{ color: '#e53e3e', fontWeight: 'bold', marginRight: 8, fontSize: '1.1em' }}>•</span>
          <span>Never share your recovery phrase with anyone</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span style={{ color: '#e53e3e', fontWeight: 'bold', marginRight: 8, fontSize: '1.1em' }}>•</span>
          <span>Store it offline in a secure location</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span style={{ color: '#e53e3e', fontWeight: 'bold', marginRight: 8, fontSize: '1.1em' }}>•</span>
          <span>This cannot be recovered if lost</span>
        </div>
      </div>
    </div>
  );
}

function ActionButtons({ phrase }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltip, setTooltip] = useState('Copied!');
  const navigate = useNavigate();
  const phraseRef = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phrase.replace(/\s+/g, ' ').trim());
      setTooltip('Copied!');
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1200);
    } catch {
      setTooltip('Failed to copy');
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1200);
    }
  };

  const handleSaveImage = () => {
    // Canvas export logic (optional, stub for now)
    alert('Image export is not implemented in this demo.');
  };

  const handleContinue = () => {
    alert('Please ensure you have securely stored your recovery phrase!');
    try {
      localStorage.setItem('hasWallet', 'true');
    } catch (e) {
      // ignore storage errors
    }
    navigate('/verifyphrase');
  };

  return (
    <>
      <div className={styles.actionButtons}>
        <button className={`${styles.actionBtn} ${styles.tooltip}`} onClick={handleCopy}>
          <span>Copy to clipboard</span>
          {showTooltip && <span className={styles.tooltiptext}>{tooltip}</span>}
        </button>
        <button className={styles.actionBtn} onClick={handleSaveImage}>Save as image</button>
      </div>
      <button className={`${styles.actionBtn} ${styles.actionBtnPrimary}`} onClick={handleContinue}>
        Continue
      </button>
    </>
  );
}

export default function CreateWalletPage() {
  // In production, generate this phrase securely
  const phrase = `oxygen gesture vital wheat spatial verify innocent calm hybrid absorb liquid ripple`;
  return (
    <section>
      <CreateWalletBackButton />
      <CreateWalletDecorations />
      <div className={styles.backupContainer}>
        <CreateWalletHeader />
        <RecoveryPhraseBox phrase={phrase} />
        <WarningBox />
        <ActionButtons phrase={phrase} />
      </div>
    </section>
  );
}
