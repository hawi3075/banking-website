import React from 'react';

export default function History({ transactions }) {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-500">
      <div className="p-8 bg-slate-900 text-white">
        <h2 className="font-black text-2xl">Full Transaction History</h2>
      </div>
      <div className="divide-y-2 divide-slate-100">
        {transactions.map(t => (
          <div key={t.id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-6">
              <div className="p-3 bg-slate-100 rounded-xl border border-slate-200">{t.icon}</div>
              <div>
                <p className="font-black text-slate-900 text-xl">{t.name}</p>
                <p className="text-slate-700 font-bold">Ref: #TXN-{t.id.toString().slice(-6)} • {t.date}</p>
              </div>
            </div>
            <p className={`font-black text-2xl ${t.amount > 0 ? 'text-green-700' : 'text-slate-900'}`}>
              {t.amount > 0 ? `+$${t.amount.toFixed(2)}` : `-$${Math.abs(t.amount).toFixed(2)}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}