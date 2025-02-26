import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_ME } from "../utils/queries";

const Profile = () => {

    const { userId } = useParams();

    const { loading, data } = useQuery(QUERY_ME, {
        variables: { profileId: userId },
    });

    const profile = data?.user || {
        username: 'DEFAULT_USER',
        password: 'DEFAULT_PASSWORD',
        email: 'DEFAULT@EMAIL.TEST',
        triviapoints: 0,
        totalTriviaCount: 0,
        correctTriviaCount: 0,
        totalRiddleCount: 0,
        correctRiddleCount: 0
    };

    if (loading) {
        return (<div>Loading...</div>)
    }

    const QuizAccuracy = () => {
        if (profile.totalTriviaCount > 0) {
            return profile.correctTriviaCount / profile.totalTriviaCount;
        }
        return 0;
    }

    return(
        <>
            <h2 className="card">
                {profile.username}
            </h2>
            <ul>
                <li>Trivia Points: {profile.triviapoints}</li>
                <li>Quiz Accuracy: {QuizAccuracy()}</li>
            </ul>
        </>
    )
}

export default Profile;