import React from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

export default function Dashboard({ balance, transactions }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-indigo-700 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-indigo-100 font-bold mb-2 uppercase tracking-widest text-xs">Total Available Balance</p>
          <h2 className="text-5xl font-black mb-10 tracking-tight">${balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</h2>
          <Link to="/transfers" className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-2xl font-black hover:bg-indigo-50 transition-all shadow-xl hover:scale-105 active:scale-95">
            <Send size={20} /> Send Money Now
          </Link>
        </div>
        <div className="absolute top-[-10%] right-[-5%] w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b-2 border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-black text-xl text-slate-900">Recent Activity</h3>
          <Link to="/history" className="text-indigo-700 font-black text-sm hover:underline underline-offset-4">View All History</Link>
        </div>
        <div className="divide-y-2 divide-slate-50">
          {transactions.slice(0, 4).map(t => (
            <div key={t.id} className="p-6 flex items-center justify-between hover:bg-indigo-50/30 transition-colors">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center border-2 border-slate-200">{t.icon}</div>
                <div>
                  <p className="font-black text-slate-900 text-lg">{t.name}</p>
                  <p className="text-sm text-slate-700 font-bold">{t.date}</p>
                </div>
              </div>
              <span className={`font-black text-xl ${t.amount > 0 ? 'text-green-700' : 'text-slate-900'}`}>
                {t.amount > 0 ? `+$${t.amount.toFixed(2)}` : `-$${Math.abs(t.amount).toFixed(2)}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}