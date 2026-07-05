import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Award, FileText, CheckCircle, Mail, User, ShieldCheck, Loader2 } from 'lucide-react';

export const TeamRegistration = ({ isOpen, onClose, tournament, apiBaseUrl, onRegistrationSuccess }) => {
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [captainEmail, setCaptainEmail] = useState('');
  const [roster, setRoster] = useState([{ name: '', gameId: '' }]);
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [eligibilityFile, setEligibilityFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen || !tournament) return null;

  const handleAddMember = () => {
    if (roster.length >= 6) return;
    setRoster([...roster, { name: '', gameId: '' }]);
  };

  const handleRemoveMember = (index) => {
    const updated = roster.filter((_, i) => i !== index);
    setRoster(updated);
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...roster];
    updated[index][field] = value;
    setRoster(updated);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEligibilityFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Field validations
    if (!teamName || !captainName || !captainEmail) {
      setError('Please fill in team and captain coordinates.');
      return;
    }

    const invalidMember = roster.some(m => !m.name || !m.gameId);
    if (invalidMember) {
      setError('Please fill in all player names and game IDs.');
      return;
    }

    if (!rulesAccepted) {
      setError('You must accept the guidelines and anti-cheat policies.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      teamName,
      captainName,
      captainEmail,
      roster,
      eligibilityDocUrl: eligibilityFile ? `docs/${eligibilityFile.name}` : 'mock-badge-url.png',
      rulesAccepted
    };

    try {
      const res = await fetch(`${apiBaseUrl}/api/tournaments/${tournament._id}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok) {
        setSuccessData(data);
        onRegistrationSuccess(data.tournament);
      } else {
        setError(data.message || 'Roster injection rejected by registration pipelines.');
      }
    } catch (err) {
      console.error(err);
      setError('Network failure connecting to tournament registration servers.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gaming-dark/85 backdrop-blur-md z-[99999] p-4 overflow-y-auto">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="glass-panel w-full max-w-2xl p-6 md:p-8 rounded-2xl border border-white/5 relative overflow-hidden my-8"
        >
          {/* Close button */}
          {!successData && (
            <button 
              onClick={onClose}
              disabled={isSubmitting}
              className="absolute right-4 top-4 text-gaming-muted hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors interactive-target"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {successData ? (
            /* ==========================================
                SUCCESS STATE PACKET RENDER
               ========================================== */
            <div className="text-center py-8 space-y-6">
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="bg-gaming-green/20 border border-gaming-green/40 p-4 rounded-full text-gaming-green shadow-neon-green w-max mx-auto"
              >
                <CheckCircle className="w-12 h-12" />
              </motion.div>

              <div>
                <h3 className="text-xl font-bold font-display uppercase tracking-wider text-white">
                  Roster Enrolled Successfully
                </h3>
                <p className="text-xs text-gaming-muted mt-1">
                  Your competitive ID is registered in the tournament database.
                </p>
              </div>

              {/* Registration Token Box */}
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl max-w-md mx-auto">
                <span className="text-[10px] uppercase font-bold text-gaming-muted block">Unique Roster Token</span>
                <span className="text-base font-bold font-display text-gaming-cyan tracking-wider select-text mt-0.5 block">
                  {successData.registrationToken}
                </span>
              </div>

              {/* Private Lobby Pass Details */}
              <div className="bg-gaming-purple/10 border border-gaming-purple/20 p-4 rounded-xl text-left max-w-md mx-auto">
                <span className="text-[10px] uppercase font-bold text-gaming-purple block font-display">Lobby / Venue Pass</span>
                {successData.venuePass?.type === 'online' ? (
                  <div className="mt-2 text-xs space-y-1">
                    <p className="text-white">Lobby Code: <span className="font-bold text-gaming-cyan">{successData.venuePass.code}</span></p>
                    <p className="text-gaming-muted">Server Region: <span className="font-semibold text-white">{successData.venuePass.region}</span></p>
                  </div>
                ) : (
                  <div className="mt-2 text-xs space-y-1">
                    <p className="text-white">Physical Stadium address: <span className="font-bold text-gaming-cyan">{successData.venuePass.address}</span></p>
                    <p className="text-gaming-muted">Hall Room No: <span className="font-semibold text-white">{successData.venuePass.room}</span></p>
                  </div>
                )}
              </div>

              <button
                onClick={onClose}
                className="bg-gaming-green hover:bg-gaming-green/80 text-gaming-dark font-bold font-display uppercase tracking-wider text-xs py-3 px-8 rounded-xl transition-all duration-300 shadow-neon-green interactive-target"
              >
                Close Gateway
              </button>
            </div>
          ) : (
            /* ==========================================
                ROSTER CAPTURE FORM RENDER
               ========================================== */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-white uppercase tracking-wider">
                  Competition Registration
                </h3>
                <p className="text-xs text-gaming-muted mt-1">
                  Enrolling in: <span className="text-gaming-cyan font-bold">{tournament.title}</span>
                </p>
              </div>

              {error && (
                <div className="bg-red-950/20 border border-red-500/30 p-3 rounded-lg text-xs text-red-400 font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Roster metadata settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-white/5 pb-6">
                <div>
                  <label className="text-[10px] uppercase font-bold text-gaming-muted block mb-1">Clan Team Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Predators"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full bg-gaming-slate border border-white/10 rounded-lg py-2 px-3 text-xs focus:border-gaming-cyan outline-none text-white font-sans"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gaming-muted block mb-1">Captain Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mitchell Jacobs"
                      value={captainName}
                      onChange={(e) => setCaptainName(e.target.value)}
                      className="w-full bg-gaming-slate border border-white/10 rounded-lg py-2 pl-8 pr-3 text-xs focus:border-gaming-cyan outline-none text-white font-sans"
                    />
                    <User className="w-3.5 h-3.5 text-gaming-muted absolute left-2.5 top-2.5" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gaming-muted block mb-1">Captain Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="email@novahub.com"
                      value={captainEmail}
                      onChange={(e) => setCaptainEmail(e.target.value)}
                      className="w-full bg-gaming-slate border border-white/10 rounded-lg py-2 pl-8 pr-3 text-xs focus:border-gaming-cyan outline-none text-white font-sans"
                    />
                    <Mail className="w-3.5 h-3.5 text-gaming-muted absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Active Player Roster Lists */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs uppercase font-bold text-gaming-cyan tracking-wider font-display flex items-center gap-1.5">
                    <Award className="w-4 h-4" /> Squad Roster List ({roster.length}/6)
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddMember}
                    disabled={roster.length >= 6}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded text-[10px] uppercase font-bold text-white transition-colors disabled:opacity-50 interactive-target"
                  >
                    + Add Player
                  </button>
                </div>

                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 border border-white/5 rounded-xl p-3 bg-gaming-card/20">
                  {roster.map((member, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-white/[0.01] border border-white/5 p-2 rounded-lg">
                      <div className="md:col-span-1 text-center font-display font-bold text-xs text-gaming-muted">
                        P{idx + 1}
                      </div>
                      <div className="md:col-span-5">
                        <input
                          type="text"
                          required
                          placeholder="Player Roster Name"
                          value={member.name}
                          onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                          className="w-full bg-gaming-slate border border-white/10 rounded py-1.5 px-2 text-xs focus:border-gaming-cyan outline-none text-white font-sans"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <input
                          type="text"
                          required
                          placeholder="Game Handle / ID string"
                          value={member.gameId}
                          onChange={(e) => handleMemberChange(idx, 'gameId', e.target.value)}
                          className="w-full bg-gaming-slate border border-white/10 rounded py-1.5 px-2 text-xs focus:border-gaming-cyan outline-none text-white font-sans"
                        />
                      </div>
                      <div className="md:col-span-1 text-center">
                        {roster.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(idx)}
                            className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-white/5 transition-colors interactive-target"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload Verification Document / Age Screen */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="text-[10px] uppercase font-bold text-gaming-muted block mb-1.5">
                    Proof of Eligibility Upload (IDs/Screen)
                  </label>
                  <div className="relative border border-dashed border-white/10 hover:border-gaming-cyan/40 bg-white/[0.01] hover:bg-white/[0.02] p-4 rounded-xl text-center cursor-pointer transition-all duration-300">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full"
                    />
                    <FileText className="w-5 h-5 mx-auto text-gaming-muted mb-1.5" />
                    <span className="text-[10px] text-gaming-muted block">
                      {eligibilityFile ? eligibilityFile.name : 'Choose verifying screenshot file (.jpg, .png)'}
                    </span>
                  </div>
                </div>

                {/* Anti-cheat guidelines */}
                <div className="flex flex-col justify-end">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rulesAccepted}
                      onChange={(e) => setRulesAccepted(e.target.checked)}
                      className="mt-1 accent-gaming-purple interactive-target"
                    />
                    <div className="text-[10px] leading-relaxed text-gaming-muted">
                      <span className="text-white font-bold block mb-0.5 uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-gaming-cyan" /> Roster Rules Validation
                      </span>
                      I agree to the tournament anti-cheat policies, age brackets, and roster rules as published by the host.
                    </div>
                  </label>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 border-t border-white/5 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg py-2.5 px-4 text-xs font-bold font-display uppercase transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gaming-cyan hover:bg-gaming-cyan/85 border border-gaming-cyan/30 text-gaming-dark rounded-lg py-2.5 px-4 text-xs font-bold font-display uppercase transition-colors flex items-center justify-center gap-1.5 shadow-neon-cyan interactive-target"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Enrolling...
                    </>
                  ) : (
                    'Submit Roster Registration'
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default TeamRegistration;
