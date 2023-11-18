import React, { useState } from 'react';
import './App.css'; 
import UserDetails from './components/UserDetails';
import AccountCreation from './components/AccountCreation';
import './components/AccountCreation.css';
import './components/UserDetails.css';

function App() {
  const [activeTab, setActiveTab] = useState('UserDetails');

  const changeTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>User Management Dashboard</h1>
      </div>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'UserDetails' ? 'active' : ''}`}
          onClick={() => changeTab('UserDetails')}
        >
          User Details
        </div>
        <div
          className={`tab ${activeTab === 'AccountCreation' ? 'active' : ''}`}
          onClick={() => changeTab('AccountCreation')}
        >
          Account Creation
        </div>
      </div>

      <div className="content">
       {activeTab === 'UserDetails' && <UserDetails />}
        {activeTab === 'AccountCreation' && <AccountCreation />}
      </div>
    </div>
  );
}

export default App;

