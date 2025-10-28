import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ProfilePage.module.css';
import NavBar from '../components/NavBar';

function ProfileDecorations() {
  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
    </>
  );
}

function ProfileActions() {
  const navigate = useNavigate();
  return (
    <div className={styles.buttons}>
      <div className={styles.walletIcon} onClick={() => navigate('/wallet')}>
        <i className="fa-solid fa-wallet"></i>
      </div>
      <div className={styles.settingIcon} onClick={() => navigate('/setting')}>
        <i className="fa-solid fa-gear"></i>
      </div>
    </div>
  );
}

function ProfileHeader({ username }) {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileAvatar}>{username ? username.charAt(0).toUpperCase() : '?'}</div>
      <h1 className={styles.profileTitle}>Profile</h1>
    </div>
  );
}

function ProfileDetails({ username, email }) {
  return (
    <div className={styles.profileDetails}>
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Username</span>
        <span className={styles.detailValue}>{username || 'N/A'}</span>
      </div>
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Global Rank</span>
        <span className={styles.detailValue}>#12187</span>
      </div>
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Referrals</span>
        <span className={styles.detailValue}>09</span>
      </div>
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Email</span>
        <span className={styles.detailValue}>{email || 'N/A'}</span>
      </div>
    </div>
  );
}

function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    alert('You have been logged out.');
    navigate('/login');
  };
  return (
    <button className={styles.logoutBtn} onClick={handleLogout}>
      Logout
    </button>
  );
}


export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userProfile'));
    if (!userData) {
      alert('No user data found. Redirecting to sign-up...');
      navigate('/signup');
    } else {
      setUser(userData);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-fluid">
      <ProfileActions />
      <ProfileDecorations />
      <div className={styles.profileContainer} style={{ marginTop: '3%' }}>
        <ProfileHeader username={user?.username} />
        <ProfileDetails username={user?.username} email={user?.email} />
        <LogoutButton />
      </div>
  <NavBar active="profile" />
    </div>
  );
}
