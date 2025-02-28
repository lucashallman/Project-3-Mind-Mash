import apiRoute from "./api/index.js";
import { Router } from "express";
import riddleRoutes from "./api/riddle-routes.js";
import leaderboardRoute from './api/leaderboard.js'
const router = Router();
router.use('/trivia', apiRoute);
router.use('/riddles', riddleRoutes);
router.use('/leaderboard', leaderboardRoute);


export default router;

