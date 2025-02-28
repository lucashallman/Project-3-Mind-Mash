import express from "express";
import Leaderboard from "../../models/Leaderboard";

const router = express.Router();

// Get leaderboard (sorted by score)
router.get("/", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Add a new leaderboard entry
router.post("/", async (req, res) => {
  try {
    const { username, score } = req.body;
    if (!username || typeof score !== "number") {
      return res.status(400).json({ message: "Invalid input" });
    }

    const newEntry = new Leaderboard({ username, score });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export default router;