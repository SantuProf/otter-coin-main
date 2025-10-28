import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ShownPage.module.css';
import FrontIdPage from './FrontIdPage';
import BackIdPage from './BackIdPage';

function ShownBackButton() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'absolute', top: '2rem', left: '2rem', fontSize: '1.5rem', cursor: 'pointer', color: '#f7fafc', zIndex: 10 }} onClick={() => navigate(-1)}>
      <i className="fa-solid fa-arrow-left"></i>
    </div>
  );
}

function ShownHeader() {
  return (
    <div className={styles.verificationHeader}>
      <h1>Verify Details</h1>
    </div>
  );
}

function DocumentDisplay({ previewUrl, onUploadClick, onFileChange }) {
  // kept for backward compatibility (not used when front/back components are mounted)
  return (
    <div className={styles.documentDisplay}>
      <div className={styles.documentImageContainer}>
        <div className={styles.documentPlaceholder}>No document uploaded</div>
      </div>
      <div className={styles.uploadRow}>
        <input id="fileUpload" type="file" accept="image/*,application/pdf" onChange={onFileChange} className={styles.fileInput} />
        <button type="button" className={styles.btn} onClick={onUploadClick}>Upload Document</button>
      </div>
      <DocumentInfo />
    </div>
  );
}

function DocumentInfo() {
  return (
    <div className={styles.documentInfo}>
      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>ID:</span>
        <span className={styles.infoValue}>987654345678</span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Country:</span>
        <span className={styles.infoValue}>Pakistan</span>
      </div>
    </div>
  );
}

function ShownContinueButton({ onContinue }) {
  return (
    <button className={styles.btn} onClick={onContinue}>
      Continue
    </button>
  );
}

export default function ShownPage() {
  const [selected, setSelected] = useState('front');
  const navigate = useNavigate();

  const handleContinue = () => {
    alert('Your Documents are Successfully Uploaded!');
    navigate('/dashboard');
  };

  return (
    <div style={{ position: 'relative' }}>
      <ShownBackButton />
      <div className={styles.verificationContainer}>
        <ShownHeader />

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
          <button
            type="button"
            onClick={() => setSelected('front')}
            style={{ padding: '0.5rem 0.9rem', borderRadius: 8, cursor: 'pointer', border: selected === 'front' ? 'none' : '1px solid rgba(255,255,255,0.08)', background: selected === 'front' ? 'linear-gradient(90deg,#38b2ac,#2b6cb0)' : 'transparent', color: '#fff' }}
          >
            Front ID
          </button>
          <button
            type="button"
            onClick={() => setSelected('back')}
            style={{ padding: '0.5rem 0.9rem', borderRadius: 8, cursor: 'pointer', border: selected === 'back' ? 'none' : '1px solid rgba(255,255,255,0.08)', background: selected === 'back' ? 'linear-gradient(90deg,#38b2ac,#2b6cb0)' : 'transparent', color: '#fff' }}
          >
            Back ID
          </button>
        </div>

        <div>
          {selected === 'front' ? <FrontIdPage /> : <BackIdPage />}
        </div>

        <ShownContinueButton onContinue={handleContinue} />
      </div>
    </div>
  );
}
