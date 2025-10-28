function KycBackButton() {
  const navigate = useNavigate();
  return (
    <div className={styles.backButton} onClick={() => navigate(-1)}>
      <i className="fa-solid fa-arrow-left"></i>
    </div>
  );
}
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/KycPage.module.css';

function KycDecorations() {
  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
    </>
  );
}

function KycHeader() {
  return (
    <div className={styles.kycHeader}>
      <h1>KYC</h1>
      <p>Please provide your official identification details for verification</p>
    </div>
  );
}

function KycForm() {
  const [form, setForm] = useState({
    documentType: '',
    nationality: '',
    language: '',
    firstName: '',
    lastName: '',
    familyName: '',
    documentId: '',
    dateOfBirth: '',
    issueDate: '',
    expiryDate: '',
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // In real implementation, validate and upload
    alert('KYC submitted! (stub)');
    // Optionally redirect or show status
  };

  return (
    <form className={styles.kycForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="documentType">Document Type</label>
        <select id="documentType" required value={form.documentType} onChange={handleChange}>
          <option value="">Select document type</option>
          <option value="passport">Passport</option>
          <option value="id_card">National ID Card</option>
          <option value="drivers_license">Driver's License</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="nationality">Nationality</label>
        <input type="text" id="nationality" required placeholder="Your nationality" value={form.nationality} onChange={handleChange} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="language">Language</label>
        <input type="text" id="language" required placeholder="Preferred language" value={form.language} onChange={handleChange} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" required placeholder="Your first name" value={form.firstName} onChange={handleChange} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" required placeholder="Your last name" value={form.lastName} onChange={handleChange} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="familyName">Family Name</label>
        <input type="text" id="familyName" placeholder="Your family name (if applicable)" value={form.familyName} onChange={handleChange} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="documentId">Document ID</label>
        <input type="text" id="documentId" required placeholder="Document identification number" value={form.documentId} onChange={handleChange} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input type="date" id="dateOfBirth" required value={form.dateOfBirth} onChange={handleChange} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="issueDate">Issue Date</label>
        <input type="date" id="issueDate" required value={form.issueDate} onChange={handleChange} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="expiryDate">Expiry Date</label>
        <input type="date" id="expiryDate" required value={form.expiryDate} onChange={handleChange} />
      </div>
      <div className={styles.personalInfo}>
        <button type="button" className={styles.submitBtn} onClick={() => navigate('/shown')}>ID Card</button>
        <button type="button" className={styles.submitBtn} onClick={() => navigate('/selfie')}>Selfie</button>
      </div>
      <button type="submit" className={styles.submitBtn}>Submit Verification</button>
    </form>
  );
}

export default function KycPage() {
  return (
    <>
      <KycDecorations />
      <div className={styles.kycContainer}>
        <KycBackButton />
        <KycHeader />
        <KycForm />
      </div>
    </>
  );
}
