
import axios from 'axios';

export const fetchTrivia = async () => {
    try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple', {

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
export const randomizeAnswers = (trivia: any, index: number) => {
    if (index < 0 || index >= trivia.results.length) {
        throw new Error('Index out of bounds');
    }
    let answers: string[] = [
        ...trivia.results[index].incorrect_answers,
        trivia.results[index].correct_answer
    ];
    return answers.sort(() => Math.random() - 0.5);
};
export const decodeHtml = (html: any) =>{
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
}
export default fetchTrivia;
