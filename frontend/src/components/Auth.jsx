import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, Mail, User, Shield, Users, ArrowRight } from 'lucide-react';

export const Auth = ({ apiBaseUrl, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('participant');
  const [activeTeam, setActiveTeam] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin 
      ? { email, password }
      : { username, email, password, role, activeTeam };

    try {
      const res = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok) {
        onAuthSuccess(data.user);
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error(err);
      setError('Connection failure. Check backend server logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 relative z-10 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden shadow-glass"
      >
        {/* Tab triggers */}
        <div className="grid grid-cols-2 gap-2 bg-gaming-card p-1 rounded-xl border border-white/5 mb-6">
          <button
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`py-2 rounded-lg text-xs font-bold font-display uppercase tracking-wider transition-all interactive-target ${
              isLogin ? 'bg-gaming-purple text-white' : 'text-gaming-muted hover:text-white'
            }`}
          >
            Login Access
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`py-2 rounded-lg text-xs font-bold font-display uppercase tracking-wider transition-all interactive-target ${
              !isLogin ? 'bg-gaming-purple text-white' : 'text-gaming-muted hover:text-white'
            }`}
          >
            Registration
          </button>
        </div>

        <h2 className="text-xl font-bold font-display uppercase tracking-wider text-white text-center mb-6">
          {isLogin ? 'Welcome Back Officer' : 'Create Gamer Identity'}
        </h2>

        {error && (
          <div className="bg-red-950/30 border border-red-500/30 px-4 py-2.5 rounded-lg text-xs text-red-400 mb-4 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username (Register only) */}
          {!isLogin && (
            <div>
              <label className="text-[10px] uppercase font-bold text-gaming-muted block mb-1">Username</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. VipersMitchel"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gaming-slate border border-white/10 rounded-lg py-2.5 px-3 pl-9 text-sm focus:border-gaming-cyan outline-none text-white font-sans"
                />
                <User className="w-4 h-4 text-gaming-muted absolute left-3 top-3.5" />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-[10px] uppercase font-bold text-gaming-muted block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="officer@novahub.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gaming-slate border border-white/10 rounded-lg py-2.5 px-3 pl-9 text-sm focus:border-gaming-cyan outline-none text-white font-sans"
              />
              <Mail className="w-4 h-4 text-gaming-muted absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-[10px] uppercase font-bold text-gaming-muted block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gaming-slate border border-white/10 rounded-lg py-2.5 px-3 pl-9 text-sm focus:border-gaming-cyan outline-none text-white font-sans font-display"
              />
              <KeyRound className="w-4 h-4 text-gaming-muted absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Role selector & Clan Team (Register only) */}
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-gaming-muted block mb-1">Access Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-gaming-slate border border-white/10 rounded-lg py-2.5 px-3 text-sm focus:border-gaming-cyan outline-none text-white"
                  >
                    <option value="participant">Participant</option>
                    <option value="host">Tournament Host</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gaming-muted block mb-1">Clan Team Tag</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Apex Predators"
                      value={activeTeam}
                      onChange={(e) => setActiveTeam(e.target.value)}
                      className="w-full bg-gaming-slate border border-white/10 rounded-lg py-2.5 px-3 pl-8 text-sm focus:border-gaming-cyan outline-none text-white font-sans"
                    />
                    <Users className="w-4 h-4 text-gaming-muted absolute left-2.5 top-3.5" />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Submit Trigger */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gaming-purple hover:bg-gaming-purple/80 text-white font-bold font-display uppercase tracking-wider text-xs py-3.5 rounded-xl transition-all duration-300 shadow-neon-purple flex items-center justify-center gap-2 interactive-target"
          >
            {loading ? 'Processing authorization...' : isLogin ? 'Access Dashboard' : 'Register gamer token'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
export default Auth;
