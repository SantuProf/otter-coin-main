function ImportWalletBackButton() {
  const navigate = useNavigate();
  return (
    <div className={styles.button} onClick={() => navigate('/profile')}>
      <i className="fa-solid fa-arrow-left"></i>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ImportWalletPage.module.css';

function ImportWalletDecorations() {
  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
    </>
  );
}

function ImportWalletHeader() {
  return (
    <div className={styles.verificationHeader}>
      <h1>Verify Your Recovery Phrase</h1>
      <p>Please enter the following words from your recovery phrase to confirm you've saved it correctly</p>
    </div>
  );
}

function WordChecks({ positions, correctAnswers, values, onChange, errors }) {
  return (
    <div className={styles.wordChecks}>
      {positions.map((pos, idx) => (
        <div className={styles.wordCheck} key={pos}>
          <label htmlFor={`word${idx}`}>Word #{pos}</label>
          <input
            id={`word${idx}`}
            type="text"
            value={values[idx]}
            onChange={e => onChange(idx, e.target.value)}
            style={{
              borderColor: values[idx]
                ? errors[idx]
                  ? 'var(--error)'
                  : 'var(--success)'
                : 'rgba(255, 255, 255, 0.1)'
            }}
            autoComplete="off"
          />
        </div>
      ))}
    </div>
  );
}

export default function ImportWalletPage() {
  // In a real app, this would come from the previous step or secure storage
  const recoveryPhrase = 'oxygen gesture vital wheat spatial verify innocent calm hybrid absorb liquid ripple';
  const words = recoveryPhrase.split(' ');
  // We require the user to paste/type the full recovery phrase in one box
  const [fullPhraseValue, setFullPhraseValue] = useState('');
  const [fullError, setFullError] = useState(false);
  const navigate = useNavigate();

  // full phrase validation
  const normalizedTarget = words.map(w => w.trim().toLowerCase()).join(' ');
  const handleFullPhraseChange = (val) => {
    setFullPhraseValue(val);
    const normalized = val.trim().replace(/\s+/g, ' ').toLowerCase();
    if (!normalized) {
      setFullError(false);
      return;
    }
    const parts = normalized.split(' ');
    if (parts.length !== words.length) {
      setFullError(true);
      return;
    }
    setFullError(normalized !== normalizedTarget);
  };

  const handleContinue = () => {
    alert('Recovery phrase successfully verified!');
    try {
      localStorage.setItem('hasWallet', 'true');
    } catch (e) {}
    navigate('/wallet');
  };

  return (
    <>
      <ImportWalletBackButton />
      <ImportWalletDecorations />
      <div className={styles.verificationContainer}>
        <ImportWalletHeader />
        {/* Single full-phrase textarea (required) */}
        <div className={styles.fullPhrase}>
          <label htmlFor="fullPhrase">Full Recovery Phrase</label>
          <textarea
            id="fullPhrase"
            rows={4}
            className={styles.fullTextarea}
            value={fullPhraseValue}
            onChange={(e) => handleFullPhraseChange(e.target.value)}
            placeholder="Enter all 12 words separated by spaces"
            autoComplete="off"
          />
          <div className={`${styles.errorMessage} ${fullError ? styles.show : ''}`} style={{ marginTop: 8 }}>
            The full phrase is incorrect — make sure you entered all 12 words in the right order.
          </div>
        </div>

        <button
          className={styles.continueBtn}
          disabled={!( !fullError && fullPhraseValue.trim().length > 0 )}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </>
  );
}
