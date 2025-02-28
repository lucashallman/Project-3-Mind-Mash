import {fetchRiddle} from "../services/riddleService";


import {useEffect, useState} from 'react';
import {IRiddle} from "../interfaces/Riddle.ts";


const Riddles = () => {
    const [riddle, setRiddle] = useState<IRiddle>();
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

    useEffect(() => {
        getRiddle();
    }, []);
    const [amountCorrect, setAmountCorrect] = useState<number>(0);
    const [amountIncorrect, setAmountIncorrect] = useState<number>(0);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const checkAnswer = () => {
        if (riddle?.answer.toLowerCase().includes(userAnswer.toLowerCase()) && userAnswer !== '') {
            setResult('Correct!');
            setAmountCorrect(amountCorrect + 1);
        } else {
            setResult('Incorrect. Try again.');
            setAmountIncorrect(amountIncorrect + 1);
        }
    }
    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>

            
            <h3>{riddle?.riddle}</h3>
            <input 
            type="text" 
            placeholder="Enter your answer" 
            onChange={(e) => setUserAnswer(e.target.value)} 
            disabled={result === 'Correct!' || showAnswer}
            style={{ padding: '10px', width: '80%', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <div style={{ margin: '10px 0' }}>
            <button 
                onClick={checkAnswer} 
                disabled={result === 'Correct!'}
                className="btn btn-primary mt-3"
                style={{ padding: '10px 20px', fontSize: '1.2em', borderRadius: '5px', marginRight: '10px' }}
            >
                Submit
            </button>
            <button 
                onClick={() => setShowAnswer(true)}
                className="btn btn-primary mt-3"
                style={{ padding: '10px 20px', fontSize: '1.2em', borderRadius: '5px', marginRight: '10px' }}
            >
                Show Answer
            </button>
            <button 
                onClick={() => {
                    setShowAnswer(false);
                    setResult('');
                    setUserAnswer('');
                    getRiddle();
                    window.location.reload();
                }}
                className="btn btn-primary mt-3"
                style={{ padding: '10px 20px', fontSize: '1.2em', borderRadius: '5px', marginRight: '10px' }}
            >
                Next
            </button>
            </div>
            {result && <p>{result}</p>}
            {showAnswer && <p>Answer: {riddle?.answer}</p>}
        </div>
    );
};

export default Riddles;