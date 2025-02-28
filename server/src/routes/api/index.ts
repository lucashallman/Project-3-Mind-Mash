import { Router } from 'express';
import { fetchTrivia } from '../../services/triviaService.js';
let router = Router();



router.get('/', fetchTrivia);




export default router;