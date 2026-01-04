import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Wallet, Send, LayoutDashboard, History, 
  Settings, Bell, ArrowUpRight, ArrowDownLeft, Search 
} from 'lucide-react';

// --- DASHBOARD PAGE ---
const DashboardPage = ({ balance, transactions }) => (
  <div className="max-w-4xl mx-auto">
    <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
      <p className="opacity-80 mb-1 text-sm font-medium">Total Balance</p>
      <h2 className="text-4xl font-bold mb-6">${balance.toLocaleString()}</h2>
      <div className="flex gap-3">
        <Link to="/transfers" className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50 transition">Send Money</Link>
        <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-400">Add Funds</button>
      </div>
    </div>
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b font-bold text-lg text-slate-800">Recent Activity</div>
      {transactions.map(t => (
        <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50 border-b last:border-0 transition">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-slate-100 rounded-lg">{t.icon}</div>
            <div>
              <p className="font-bold text-slate-900">{t.name}</p>
              <p className="text-xs text-slate-500">{t.date}</p>
            </div>
          </div>
          <span className={`font-bold ${t.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
            {t.amount > 0 ? `+$${t.amount}` : `-$${Math.abs(t.amount)}`}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// --- TRANSFERS PAGE ---
const TransfersPage = ({ onTransfer }) => {
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > 0) {
      onTransfer(parseFloat(amount), account);
      setAmount('');
      setAccount('');
      alert("Transfer Successful!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Transfer Funds</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Recipient Account</label>
          <input 
            type="text" 
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="XXXX-XXXX-XXXX" 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Amount ($)</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00" 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-2xl font-bold" 
            required
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition">Confirm Send</button>
      </form>
    </div>
  );
};

// --- HISTORY PAGE ---
const HistoryPage = ({ transactions }) => (
  <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div className="p-6 bg-slate-50 border-b font-bold text-xl text-slate-800">History</div>
    <div className="divide-y divide-slate-100">
      {transactions.map(t => (
        <div key={t.id} className="p-6 flex items-center justify-between">
          <div>
            <p className="font-bold text-slate-900">{t.name}</p>
            <p className="text-sm text-slate-500">{t.date}</p>
          </div>
          <p className={`font-bold ${t.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
            {t.amount > 0 ? `+$${t.amount}` : `-$${Math.abs(t.amount)}`}
          </p>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP ---
export default function App() {
  const [balance, setBalance] = useState(42850.12);
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'Apple Store', date: 'Jan 02', amount: -999.00, icon: <ArrowDownLeft className="text-red-500" /> },
    { id: 2, name: 'Monthly Salary', date: 'Jan 01', amount: 4500.00, icon: <ArrowUpRight className="text-green-500" /> },
  ]);

  const handleTransfer = (amount, accountName) => {
    setBalance(prev => prev - amount);
    const newTx = {
      id: Date.now(),
      name: `Transfer to ${accountName || 'External Account'}`,
      date: 'Today',
      amount: -amount,
      icon: <ArrowDownLeft className="text-red-500" />
    };
    setTransactions([newTx, ...transactions]);
  };

  return (
    <Router>
      <div className="flex h-screen bg-slate-50">
        <aside className="w-64 bg-slate-900 text-white p-6 hidden md:flex flex-col">
          <div className="flex items-center gap-2 text-2xl font-bold text-indigo-400 mb-10">
            <Wallet size={28} /> NexusBank
          </div>
          <nav className="space-y-2 flex-1">
            <SidebarLink to="/" icon={<LayoutDashboard size={20}/>} label="Dashboard" />
            <SidebarLink to="/transfers" icon={<Send size={20}/>} label="Transfers" />
            <SidebarLink to="/history" icon={<History size={20}/>} label="History" />
          </nav>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-20 bg-white border-b flex items-center justify-between px-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input className="pl-10 pr-4 py-2 bg-slate-100 rounded-lg outline-none text-sm w-64" placeholder="Search..." />
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white uppercase">AR</div>
          </header>

          <div className="p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<DashboardPage balance={balance} transactions={transactions} />} />
              <Route path="/transfers" element={<TransfersPage onTransfer={handleTransfer} />} />
              <Route path="/history" element={<HistoryPage transactions={transactions} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

function SidebarLink({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
      isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
    }`}>
      {icon} {label}
    </Link>
  );
}