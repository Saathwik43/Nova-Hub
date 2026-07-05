import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, KeyRound, Mail, User, Shield, AlertTriangle } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, apiBaseUrl, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('participant');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin 
      ? { email, password }
      : { username, email, password, role };

    try {
      const res = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok) {
        onAuthSuccess(data.user);
        onClose();
      } else {
        setError(data.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection failure. Check if backend API server is online.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#c4e4e3]/80 backdrop-blur-md z-[99999] p-4 font-mono select-none">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white border-[3px] border-[#1a1a1a] w-full max-w-md p-8 md:p-10 rounded-2xl shadow-[8px_8px_0px_rgba(26,26,26,1)] relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b-[3px] border-[#1a1a1a] pb-4">
            <h3 className="text-2xl font-black font-display uppercase tracking-tight text-[#1a1a1a]">
              {isLogin ? 'Access Identity' : 'Register Profile'}
            </h3>
            <button 
              onClick={onClose}
              disabled={loading}
              className="text-[#1a1a1a] bg-yellow-200 border-2 border-[#1a1a1a] p-1 shadow-[2px_2px_0px_rgba(26,26,26,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[0px_0px_0px_rgba(26,26,26,1)] transition-all interactive-target"
            >
              <X className="w-5 h-5 stroke-[3]" />
            </button>
          </div>

          {/* Toggle Tab */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`py-3 rounded-xl border-[3px] border-[#1a1a1a] text-xs font-bold uppercase tracking-wider transition-all interactive-target ${
                isLogin ? 'bg-[#1a1a1a] text-white shadow-[4px_4px_0px_#fef08a] translate-x-[-2px] translate-y-[-2px]' : 'bg-white text-[#1a1a1a] shadow-[2px_2px_0px_rgba(26,26,26,1)] hover:bg-yellow-100'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`py-3 rounded-xl border-[3px] border-[#1a1a1a] text-xs font-bold uppercase tracking-wider transition-all interactive-target ${
                !isLogin ? 'bg-[#1a1a1a] text-white shadow-[4px_4px_0px_#fef08a] translate-x-[-2px] translate-y-[-2px]' : 'bg-white text-[#1a1a1a] shadow-[2px_2px_0px_rgba(26,26,26,1)] hover:bg-yellow-100'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="bg-red-200 border-[3px] border-[#1a1a1a] p-3 shadow-[3px_3px_0px_rgba(26,26,26,1)] text-xs text-red-900 font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username for registration */}
            {!isLogin && (
              <div>
                <label className="text-[10px] uppercase font-bold text-[#1a1a1a]/70 block mb-2">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. ApexCaptain"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white border-[3px] border-[#1a1a1a] py-3 px-3 pl-10 text-sm font-bold text-[#1a1a1a] focus:bg-yellow-50 outline-none interactive-target"
                  />
                  <User className="w-4 h-4 text-[#1a1a1a] absolute left-3.5 top-3.5 stroke-[2.5]" />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-[10px] uppercase font-bold text-[#1a1a1a]/70 block mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@novahub.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border-[3px] border-[#1a1a1a] py-3 px-3 pl-10 text-sm font-bold text-[#1a1a1a] focus:bg-yellow-50 outline-none interactive-target"
                />
                <Mail className="w-4 h-4 text-[#1a1a1a] absolute left-3.5 top-3.5 stroke-[2.5]" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] uppercase font-bold text-[#1a1a1a]/70 block mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border-[3px] border-[#1a1a1a] py-3 px-3 pl-10 text-sm font-bold text-[#1a1a1a] focus:bg-yellow-50 outline-none font-sans tracking-widest interactive-target"
                />
                <KeyRound className="w-4 h-4 text-[#1a1a1a] absolute left-3.5 top-3.5 stroke-[2.5]" />
              </div>
            </div>

            {/* Access Role (Register only) */}
            {!isLogin && (
              <div>
                <label className="text-[10px] uppercase font-bold text-[#1a1a1a]/70 block mb-2">Select Role</label>
                <div className="relative flex">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-white border-[3px] border-[#1a1a1a] py-3 px-3 pl-10 text-sm font-bold text-[#1a1a1a] focus:bg-yellow-50 outline-none interactive-target appearance-none"
                  >
                    <option value="participant">Participant (Roster Gamer)</option>
                    <option value="host">Tournament Organizer (Host)</option>
                  </select>
                  <Shield className="w-4 h-4 text-[#1a1a1a] absolute left-3.5 top-3.5 stroke-[2.5]" />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-yellow-200 hover:bg-yellow-300 border-[3px] border-[#1a1a1a] text-[#1a1a1a] font-black uppercase tracking-wider text-sm py-4 rounded-xl transition-all shadow-[6px_6px_0px_rgba(26,26,26,1)] hover:shadow-[2px_2px_0px_rgba(26,26,26,1)] hover:translate-x-1 hover:translate-y-1 flex items-center justify-center interactive-target"
            >
              {loading ? 'Processing...' : isLogin ? 'Access Portal' : 'Register Identity'}
            </button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default AuthModal;
