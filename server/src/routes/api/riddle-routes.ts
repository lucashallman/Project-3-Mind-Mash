import { Router } from 'express';
import { fetchRiddle } from '../../services/riddleService.js';
let router = Router();
router.get('/', fetchRiddle);
export default router;