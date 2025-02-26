
import { Request, Response } from 'express';
import axios from 'axios';
export const fetchTrivia = async (_req: Request, res: Response) => {
    try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&encode=url3986', {

        });
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching trivia:', error);
        res.status(500).json({ error: 'Failed to fetch trivia' });
        
    }
};