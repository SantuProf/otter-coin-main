import React, { useState, useEffect } from 'react';
import styles from '../styles/RewardPage.module.css';
import NavBar from '../components/NavBar';

const RewardPage = () => {
  const [tasks, setTasks] = useState({
    taskX: false,
    taskInstagram: false,
    taskFacebook: false,
    taskYouTube: false,
    taskTelegram: false,
  });
  
  const [isRewardClaimed, setIsRewardClaimed] = useState(false);

  // Check if all tasks are completed
  const allTasksCompleted = Object.values(tasks).every(task => task);

  // Handle task checkbox change
  const handleTaskChange = (taskId) => {
    if (!isRewardClaimed) {
      setTasks(prev => ({
        ...prev,
        [taskId]: !prev[taskId]
      }));
    }
  };

  // Handle external link click and mark task as completed
  const handleExternalLink = (taskId, url) => {
    window.open(url, '_blank');
    if (!isRewardClaimed) {
      setTasks(prev => ({
        ...prev,
        [taskId]: true
      }));
    }
  };

  // Handle reward claim
  const handleClaimReward = () => {
    if (allTasksCompleted && !isRewardClaimed) {
      // Get current user data from session storage (simulated)
      const userData = JSON.parse(sessionStorage.getItem('currentUser') || '{"balance": 0}');
      
      // Add reward coins
      userData.balance = (parseFloat(userData.balance) || 0) + 50;
      userData.rewardsClaimed = true;
      
      // Update session storage
      sessionStorage.setItem('currentUser', JSON.stringify(userData));
      
      setIsRewardClaimed(true);
      alert('50 Otter Coins have been added to your balance!');
    }
  };

  // Navigation handlers
  const navigateTo = (page) => {
    // In a real React app, you'd use React Router
    window.location.href = page;
  };

  // Initialize component - check if rewards were already claimed
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    if (userData.rewardsClaimed) {
      setIsRewardClaimed(true);
      // Mark all tasks as completed if reward was already claimed
      setTasks({
        taskX: true,
        taskInstagram: true,
        taskFacebook: true,
        taskYouTube: true,
        taskTelegram: true,
      });
    }
  }, []);

  return (
    <div className={styles.body}>
      {/* Crypto-themed background decorations */}
      <div className={`${styles.cryptoDecoration} ${styles.decoration1}`}>Ξ</div>
      <div className={`${styles.cryptoDecoration} ${styles.decoration2}`}>₿</div>
      
      <div className={styles.rewardsContainer}>
        <div className={styles.rewardsHeader}>
          <h1>Rewards</h1>
          <p>Complete tasks to earn Otter Coins</p>
        </div>
        
        <div className={styles.tasksList}>
          <div className={styles.taskItem} onClick={(e) => {
            e.preventDefault();
            handleExternalLink('taskX', 'https://x.com/otter__coin?t=X7ZRe1bUSlt1lfh99YB-4w&s=09');
          }}>
            <input
              type="checkbox"
              className={styles.taskCheckbox}
              checked={tasks.taskX}
              readOnly
            />
            <span className={styles.taskLabel}>Follow us on X (Twitter)</span>
          </div>
          
          <div className={styles.taskItem} onClick={(e) => {
            e.preventDefault();
            handleExternalLink('taskInstagram', 'https://www.instagram.com/otter_coin?igsh=MTgzcDI4dGd4NWJ5Nw==');
          }}>
            <input
              type="checkbox"
              className={styles.taskCheckbox}
              checked={tasks.taskInstagram}
              readOnly
            />
            <span className={styles.taskLabel}>Follow us on Instagram</span>
          </div>
          
          <div className={styles.taskItem} onClick={(e) => {
            e.preventDefault();
            handleExternalLink('taskFacebook', 'https://www.facebook.com/share/1EqfhYE12Z/');
          }}>
            <input
              type="checkbox"
              className={styles.taskCheckbox}
              checked={tasks.taskFacebook}
              readOnly
            />
            <span className={styles.taskLabel}>Follow us on Facebook</span>
          </div>
          
          <div className={styles.taskItem} onClick={(e) => {
            e.preventDefault();
            handleExternalLink('taskYouTube', 'https://www.youtube.com/@The_otter_coin');
          }}>
            <input
              type="checkbox"
              className={styles.taskCheckbox}
              checked={tasks.taskYouTube}
              readOnly
            />
            <span className={styles.taskLabel}>Subscribe our YouTube Channel</span>
          </div>
          
          <div className={styles.taskItem} onClick={(e) => {
            e.preventDefault();
            handleExternalLink('taskTelegram', 'https://t.me/Otter_Coin1604');
          }}>
            <input
              type="checkbox"
              className={styles.taskCheckbox}
              checked={tasks.taskTelegram}
              readOnly
            />
            <span className={styles.taskLabel}>Follow us on Telegram</span>
          </div>
        </div>
        
        <div className={styles.claimSection}>
          <div className={styles.claimAmount}>Claim 50 Otter Coins</div>
          <button
            className={styles.claimBtn}
            disabled={!allTasksCompleted || isRewardClaimed}
            onClick={handleClaimReward}
          >
            {isRewardClaimed ? 'Reward Claimed!' : 'Claim Reward'}
          </button>
        </div>
      </div>
      
  <NavBar active="reward" />
    </div>
  );
};

export default RewardPage;