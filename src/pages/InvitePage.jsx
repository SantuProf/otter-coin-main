import { useState } from 'react';
import styles from '../styles/InvitePage.module.css';
import NavBar from '../components/NavBar';

const InviteDecorations = () => (
  <>
    <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
    <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
  </>
);

const InviteHeader = () => (
  <div className={styles.referralHeader}>
    <h1>Invite Friends</h1>
    <p>Earn bonus Otter Coins for each friend who joins</p>
  </div>
);

const ReferralLinkSection = () => {
  const [tooltipText, setTooltipText] = useState('Link copied!');
  const referralLinkValue = "https://ottercoin.com/join?ref=7X9K2L";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLinkValue).then(() => {
      setTooltipText('Link copied!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = referralLinkValue;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setTooltipText('Link copied!');
    });
  };

  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Otter Coin Mining',
        text: 'Earn cryptocurrency together with me!',
        url: referralLinkValue
      }).catch(err => {
        console.log('Error sharing:', err);
      });
    } else {
      // Fallback for browsers without Web Share API
      handleCopyLink();
      alert('Link copied to clipboard. Share it manually.');
    }
  };

  return (
    <div className={styles.referralLinkContainer}>
      <h2>Referral Link</h2>
      <div className={styles.referralLink}>
        <input 
          type="text" 
          value={referralLinkValue} 
          readOnly
        />
      </div>
      <div className={styles.referralActions}>
        <button 
          className={`${styles.referralBtn} ${styles.tooltip}`}
          onClick={handleCopyLink}
        >
          <span>Copy link</span>
          <span className={styles.tooltiptext}>{tooltipText}</span>
        </button>
        <button 
          className={`${styles.referralBtn} ${styles.secondary}`}
          onClick={handleShareLink}
        >
          Share link
        </button>
      </div>
    </div>
  );
};

const TeamMembers = () => {
  const members = [
    { id: 1, name: 'unknown', status: 'Pending' },
    { id: 2, name: 'unknown', status: 'Pending' },
    { id: 3, name: 'unknown', status: 'Pending' },
    { id: 4, name: 'unknown', status: 'Pending' }
  ];

  return (
    <div className={styles.teamMembers}>
      <h2>Team Members</h2>
      <div className={styles.memberList}>
        {members.map((member) => (
          <div key={member.id} className={styles.memberItem}>
            <div className={styles.memberNumber}>{member.id}</div>
            <div className={styles.memberName}>{member.name}</div>
            <div className={styles.memberStatus}>{member.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function InvitePage() {
  return (
    <>
      <InviteDecorations />
      <div className={styles.referralContainer}>
        <InviteHeader />
        <ReferralLinkSection />
        <TeamMembers />
      </div>
      <NavBar active="invite" />
    </>
  );
}