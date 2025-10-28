import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ForgotPasswordPage.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send reset request to backend here
    // For now, just navigate to verification page
    navigate('/newpassword');
  };

  return (
    <div className={styles.resetContainer}>
      <h1 className={styles.resetHeader}>Reset Password</h1>
      <p className={styles.resetDescription}>
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.inputLabel}>Email</label>
          <input
            type="email"
            id="email"
            required
            placeholder="your@email.com"
            className={styles.inputField}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.continueBtn}>
          Continue
        </button>
        <a href="/login" className={styles.backToLogin}>
          Back to Login
        </a>
      </form>
    </div>
  );
}
