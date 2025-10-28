import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/NewPasswordPage.module.css';

function Requirement({ valid, children }) {
  return (
    <div className={valid ? `${styles.requirement} ${styles.requirementValid}` : styles.requirement}>
      <span className={styles.icon}>{valid ? '✅' : '❌'}</span>
      <span>{children}</span>
    </div>
  );
}

export default function NewPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();
  const submitBtnRef = useRef();

  // Validation
  const lengthValid = password.length >= 8;
  const numberValid = /\d/.test(password);
  const specialValid = /[^A-Za-z0-9]/.test(password);
  const allValid = lengthValid && numberValid && specialValid;
  const match = password === confirm && password.length > 0;

  // Strength meter
  let strength = 0;
  if (lengthValid) strength += 30;
  if (numberValid) strength += 30;
  if (specialValid) strength += 40;
  let strengthColor = '#e53e3e';
  if (strength >= 70) strengthColor = '#38a169';
  else if (strength >= 40) strengthColor = '#dd6b20';

  const handleSubmit = e => {
    e.preventDefault();
    if (allValid && match) {
      // In a real app, hash and send to backend
      navigate('/dashboard');
    }
  };

  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
      <div className={styles.passwordContainer}>
        <h1 className={styles.passwordTitle}>Set Password</h1>
        <p className={styles.passwordDescription}>Enter new 8 digits password</p>
        <form id="passwordForm" onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              required
              placeholder="••••••••"
              minLength={8}
              className={styles.inputField}
              value={password}
              onChange={e => { setPassword(e.target.value); setTouched(true); }}
            />
            <span
              className={styles.togglePassword}
              onClick={() => setShowPassword(v => !v)}
              role="button"
              tabIndex={0}
              aria-label="Toggle password visibility"
            >
              {showPassword ? '👁️‍🗨️' : '👁️'}
            </span>
            <div className={styles.passwordStrength}>
              <div
                className={styles.strengthMeter}
                style={{ width: strength + '%', backgroundColor: strengthColor }}
              />
            </div>
            <div className={styles.requirements}>
              <Requirement valid={lengthValid}>At least 8 characters</Requirement>
              <Requirement valid={numberValid}>Contains a number</Requirement>
              <Requirement valid={specialValid}>Contains a special character</Requirement>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.inputLabel}>Confirm Password</label>
            <input
              type={showConfirm ? 'text' : 'password'}
              id="confirmPassword"
              required
              placeholder="••••••••"
              className={styles.inputField}
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
            <span
              className={styles.togglePassword}
              onClick={() => setShowConfirm(v => !v)}
              role="button"
              tabIndex={0}
              aria-label="Toggle confirm password visibility"
            >
              {showConfirm ? '👁️‍🗨️' : '👁️'}
            </span>
            <div
              className={styles.errorMessage}
              style={{ display: touched && confirm.length > 0 && !match ? 'block' : 'none' }}
            >
              Passwords do not match
            </div>
          </div>
          <button
            type="submit"
            className={styles.continueBtn}
            id="submitBtn"
            ref={submitBtnRef}
            disabled={!(allValid && match)}
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
}
