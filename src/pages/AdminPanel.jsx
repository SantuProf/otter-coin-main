import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AdminPanel.module.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  // removed theme switching - dark mode only
  const [activeSection, setActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [screenContent, setScreenContent] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data state
  const [state, setState] = useState({
    users: [
      {
        id: 1,
        name: "Alice",
        username: "alice123",
        email: "alice@mail.com",
        password: "********",
        referral: "alice123",
        miningRatio: 1.2,
        teamMembers: 4,
        status: "active",
        joined: "2025-07-11 09:17",
        blocked: false,
      },
      {
        id: 2,
        name: "Bob",
        username: "bob456",
        email: "bob@mail.com",
        password: "********",
        referral: "alice123",
        miningRatio: 1.0,
        teamMembers: 2,
        status: "inactive",
        joined: "2025-07-15 14:33",
        blocked: false,
      },
      {
        id: 3,
        name: "Charlie",
        username: "charlie789",
        email: "charlie@mail.com",
        password: "********",
        referral: "bob456",
        miningRatio: 0.8,
        teamMembers: 0,
        status: "active",
        joined: "2025-08-01 10:12",
        blocked: true,
      },
    ],
    kyc: [
      {
        id: 1,
        username: "alice123",
        email: "alice@mail.com",
        type: "National Card",
        status: "approved",
        doc: {
          firstName: "Alice",
          lastName: "Smith",
          familyName: "Smith",
          nationality: "Pakistani",
          language: "Urdu",
          documentNumber: "123456789",
          issueDate: "2021-01-10",
          expiryDate: "2031-01-10",
          dob: "1998-05-13",
          cardFront: "https://placehold.co/220x130/009988/fff?text=Front+Card",
          cardBack: "https://placehold.co/220x130/009988/fff?text=Back+Card",
          selfie: "https://placehold.co/120x120/222/fff?text=Selfie",
        },
      },
      {
        id: 2,
        username: "bob456",
        email: "bob@mail.com",
        type: "Passport",
        status: "pending",
        doc: {
          firstName: "Bob",
          lastName: "Johnson",
          familyName: "Johnson",
          nationality: "Pakistani",
          language: "Urdu",
          documentNumber: "A9876543",
          issueDate: "2018-07-22",
          expiryDate: "2028-07-22",
          dob: "1995-09-29",
          cardFront: "https://placehold.co/220x130/009988/fff?text=Passport",
          cardBack: "",
          selfie: "https://placehold.co/120x120/222/fff?text=Selfie",
        },
      },
    ],
    wallets: [
      {
        id: 1,
        username: "alice123",
        phrase: "apple banana cat dog eagle fish goat hat",
        coins: 17.4,
      },
      {
        id: 2,
        username: "bob456",
        phrase: "iron jet kite lemon moon nut owl pond",
        coins: 3.2,
      },
    ],
    transactions: [
      {
        sender: "alice123",
        senderAddress: "0xA1B2C3",
        amount: 2.4,
        receiver: "bob456",
        receiverAddress: "0xB4C5D6",
        date: "2025-08-04 13:43"
      },
      {
        sender: "bob456",
        senderAddress: "0xB4C5D6",
        amount: 1.4,
        receiver: "charlie789",
        receiverAddress: "0xC7D8E9",
        date: "2025-08-07 15:02"
      },
    ],
    settings: {
      siteName: "Otter Coin",
      officialEmail: "admin@ottercoin.com",
      miningRatio: 1.1,
      txFee: 0.02,
      withdrawalFee: 0.04,
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const copyReferral = (link) => {
    navigator.clipboard.writeText(`${window.location.origin}/ref/${link}`);
    alert("Referral link copied!");
  };

  const blockUser = (id) => {
    if (window.confirm("Block this user?")) {
      setState(prev => ({
        ...prev,
        users: prev.users.map(user => 
          user.id === id ? { ...user, blocked: true } : user
        )
      }));
    }
  };

  const unblockUser = (id) => {
    if (window.confirm("Unblock this user?")) {
      setState(prev => ({
        ...prev,
        users: prev.users.map(user => 
          user.id === id ? { ...user, blocked: false } : user
        )
      }));
    }
  };

  const editMiningRatio = (id, newRatio) => {
    setState(prev => ({
      ...prev,
      users: prev.users.map(user => 
        user.id === id ? { ...user, miningRatio: newRatio } : user
      )
    }));
  };

  const editCoins = (id, newCoins) => {
    setState(prev => ({
      ...prev,
      wallets: prev.wallets.map(wallet => 
        wallet.id === id ? { ...wallet, coins: newCoins } : wallet
      )
    }));
  };

  const approveKYC = (id) => {
    if (window.confirm("Approve this KYC?")) {
      setState(prev => ({
        ...prev,
        kyc: prev.kyc.map(kyc => 
          kyc.id === id ? { ...kyc, status: "approved" } : kyc
        )
      }));
      setShowScreen(false);
    }
  };

  const rejectKYC = (id) => {
    if (window.confirm("Reject this KYC?")) {
      setState(prev => ({
        ...prev,
        kyc: prev.kyc.map(kyc => 
          kyc.id === id ? { ...kyc, status: "rejected" } : kyc
        )
      }));
      setShowScreen(false);
    }
  };

  const logout = () => {
    if (window.confirm("Logout?")) {
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        <svg className={styles.otterIcon} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="#009988"/>
          <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="33" fontFamily="Arial" dy=".3em">OTC</text>
        </svg>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      {/* Mobile burger to open sidebar */}
      <button className={styles.burgerToggle} onClick={() => setSidebarOpen(s => !s)} aria-label="Toggle menu">
        ☰
      </button>

      <div className={styles.container}>
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange}
          sidebarOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <MainContent 
          activeSection={activeSection}
          state={state}
          setState={setState}
          copyReferral={copyReferral}
          blockUser={blockUser}
          unblockUser={unblockUser}
          editMiningRatio={editMiningRatio}
          editCoins={editCoins}
          approveKYC={approveKYC}
          rejectKYC={rejectKYC}
          logout={logout}
          setShowModal={setShowModal}
          setShowScreen={setShowScreen}
          setModalContent={setModalContent}
          setScreenContent={setScreenContent}
        />
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div dangerouslySetInnerHTML={{ __html: modalContent }} />
        </Modal>
      )}

      {showScreen && (
        <Screen onClose={() => setShowScreen(false)}>
          <div dangerouslySetInnerHTML={{ __html: screenContent }} />
        </Screen>
      )}
    </div>
  );
};

export default AdminPanel;
// Sidebar Component
const Sidebar = ({ activeSection, onSectionChange, sidebarOpen = false, onClose }) => {
  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'users', icon: '👤', label: 'Users' },
    { id: 'kyc', icon: '📄', label: 'KYC' },
    { id: 'wallet', icon: '💳', label: 'Wallet' },
    { id: 'transactions', icon: '💳', label: 'Transactions' },
    { id: 'settings', icon: '⚙', label: 'Settings' },
  ];

  return (
    <>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logo}>Otter Coin Admin</div>
        <nav className={styles.options}>
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`${styles.option} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => { onSectionChange(item.id); if (onClose) onClose(); }}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* overlay for mobile when sidebar is open */}
      {sidebarOpen && <div className={styles.sidebarOverlay} onClick={onClose} />}
    </>
  );
};

// Main Content Component
const MainContent = ({ 
  activeSection, 
  state, 
  setState, 
  copyReferral, 
  blockUser, 
  unblockUser, 
  editMiningRatio, 
  editCoins, 
  approveKYC, 
  rejectKYC, 
  logout,
  setShowModal,
  setShowScreen,
  setModalContent,
  setScreenContent
}) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard state={state} />;
      case 'users':
        return <Users 
          state={state} 
          setState={setState}
          copyReferral={copyReferral} 
          blockUser={blockUser}
          unblockUser={unblockUser}
          editMiningRatio={editMiningRatio}
          setShowModal={setShowModal}
          setShowScreen={setShowScreen}
          setModalContent={setModalContent}
          setScreenContent={setScreenContent}
        />;
      case 'kyc':
        return <KYC 
          state={state} 
          approveKYC={approveKYC}
          rejectKYC={rejectKYC}
          setShowScreen={setShowScreen}
          setScreenContent={setScreenContent}
        />;
      case 'wallet':
        return <Wallet state={state} editCoins={editCoins} />;
      case 'transactions':
        return <Transactions state={state} />;
      case 'settings':
        return <Settings state={state} setState={setState} logout={logout} />;
      default:
        return <Dashboard state={state} />;
    }
  };

  return (
    <main className={styles.main}>
      {renderContent()}
    </main>
  );
};

// Dashboard Component
const Dashboard = ({ state }) => {
  const totalUsers = state.users.length;
  const totalMined = state.wallets.reduce((sum, w) => sum + w.coins, 0).toFixed(2);
  const activeUsers = state.users.filter(u => u.status === "active" && !u.blocked).length;
  const nonActiveUsers = state.users.filter(u => u.status !== "active" && !u.blocked).length;
  const totalKYCApproved = state.kyc.filter(k => k.status === "approved").length;
  const totalKYCPending = state.kyc.filter(k => k.status === "pending").length;

  return (
    <>
      <div className={`${styles.topBar} ${styles.flex} ${styles.justifyEnd} ${styles.alignCenter}`}>
        <span className={styles.welcomeText}>Welcome, Admin!</span>
      </div>
      
      <div className={styles.sectionTitle}>Dashboard Overview</div>
      
      <div className={styles.dashboardCards}>
        <div className={styles.card} title="Total Users">
          <div className={styles.cardTitle}>Total Users</div>
          <div className={styles.cardValue}>{totalUsers}</div>
          <div className={styles.cardIcon}>👤</div>
        </div>
        <div className={styles.card} title="Total Mined Coins">
          <div className={styles.cardTitle}>Total Mined Coins</div>
          <div className={styles.cardValue}>{totalMined}</div>
          <div className={styles.cardIcon}>💰</div>
        </div>
        <div className={styles.card} title="Active Users">
          <div className={styles.cardTitle}>Active Users</div>
          <div className={styles.cardValue}>{activeUsers}</div>
          <div className={styles.cardIcon}>✅</div>
        </div>
        <div className={styles.card} title="Non-Active Users">
          <div className={styles.cardTitle}>Non-Active Users</div>
          <div className={styles.cardValue}>{nonActiveUsers}</div>
          <div className={styles.cardIcon}>❌</div>
        </div>
        <div className={styles.card} title="KYC Approved">
          <div className={styles.cardTitle}>KYC Approved</div>
          <div className={styles.cardValue}>{totalKYCApproved}</div>
          <div className={styles.cardIcon}>📄</div>
        </div>
        <div className={styles.card} title="KYC Pending">
          <div className={styles.cardTitle}>KYC Pending</div>
          <div className={styles.cardValue}>{totalKYCPending}</div>
          <div className={styles.cardIcon}>⏳</div>
        </div>
      </div>
    </>
  );
};

// Users Component (replaced with full JSX version)
const Users = ({ state, setState, copyReferral, blockUser, unblockUser, editMiningRatio }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRatio, setEditingRatio] = useState(null);
  const [newRatio, setNewRatio] = useState('');
  const [showBlocklist, setShowBlocklist] = useState(false);
  const [blockSearch, setBlockSearch] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    referral: ''
  });

  const filteredUsers = state.users.filter(u => 
    !u.blocked && 
    (u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
     u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const blockedUsers = state.users.filter(u => u.blocked && (u.username.toLowerCase().includes(blockSearch.toLowerCase()) || u.email.toLowerCase().includes(blockSearch.toLowerCase())));

  const handleEditRatio = (id, currentRatio) => {
    setEditingRatio(id);
    setNewRatio(currentRatio);
  };

  const handleSaveRatio = (id) => {
    const parsed = parseFloat(newRatio);
    if (!isNaN(parsed)) {
      editMiningRatio(id, parsed);
    }
    setEditingRatio(null);
  };

  const handleAddInput = (e) => {
    const { name, value } = e.target;
    setAddForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const timestampId = Date.now();
    const joined = (new Date()).toISOString().slice(0,16).replace("T"," ");
    const newUser = {
      id: timestampId,
      name: addForm.name,
      username: addForm.username,
      email: addForm.email,
      password: addForm.password,
      referral: addForm.referral || addForm.username,
      miningRatio: 1.0,
      teamMembers: 0,
      status: "active",
      joined,
      blocked: false,
    };

    setState(prev => {
      const updated = { ...prev, users: [...prev.users, newUser] };
      // update referral count
      if (newUser.referral) {
        updated.users = updated.users.map(u => u.username === newUser.referral ? { ...u, teamMembers: (u.teamMembers || 0) + 1 } : u);
      }
      return updated;
    });

    // reset & close
    setAddForm({ name: '', username: '', email: '', password: '', referral: '' });
    setShowAddUser(false);
  };

  return (
    <>
      <div className={`${styles.topBar} ${styles.flex} ${styles.justifyBetween} ${styles.alignCenter}`}>
        <div className={styles.search}>
          <input 
            type="text" 
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.flex}>
          <button className={`${styles.btn} ${styles.btnSmall}`} onClick={() => setShowBlocklist(true)}>
            🚫 Blocklist
          </button>
          <button className={`${styles.btn} ${styles.btnSmall}`} onClick={() => setShowAddUser(true)}>
            ➕ Add New User
          </button>
        </div>
      </div>

      <div className={styles.sectionTitle}>Users</div>

      <table className={styles.usersTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Mining Ratio</th>
            <th>Team Members</th>
            <th>Referral Link</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className={styles.rowAnim}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {editingRatio === user.id ? (
                  <>
                    <input 
                      type="number" 
                      min="0.1" 
                      step="0.1" 
                      value={newRatio}
                      onChange={(e) => setNewRatio(e.target.value)}
                      style={{width: '52px'}}
                    />
                    <button 
                      className={`${styles.btnSmall} ${styles.btnSecondary}`}
                      onClick={() => handleSaveRatio(user.id)}
                    >
                      Save
                    </button>
                    <button 
                      className={`${styles.btnSmall}`}
                      onClick={() => setEditingRatio(null)}
                      style={{marginLeft: 6}}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span>{user.miningRatio}</span>
                    <button 
                      className={`${styles.btnSmall} ${styles.btnSecondary}`}
                      onClick={() => handleEditRatio(user.id, user.miningRatio)}
                      style={{marginLeft: 8}}
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
              <td>{user.teamMembers}</td>
              <td>
                <span>{window.location.origin}/ref/{user.referral}</span>
                <span 
                  className={styles.copyLink} 
                  onClick={() => copyReferral(user.referral)}
                >
                  📋
                </span>
              </td>
              <td>
                <span className={user.status === 'active' ? styles.statusActive : styles.statusInactive}>
                  {user.status}
                </span>
              </td>
              <td>{user.joined}</td>
              <td>
                <button 
                  className={`${styles.btnSmall} ${styles.btnDanger}`}
                  onClick={() => blockUser(user.id)}
                >
                  🚫 Block
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Blocklist Modal */}
      {showBlocklist && (
        <Modal onClose={() => setShowBlocklist(false)}>
          <div className={styles.sectionTitle}>Blocked Users</div>

          <div className={`${styles.search} ${styles.mb2}`} style={{marginBottom: 12}}>
            <input 
              type="text" 
              placeholder="Search blocked users..."
              value={blockSearch}
              onChange={(e) => setBlockSearch(e.target.value)}
            />
          </div>

          <table className={styles.blocklistTable}>
            <thead>
              <tr>
                <th>Username</th><th>Email</th><th>Status</th><th>Joined</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {blockedUsers.map(u => (
                <tr key={u.id} className={styles.rowAnim}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td><span className={u.status === 'active' ? styles.statusActive : styles.statusInactive}>{u.status}</span></td>
                  <td>{u.joined}</td>
                  <td>
                    <button className={`${styles.btnSmall} ${styles.btnSecondary}`} onClick={() => { unblockUser(u.id); }}>
                      Unblock
                    </button>
                  </td>
                </tr>
              ))}
              {blockedUsers.length === 0 && (
                <tr><td colSpan="5" style={{padding: 12}}>No blocked users</td></tr>
              )}
            </tbody>
          </table>

          <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12}}>
            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setShowBlocklist(false)}>Back</button>
          </div>
        </Modal>
      )}

      {/* Add User Screen */}
      {showAddUser && (
        <Screen onClose={() => setShowAddUser(false)}>
          <div className={styles.sectionTitle}>Add New User</div>
          <form onSubmit={handleAddUser}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input type="text" required name="name" value={addForm.name} onChange={handleAddInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Username</label>
              <input type="text" required name="username" value={addForm.username} onChange={handleAddInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" required name="email" value={addForm.email} onChange={handleAddInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input type="password" required name="password" value={addForm.password} onChange={handleAddInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Referral Link (username who referred)</label>
              <input type="text" name="referral" value={addForm.referral} onChange={handleAddInput} />
            </div>

            <div className={`${styles.flex} ${styles.mt2}`}>
              <button className={styles.btn} type="submit">Add</button>
              <button className={`${styles.btn} ${styles.btnSecondary}`} type="button" onClick={() => setShowAddUser(false)}>Back</button>
            </div>
          </form>
        </Screen>
      )}
    </>
  );
};

// KYC Component
const KYC = ({ state, approveKYC, rejectKYC, setShowScreen, setScreenContent }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKYC = state.kyc.filter(k => 
    k.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewKYC = (id) => {
    const kyc = state.kyc.find(k => k.id === id);
    setScreenContent(`
      <div class="section-title">KYC Details</div>
      <div class="mb-2">
        <strong>Username:</strong> ${kyc.username}<br>
        <strong>Email:</strong> ${kyc.email}<br>
        <strong>Document Type:</strong> ${kyc.type}
      </div>
      <div class="mb-2">
        <strong>First Name:</strong> ${kyc.doc.firstName}<br>
        <strong>Last Name:</strong> ${kyc.doc.lastName}<br>
        <strong>Family Name:</strong> ${kyc.doc.familyName}<br>
        <strong>Nationality:</strong> ${kyc.doc.nationality}<br>
        <strong>Language:</strong> ${kyc.doc.language}<br>
        <strong>Document Number:</strong> ${kyc.doc.documentNumber}<br>
        <strong>Issue Date:</strong> ${kyc.doc.issueDate}<br>
        <strong>Expiry Date:</strong> ${kyc.doc.expiryDate}<br>
        <strong>Date of Birth:</strong> ${kyc.doc.dob}
      </div>
      <div class="mb-2 flex">
        ${kyc.type === "National Card" ? `
          <div>
            <img src="${kyc.doc.cardFront}" alt="Front Pic" style="width:110px; cursor:pointer;">
            <p style="margin:0; font-size:.92em;">Front Pic</p>
          </div>
          <div>
            <img src="${kyc.doc.cardBack}" alt="Back Pic" style="width:110px; cursor:pointer;">
            <p style="margin:0; font-size:.92em;">Back Pic</p>
          </div>
        ` : ""}
        <div>
          <img src="${kyc.doc.selfie}" alt="Selfie" style="width:70px; border-radius:50%; cursor:pointer;">
          <p style="margin:0; font-size:.92em;">Selfie</p>
        </div>
      </div>
      <div class="flex justify-end mt-2">
        <button class="btn btn-small" onclick="approveKYC(${id})">Approve</button>
        <button class="btn btn-small btn-danger" onclick="rejectKYC(${id})">Reject</button>
        <button class="btn btn-secondary btn-small" onclick="closeScreen()">Back</button>
      </div>
    `);
    setShowScreen(true);
  };

  return (
    <>
      <div className={`${styles.topBar} ${styles.flex} ${styles.justifyBetween} ${styles.alignCenter}`}>
        <div className={styles.search}>
          <input 
            type="text" 
            placeholder="Search KYC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.sectionTitle}>KYC Applications</div>

      <table className={styles.kycTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Document Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredKYC.map(kyc => (
            <tr key={kyc.id} className={styles.rowAnim}>
              <td>{kyc.username}</td>
              <td>{kyc.email}</td>
              <td>{kyc.type}</td>
              <td>
                <span className={`${styles.badge} ${styles[`badge${kyc.status.charAt(0).toUpperCase() + kyc.status.slice(1)}`]}`}>
                  {kyc.status}
                </span>
              </td>
              <td>
                <button 
                  className={`${styles.btnSmall} ${styles.btnSecondary}`}
                  onClick={() => viewKYC(kyc.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

// Wallet Component
const Wallet = ({ state, editCoins }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCoins, setEditingCoins] = useState(null);
  const [newCoins, setNewCoins] = useState('');

  const filteredWallets = state.wallets.filter(w => 
    w.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditCoins = (id, currentCoins) => {
    setEditingCoins(id);
    setNewCoins(currentCoins);
  };

  const handleSaveCoins = (id) => {
    editCoins(id, parseFloat(newCoins));
    setEditingCoins(null);
  };

  return (
    <>
      <div className={`${styles.topBar} ${styles.flex} ${styles.justifyBetween} ${styles.alignCenter}`}>
        <div className={styles.search}>
          <input 
            type="text" 
            placeholder="Search wallet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.sectionTitle}>Wallets</div>

      <table className={styles.walletTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Phrase</th>
            <th>Coins</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredWallets.map(wallet => (
            <tr key={wallet.id} className={styles.rowAnim}>
              <td>{wallet.username}</td>
              <td>{wallet.phrase}</td>
              <td>
                {editingCoins === wallet.id ? (
                  <>
                    <input 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      value={newCoins}
                      onChange={(e) => setNewCoins(e.target.value)}
                      style={{width: '62px'}}
                    />
                    <button 
                      className={`${styles.btnSmall} ${styles.btnSecondary}`}
                      onClick={() => handleSaveCoins(wallet.id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>{wallet.coins}</span>
                    <button 
                      className={`${styles.btnSmall} ${styles.btnSecondary}`}
                      onClick={() => handleEditCoins(wallet.id, wallet.coins)}
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

// Transactions Component
const Transactions = ({ state }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = state.transactions.filter(t => 
    t.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.receiver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={`${styles.topBar} ${styles.flex} ${styles.justifyBetween} ${styles.alignCenter}`}>
        <div className={styles.search}>
          <input 
            type="text" 
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.sectionTitle}>Transaction History</div>

      <table className={styles.txTable}>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Sender Address</th>
            <th>Amount</th>
            <th>Receiver</th>
            <th>Receiver Address</th>
            <th>Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((tx, index) => (
            <tr key={index} className={styles.rowAnim}>
              <td>{tx.sender}</td>
              <td>{tx.senderAddress}</td>
              <td>{tx.amount}</td>
              <td>{tx.receiver}</td>
              <td>{tx.receiverAddress}</td>
              <td>{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

// Settings Component
const Settings = ({ state, setState, logout }) => {
  const [settings, setSettings] = useState(state.settings);

  const handleSubmit = (e) => {
    e.preventDefault();
    setState(prev => ({ ...prev, settings }));
    alert("Settings saved!");
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className={styles.sectionTitle}>Settings</div>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Website Name</label>
          <input 
            type="text" 
            value={settings.siteName} 
            disabled 
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Official Email</label>
          <input 
            type="email" 
            value={settings.officialEmail}
            onChange={(e) => handleInputChange('officialEmail', e.target.value)}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Mining Ratio (Default for all users)</label>
          <input 
            type="number" 
            step="0.01" 
            value={settings.miningRatio}
            onChange={(e) => handleInputChange('miningRatio', parseFloat(e.target.value))}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Transaction Fee (%)</label>
          <input 
            type="number" 
            step="0.01" 
            value={settings.txFee}
            onChange={(e) => handleInputChange('txFee', parseFloat(e.target.value))}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Withdrawal Minimum</label>
          <input 
            type="number" 
            step="0.01" 
            value={settings.withdrawalFee}
            onChange={(e) => handleInputChange('withdrawalFee', parseFloat(e.target.value))}
          />
        </div>
        
        <div className={`${styles.flex} ${styles.mt2}`}>
          <button className={styles.btn} type="submit">Save</button>
          <button 
            className={`${styles.btn} ${styles.btnDanger}`} 
            type="button" 
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </form>
    </>
  );
};

// Modal Component
const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modal} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  );
};

// Screen Component
const Screen = ({ children, onClose }) => {
  return (
    <div className={styles.screen} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.screenContent}>
        <button className={styles.screenClose} onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  );
};