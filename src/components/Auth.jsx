import React, { useState } from 'react';
import { Wallet, Lock, Mail, User } from 'lucide-react';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would verify credentials here
    onLogin(); 
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-2 border-slate-200">
        <div className="bg-slate-900 p-10 text-center text-white">
          <div className="inline-flex p-3 bg-indigo-600 rounded-2xl mb-4 shadow-lg shadow-indigo-500/40">
            <Wallet size={32} />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Nexus Bank</h2>
          <p className="text-slate-400 font-bold text-sm mt-2">
            {isLogin ? "Welcome back, please login" : "Create your secure account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-900 uppercase ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-indigo-600 font-bold" required />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-900 uppercase ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="email" placeholder="alex@nexus.com" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-indigo-600 font-bold" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-900 uppercase ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-indigo-600 font-bold" required />
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl transition-all active:scale-95">
            {isLogin ? "Sign In" : "Create Account"}
          </button>

          <p className="text-center text-slate-600 font-bold text-sm">
            {isLogin ? "New to Nexus?" : "Already have an account?"} 
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-indigo-600 hover:underline"
            >
              {isLogin ? "Join now" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}