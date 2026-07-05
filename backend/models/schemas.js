import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password hash is required']
  },
  role: {
    type: String,
    enum: ['host', 'participant'],
    default: 'participant'
  },
  activeTeam: {
    type: String,
    default: ''
  }
}, { timestamps: true });

// Tournament Schema
const tournamentSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Tournament title is required'],
    trim: true
  },
  gameName: {
    type: String,
    required: [true, 'Game title is required'],
    trim: true
  },
  rules: {
    type: String,
    default: 'Standard tournament rules apply.'
  },
  format: {
    type: String,
    enum: ['Single Elimination', 'Double Elimination', 'Round Robin'],
    default: 'Single Elimination'
  },
  maxTeams: {
    type: Number,
    required: [true, 'Maximum slot capacity is required'],
    min: [2, 'Tournament must have at least 2 slots']
  },
  prizePool: {
    type: Number,
    required: [true, 'Prize pool is required'],
    min: [0, 'Prize pool cannot be negative']
  },
  entryFee: {
    type: Number,
    required: [true, 'Entry fee is required'],
    min: [0, 'Entry fee cannot be negative']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['open', 'ongoing', 'completed'],
    default: 'open'
  },
  hostId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  registeredTeams: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  activeBracketStructure: {
    type: Schema.Types.Mixed,
    default: {}
  }
}, { timestamps: true });

// Match Schema
const matchSchema = new Schema({
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  roundNumber: {
    type: Number,
    required: true,
    default: 1
  },
  team1Id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  team2Id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  scores: {
    team1Kills: { type: Number, default: 0 },
    team2Kills: { type: Number, default: 0 },
    team1Placement: { type: Number, default: 0 },
    team2Placement: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['scheduled', 'live', 'completed'],
    default: 'scheduled'
  },
  winnerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { timestamps: true });

export const User = model('User', userSchema);
export const Tournament = model('Tournament', tournamentSchema);
export const Match = model('Match', matchSchema);
