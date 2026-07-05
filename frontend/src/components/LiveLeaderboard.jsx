import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, Crosshair, Award } from 'lucide-react';

const mockTeams = [
  { id: '1', name: 'Team Vipers', kills: 42, placement: 60, status: 'live' },
  { id: '2', name: 'Apex Predators', kills: 38, placement: 50, status: 'live' },
  { id: '3', name: 'Team Glitch', kills: 29, placement: 40, status: 'live' },
  { id: '4', name: 'Hyper Shadows', kills: 18, placement: 25, status: 'eliminated' },
  { id: '5', name: 'Zero Ping', kills: 22, placement: 30, status: 'live' },
  { id: '6', name: 'Fatal Error', kills: 15, placement: 10, status: 'eliminated' }
];

export const LiveLeaderboard = ({ socket, tournamentId }) => {
  const [teams, setTeams] = useState(mockTeams);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Score calculation: Kills = 2 points each, Placement = 1 point each
  const calculateTotal = (team) => (team.kills * 2) + team.placement;

  // Sort teams based on total points
  const sortedTeams = [...teams].sort((a, b) => calculateTotal(b) - calculateTotal(a));

  useEffect(() => {
    if (!socket) return;

    const handleScoreUpdate = (data) => {
      // If updating a specific tournament or all live streams
      if (tournamentId && data.tournament._id !== tournamentId) return;

      // Extract statistics from matches to aggregate leaderboards
      const teamStats = {};
      
      // Initialize stats from registered teams
      data.tournament.registeredTeams.forEach(team => {
        teamStats[team._id] = {
          id: team._id,
          name: team.activeTeam || team.username,
          kills: 0,
          placement: 0,
          status: 'live'
        };
      });

      // Aggregate from matches
      data.matches.forEach(match => {
        if (match.team1Id && teamStats[match.team1Id._id]) {
          teamStats[match.team1Id._id].kills += match.scores.team1Kills;
          teamStats[match.team1Id._id].placement += match.scores.team1Placement;
          if (match.status === 'completed' && match.winnerId && match.winnerId._id !== match.team1Id._id) {
            teamStats[match.team1Id._id].status = 'eliminated';
          }
        }
        if (match.team2Id && teamStats[match.team2Id._id]) {
          teamStats[match.team2Id._id].kills += match.scores.team2Kills;
          teamStats[match.team2Id._id].placement += match.scores.team2Placement;
          if (match.status === 'completed' && match.winnerId && match.winnerId._id !== match.team2Id._id) {
            teamStats[match.team2Id._id].status = 'eliminated';
          }
        }
      });

      const aggregatedList = Object.values(teamStats);
      if (aggregatedList.length > 0) {
        setTeams(aggregatedList);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    };

    socket.on('scoreUpdate', handleScoreUpdate);
    socket.on('tournamentUpdate', handleScoreUpdate);

    return () => {
      socket.off('scoreUpdate');
      socket.off('tournamentUpdate');
    };
  }, [socket, tournamentId]);

  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-white/5 shadow-glass">
      {/* Background carbon styling grid */}
      <div className="absolute inset-0 carbon-grid opacity-20 pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gaming-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gaming-green"></span>
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white uppercase font-display flex items-center gap-2">
              Live Scores & Leaderboard
            </h2>
          </div>
          <p className="text-xs text-gaming-muted mt-1">
            Updates in real-time via low-latency Socket.io pipes
          </p>
        </div>
        {lastUpdated && (
          <div className="text-[10px] bg-gaming-purple/20 border border-gaming-purple/40 px-3 py-1 rounded-full text-gaming-cyan font-bold font-display">
            LAST SYNC: {lastUpdated}
          </div>
        )}
      </div>

      {/* Table Structure */}
      <div className="overflow-x-auto relative z-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gaming-muted font-bold font-display">
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Team Clan</th>
              <th className="py-3 px-4 text-center">Kills (x2)</th>
              <th className="py-3 px-4 text-center">Placement</th>
              <th className="py-3 px-4 text-right">Total Points</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {sortedTeams.map((team, index) => {
                const isTopThree = index < 3;
                const total = calculateTotal(team);
                const isEliminated = team.status === 'eliminated';

                return (
                  <motion.tr
                    key={team.id || team._id || index}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`border-b border-white/5 transition-colors duration-200 hover:bg-white/[0.02] ${
                      isEliminated ? 'opacity-55' : ''
                    }`}
                  >
                    {/* Rank cell */}
                    <td className="py-4 px-4 font-bold font-display text-sm">
                      {isTopThree ? (
                        <div className="flex items-center gap-1.5">
                          <Trophy 
                            className={`w-4 h-4 ${
                              index === 0 ? 'text-amber-400' : index === 1 ? 'text-slate-300' : 'text-amber-600'
                            }`} 
                          />
                          <span className={index === 0 ? 'text-amber-400 neon-text-purple' : ''}>#{index + 1}</span>
                        </div>
                      ) : (
                        <span className="text-gaming-muted">#{index + 1}</span>
                      )}
                    </td>

                    {/* Team Name cell */}
                    <td className="py-4 px-4 font-semibold text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-6 rounded ${isEliminated ? 'bg-red-500' : 'bg-gaming-purple'}`} />
                        <span className="text-white tracking-wide">{team.name}</span>
                      </div>
                    </td>

                    {/* Kills cell */}
                    <td className="py-4 px-4 text-center font-display text-sm">
                      <div className="inline-flex items-center justify-center gap-1 text-gaming-cyan bg-gaming-cyan/10 px-2 py-0.5 rounded border border-gaming-cyan/20">
                        <Crosshair className="w-3.5 h-3.5" />
                        <span>{team.kills}</span>
                      </div>
                    </td>

                    {/* Placement cell */}
                    <td className="py-4 px-4 text-center font-display text-sm">
                      <div className="inline-flex items-center justify-center gap-1 text-gaming-green bg-gaming-green/10 px-2 py-0.5 rounded border border-gaming-green/20">
                        <Award className="w-3.5 h-3.5" />
                        <span>{team.placement}</span>
                      </div>
                    </td>

                    {/* Total points cell */}
                    <td className="py-4 px-4 text-right font-bold text-sm font-display">
                      <span className={`${isTopThree ? 'text-gaming-green' : 'text-white'}`}>
                        {total} PTS
                      </span>
                    </td>

                    {/* Status cell */}
                    <td className="py-4 px-4 text-right">
                      {isEliminated ? (
                        <span className="text-[10px] bg-red-950/40 text-red-400 border border-red-500/30 px-2 py-0.5 rounded uppercase font-bold tracking-wider font-display">
                          Eliminated
                        </span>
                      ) : (
                        <span className="text-[10px] bg-gaming-green/10 text-gaming-green border border-gaming-green/30 px-2 py-0.5 rounded uppercase font-bold tracking-wider font-display flex items-center justify-end gap-1 ml-auto w-max">
                          <Zap className="w-2.5 h-2.5 fill-gaming-green" /> Active
                        </span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LiveLeaderboard;
