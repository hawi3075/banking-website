import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-24 bg-white border-b-4 border-slate-100 flex items-center justify-between px-10 shadow-sm z-20">
      <h1 className="text-slate-900 font-black text-2xl">Banking Control Center</h1>
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition" size={20} />
          <input 
            className="pl-12 pr-6 py-3 bg-slate-100 rounded-2xl outline-none text-sm w-64 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all border-2 border-transparent focus:border-indigo-100 font-bold" 
            placeholder="Search transactions..." 
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-slate-900 font-black leading-none">Alex Rivera</p>
            <p className="text-indigo-600 font-black text-[10px] uppercase tracking-widest mt-1">Active Session</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center font-black text-white shadow-xl hover:scale-105 transition-transform cursor-pointer">AR</div>
        </div>
      </div>
    </header>
  );
}