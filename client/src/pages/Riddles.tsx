import { fetchRiddle } from "../services/riddleService";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME1 } from "../utils/queries.ts";
import { UPDATE_USER } from "../utils/mutations.ts";

import { useEffect, useState } from 'react';
import { IRiddle } from "../interfaces/Riddle.ts";
import { IUser } from "../interfaces/User.ts";


const Riddles = () => {
    const [riddle, setRiddle] = useState<IRiddle>();
    const [user, setUser] = useState<IUser>();
    const { data } = useQuery(QUERY_ME1);
    const [updateUser] = useMutation(UPDATE_USER);

    useEffect(() => {
        console.log(data);
        let userData;
        if (data) {
            userData = data?.me
        }
        console.log(userData)
        setUser(userData);
    }, [data])

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

            // increment saved correct riddles
            const oldTotal = user?.correctRiddleCount;
            const newTotal = Number(oldTotal) + 1;
            localStorage.setItem('scoreCorrect', String(newTotal));
            const userUpdateObj2 = {
                username: user?.username || 'nouser',
                fieldName: 'correctRiddleCount',
                value: newTotal
            }
            try {
                console.log(userUpdateObj2)
                const newData = updateUser({ variables: { input: userUpdateObj2 } });
                console.log(newData);

            } catch (err) {
                console.error('error updating user data:', err);
            }
        } else {
            setResult('Incorrect. Try again.');
            setAmountIncorrect(amountIncorrect + 1);
        }
        // increment saved total riddles
        const oldTotal = user?.totalRiddleCount;
        const newTotal = Number(oldTotal) + 1;
        localStorage.setItem('scoreCorrect', String(newTotal));
        const userUpdateObj2 = {
            username: user?.username || 'nouser',
            fieldName: 'totalRiddleCount',
            value: newTotal
        }
        try {
            console.log(userUpdateObj2)
            const newData = updateUser({ variables: { input: userUpdateObj2 } });
            console.log(newData);

        } catch (err) {
            console.error('error updating user data:', err);
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