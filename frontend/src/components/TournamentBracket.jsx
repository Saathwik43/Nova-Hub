import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Award, Edit2, Play, CheckCircle } from 'lucide-react';

export const TournamentBracket = ({ matches = [], onUpdateMatch, isHost = false }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [t1Kills, setT1Kills] = useState(0);
  const [t2Kills, setT2Kills] = useState(0);
  const [t1Place, setT1Place] = useState(0);
  const [t2Place, setT2Place] = useState(0);
  const [status, setStatus] = useState('scheduled');
  const [winnerId, setWinnerId] = useState('');

  // Group matches by round
  const rounds = {};
  matches.forEach(m => {
    if (!rounds[m.roundNumber]) rounds[m.roundNumber] = [];
    rounds[m.roundNumber].push(m);
  });

  const roundList = Object.keys(rounds).sort((a, b) => parseInt(a) - parseInt(b));

  const handleOpenModal = (match) => {
    if (!isHost) return;
    setSelectedMatch(match);
    setT1Kills(match.scores?.team1Kills || 0);
    setT2Kills(match.scores?.team2Kills || 0);
    setT1Place(match.scores?.team1Placement || 0);
    setT2Place(match.scores?.team2Placement || 0);
    setStatus(match.status || 'scheduled');
    setWinnerId(match.winnerId?._id || match.winnerId || '');
  };

  const handleSave = () => {
    if (!selectedMatch) return;
    onUpdateMatch(selectedMatch._id, {
      team1Kills: parseInt(t1Kills),
      team2Kills: parseInt(t2Kills),
      team1Placement: parseInt(t1Place),
      team2Placement: parseInt(t2Place),
      winnerId: winnerId || null,
      status
    });
    setSelectedMatch(null);
  };

  // Helper names
  const getTeamName = (teamObj) => {
    if (!teamObj) return 'TBD';
    return teamObj.teamName || teamObj.activeTeam || teamObj.username || 'Participant';
  };

  return (
    <div className="relative w-full overflow-x-auto py-8 font-sans">
      <div className="flex justify-start md:justify-around items-stretch min-w-[800px] gap-8 px-4">
        {roundList.length === 0 ? (
          <div className="glass-panel w-full p-8 text-center text-gaming-muted rounded-2xl border border-white/5">
            No active brackets or match layouts found. Register teams to generate pairings.
          </div>
        ) : (
          roundList.map((rNum, rIndex) => {
            const roundMatches = rounds[rNum];
            const roundNames = ['Quarterfinals', 'Semifinals', 'Championship Final', 'Grand Finals'];
            const roundLabel = roundNames[rIndex] || `Round ${rNum}`;

            return (
              <div key={rNum} className="flex flex-col justify-around items-center w-72 flex-shrink-0">
                <h3 className="text-sm font-bold tracking-widest text-gaming-cyan uppercase font-display mb-4 border-b border-gaming-cyan/30 pb-2 w-full text-center">
                  {roundLabel}
                </h3>
                <div className="flex flex-col justify-around h-full gap-8 py-4 w-full">
                  {roundMatches.map((match, mIndex) => {
                    const hasTeam1 = !!match.team1Id;
                    const hasTeam2 = !!match.team2Id;
                    const isLive = match.status === 'live';
                    const isDone = match.status === 'completed';
                    
                    const t1Winner = isDone && match.winnerId && (match.winnerId._id === match.team1Id?._id || match.winnerId === match.team1Id?._id);
                    const t2Winner = isDone && match.winnerId && (match.winnerId._id === match.team2Id?._id || match.winnerId === match.team2Id?._id);

                    return (
                      <motion.div
                        key={match._id}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: mIndex * 0.05 }}
                        onClick={() => handleOpenModal(match)}
                        className={`glass-panel p-4 rounded-xl border relative flex flex-col gap-2 transition-all duration-300 w-full ${
                          isHost ? 'cursor-pointer hover:neon-border-purple' : ''
                        } ${isLive ? 'neon-border-cyan' : isDone ? 'border-white/5 opacity-80' : 'border-white/5'}`}
                      >
                        {/* Status bar */}
                        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider font-display">
                          <span className="text-gaming-muted">Match #{mIndex + 1}</span>
                          {isLive && (
                            <span className="text-gaming-cyan flex items-center gap-1 animate-pulse">
                              <Play className="w-2.5 h-2.5 fill-gaming-cyan" /> LIVE NOW
                            </span>
                          )}
                          {isDone && (
                            <span className="text-gaming-green flex items-center gap-1">
                              <CheckCircle className="w-2.5 h-2.5" /> COMPLETED
                            </span>
                          )}
                          {!isLive && !isDone && <span className="text-gaming-muted">UPCOMING</span>}
                        </div>

                        {/* Teams inside the match card */}
                        <div className="flex flex-col gap-1.5 mt-1">
                          {/* Team 1 */}
                          <div
                            className={`flex justify-between items-center px-2 py-1.5 rounded transition-colors ${
                              t1Winner ? 'bg-gaming-green/10 border border-gaming-green/20' : 'bg-white/[0.02]'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <Shield className={`w-3.5 h-3.5 flex-shrink-0 ${hasTeam1 ? 'text-gaming-purple' : 'text-gaming-muted'}`} />
                              <span className={`text-xs font-semibold truncate ${hasTeam1 ? 'text-white' : 'text-gaming-muted'}`}>
                                {getTeamName(match.team1Id)}
                              </span>
                            </div>
                            {hasTeam1 && (
                              <span className="text-[10px] font-bold font-display text-gaming-cyan">
                                {match.scores?.team1Kills}K / {match.scores?.team1Placement}P
                              </span>
                            )}
                          </div>

                          {/* Team 2 */}
                          <div
                            className={`flex justify-between items-center px-2 py-1.5 rounded transition-colors ${
                              t2Winner ? 'bg-gaming-green/10 border border-gaming-green/20' : 'bg-white/[0.02]'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <Shield className={`w-3.5 h-3.5 flex-shrink-0 ${hasTeam2 ? 'text-gaming-purple' : 'text-gaming-muted'}`} />
                              <span className={`text-xs font-semibold truncate ${hasTeam2 ? 'text-white' : 'text-gaming-muted'}`}>
                                {getTeamName(match.team2Id)}
                              </span>
                            </div>
                            {hasTeam2 && (
                              <span className="text-[10px] font-bold font-display text-gaming-cyan">
                                {match.scores?.team2Kills}K / {match.scores?.team2Placement}P
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Click-to-configure tag for Host */}
                        {isHost && (
                          <div className="absolute right-2 top-2 opacity-0 hover:opacity-100 transition-opacity bg-gaming-purple px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider flex items-center gap-0.5">
                            <Edit2 className="w-2 h-2" /> EDIT
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Host Match Score Update Modal Overlay */}
      <AnimatePresence>
        {selectedMatch && (
          <div className="fixed inset-0 flex items-center justify-center bg-gaming-dark/80 backdrop-blur-md z-[99999] p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel w-full max-w-md p-6 rounded-2xl border border-white/10 relative overflow-hidden"
            >
              <h4 className="text-lg font-bold font-display tracking-tight text-white mb-4 uppercase">
                Direct Scoring Console - Match Update
              </h4>

              <div className="space-y-4">
                {/* Status selector */}
                <div>
                  <label className="text-xs uppercase font-bold text-gaming-muted block mb-1">Match State</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-gaming-slate border border-white/10 rounded-lg py-2 px-3 text-sm focus:border-gaming-cyan outline-none text-white font-sans"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="live">Live Now</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Team 1 Score controls */}
                <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg">
                  <span className="text-xs font-bold text-gaming-purple block mb-2">
                    {getTeamName(selectedMatch.team1Id)} (Team 1)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-gaming-muted block mb-1">Kills</label>
                      <input
                        type="number"
                        value={t1Kills}
                        onChange={(e) => setT1Kills(parseInt(e.target.value || 0))}
                        className="w-full bg-gaming-dark border border-white/15 rounded px-2.5 py-1 text-sm outline-none focus:border-gaming-cyan text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-gaming-muted block mb-1">Placement Points</label>
                      <input
                        type="number"
                        value={t1Place}
                        onChange={(e) => setT1Place(parseInt(e.target.value || 0))}
                        className="w-full bg-gaming-dark border border-white/15 rounded px-2.5 py-1 text-sm outline-none focus:border-gaming-cyan text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Team 2 Score controls */}
                <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg">
                  <span className="text-xs font-bold text-gaming-purple block mb-2">
                    {getTeamName(selectedMatch.team2Id)} (Team 2)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-gaming-muted block mb-1">Kills</label>
                      <input
                        type="number"
                        value={t2Kills}
                        onChange={(e) => setT2Kills(parseInt(e.target.value || 0))}
                        className="w-full bg-gaming-dark border border-white/15 rounded px-2.5 py-1 text-sm outline-none focus:border-gaming-cyan text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-gaming-muted block mb-1">Placement Points</label>
                      <input
                        type="number"
                        value={t2Place}
                        onChange={(e) => setT2Place(parseInt(e.target.value || 0))}
                        className="w-full bg-gaming-dark border border-white/15 rounded px-2.5 py-1 text-sm outline-none focus:border-gaming-cyan text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Winner selection */}
                {status === 'completed' && (
                  <div>
                    <label className="text-xs uppercase font-bold text-gaming-muted block mb-1">Select Winner</label>
                    <select
                      value={winnerId}
                      onChange={(e) => setWinnerId(e.target.value)}
                      className="w-full bg-gaming-slate border border-white/10 rounded-lg py-2 px-3 text-sm focus:border-gaming-cyan outline-none text-white"
                    >
                      <option value="">Select winner team...</option>
                      {selectedMatch.team1Id && (
                        <option value={selectedMatch.team1Id._id || selectedMatch.team1Id}>
                          {getTeamName(selectedMatch.team1Id)}
                        </option>
                      )}
                      {selectedMatch.team2Id && (
                        <option value={selectedMatch.team2Id._id || selectedMatch.team2Id}>
                          {getTeamName(selectedMatch.team2Id)}
                        </option>
                      )}
                    </select>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg py-2 px-4 text-xs font-bold font-display uppercase transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gaming-purple hover:bg-gaming-purple/80 text-white rounded-lg py-2 px-4 text-xs font-bold font-display uppercase transition-colors"
                >
                  Commit Score
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default TournamentBracket;
