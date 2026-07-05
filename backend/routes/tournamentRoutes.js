import express from 'express';
import Tournament from '../models/Tournament.js';
import { authenticateToken } from './authRoutes.js';
import { tournamentsDb } from './mockStore.js';

const router = express.Router();

// Get all tournaments
router.get('/', async (req, res) => {
  try {
    // MOCK DB FALLBACK
    if (process.env.USE_MOCK_DB === 'true') {
      return res.status(200).json(tournamentsDb);
    }

    // MONGOOSE DB FLOW
    const tournaments = await Tournament.find()
      .populate('hostId', 'username email');
    res.status(200).json(tournaments);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving tournaments list', error: err.message });
  }
});

// Create Tournament (Host only)
router.post('/create', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'host') {
      return res.status(403).json({ message: 'Access denied. Only tournament hosts can list competitions.' });
    }

    const {
      title,
      category,
      gameName,
      rules,
      venueType,
      venueDetails,
      format,
      maxTeams,
      teamSize,
      prizePool,
      entryFee,
      prizeDistribution
    } = req.body;

    // MOCK DB FALLBACK
    if (process.env.USE_MOCK_DB === 'true') {
      const newTournament = {
        _id: 'mock-tourney-' + Math.random().toString(36).substring(2, 9),
        title,
        category,
        gameName,
        rules,
        venueType,
        venueDetails,
        format,
        maxTeams: parseInt(maxTeams),
        teamSize: parseInt(teamSize),
        prizePool: parseFloat(prizePool),
        entryFee: parseFloat(entryFee),
        prizeDistribution,
        hostId: { _id: req.user.id, username: req.user.username },
        registeredTeams: [],
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      tournamentsDb.push(newTournament);

      return res.status(201).json({
        message: 'Tournament successfully listed on public timelines (MOCK DB MODE).',
        tournament: newTournament
      });
    }

    // MONGOOSE DB FLOW
    const newTournament = new Tournament({
      title,
      category,
      gameName,
      rules,
      venueType,
      venueDetails,
      format,
      maxTeams: parseInt(maxTeams),
      teamSize: parseInt(teamSize),
      prizePool: parseFloat(prizePool),
      entryFee: parseFloat(entryFee),
      prizeDistribution,
      hostId: req.user.id
    });

    await newTournament.save();

    res.status(201).json({
      message: 'Tournament successfully listed on public timelines.',
      tournament: newTournament
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating tournament listing', error: err.message });
  }
});

// Join Tournament (Participant only)
router.post('/:id/join', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'participant') {
      return res.status(403).json({ message: 'Only participant profiles can join competitions.' });
    }

    const { teamName, captainName, captainEmail, roster, eligibilityDocUrl, rulesAccepted } = req.body;

    if (!teamName || !captainName || !captainEmail || !roster || roster.length === 0) {
      return res.status(400).json({ message: 'Roster validation failure. Fill in all registration details.' });
    }

    const registrationToken = 'REG-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-' + Date.now().toString().slice(-4);

    // MOCK DB FALLBACK
    if (process.env.USE_MOCK_DB === 'true') {
      const tournament = tournamentsDb.find(t => t._id === req.params.id);
      if (!tournament) return res.status(404).json({ message: 'Target tournament not found.' });

      if (tournament.registeredTeams.length >= tournament.maxTeams) {
        return res.status(400).json({ message: 'Registration full. All team slots are taken.' });
      }

      const newTeamPayload = {
        teamName,
        captainName,
        captainEmail,
        roster,
        registrationToken,
        eligibilityDocUrl: eligibilityDocUrl || '',
        rulesAccepted: !!rulesAccepted
      };

      tournament.registeredTeams.push(newTeamPayload);

      if (tournament.registeredTeams.length === tournament.maxTeams) {
        tournament.status = 'ongoing';
      }

      const venuePassDetails = tournament.venueType === 'online'
        ? { type: 'online', code: tournament.venueDetails.lobbyCode, region: tournament.venueDetails.serverRegion }
        : { type: 'offline', address: tournament.venueDetails.physicalAddress, pin: tournament.venueDetails.pinCode, room: tournament.venueDetails.stadiumHall };

      return res.status(200).json({
        message: 'Roster injected. Registration completed successfully (MOCK DB MODE).',
        registrationToken,
        venuePass: venuePassDetails,
        tournament
      });
    }

    // MONGOOSE DB FLOW
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: 'Target tournament not found.' });

    if (tournament.registeredTeams.length >= tournament.maxTeams) {
      return res.status(400).json({ message: 'Registration full. All team slots are taken.' });
    }

    const newTeamPayload = {
      teamName,
      captainName,
      captainEmail,
      roster,
      registrationToken,
      eligibilityDocUrl: eligibilityDocUrl || '',
      rulesAccepted: !!rulesAccepted
    };

    tournament.registeredTeams.push(newTeamPayload);

    if (tournament.registeredTeams.length === tournament.maxTeams) {
      tournament.status = 'ongoing';
    }

    await tournament.save();

    const venuePassDetails = tournament.venueType === 'online'
      ? { type: 'online', code: tournament.venueDetails.lobbyCode, region: tournament.venueDetails.serverRegion }
      : { type: 'offline', address: tournament.venueDetails.physicalAddress, pin: tournament.venueDetails.pinCode, room: tournament.venueDetails.stadiumHall };

    res.status(200).json({
      message: 'Roster injected. Registration completed successfully.',
      registrationToken,
      venuePass: venuePassDetails,
      tournament
    });
  } catch (err) {
    res.status(500).json({ message: 'Error joining competition roster pipelines', error: err.message });
  }
});

export default router;
