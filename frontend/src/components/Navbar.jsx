import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Navbar = ({ user, handleLogout, handleRoleToggle, setIsAuthOpen }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#c4e4e3] border-b-[3px] border-[#1a1a1a] py-4 px-6 md:px-12 flex justify-between items-center shadow-sm">
      <Link to="/" className="flex items-center gap-2 group interactive-target">
        <div className="border-[3px] border-[#1a1a1a] bg-yellow-200 px-3 py-1 font-bold text-base uppercase tracking-tighter hover:bg-[#1a1a1a] hover:text-white transition-colors duration-150 shadow-[2px_2px_0px_rgba(26,26,26,1)]">
          NH
        </div>
        <span className="text-sm font-bold tracking-widest uppercase text-[#1a1a1a]">
          NOVA // <span className="underline decoration-yellow-400 decoration-[3px]">HUB</span>
        </span>
      </Link>

      <nav className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider hidden md:flex text-[#1a1a1a]">
        <Link to="/" className="hover:underline decoration-yellow-400 decoration-2 interactive-target">
          Home
        </Link>
        
        <Link to="/dashboard?tab=host" className="hover:underline decoration-yellow-400 decoration-2 interactive-target">
          Host Event
        </Link>

        <Link to="/dashboard?tab=join" className="hover:underline decoration-yellow-400 decoration-2 interactive-target">
          Join Tournament
        </Link>

        {user && (
          <Link to="/" className="hover:underline decoration-yellow-400 decoration-2 interactive-target">
            Dashboard
          </Link>
        )}

        {user ? (
          <div className="flex items-center gap-3 bg-white border-[3px] border-[#1a1a1a] px-3.5 py-1 shadow-[3px_3px_0px_rgba(26,26,26,1)]">
            <span className="text-[10px] font-bold text-gaming-dark">
              {user.username} ({user.role})
            </span>
            <button
              onClick={handleRoleToggle}
              className="bg-yellow-100 hover:bg-yellow-200 border-l border-r border-[#1a1a1a] px-2 py-0.5 text-[9px] uppercase font-bold text-[#1a1a1a] interactive-target"
              title="Toggle host/player mode"
            >
              Swap
            </button>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 font-bold transition-colors interactive-target"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAuthOpen(true)}
            className="bg-yellow-200 hover:bg-yellow-300 border-[3px] border-[#1a1a1a] text-[#1a1a1a] px-4 py-1.5 shadow-[4px_4px_0px_rgba(26,26,26,1)] active:shadow-[1px_1px_0px_rgba(26,26,26,1)] active:translate-x-[3px] active:translate-y-[3px] transition-all interactive-target"
          >
            Sign In
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
