
import { useEffect, useState } from 'react';
import { fetchTrivia, randomizeAnswers, validateAnswer } from '../services/triviaService';
import { ITrivia } from '../interfaces/Trivia'; 
const Trivia = () => {
    const [trivia, setTrivia] = useState<ITrivia>();
    const [answers, setAnswers] = useState<string[]>([]);
    const [currentAnswer, setCurrentAnswer] = useState<string>('');
    const [answerCorrect, setAnswerCorrect] = useState<boolean>();
    const [numberCorrect, setNumberCorrect] = useState<number>(0);
    const [numberIncorrect, setNumberIncorrect] = useState<number>(0);
    useEffect(() => {
        const getTrivia = async () => {
            try {
                const response = await fetchTrivia();
                console.log(response);

                let answers = randomizeAnswers(response);

                convertSpecialCharacterCodes(answers[0]);
                convertSpecialCharacterCodes(response.results[0].question);
                setTrivia(response);
                setAnswers(answers);
                
            } catch (err) {
                console.log('Error loading trivia.');
                console.error('Error fetching trivia:', err);
            };
        };

        getTrivia();
    }, []);
    const handleAnswer = (selectedAnswer: string) => {
        const correctAnswer = trivia?.results[0].correct_answer;
        const isCorrect = validateAnswer(selectedAnswer, correctAnswer);
        const radioButtons = document.getElementsByName('answer') as NodeListOf<HTMLInputElement>;

        const selectedRadio = Array.from(radioButtons).find(radio => radio.value === selectedAnswer);
        if (selectedRadio) {
            const label = document.querySelector(`label[for='${selectedRadio.id}']`)
            if (label) {
                label.classList.add("selected");
            }
        }
        setCurrentAnswer(selectedAnswer);

        if (isCorrect) {
            setAnswerCorrect(true);
            setNumberCorrect(numberCorrect + 1);
            radioButtons.forEach(radio => {
                radio.disabled = true;
            });
        } else {
            setAnswerCorrect(false);
            setNumberIncorrect(numberIncorrect + 1);
            radioButtons.forEach(radio => {
                radio.disabled = true;

            });
        }
    };
    const handleNext = () => {
        setAnswerCorrect(undefined);
        const getTrivia = async () => {
            try {
                const response = await fetchTrivia();
                let answers = randomizeAnswers(response);
                const selections = document.getElementsByName('answer') as NodeListOf<HTMLInputElement>;
                  
                

                setTrivia(response);
                setAnswers(answers);
                convertSpecialCharacterCodes(answers[0]);
                convertSpecialCharacterCodes(response.results[0].question);

                const selectedRadio = Array.from(selections).find(radio => radio.value === currentAnswer);
                if (selectedRadio) {
                    const label = document.querySelector(`label[for='${selectedRadio.id}']`)
                    if (label) {
                        label.classList.remove("selected");
                    }
                }
                setCurrentAnswer('');

                const querySelect = document.querySelectorAll('trivia-answer');
                console.log(querySelect);

                const radioButtons = document.getElementsByName('answer') as NodeListOf<HTMLInputElement>;
                radioButtons.forEach(radio => {
                    radio.disabled = false;
                });
            } catch (err) {
                console.log('Error loading trivia.');
                console.error('Error fetching trivia:', err);
            };
        };
        getTrivia();

        
    }
    const resetSelection = () => {
        const radioButtons = document.getElementsByName('answer') as NodeListOf<HTMLInputElement>;
        document.querySelectorAll('trivia-answer').forEach(label => {
            label.classList.remove("selected");
        });
        radioButtons.forEach(radio => {
            radio.checked = false;
        });
    };

    function convertSpecialCharacterCodes(text: string) {
        return text.replace(/&#(\d+);/g, function(_, num) {
          return String.fromCharCode(num);
        });
      }
    useEffect(() => {
        if (answerCorrect === undefined) {
            resetSelection();
        }
    }, [answerCorrect]);
    return (
        <div>
            
            
            {trivia ? (
                <div>
                    <h3>{trivia.results[0].question}</h3>
                    {answers.map((answer, index) => (
                        <div key={index} className='trivia'>
                            <input
                                type="radio"
                                name="answer"
                                id={`${index}`}
                                value={answer}
                                onChange={() => handleAnswer(answer)}
                            />
                            <label htmlFor={`${index}`} className='trivia-answer'>{answer}</label>
                        </div>
                    ))}
                    {answerCorrect !== undefined && (
                        <p>{answerCorrect ? 'Correct!' : `Incorrect! ${trivia.results[0].correct_answer} is the right answer`}</p>
                    )}
                    <button onClick={handleNext}>Next</button>
                    <p>Correct: {numberCorrect}</p>
                    <p>Incorrect: {numberIncorrect}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Trivia;

