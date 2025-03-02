import { useQuery } from "@apollo/client";
import { NavLink, useNavigate } from "react-router-dom";

import { GET_LEADERBOARD } from "../utils/queries";
import { useState } from "react";


const Leaderboard = () => {
  const [searchUser, setSearchUser] = useState<string>('');
  let navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  }

  const handleSubmit = () => {
    if (searchUser.trim()) {
      navigate(`/Profile/${searchUser}`);
    }
  }

  const { loading, error, data } = useQuery(GET_LEADERBOARD);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const testArray = []
  for (let i = 0; i < 10; i++) {
    const newEntry = { username: `${i}`, score: i }
    testArray.push(newEntry)
  }

  let Displaydata = [{ username: 'displaydata', score: 1 }];

  if (data) {
    console.log('received leaderboard data:', data)
    Displaydata = data.getLeaderboard
  } else {
    Displaydata = testArray
  }

  const sortedData = [...Displaydata].sort((a, b) => b.score - a.score);
  const leaderboardData = []

  for (let i = 0; i < sortedData.length; i++) {
    const entryLink = `/Profile/${sortedData[i].username}`
    const leaderboardEntry = <li className="leader-card">{i + 1}: <NavLink to={entryLink} className={({ isActive }) => (isActive ? 'active' : '')}>{sortedData[i].username}</NavLink> with {sortedData[i].score} Correct Answers!</li>
    leaderboardData.push(leaderboardEntry);
  }

  return (
    <div className="leaderboard anim-fadein">
      <h1>Leaderboard</h1>
      <ul>
        {/* {sortedData.map((entry: any) => (
          <li key={entry.id}>
            {entry.value}
          </li>
        ))} */}
        {leaderboardData}
      </ul>
      <div className="search-container">
        <input
          id="search"
          type="text"
          value={searchUser}
          onChange={handleInputChange}
          placeholder="Find a Mind!"
        />
        <button onClick={handleSubmit}>Go!</button>
      </div>
    </div>
  );
};

export default Leaderboard;