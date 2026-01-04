import { Link, useLocation } from 'react-router-dom';
import { Wallet, LayoutDashboard, Send, History } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-80 bg-slate-900 text-white p-10 hidden lg:flex flex-col border-r-4 border-indigo-600/20">
      <div className="flex items-center gap-3 text-3xl font-black text-white mb-16 uppercase tracking-tighter">
        <div className="p-2 bg-indigo-600 rounded-xl"><Wallet size={30} /></div>
        Nexus
      </div>
      <nav className="space-y-4 flex-1">
        <SidebarLink to="/" icon={<LayoutDashboard size={24}/>} label="Dashboard" />
        <SidebarLink to="/transfers" icon={<Send size={24}/>} label="Send Money" />
        <SidebarLink to="/history" icon={<History size={24}/>} label="History" />
      </nav>
    </aside>
  );
}

function SidebarLink({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`flex items-center gap-4 p-5 rounded-2xl transition-all font-black text-sm border-2 ${
      isActive ? 'bg-indigo-600 text-white border-indigo-500 shadow-xl translate-x-2' : 'text-slate-300 border-transparent hover:bg-slate-800 hover:text-white'
    }`}>
      {icon} {label}
    </Link>
  );
}