import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Transfers from './components/Transfers';
import History from './components/History';
import Auth from './components/Auth'; // New Import

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Auth State
  const [balance, setBalance] = useState(42850.12);
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'Apple Store Inc.', date: 'Jan 04, 2026', amount: -999.00, icon: <ArrowDownLeft className="text-red-500"/> },
    { id: 2, name: 'Monthly Salary Deposit', date: 'Jan 01, 2026', amount: 4500.00, icon: <ArrowUpRight className="text-green-500"/> },
  ]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const handleTransfer = (amount, account) => {
    setBalance(prev => prev - amount);
    const newTx = {
      id: Date.now(),
      name: `Transfer to Acct: ${account}`,
      date: 'Today',
      amount: -amount,
      icon: <ArrowDownLeft className="text-red-500"/>
    };
    setTransactions([newTx, ...transactions]);
  };

  // If not logged in, show ONLY the Auth page
  if (!isLoggedIn) {
    return <Auth onLogin={handleLogin} />;
  }

  // If logged in, show the Banking App
  return (
    <Router>
      <div className="flex h-screen bg-slate-100">
        <Sidebar onLogout={handleLogout} /> 
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="p-10 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard balance={balance} transactions={transactions} />} />
              <Route path="/transfers" element={<Transfers balance={balance} onTransfer={handleTransfer} />} />
              <Route path="/history" element={<History transactions={transactions} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}