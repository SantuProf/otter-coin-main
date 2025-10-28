import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SignupPage.module.css';

function PasswordStrengthMeter({ password }) {
  let strength = 0;
  if (password.length > 7) strength += 25;
  if (password.length > 11) strength += 25;
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[^A-Za-z0-9]/.test(password)) strength += 20;

  let bgColor = '#e2e8f0';
  if (strength < 40) bgColor = '#e53e3e';
  else if (strength < 70) bgColor = '#dd6b20';
  else if (strength < 90) bgColor = '#d69e2e';
  else bgColor = '#38a169';

  return (
    <div className={styles.passwordStrength}>
      <div
        className={styles.strengthMeter}
        style={{ width: `${strength}%`, backgroundColor: bgColor }}
      />
    </div>
  );
}

function SignupForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !username || !email || !password) {
      alert('Please fill all required fields correctly.');
      return;
    }
    const userData = { name, username, email };
    localStorage.setItem('userProfile', JSON.stringify(userData));
    navigate('/verification');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="name">Name</label>
        <input
          className={styles.input}
          type="text"
          id="name"
          required
          placeholder="Your full name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="username">Username</label>
        <input
          className={styles.input}
          type="text"
          id="username"
          required
          placeholder="Choose a username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <input
          className={styles.input}
          type="password"
          id="password"
          required
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <PasswordStrengthMeter password={password} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="referral">Referral Link</label>
        <input
          className={styles.input}
          type="text"
          id="referral"
          placeholder="https://ottercoin.com"
          value={referral}
          onChange={e => setReferral(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.continueBtn}>Continue</button>
      <p className={styles.loginLink}>
        Already have an account? <a href="/login">Log In</a>
      </p>
    </form>
  );
}

export default function SignupPage() {
  return (
    <div className={styles.signupContainer}>
      <h1 className={styles.signupTitle}>Create Account</h1>
      <SignupForm />
    </div>
  );
}
