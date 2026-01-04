import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

// Import your new components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Transfers from './components/Transfers';
import History from './components/History';

export default function App() {
  const [balance, setBalance] = useState(42850.12);
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'Apple Store Inc.', date: 'Jan 04, 2026', amount: -999.00, icon: <ArrowDownLeft className="text-red-500"/> },
    { id: 2, name: 'Monthly Salary Deposit', date: 'Jan 01, 2026', amount: 4500.00, icon: <ArrowUpRight className="text-green-500"/> },
  ]);

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
    alert("Transfer Successful!");
  };

  return (
    <Router>
      <div className="flex h-screen bg-slate-100">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="p-10 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard balance={balance} transactions={transactions} />} />
              <Route path="/transfers" element={<Transfers balance={balance} onTransfer={handleTransfer} />} />
              <Route path="/history" element={<History transactions={transactions} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}