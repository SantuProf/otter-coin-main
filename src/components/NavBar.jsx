import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function NavBar({ active }) {
  const navigate = useNavigate();
  return (
    <nav>
      <ul style={{ cursor: 'pointer' }}>
        <li onClick={() => navigate('/dashboard')}>
          <i className="fa-solid fa-house" style={{ color: active === 'dashboard' ? '#24deff' : '#ffffff' }}></i>
        </li>
        <li onClick={() => navigate('/invite')}>
          <i className="fas fa-user-plus" style={{ color: active === 'invite' ? '#24deff' : '#ffffff' }}></i>
        </li>
        <li onClick={() => navigate('/reward')}>
          <i className="fa-solid fa-gift" style={{ color: active === 'reward' ? '#24deff' : '#ffffff' }}></i>
        </li>
        <li onClick={() => navigate('/profile')}>
          <i className="fa-solid fa-user" style={{ color: active === 'profile' ? '#24deff' : '#ffffff' }}></i>
        </li>
      </ul>
    </nav>
  );
}
