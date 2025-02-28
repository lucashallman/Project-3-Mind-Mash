import mongoose, { Schema, Document } from "mongoose";

interface ILeaderboard extends Document {
    username: string;
    score: number;
    timestamp: Date;
}

const LeaderboardSchema: Schema = new Schema({
    username: { type: String, required: true },
    score: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
})

export default mongoose.model<ILeaderboard>("Leaderboard", LeaderboardSchema);