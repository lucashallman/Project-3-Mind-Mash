// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';


const Home = () => {
    const { data } = useQuery(QUERY_ME);
    const user = data?.me;
    

    // !! TEMPORARY USERNAME MOCK !! DO NOT SHIP !! REMOVE BEFORE MONDAY !!
    // const [username, setUsername] = useState<string>('username_def')

    // const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setUsername(e.target.value)
    //     localStorage.setItem('username', e.target.value);
    // }

    const scoreCorrect = localStorage.getItem('scoreCorrect');

    if (!scoreCorrect) {
        localStorage.setItem('scoreCorrect', '0');
    }

    const scoreTotal = localStorage.getItem('scoreTotal');

    if (!scoreTotal) {
        localStorage.setItem('scoreTotal', '0');
    }

    // !! END MOCK !!

    return (
        <div className="home-container anim-fadein">
                <h1>Welcome to Mind Mash {user ? user.username : ''}!</h1>


            <section className="description">
                <p>
                    Challenge yourself with exciting trivia questions or brain teasing riddles and climb the leaderboards!      
                </p>
            </section>
            <div className="button-container">
                <Link to="/Trivia" className="home-button-trivia">Play Trivia</Link>
                <Link to="/Riddle" className="home-button-riddle">Solve a Riddle</Link>
            </div>
            {/* !! TEMPORARY USERNAME MOCK !! DO NOT SHIP !! REMOVE BEFORE MONDAY !! */}
            {/* <div>
                <input 
                    type="text" 
                    placeholder='username'
                    onChange={handleUsernameChange}
                    value={username}
                />
            </div> */}
            {/* !! END MOCK !! */}
        </div>
    )
};

export default Home;
