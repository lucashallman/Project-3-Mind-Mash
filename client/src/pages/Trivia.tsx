import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME1 } from '../utils/queries';
import { fetchTrivia, randomizeAnswers, validateAnswer, convertSpecialCharacterCodes } from '../services/triviaService';
import { ITrivia } from '../interfaces/Trivia';

const Trivia = () => {
    const [trivia, setTrivia] = useState<ITrivia>();
    const [answers, setAnswers] = useState<string[]>([]);
    const [answerCorrect, setAnswerCorrect] = useState<boolean>();
    const [numberCorrect, setNumberCorrect] = useState<number>(0);
    const [numberIncorrect, setNumberIncorrect] = useState<number>(0);
    const [questionNumber, setQuestionNumber] = useState<number>(0);
    const [currentCorrect, setCurrentCorrect] = useState<number>(0);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [currentIncorrect, setCurrentIncorrect] = useState<number>(0);
    
    const { data } = useQuery(QUERY_ME1);
    
    useEffect(() => {
        console.log(data);
        let userData;
        if (data) {
            userData = data?.me
        }
        console.log(userData)
    }, [])

    useEffect(() => {
        const storedNumberCorrect = localStorage.getItem('numberCorrect');
        if (storedNumberCorrect) {
            setNumberCorrect(parseInt(storedNumberCorrect, 10));
        }
    }, []);
    useEffect(() => {
        const storedNumberIncorrect = localStorage.getItem('numberIncorrect');
        if (storedNumberIncorrect) {
            setNumberIncorrect(parseInt(storedNumberIncorrect, 10));
        }
    }
        , []);


    useEffect(() => {
        const getTrivia = async () => {
            try {
                const response = await fetchTrivia();

                convertSpecialCharacterCodes(response);
                let answers = randomizeAnswers(response, questionNumber);

                convertSpecialCharacterCodes(response);
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
        const correctAnswer = trivia?.results[questionNumber].correct_answer;
        const isCorrect = validateAnswer(selectedAnswer, correctAnswer);
        const radioButtons = document.getElementsByName('answer') as NodeListOf<HTMLInputElement>;


        const selectedRadio = Array.from(radioButtons).find(radio => radio.value === selectedAnswer);
        if (selectedRadio) {
            const label = document.querySelector(`label[for='${selectedRadio.id}']`)
            if (label) {
                label.classList.add("selected");
            }
        }
        setSelectedAnswer(selectedAnswer);

        if (isCorrect) {
            setAnswerCorrect(true);
            const newCurrentCorrect = currentCorrect + 1;
            setCurrentCorrect(newCurrentCorrect);
            const newNumberCorrect = numberCorrect + 1;
            setNumberCorrect(newNumberCorrect);

            const oldTotal = localStorage.getItem('scoreTotal');
            const newTotal = Number(oldTotal) + 1;
            localStorage.setItem('scoreTotal', String(newTotal));

            localStorage.setItem('numberCorrect', newNumberCorrect.toString());
            radioButtons.forEach(radio => {
                radio.disabled = true;
            });
        } else {
            setAnswerCorrect(false);
            const newCurrentIncorrect = currentIncorrect + 1;
            setCurrentIncorrect(newCurrentIncorrect);
            const newNumberIncorrect = numberIncorrect + 1;
            setNumberIncorrect(newNumberIncorrect);

            const oldTotal = localStorage.getItem('scoreTotal');
            const newTotal = Number(oldTotal) + 1;
            localStorage.setItem('scoreTotal', String(newTotal));

            localStorage.setItem('numberIncorrect', newNumberIncorrect.toString());
            radioButtons.forEach(radio => {
                radio.disabled = true;
            });
        }
    };

    const handleNext = () => {
        setAnswerCorrect(undefined);

        const selections = document.getElementsByName('answer') as NodeListOf<HTMLInputElement>;
        const selectedRadio = Array.from(selections).find(radio => radio.value === selectedAnswer);
        if (selectedRadio) {
            const label = document.querySelector(`label[for='${selectedRadio.id}']`)
            if (label) {
                label.classList.remove("selected");
            }
        }
        setSelectedAnswer('');

        const getTrivia = async () => {
            try {

                const radioButtons = document.getElementsByName('answer') as NodeListOf<HTMLInputElement>;
                const isAnyChecked = Array.from(radioButtons).some(radio => radio.checked);

                if (!isAnyChecked) {
                    return;

                }
                if (questionNumber === 9) {
                    setQuestionNumber(0);
                    const response = await fetchTrivia();
                    let answers = randomizeAnswers(response, questionNumber);
                    radioButtons.forEach(radio => {
                        radio.disabled = false;
                    });
                    convertSpecialCharacterCodes(response);
                    setTrivia(response);

                    setAnswers(answers);
                    return;
                }

                let i = questionNumber + 1;
                setQuestionNumber(i);

                const newAnswers = randomizeAnswers(trivia, i);
                setAnswers(newAnswers);
                convertSpecialCharacterCodes(trivia);


                radioButtons.forEach(radio => {
                    radio.disabled = false;
                });
                return i;
            } catch (err) {
                console.log('Error loading trivia.');
                console.error('Error fetching trivia:', err);
            };
        };
        getTrivia();


    }
    const resetSelection = () => {
        const radioButtons = document.getElementsByName('answer') as NodeListOf<HTMLInputElement>;
        radioButtons.forEach(radio => {
            radio.checked = false;
        });
    };

    useEffect(() => {
        if (answerCorrect === undefined) {
            resetSelection();
        }
    }, [answerCorrect]);
    return (
        <div>
            {!showResults && trivia ? (
                <div>
                    <h3>{trivia.results[questionNumber].question}</h3>
                    {answers.map((answer, index) => (



                        <div key={index} style={{ marginBottom: '20px', fontSize: '2em' }}>

                            <input
                                type="radio"
                                id={`answer-${index}`}
                                name="answer"
                                value={answer}
                                onChange={() => handleAnswer(answer)}

                                style={{ marginRight: '15px', transform: 'scale(1.5)' }}

                            />
                            <label
                                htmlFor={`answer-${index}`}
                                style={{
                                    cursor: 'pointer',
                                    color: answerCorrect !== undefined
                                        ? answer === trivia?.results[questionNumber].correct_answer
                                            ? 'green'
                                            : answer === selectedAnswer
                                                ? 'red'
                                                : 'inherit'
                                        : 'inherit'
                                }}

                                className='trivia-answer'

                            >
                                {answer}
                            </label>
                        </div>
                    ))}
                    {answerCorrect !== undefined && (
                        <>
                            <p>{answerCorrect ? 'Correct!' : `Incorrect! ${trivia.results[questionNumber].correct_answer} is the right answer`}</p>
                            <button
                                onClick={handleNext}
                                className="btn btn-primary mt-3"
                                style={{ padding: '10px 20px', fontSize: '1.2em', borderRadius: '5px', marginRight: '10px' }}
                            >
                                Next
                            </button>
                            <button
                                onClick={() => {
                                    setShowResults(true);
                                    setTrivia(undefined);
                                }}
                                className="btn btn-danger mt-3"
                                style={{ padding: '10px 20px', fontSize: '1.2em', borderRadius: '5px', marginRight: '10px' }}
                            >
                                End Quiz
                            </button>
                        </>
                    )}

                </div>
            ) : showResults ? (
                <div>
                    <p>Quiz Ended!</p>

                    <p>Correct Answers: {currentCorrect}</p>
                    <p>Incorrect Answers: {currentIncorrect}</p>
                    <button
                        onClick={() => {
                            setShowResults(false);
                            setCurrentCorrect(0);
                            setCurrentIncorrect(0);
                            setQuestionNumber(0);
                            setAnswerCorrect(undefined);
                            const resetTrivia = async () => {
                                const response = await fetchTrivia();
                                let answers = randomizeAnswers(response, 0);
                                convertSpecialCharacterCodes(response);
                                setTrivia(response);
                                setAnswers(answers);
                            };
                            resetTrivia();
                        }}
                        className="btn btn-primary mt-3"
                        style={{ padding: '10px 20px', fontSize: '1.2em', borderRadius: '5px' }}
                    >
                        Restart Quiz
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Trivia;