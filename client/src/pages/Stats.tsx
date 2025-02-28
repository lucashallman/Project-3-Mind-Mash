import React, { useEffect, useState } from 'react';

const Stats: React.FC = () => {
    const [correctAnswerScore, setCorrectAnswerScore] = useState<number | null>(null);
    const [incorrectAnswerScore, setIncorrectAnswerScore] = useState<number | null>(null);
    const [ratio, setRatio] = useState<number | null>(null);
    useEffect(() => {
        const score = localStorage.getItem('numberCorrect');
        const incorrectScore = localStorage.getItem('numberIncorrect');
        if (score) {
            setCorrectAnswerScore(Number(score));
        }
        if (score && incorrectScore) {
            const correct = Number(score);
            const incorrect = Number(incorrectScore);
            const ratio = (correct / (correct + incorrect)) * 100;
            setRatio(ratio);
            
        }
        if (incorrectScore) {
            setIncorrectAnswerScore(Number(incorrectScore));
        }
    }, []);

    return (
        <div>
            <h1>User Stats</h1>
            <p>Total Correct Answer Score: {correctAnswerScore !== null ? correctAnswerScore : 'No score available'}</p>
            <p>Total Incorrect Answer Score: {incorrectAnswerScore !== null ? incorrectAnswerScore : 'No score available'}</p>

                    <p className="card-text">Percent Correct: {ratio !== null ? `${ratio.toFixed(2)}%` : 'No ratio available'}</p>


        </div>
    );
};

export default Stats;