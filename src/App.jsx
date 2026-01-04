import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Wallet, Send, LayoutDashboard, History, 
  Settings, Bell, ArrowUpRight, ArrowDownLeft, Search, CheckCircle2, X 
} from 'lucide-react';

// --- SUCCESS MODAL ---
const SuccessModal = ({ isOpen, onClose, amount }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Transfer Sent!</h3>
        <p className="text-slate-500 mb-6">You have successfully sent <span className="font-bold text-slate-900">${amount}</span> to your recipient.</p>
        <button onClick={onClose} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition">Great, thanks!</button>
      </div>
    </div>
  );
};

// --- DASHBOARD PAGE ---
const DashboardPage = ({ balance, transactions }) => (
  <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] p-10 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-indigo-100 font-medium mb-2 opacity-90">Available Balance</p>
          <h2 className="text-5xl font-bold mb-10 tracking-tight">${balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</h2>
          <div className="flex gap-4">
            <Link to="/transfers" className="bg-white text-indigo-600 px-8 py-3.5 rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2">
              <Send size={18} /> Send Money
            </Link>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
         <div className="flex justify-between items-start">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Wallet size={24}/></div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">+12.5%</span>
         </div>
         <div>
            <p className="text-slate-500 text-sm font-medium">Monthly Savings</p>
            <p className="text-2xl font-bold text-slate-900">$3,250.00</p>
         </div>
      </div>
    </div>

    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center">
        <h3 className="font-bold text-xl text-slate-800">Recent Transactions</h3>
        <Link to="/history" className="text-indigo-600 font-bold text-sm hover:underline">See all activity</Link>
      </div>
      <div className="divide-y divide-slate-50">
        {transactions.slice(0, 5).map(t => (
          <div key={t.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition cursor-pointer">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">{t.icon}</div>
              <div>
                <p className="font-bold text-slate-900">{t.name}</p>
                <p className="text-sm text-slate-500 font-medium">{t.date}</p>
              </div>
            </div>
            <span className={`font-bold text-lg ${t.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
              {t.amount > 0 ? `+$${t.amount.toFixed(2)}` : `-$${Math.abs(t.amount).toFixed(2)}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- TRANSFERS PAGE ---
const TransfersPage = ({ balance, onTransfer }) => {
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (val > balance) {
      setError("Insufficient funds in your account.");
      return;
    }
    if (val <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setError('');
    onTransfer(val, account);
    setAmount('');
    setAccount('');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 animate-in slide-in-from-bottom-8 duration-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Send Money</h2>
        <p className="text-slate-500">Funds will be delivered instantly</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2 animate-bounce"><X size={16}/> {error}</div>}
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Recipient Account Number</label>
          <input 
            type="text" value={account} onChange={(e) => setAccount(e.target.value)}
            placeholder="0000 0000 0000" 
            className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono text-lg" 
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Amount to Transfer</label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">$</span>
            <input 
              type="number" value={amount} onChange={(e) => {setAmount(e.target.value); setError('');}}
              placeholder="0.00" 
              className="w-full pl-10 pr-5 py-5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-3xl font-bold text-indigo-600" 
              required
            />
          </div>
          <p className="text-xs text-slate-400 ml-1 font-medium">Daily limit: $10,000.00</p>
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
          Confirm & Send
        </button>
      </form>
    </div>
  );
};

// --- HISTORY PAGE ---
const HistoryPage = ({ transactions }) => (
  <div className="max-w-5xl mx-auto bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
    <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
      <h2 className="font-bold text-2xl text-slate-800">Transaction History</h2>
      <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition">
        <History size={16}/> Download PDF
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-400 text-xs uppercase tracking-widest font-bold">
            <th className="px-8 py-5">Recipient/Sender</th>
            <th className="px-8 py-5">Category</th>
            <th className="px-8 py-5">Date</th>
            <th className="px-8 py-5 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {transactions.map(t => (
            <tr key={t.id} className="hover:bg-slate-50/50 transition">
              <td className="px-8 py-6 font-bold text-slate-900">{t.name}</td>
              <td className="px-8 py-6 text-slate-500 text-sm font-medium">Banking Transfer</td>
              <td className="px-8 py-6 text-slate-500 text-sm">{t.date}</td>
              <td className={`px-8 py-6 text-right font-bold text-lg ${t.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                {t.amount > 0 ? `+$${t.amount.toFixed(2)}` : `-$${Math.abs(t.amount).toFixed(2)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- MAIN APP ---
export default function App() {
  const [balance, setBalance] = useState(42850.12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastAmount, setLastAmount] = useState(0);
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'Apple Store', date: 'Jan 02, 2026', amount: -999.00, icon: <ArrowDownLeft className="text-red-500" /> },
    { id: 2, name: 'Monthly Salary', date: 'Jan 01, 2026', amount: 4500.00, icon: <ArrowUpRight className="text-green-500" /> },
    { id: 3, name: 'Netflix Subscription', date: 'Dec 28, 2025', amount: -15.99, icon: <ArrowDownLeft className="text-red-500" /> },
  ]);

  const handleTransfer = (amount, accountName) => {
    setBalance(prev => prev - amount);
    setLastAmount(amount);
    setIsModalOpen(true);
    const newTx = {
      id: Date.now(),
      name: `Transfer to ${accountName || 'Acct #'+accountName.slice(-4)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: -amount,
      icon: <ArrowDownLeft className="text-red-500" />
    };
    setTransactions([newTx, ...transactions]);
  };

  return (
    <Router>
      <div className="flex h-screen bg-[#F8FAFC]">
        <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} amount={lastAmount} />
        
        {/* Sidebar */}
        <aside className="w-72 bg-slate-900 text-white p-8 hidden lg:flex flex-col shadow-2xl">
          <div className="flex items-center gap-3 text-2xl font-black tracking-tighter text-indigo-400 mb-12 px-2">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/30"><Wallet size={24} /></div>
            NexusBank
          </div>
          <nav className="space-y-3 flex-1">
            <SidebarLink to="/" icon={<LayoutDashboard size={22}/>} label="Overview" />
            <SidebarLink to="/transfers" icon={<Send size={22}/>} label="Transfers" />
            <SidebarLink to="/history" icon={<History size={22}/>} label="History" />
            <SidebarLink to="/settings" icon={<Settings size={22}/>} label="Settings" />
          </nav>
          <div className="p-6 bg-slate-800/50 rounded-3xl border border-white/5">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center font-bold text-lg shadow-inner">AR</div>
                <div>
                   <p className="font-bold text-sm">Alex Rivera</p>
                   <p className="text-[10px] text-indigo-400 uppercase font-black tracking-widest">Premium Plan</p>
                </div>
             </div>
             <button className="w-full py-2.5 bg-red-500/10 text-red-400 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all">Log Out</button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 z-20">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition" size={20} />
              <input className="pl-12 pr-6 py-3 bg-slate-100 rounded-2xl outline-none text-sm w-80 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all border border-transparent focus:border-indigo-100" placeholder="Search transactions, bills..." />
            </div>
            <div className="flex items-center gap-6">
              <div className="relative cursor-pointer hover:scale-110 transition active:scale-95">
                <Bell className="text-slate-400" size={24} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] text-white flex items-center justify-center font-bold rounded-full border-2 border-white">3</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-xl shadow-indigo-200">AR</div>
            </div>
          </header>

          <div className="p-10 overflow-y-auto">
            <Routes>
              <Route path="/" element={<DashboardPage balance={balance} transactions={transactions} />} />
              <Route path="/transfers" element={<TransfersPage balance={balance} onTransfer={handleTransfer} />} />
              <Route path="/history" element={<HistoryPage transactions={transactions} />} />
              <Route path="/settings" element={<div className="text-center py-20 text-slate-400 font-medium">Settings module coming soon...</div>} />
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
    <Link to={to} className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 font-bold text-sm ${
      isActive ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-900/40 translate-x-2' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}>
      {icon} {label}
    </Link>
  );
}