import { Schema, model, Document } from "mongoose";

interface ILeaderboard extends Document {
    username: string;
    score: number;
    timestamp: Date;
}

const LeaderboardSchema: Schema = new Schema({
    username: { type: String, required: true },
    score: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
})

const Leaderboard = model<ILeaderboard>('Leaderboard', LeaderboardSchema);

export default Leaderboard;