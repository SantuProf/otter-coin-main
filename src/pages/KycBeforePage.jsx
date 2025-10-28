import React, { useState } from 'react';
import styles from '../styles/KycBeforePage.module.css';

export default function KycBeforePage() {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, submit to backend or KYC provider
    alert('KYC Submission: ' + JSON.stringify(form, null, 2));
  };

  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
      <div className={styles.kycContainer}>
        <div className={styles.kycHeader}>
          <h1 className={styles.kycTitle}>KYC</h1>
          <p className={styles.kycDescription}>
            Please provide your official identification details for verification
          </p>
        </div>
        <form className={styles.kycForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="documentType" className={styles.formLabel}>Document Type</label>
            <select
              id="documentType"
              required
              className={styles.formSelect}
              value={form.documentType}
              onChange={handleChange}
            >
              <option value="">Select document type</option>
              <option value="passport">Passport</option>
              <option value="id_card">National ID Card</option>
              <option value="drivers_license">Driver's License</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="nationality" className={styles.formLabel}>Nationality</label>
            <input
              type="text"
              id="nationality"
              required
              placeholder="Your nationality"
              className={styles.formInput}
              value={form.nationality}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="language" className={styles.formLabel}>Language</label>
            <input
              type="text"
              id="language"
              required
              placeholder="Preferred language"
              className={styles.formInput}
              value={form.language}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.formLabel}>First Name</label>
            <input
              type="text"
              id="firstName"
              required
              placeholder="Your first name"
              className={styles.formInput}
              value={form.firstName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.formLabel}>Last Name</label>
            <input
              type="text"
              id="lastName"
              required
              placeholder="Your last name"
              className={styles.formInput}
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="familyName" className={styles.formLabel}>Family Name</label>
            <input
              type="text"
              id="familyName"
              placeholder="Your family name (if applicable)"
              className={styles.formInput}
              value={form.familyName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="documentId" className={styles.formLabel}>Document ID</label>
            <input
              type="text"
              id="documentId"
              required
              placeholder="Document identification number"
              className={styles.formInput}
              value={form.documentId}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="dateOfBirth" className={styles.formLabel}>Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              required
              className={styles.formInput}
              value={form.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="issueDate" className={styles.formLabel}>Issue Date</label>
            <input
              type="date"
              id="issueDate"
              required
              className={styles.formInput}
              value={form.issueDate}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="expiryDate" className={styles.formLabel}>Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              required
              className={styles.formInput}
              value={form.expiryDate}
              onChange={handleChange}
            />
          </div>
          <div className={styles.personalInfo}>
            <button type="button" className={styles.submitBtn}>ID Card</button>
            <button type="button" className={styles.submitBtn}>Selfie</button>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Submit Verification
          </button>
        </form>
      </div>
    </>
  );
}
