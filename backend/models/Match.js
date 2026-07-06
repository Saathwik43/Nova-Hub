import mongoose from 'mongoose';

const { Schema, model } = mongoose;

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
  matchIndex: {
    type: Number,
    required: true,
    default: 0
  },
  team1Id: {
    type: String, // References the subdocument _id or token in registeredTeams
    default: null
  },
  team2Id: {
    type: String,
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
    type: String,
    default: null
  }
}, { timestamps: true });

export default model('Match', matchSchema);
