
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import RewardPage from './pages/RewardPage.jsx';
import InvitePage from './pages/InvitePage.jsx';
import WalletPage from './pages/WalletPage.jsx';
import CreateWalletPage from './pages/CreateWalletPage.jsx';
import ImportWalletPage from './pages/ImportWalletPage.jsx';
import VerifyPhrasePage from './pages/VerifyPhrasePage.jsx';
import SettingPage from './pages/SettingPage.jsx';
import ChangeProfilePage from './pages/ChangeProfilePage.jsx';
import KycPage from './pages/KycPage.jsx';
import ShownPage from './pages/ShownPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import FrontIdPage from './pages/FrontIdPage.jsx';
import BackIdPage from './pages/BackIdPage.jsx';
import SelfiePage from './pages/SelfiePage.jsx';
import KycBeforePage from './pages/KycBeforePage.jsx';
import TransactionPage from './pages/TransactionPage.jsx';
import TransactionPhrasePage from './pages/TransactionPhrasePage.jsx';
import VerificationPage from './pages/VerificationPage.jsx';
import NewPasswordPage from './pages/NewPasswordPage.jsx';
import ReceivePage from './pages/ReceivePage.jsx';
import SendPage from './pages/SendPage.jsx';
import WalletDashboardPage from './pages/WalletDashboardPage.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import './App.css';
import DexScreenerPage from './pages/DexScreenerPage.jsx';
import PumpTokens from './components/PumpTokens.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reward" element={<RewardPage />} />
        <Route path="/invite" element={<InvitePage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/create" element={<CreateWalletPage />} />
        <Route path="/import" element={<ImportWalletPage />} />
        <Route path="/verifyphrase" element={<VerifyPhrasePage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/changeprofile" element={<ChangeProfilePage />} />
        <Route path="/kyc" element={<KycPage />} />
        <Route path="/shown" element={<ShownPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/frontid" element={<FrontIdPage />} />
        <Route path="/backid" element={<BackIdPage />} />
        <Route path="/selfie" element={<SelfiePage />} />
        <Route path="/kycbefore" element={<KycBeforePage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/transactionphrase" element={<TransactionPhrasePage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/newpassword" element={<NewPasswordPage />} />
        <Route path="/receive" element={<ReceivePage />} />
        <Route path="/send" element={<SendPage />} />
        <Route path="/walletdashboard" element={<WalletDashboardPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/dex" element={<DexScreenerPage />} />
  <Route path="/pumps" element={<PumpTokens />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
