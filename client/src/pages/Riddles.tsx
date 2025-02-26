import {fetchRiddle} from "../services/riddleService";


import {useEffect, useState} from 'react';
import {IRiddle} from "../interfaces/Riddle.ts";


const Riddles = () => {
    const [riddle, setRiddle] = useState<IRiddle>();
    useEffect(() => {
        const getRiddle = async () => {
            try {
                const response = await fetchRiddle();
                console.log(response);
                setRiddle(response);
            } catch (err) {
                console.log('Error loading riddle.');
                console.error('Error fetching riddle:', err);
            }
        };
        getRiddle();
    }, []);
    const [amountCorrect, setAmountCorrect] = useState<number>(0);
    const [amountIncorrect, setAmountIncorrect] = useState<number>(0);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const checkAnswer = () => {
        if (riddle?.answer.toLowerCase().includes(userAnswer.toLowerCase())) {
            setResult('Correct!');
            setAmountCorrect(amountCorrect + 1);
        } else {
            setResult('Incorrect. Try again.');
            setAmountIncorrect(amountIncorrect + 1);
        }
    }
    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    return (
        <div>
            <h1>Riddle</h1>
            <button onClick={() => window.location.reload()}>Skip</button>
            <h3>{riddle?.title}</h3>
            <p>{riddle?.question}</p>
            <input 
                type="text" 
                placeholder="Enter your answer" 
                onChange={(e) => setUserAnswer(e.target.value)} 
                disabled={result === 'Correct!' || showAnswer}
            />
            <button onClick={checkAnswer} disabled={result === 'Correct!'}>Submit</button>
            {result && <p>{result}</p>}
            <button onClick={() => setShowAnswer(true)}>Show Answer</button>
            {showAnswer && <p>Answer: {riddle?.answer}</p>}
        </div>
    );
};

export default Riddles;
//         convertSpecialCharacterCodes(answers[0]);