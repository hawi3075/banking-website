import React, { useState } from 'react';
import { 
  Wallet, Send, LayoutDashboard, History, 
  Settings, Bell, ArrowUpRight, ArrowDownLeft, Search 
} from 'lucide-react';

export default function App() {
  const [balance] = useState(42850.12);
  
  const transactions = [
    { id: 1, name: 'Apple Store', date: 'Jan 02', amount: -999.00, icon: <ArrowDownLeft className="text-red-500" /> },
    { id: 2, name: 'Monthly Salary', date: 'Jan 01', amount: 4500.00, icon: <ArrowUpRight className="text-green-500" /> },
    { id: 3, name: 'Amazon', date: 'Dec 30', amount: -150.25, icon: <ArrowDownLeft className="text-red-500" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <div className="flex items-center gap-2 text-2xl font-bold text-indigo-400 mb-10">
          <Wallet size={28} /> NexusBank
        </div>
        <nav className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-indigo-600 rounded-xl cursor-pointer"><LayoutDashboard size={20}/> Dashboard</div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-xl cursor-pointer"><Send size={20}/> Transfers</div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-xl cursor-pointer"><History size={20}/> History</div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b flex items-center justify-between px-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input className="pl-10 pr-4 py-2 bg-slate-100 rounded-lg outline-none text-sm w-64" placeholder="Search..." />
          </div>
          <div className="flex items-center gap-4">
            <Bell className="text-slate-400" />
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">AR</div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Balance Card */}
            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
              <p className="opacity-80 mb-1 text-sm">Total Balance</p>
              <h2 className="text-4xl font-bold mb-6">${balance.toLocaleString()}</h2>
              <div className="flex gap-3">
                <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold text-sm">Send Money</button>
                <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-bold text-sm">Add Funds</button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-2xl border shadow-sm">
              <div className="p-6 border-b font-bold text-lg text-slate-800">Recent Activity</div>
              {transactions.map(t => (
                <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50 border-b last:border-0">
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
        </div>
      </main>
    </div>
  );
}