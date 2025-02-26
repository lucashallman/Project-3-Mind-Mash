
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
                <Link to="/play-trivia" className="home-button">Play Trivia</Link>
                <Link to="/solve-riddle" className="home-button">Solve a Riddle</Link>
            </div>
        </div>
    )
};


const Home = () => {




  return (
    <div>
      <h1>Welcome to Mind Mash!</h1>
    </div>
  );    
};

export default Home;
