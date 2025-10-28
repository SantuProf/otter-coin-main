import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ChangeProfilePage.module.css';

function ChangeProfileDecorations() {
  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
    </>
  );
}

function ChangeProfileBackButton() {
  const navigate = useNavigate();
  return (
    <div className={styles.back} onClick={() => navigate('/setting')}>
      <i className="fa-solid fa-arrow-left" style={{ fontSize: 20 }}></i>
    </div>
  );
}

function ChangeProfileHeader() {
  return <h1 className={styles.signupTitle}>Personal Information</h1>;
}

function ChangeProfileForm() {
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    country: '',
    city: '',
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.username || !form.email || !form.country || !form.city) {
      alert('Please fill all required fields correctly.');
      return;
    }
    // Optionally update user data in localStorage here
    alert('Profile updated!');
    navigate('/profile');
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
          value={form.name}
          onChange={handleChange}
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
          value={form.username}
          onChange={handleChange}
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
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="country">Country</label>
        <input
          className={styles.input}
          type="text"
          id="country"
          required
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="city">City</label>
        <input
          className={styles.input}
          type="text"
          id="city"
          required
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className={styles.continueBtn} style={{ gridColumn: '1 / span 2' }}>
        Continue
      </button>
    </form>
  );
}

export default function ChangeProfilePage() {
  return (
    <section>
      <ChangeProfileDecorations />
      <div className={styles.signupContainer}>
        <ChangeProfileBackButton />
        <ChangeProfileHeader />
        <ChangeProfileForm />
      </div>
    </section>
  );
}
