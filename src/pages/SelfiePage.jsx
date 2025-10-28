import { useNavigate } from 'react-router-dom';
function SelfieBackButton() {
  const navigate = useNavigate();
  return (
    <div className={styles.backButton} onClick={() => navigate(-1)}>
      <i className="fa-solid fa-arrow-left"></i>
    </div>
  );
}
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/SelfiePage.module.css';

export default function SelfiePage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [selfieTaken, setSelfieTaken] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize camera on mount
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      .then((s) => {
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.style.display = 'block';
        }
      })
      .catch((err) => {
        setError('Could not access the camera. Please check permissions.');
      });
    return () => {
      // Stop camera on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line
  }, []);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    // Flash effect
    const effect = document.getElementById('captureEffect');
    if (effect) {
      effect.style.opacity = 0.8;
      setTimeout(() => { effect.style.opacity = 0; }, 200);
    }
    // Draw image
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Show preview
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    setPreviewUrl(imageDataUrl);
    setSelfieTaken(true);
  };

  const handleRetake = () => {
    setSelfieTaken(false);
    setPreviewUrl('');
  };

  const handleContinue = () => {
    alert('Selfie submitted successfully!');
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    // In a real app, upload selfie and navigate to next step
  };

  return (
    <>
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
      <div className={styles.selfieContainer} style={{ position: 'relative' }}>
        <SelfieBackButton />
        <div className={styles.selfieHeader}>
          <h1 className={styles.selfieTitle}>Take a Selfie</h1>
          <p className={styles.selfieDescription}>We need to verify your identity</p>
        </div>
        <div className={styles.cameraContainer}>
          {!selfieTaken && !error && (
            <>
              <div className={styles.cameraPlaceholder} style={{ display: stream ? 'none' : 'block' }}>📷</div>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className={styles.video}
                style={{ display: stream ? 'block' : 'none' }}
              />
              <canvas ref={canvasRef} className={styles.canvas} style={{ display: 'none' }} />
              <div
                className={styles.captureBtn}
                id="captureBtn"
                onClick={handleCapture}
                style={{ display: stream ? 'block' : 'none' }}
              />
              <div className={styles.captureEffect} id="captureEffect" />
            </>
          )}
        </div>
        {error && <div style={{ color: 'red', margin: '1rem 0' }}>{error}</div>}
        {selfieTaken && (
          <div className={styles.previewContainer} style={{ display: 'block' }}>
            <p>Selfie Preview:</p>
            <img src={previewUrl} className={styles.previewImage} alt="Selfie preview" />
          </div>
        )}
        <div className={styles.actionButtons}>
          <button
            className={`${styles.btn} ${styles.secondaryBtn}`}
            onClick={handleRetake}
            disabled={!selfieTaken}
            id="retakeBtn"
          >
            Retake
          </button>
          <button
            className={`${styles.btn} ${styles.primaryBtn}`}
            onClick={handleContinue}
            disabled={!selfieTaken}
            id="continueBtn"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}
