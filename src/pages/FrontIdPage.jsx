import React, { useRef, useState } from 'react';
import styles from '../styles/FrontIdPage.module.css';

export default function FrontIdPage() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [dropActive, setDropActive] = useState(false);

  const handleBrowseClick = () => fileInputRef.current.click();

  const handleDrop = (e) => {
    e.preventDefault();
    setDropActive(false);
    if (e.dataTransfer.files.length) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDropActive(true);
  };

  const handleDragLeave = () => setDropActive(false);

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!validTypes.includes(selectedFile.type)) {
      setFileInfo('Invalid file type. Please upload JPEG, PNG, or PDF.');
      setFile(null);
      setPreviewUrl('');
      return;
    }
    if (selectedFile.size > maxSize) {
      setFileInfo('File too large (max 5MB)');
      setFile(null);
      setPreviewUrl('');
      return;
    }
    setFile(selectedFile);
    setFileInfo(`Selected: ${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`);
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl('');
    }
  };

  const handleContinue = () => {
    alert('Document uploaded successfully!');
    // In a real app, upload file and navigate to next step
  };

  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
      <div className={styles.uploadContainer}>
        <div className={styles.uploadHeader}>
          <h1 className={styles.uploadTitle}>Front of ID</h1>
          <p className={styles.uploadDescription}>Upload your document for verification</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className={styles.fileInput}
          accept="image/*,.pdf"
          onChange={handleFileChange}
        />
        <div
          className={dropActive ? `${styles.dropZone} ${styles.dropZoneActive}` : styles.dropZone}
          onClick={handleBrowseClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={styles.uploadIcon}>📄</div>
          <p>Click or drag and drop your document here</p>
          <button type="button" className={styles.browseBtn} onClick={handleBrowseClick}>
            Browse Files
          </button>
          <div className={styles.fileInfo}>{fileInfo}</div>
        </div>
        {previewUrl && (
          <div className={styles.previewContainer}>
            <p>Document Preview:</p>
            <img src={previewUrl} className={styles.previewImage} alt="Document preview" />
          </div>
        )}
        <button
          className={styles.continueBtn}
          onClick={handleContinue}
          disabled={!file}
        >
          Continue
        </button>
      </div>
    </>
  );
}
