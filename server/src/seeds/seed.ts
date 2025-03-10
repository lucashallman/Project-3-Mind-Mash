
import User from '../models/User.js'
import Leaderboard from '../models/Leaderboard.js';
// import cleanDB from "./cleanDB.js";



import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const seedUsers = async () => {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB.")
    const users = [

        {
            username: 'ShadowStriker',
            email: 'ShadowStriker@tester.test',
            password: await bcrypt.hash("testword", 10),
            triviapoints: 100,
            correctTriviaCount: 64,
            totalTriviaCount: 900,
            correctRiddleCount: 36,
            totalRiddleCount: 37,
        },
        {
            username: 'PixelWarrior',
            email: 'PixelWarrior@tester.test',
            password: await bcrypt.hash("testword", 10),
            triviapoints: 19,
            correctTriviaCount: 19,
            totalTriviaCount: 19,
            correctRiddleCount: 0,
            totalRiddleCount: 0,
        },
        {
            username: 'GlitchHunter',
            email: 'GlitchHunter@tester.test',
            password: await bcrypt.hash("testword", 10),
            triviapoints: 49,
            correctTriviaCount: 32,
            totalTriviaCount: 80,
            correctRiddleCount: 17,
            totalRiddleCount: 20,
        },
        {
            username: 'QuantumKnight',
            email: 'QuantumKnight@tester.test',
            password: await bcrypt.hash("testword", 10),
            triviapoints: 80,
            correctTriviaCount: 20,
            totalTriviaCount: 90,
            correctRiddleCount: 60,
            totalRiddleCount: 7000,
        },
        {
            username: 'TurboNinja',
            email: 'TurboNinja@tester.test',
            password: await bcrypt.hash("testword", 10),
            triviapoints: 3000,
            correctTriviaCount: 2999,
            totalTriviaCount: 3000,
            correctRiddleCount: 1,
            totalRiddleCount: 1,
        },
        {
            username: 'CyberGhost',
            email: 'CyberGhost@tester.test',
            password: await bcrypt.hash("testword", 10),
            triviapoints: 635,
            correctTriviaCount: 23,
            totalTriviaCount: 795,
            correctRiddleCount: 622,
            totalRiddleCount: 622,
        },
        {
            username: 'AncientWizard',
            email: 'AncientWizard@tester.test',
            password: await bcrypt.hash("testword", 10),
            triviapoints: 9000,
            correctTriviaCount: 12,
            totalTriviaCount: 12,
            correctRiddleCount: 0,
            totalRiddleCount: 0,
        },
        {
            username: 'StealthSniper',
            email: 'test@tester.test',
            password: await bcrypt.hash("testword", 10),
            triviapoints: 1,
            correctTriviaCount: 1,
            totalTriviaCount: 1,
            correctRiddleCount: 0,
            totalRiddleCount: 0,
        },
        {
            username: 'PhantomByte',
            email: 'PhantomByte@tester.test',
            password: await bcrypt.hash("testword", 10),
            triviapoints: 56,
            correctTriviaCount: 45,
            totalTriviaCount: 78,
            correctRiddleCount: 11,
            totalRiddleCount: 19,
        },
        {
            username: 'TitanSlayer',
            email: 'TitanSlayer@tester.test',
            password: await bcrypt.hash("testword", 10),
            triviapoints: 98,
            correctTriviaCount: 46,
            totalTriviaCount: 84,
            correctRiddleCount: 52,
            totalRiddleCount: 151,
        },

    ];

    const leaderboard = [
        { 
            username: 'ShadowStriker',
            score: 10,
        },
        {
            username: 'TitanSlayer',
            score: 9
        },
        {
            username: 'AncientWizard',
            score: 900
        },
        {
            username: 'TurboNinja',
            score: 15
        },
        {
            username: 'CyberGhost',
            score: 63
        },
    ]

    try{
        await User.deleteMany();
        await User.insertMany(users);
        console.log('Users seeded.')

        await Leaderboard.deleteMany();
        await Leaderboard.insertMany(leaderboard);
        console.log('Leaderboard seeded.');

        console.log("Seed Success!")
    } catch (err) {
        console.error("Error seeding:", err)
    } finally {
        mongoose.connection.close();
        console.log("Mongo connection closed.")
    }
}

seedUsers();