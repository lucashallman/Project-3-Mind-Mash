import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER } from "../utils/queries";

const Profile = () => {

    const { username } = useParams();
    console.log('username:', username);
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: username },
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
    console.log(data)

    if (loading) {
        return (<div>Loading...</div>)
    }

    const QuizAccuracy = () => {
        if (profile.totalTriviaCount > 0) {
            return profile.correctTriviaCount / profile.totalTriviaCount;
        }
        return 0;
    }

    return (
        <div className="profile-container anim-fadein">
            <h2 className="profilecard username">
                {profile.username}
            </h2>

            <p className="profilecard triviapoints">Trivia Points: {profile.triviapoints}</p>
            <p className="profilecard accuracy">Quiz Accuracy: {QuizAccuracy()}%</p>

        </div>
    )
}

export default Profile;