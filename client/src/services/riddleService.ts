import axios from 'axios';

export const fetchRiddle = async () => {
    try {
        const response = await axios.get('https://riddles-api.vercel.app/random', {
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trivia:', error);
        return null;
    }
};
