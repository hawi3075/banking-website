import React, { useState } from 'react';

export default function Transfers({ balance, onTransfer }) {
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (val > balance) { setError("Insufficient Funds."); return; }
    if (val <= 0) { setError("Invalid Amount."); return; }
    onTransfer(val, account);
    setAmount(''); setAccount('');
    setError('');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
      <h2 className="text-3xl font-black text-slate-900 mb-8 text-center">Transfer Funds</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {error && <div className="p-4 bg-red-100 text-red-700 rounded-xl text-sm font-black border-2 border-red-200">{error}</div>}
        <div className="space-y-3">
          <label className="text-sm font-black text-slate-900 uppercase tracking-wider ml-1">Recipient Account Number</label>
          <input 
            type="text" value={account} onChange={(e) => setAccount(e.target.value)}
            className="w-full p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-900" 
            placeholder="Enter 12-digit number" required
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-black text-slate-900 uppercase tracking-wider ml-1">Amount ($)</label>
          <input 
            type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full p-5 bg-slate-100 border-2 border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:bg-white text-3xl font-black text-indigo-700 transition-all" 
            placeholder="0.00" required
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-xl transition-all active:scale-95">
          Send Funds Instantly
        </button>
      </form>
    </div>
  );
}