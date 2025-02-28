import apiRoute from "./api/index.js";
import { Router } from "express";
import riddleRoutes from "./api/riddle-routes.js";

const router = Router();
router.use('/trivia', apiRoute);
router.use('/riddles', riddleRoutes);



export default router;

