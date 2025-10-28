import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Verification1Page.module.css';

export default function VerificationPage() {
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleInput = (e, idx) => {
    const value = e.target.value;
    if (value.length === 1 && idx < 3) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && e.target.value === '' && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += inputsRef.current[i].value;
    }
    // In a real app, validate code with backend
    // For now, just navigate to dashboard
    navigate('/dashboard');
  };

  const handleResend = (e) => {
    e.preventDefault();
    alert('New verification code sent to your email');
    inputsRef.current[0].focus();
    inputsRef.current.forEach(input => (input.value = ''));
  };

  return (
    <div className={styles.verifyContainer}>
      <div className={styles.back} onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left" style={{ fontSize: 16 }}></i>
      </div>
      <h1 className={styles.verifyTitle}>Verify Your Email</h1>
      <p className={styles.verifyDescription}>We sent 4 digits code on your e-mail</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.codeInputs}>
          {[0, 1, 2, 3].map((idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              pattern="[0-9]"
              inputMode="numeric"
              className={styles.codeInput}
              ref={el => (inputsRef.current[idx] = el)}
              onInput={e => handleInput(e, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              autoFocus={idx === 0}
            />
          ))}
        </div>
        <button type="submit" className={styles.continueBtn}>
          Continue
        </button>
        <a href="#" className={styles.resendLink} onClick={handleResend}>
          Resend Code
        </a>
      </form>
    </div>
  );
}
