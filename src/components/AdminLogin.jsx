import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AdminLogin.module.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ 
    loginType: 'username', // 'username' or 'email'
    username: '', 
    email: '',
    password: '' 
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple admin check - in production, this should be properly authenticated
    const loginValue = credentials.loginType === 'username' ? credentials.username : credentials.email;
    
    if ((credentials.loginType === 'username' && credentials.username === 'admin' && credentials.password === 'admin123') ||
        (credentials.loginType === 'email' && credentials.email === 'admin@otter-coin.com' && credentials.password === 'admin123')) {
      navigate('/admin');
    } else {
      alert('Invalid admin credentials');
    }
  };

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLoginTypeChange = (type) => {
    setCredentials(prev => ({
      ...prev,
      loginType: type,
      username: '',
      email: ''
    }));
  };

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <h2 className={styles.title}>Admin Login</h2>

        <div className={styles.loginTypeToggle}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${credentials.loginType === 'username' ? styles.active : ''}`}
            onClick={() => handleLoginTypeChange('username')}
          >
            Username
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${credentials.loginType === 'email' ? styles.active : ''}`}
            onClick={() => handleLoginTypeChange('email')}
          >
            Email
          </button>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            {credentials.loginType === 'username' ? 'Username' : 'Email'}
          </label>
          {credentials.loginType === 'username' ? (
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Enter admin username"
            />
          ) : (
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Enter admin email"
            />
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className={styles.submitBtn}>Login to Admin Panel</button>

        <p className={styles.note}>
          Default: {credentials.loginType === 'username' ? 'admin / admin123' : 'admin@otter-coin.com / admin123'}
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;