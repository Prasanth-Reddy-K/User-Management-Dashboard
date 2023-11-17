import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import UserDetails from './components/UserDetails';
import AccountCreation from './components/AccountCreation';

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>User Management Dashboard</h1>
          <nav>
            <Link to="/user-details">User Details</Link>
            <Link to="/account-creation">Account Creation</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/user-details" component={UserDetails} />
          <Route path="/account-creation" component={AccountCreation} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
