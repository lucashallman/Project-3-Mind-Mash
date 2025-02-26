
import axios from 'axios';

export const fetchTrivia = async () => {
    try {
        const response = await axios.get('https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple', {

        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trivia:', error);
        return null;
    }
};



export const validateAnswer = (selectedAnswer: string, correctAnswer: any) => {
    return selectedAnswer === correctAnswer;

}
export const randomizeAnswers = (trivia: any) => {
    let answers: string[] = [];
    for (let i = 0; i < trivia.results.length; i++) {
        answers = [...trivia.results[i].incorrect_answers, trivia.results[i].correct_answer];
    }
    return answers.sort(() => Math.random() - 0.5);
    };

export default fetchTrivia;
