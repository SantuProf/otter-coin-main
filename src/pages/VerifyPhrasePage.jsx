import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/VerifyPhrasePage.module.css';

function VerifyPhraseDecorations() {
  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
    </>
  );
}

function VerifyPhraseHeader() {
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

export default function VerifyPhrasePage() {
  // In a real app, this would come from the previous step or secure storage
  const recoveryPhrase = 'oxygen gesture vital wheat spatial verify innocent calm hybrid absorb liquid ripple';
  const words = recoveryPhrase.split(' ');
  const positions = [7, 12, 4]; // 1-based positions
  const correctAnswers = positions.map(pos => words[pos - 1]);

  const [values, setValues] = useState(['', '', '']);
  const [errors, setErrors] = useState([false, false, false]);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (idx, value) => {
    const newValues = [...values];
    newValues[idx] = value;
    setValues(newValues);

    const newErrors = newValues.map((val, i) =>
      val ? val.trim().toLowerCase() !== correctAnswers[i].toLowerCase() : false
    );
    setErrors(newErrors);
    setShowError(newErrors.some((err, i) => newValues[i] && err));
  };

  const allCorrect = values.every((val, i) => val && val.trim().toLowerCase() === correctAnswers[i].toLowerCase());

  const handleContinue = () => {
    alert('Wallet Successfully Created!');
    navigate('/wallet');
  };

  return (
    <>
      <VerifyPhraseDecorations />
      <div className={styles.verificationContainer}>
        <div className={styles.back} onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left" style={{ fontSize: 16 }}></i>
        </div>
        <VerifyPhraseHeader />
        <WordChecks
          positions={positions}
          correctAnswers={correctAnswers}
          values={values}
          onChange={handleChange}
          errors={errors}
        />
        <div
          className={styles.errorMessage}
          style={{ display: showError ? 'block' : 'none' }}
        >
          One or more words are incorrect. Please check carefully.
        </div>
        <button
          className={styles.continueBtn}
          disabled={!allCorrect}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </>
  );
}
