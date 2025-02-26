
import { Link } from 'react-router-dom';
/*import { useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';*/


const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Mind Mash!</h1>
            <section className="description">
                <p>
                    Challenge yourself with exciting trivia questions or brain teasing riddles and climb the leaderboards!      
                </p>
            </section>
            <div className="button-container">
                <Link to="/Trivia" className="home-button-trivia">Play Trivia</Link>
                <Link to="/Riddle" className="home-button-riddle">Solve a Riddle</Link>
            </div>
        </div>
    )
};

export default Home;
