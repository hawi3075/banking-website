import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, LayoutDashboard, Send, History, LogOut } from 'lucide-react';

export default function Sidebar({ onLogout }) {
  return (
    <aside className="w-80 bg-slate-900 text-white p-10 hidden lg:flex flex-col border-r-4 border-indigo-600/20">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 text-3xl font-black text-white mb-16 uppercase tracking-tighter">
        <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
          <Wallet size={30} />
        </div>
        Nexus
      </div>

      {/* Navigation Links */}
      <nav className="space-y-4 flex-1">
        <SidebarLink to="/" icon={<LayoutDashboard size={24}/>} label="Dashboard" />
        <SidebarLink to="/transfers" icon={<Send size={24}/>} label="Send Money" />
        <SidebarLink to="/history" icon={<History size={24}/>} label="History" />
      </nav>

      {/* Bottom Section: User & Logout */}
      <div className="pt-6 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-3 px-2 py-4 bg-slate-800/50 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white">
            AR
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-black truncate">Alex Rivera</p>
            <p className="text-[10px] text-indigo-400 font-black uppercase">Verified User</p>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl transition-all font-black text-sm border-2 border-transparent text-red-400 hover:bg-red-500/10 hover:border-red-500/20 group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          Sign Out Securely
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-4 p-5 rounded-2xl transition-all font-black text-sm border-2 ${
        isActive 
          ? 'bg-indigo-600 text-white border-indigo-500 shadow-xl translate-x-2' 
          : 'text-slate-300 border-transparent hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon} {label}
    </Link>
  );
}