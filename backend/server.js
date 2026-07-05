import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import tournamentRoutes from './routes/tournamentRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// CORS configurations matching client port
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routing mappings
app.use('/api/auth', authRoutes);
app.use('/api/tournaments', tournamentRoutes);

// Socket.io initialization
const io = new Server(server, {
  cors: corsOptions
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/novahub';

// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Socket connection callback
io.on('connection', (socket) => {
  console.log(`Socket client connected to Nova Hub pipelines: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`Socket client disconnected: ${socket.id}`);
  });
});

// Mongoose connection with a fast timeout fallback
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
  .then(() => {
    console.log(`Connected successfully to MongoDB at: ${MONGODB_URI}`);
    process.env.USE_MOCK_DB = 'false';
    server.listen(PORT, () => {
      console.log(`Nova Hub backend running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB. Starting Express server in mock-db fallback mode.');
    process.env.USE_MOCK_DB = 'true';
    
    // Inject mock datasets so portal looks completely populated out-of-the-box
    import('./routes/mockStore.js').then(({ tournamentsDb }) => {
      if (tournamentsDb.length === 0) {
        tournamentsDb.push({
          _id: 'mock-t-1',
          title: 'Valorant Apex Invitational',
          category: 'esports',
          gameName: 'Valorant',
          rules: 'Standard esports tournament rules. Sub-18 requires parent concent.',
          venueType: 'online',
          venueDetails: { serverRegion: 'Asia South', lobbyCode: 'LBY-9923' },
          format: 'single-elimination',
          maxTeams: 8,
          teamSize: 5,
          prizePool: 25000,
          entryFee: 150,
          status: 'open',
          registeredTeams: []
        });
        tournamentsDb.push({
          _id: 'mock-t-2',
          title: 'Free Fire Firestarter Cup',
          category: 'esports',
          gameName: 'Free Fire',
          rules: 'Cheating/Hacks results in permanent ban.',
          venueType: 'online',
          venueDetails: { serverRegion: 'Asia East', lobbyCode: 'LBY-1033' },
          format: 'battle-royale-matrix',
          maxTeams: 16,
          teamSize: 4,
          prizePool: 15000,
          entryFee: 0,
          status: 'open',
          registeredTeams: []
        });
        tournamentsDb.push({
          _id: 'mock-t-3',
          title: 'Bangalore Cricket Cup',
          category: 'sports',
          gameName: 'Cricket',
          rules: 'Physical address venue check-ins require carrying physical IDs.',
          venueType: 'offline',
          venueDetails: { physicalAddress: 'Chinnaswamy Stadium, Bangalore', pinCode: '560001', stadiumHall: 'Net 3, West Gate' },
          format: 'round-robin',
          maxTeams: 4,
          teamSize: 11,
          prizePool: 50000,
          entryFee: 500,
          status: 'open',
          registeredTeams: []
        });
      }
    });

    server.listen(PORT, () => {
      console.log(`Nova Hub backend (MOCK FALLBACK) running on port ${PORT}`);
    });
  });

export { io };
