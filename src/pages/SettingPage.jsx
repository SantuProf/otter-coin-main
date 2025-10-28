import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SettingPage.module.css';

function SettingDecorations() {
  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
    </>
  );
}

function SettingBackButton() {
  const navigate = useNavigate();
  return (
    <div className={styles.button} onClick={() => navigate('/profile')}>
      <i className="fa-solid fa-arrow-left"></i>
    </div>
  );
}

function SettingActions() {
  const navigate = useNavigate();
  return (
    <div className={styles.containers1}>
      <button onClick={() => navigate('/changeprofile')}>Change Personal Information</button>
      <button onClick={() => navigate('/kyc')}>KYC</button>
      <button onClick={() => navigate('/transactionphrase')}>T & P</button>
    </div>
  );
}

export default function SettingPage() {
  return (
    <section className="container-fluid">
      <SettingBackButton />
      <SettingDecorations />
      <SettingActions />
    </section>
  );
}
