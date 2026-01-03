import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Wallet, Send, LayoutDashboard, History, 
  Settings, Bell, ArrowUpRight, ArrowDownLeft, Search 
} from 'lucide-react';

// --- 1. DASHBOARD PAGE COMPONENT ---
const DashboardPage = ({ balance, transactions }) => (
  <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
    <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
      <p className="opacity-80 mb-1 text-sm font-medium">Total Balance</p>
      <h2 className="text-4xl font-bold mb-6">${balance.toLocaleString()}</h2>
      <div className="flex gap-3">
        <Link to="/transfers" className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50 transition">Send Money</Link>
        <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-400">Add Funds</button>
      </div>
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
    </div>

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b font-bold text-lg text-slate-800">Recent Activity</div>
      {transactions.map(t => (
        <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50 border-b last:border-0 transition cursor-pointer">
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

// --- 2. TRANSFERS PAGE COMPONENT ---
const TransfersPage = () => (
  <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">Transfer Funds</h2>
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <button className="p-4 border-2 border-indigo-600 bg-indigo-50 rounded-2xl text-indigo-600 font-bold text-sm">External Bank</button>
        <button className="p-4 border-2 border-transparent bg-slate-100 rounded-2xl text-slate-500 font-bold text-sm">Internal User</button>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Recipient Account Number</label>
        <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Amount to Send ($)</label>
        <input type="number" placeholder="0.00" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition text-2xl font-bold" />
      </div>
      <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition">Complete Transaction</button>
    </div>
  </div>
);

// --- 3. HISTORY PAGE COMPONENT ---
const HistoryPage = ({ transactions }) => (
  <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
    <div className="p-6 bg-slate-50 border-b flex justify-between items-center">
        <h2 className="font-bold text-xl text-slate-800">Full Transaction History</h2>
        <button className="text-indigo-600 text-sm font-bold flex items-center gap-1"><History size={16}/> Download Statement</button>
    </div>
    <div className="divide-y divide-slate-100">
      {transactions.map(t => (
        <div key={t.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition">
          <div className="flex flex-col">
            <span className="font-bold text-slate-900">{t.name}</span>
            <span className="text-sm text-slate-500">{t.date} • Reference: #88291{t.id}</span>
          </div>
          <div className="text-right">
            <p className={`font-bold text-lg ${t.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
               {t.amount > 0 ? `+$${t.amount}` : `-$${Math.abs(t.amount)}`}
            </p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Completed</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
export default function App() {
  const [balance] = useState(42850.12);
  const transactions = [
    { id: 1, name: 'Apple Store', date: 'Jan 02', amount: -999.00, icon: <ArrowDownLeft className="text-red-500" /> },
    { id: 2, name: 'Monthly Salary', date: 'Jan 01', amount: 4500.00, icon: <ArrowUpRight className="text-green-500" /> },
    { id: 3, name: 'Amazon Online', date: 'Dec 30', amount: -150.25, icon: <ArrowDownLeft className="text-red-500" /> },
    { id: 4, name: 'Rent Payment', date: 'Dec 01', amount: -1200.00, icon: <ArrowDownLeft className="text-red-500" /> },
  ];

  return (
    <Router>
      <div className="flex h-screen bg-slate-50 font-sans">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white p-6 hidden md:flex flex-col shadow-2xl">
          <div className="flex items-center gap-2 text-2xl font-bold text-indigo-400 mb-10 pl-2">
            <Wallet size={32} /> NexusBank
          </div>
          <nav className="space-y-2 flex-1">
            <SidebarLink to="/" icon={<LayoutDashboard size={20}/>} label="Dashboard" />
            <SidebarLink to="/transfers" icon={<Send size={20}/>} label="Transfers" />
            <SidebarLink to="/history" icon={<History size={20}/>} label="History" />
          </nav>
          <div className="p-4 bg-slate-800 rounded-2xl flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-xs">AR</div>
             <div className="text-xs">
                <p className="font-bold">Alex Rivera</p>
                <p className="opacity-50 underline cursor-pointer">Logout</p>
             </div>
          </div>
        </aside>

        {/* Main Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input className="pl-10 pr-4 py-2.5 bg-slate-100 rounded-xl outline-none text-sm w-72 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition" placeholder="Search account details..." />
            </div>
            <div className="flex items-center gap-6">
              <Bell className="text-slate-400 hover:text-indigo-600 cursor-pointer transition" size={22} />
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-200">AR</div>
            </div>
          </header>

          <div className="p-8 overflow-y-auto bg-slate-50">
            <Routes>
              <Route path="/" element={<DashboardPage balance={balance} transactions={transactions} />} />
              <Route path="/transfers" element={<TransfersPage />} />
              <Route path="/history" element={<HistoryPage transactions={transactions} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

// Sidebar Link Helper (to handle active states)
function SidebarLink({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-300 font-bold text-sm ${
      isActive ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-900/40 translate-x-1' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}>
      {icon} {label}
    </Link >