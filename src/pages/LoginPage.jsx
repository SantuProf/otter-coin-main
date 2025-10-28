import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LoginPage.module.css';
import loginImg from '../../public/login.png';

function Logo() {
  return (
    <div className={styles.logo}>
      <h1 className={styles.logoTitle}>Welcome To Otter Coin</h1>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all required fields.');
      return;
    }
    // Your login logic here
    console.log('Login attempt with:', { email, password });
    navigate('/verification');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <input
          className={styles.input}
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <a href="/forgot" className={styles.forgotPassword}>Forgot Password?</a>
      <button type="submit" className={styles.loginBtn}>Log In</button>
      <p className={styles.signupLink}>
        Don't have any account? <a href="/signup">Sign Up</a>
      </p>
      <br />
    </form>
  );
}

function ImageSection() {
  return (
    <div className={styles.imgContainer}>
      <img src={loginImg} alt="Crypto mining illustration" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <ImageSection />
      <div className={styles.loginContainer}>
        <Logo />
        <LoginForm />
      </div>
    </div>
  );
}
