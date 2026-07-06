import express from 'express';
import Match from '../models/Match.js';
import Tournament from '../models/Tournament.js';
import { authenticateToken } from './authRoutes.js';
import { tournamentsDb, matchesDb } from './mockStore.js';

const router = express.Router();

// Update Match Score & Winner (Host only)
router.put('/:matchId/score', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'host') {
      return res.status(403).json({ message: 'Access denied. Only hosts can update scores.' });
    }

    const { matchId } = req.params;
    const { team1Kills, team2Kills, team1Placement, team2Placement, winnerId, status } = req.body;

    // MOCK DB MODE
    if (process.env.USE_MOCK_DB === 'true') {
      const match = matchesDb.find(m => m._id === matchId);
      if (!match) return res.status(404).json({ message: 'Match not found' });

      match.scores = {
        team1Kills: parseInt(team1Kills || 0),
        team2Kills: parseInt(team2Kills || 0),
        team1Placement: parseInt(team1Placement || 0),
        team2Placement: parseInt(team2Placement || 0)
      };
      match.winnerId = winnerId || null;
      match.status = status;

      const tournament = tournamentsDb.find(t => t._id === match.tournamentId);

      // If completed and winner is set, advance winner to next round
      if (status === 'completed' && winnerId && tournament) {
        const matchesForTourney = matchesDb.filter(m => m.tournamentId === match.tournamentId);
        const totalRounds = Math.log2(tournament.maxTeams);
        
        if (match.roundNumber < totalRounds) {
          const nextRound = match.roundNumber + 1;
          const nextMatchIndex = Math.floor(match.matchIndex / 2);
          const isTeam1 = match.matchIndex % 2 === 0;

          const nextMatch = matchesForTourney.find(m => m.roundNumber === nextRound && m.matchIndex === nextMatchIndex);
          if (nextMatch) {
            if (isTeam1) {
              nextMatch.team1Id = winnerId;
            } else {
              nextMatch.team2Id = winnerId;
            }
          }
        } else {
          // Championship match completed! Tournament completed!
          tournament.status = 'completed';
        }
      }

      // Populate matches for socket update
      const populatedMatches = matchesDb.filter(m => m.tournamentId === match.tournamentId).map(m => {
        const mObj = { ...m };
        if (mObj.team1Id && tournament) {
          const t1 = tournament.registeredTeams.find(t => t._id === mObj.team1Id || t.registrationToken === mObj.team1Id);
          if (t1) mObj.team1Id = t1;
        }
        if (mObj.team2Id && tournament) {
          const t2 = tournament.registeredTeams.find(t => t._id === mObj.team2Id || t.registrationToken === mObj.team2Id);
          if (t2) mObj.team2Id = t2;
        }
        if (mObj.winnerId && tournament) {
          const w = tournament.registeredTeams.find(t => t._id === mObj.winnerId || t.registrationToken === mObj.winnerId);
          if (w) mObj.winnerId = w;
        }
        return mObj;
      });

      // Broadcast update
      const io = req.app.get('io');
      if (io) {
        io.emit('scoreUpdate', { tournament, matches: populatedMatches });
      }

      return res.status(200).json({ message: 'Score updated successfully (MOCK)', match });
    }

    // MONGOOSE DB FLOW
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    match.scores = {
      team1Kills: parseInt(team1Kills || 0),
      team2Kills: parseInt(team2Kills || 0),
      team1Placement: parseInt(team1Placement || 0),
      team2Placement: parseInt(team2Placement || 0)
    };
    match.winnerId = winnerId || null;
    match.status = status;
    await match.save();

    const tournament = await Tournament.findById(match.tournamentId);

    if (status === 'completed' && winnerId && tournament) {
      const totalRounds = Math.log2(tournament.maxTeams);
      if (match.roundNumber < totalRounds) {
        const nextRound = match.roundNumber + 1;
        const nextMatchIndex = Math.floor(match.matchIndex / 2);
        const isTeam1 = match.matchIndex % 2 === 0;

        const nextMatch = await Match.findOne({
          tournamentId: match.tournamentId,
          roundNumber: nextRound,
          matchIndex: nextMatchIndex
        });

        if (nextMatch) {
          if (isTeam1) {
            nextMatch.team1Id = winnerId;
          } else {
            nextMatch.team2Id = winnerId;
          }
          await nextMatch.save();
        }
      } else {
        tournament.status = 'completed';
        await tournament.save();
      }
    }

    // Load and populate all matches for the tournament
    const allMatches = await Match.find({ tournamentId: match.tournamentId }).sort({ roundNumber: 1, matchIndex: 1 });
    const populatedMatches = allMatches.map(m => {
      const mObj = m.toObject();
      if (mObj.team1Id && tournament) {
        const t1 = tournament.registeredTeams.find(t => t._id.toString() === mObj.team1Id.toString());
        if (t1) mObj.team1Id = t1;
      }
      if (mObj.team2Id && tournament) {
        const t2 = tournament.registeredTeams.find(t => t._id.toString() === mObj.team2Id.toString());
        if (t2) mObj.team2Id = t2;
      }
      if (mObj.winnerId && tournament) {
        const w = tournament.registeredTeams.find(t => t._id.toString() === mObj.winnerId.toString());
        if (w) mObj.winnerId = w;
      }
      return mObj;
    });

    const io = req.app.get('io');
    if (io) {
      io.emit('scoreUpdate', { tournament, matches: populatedMatches });
    }

    res.status(200).json({ message: 'Score updated successfully', match });
  } catch (err) {
    res.status(500).json({ message: 'Error updating score', error: err.message });
  }
});

export default router;
