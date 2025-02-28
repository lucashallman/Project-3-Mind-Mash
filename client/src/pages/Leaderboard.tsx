import { useQuery } from "@apollo/client";

import { GET_LEADERBOARD } from "../utils/queries";

const Leaderboard = () => {
  const { loading, error, data } = useQuery(GET_LEADERBOARD);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const testArray = []
  for  (let i = 0; i < 10; i++) {
    const newEntry = { username: `${i}`, score: i}
    testArray.push(newEntry)
  }

  let Displaydata = [{ username: 'displaydata', score: 1}];

  if (data) {
    console.log('received leaderboard data:', data)
    Displaydata = data.getLeaderboard
  } else {
    Displaydata = testArray
  }

  const sortedData = [...Displaydata].sort((a, b) => b.score - a.score);
  const leaderboardData = []

  for (let i = 0; i < sortedData.length; i++) {
    const leaderboardEntry = <li className="trivia-answer">{i + 1}: {sortedData[i].username} with {sortedData[i].score} Trivia Points!</li>
    leaderboardData.push(leaderboardEntry);
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {/* {sortedData.map((entry: any) => (
          <li key={entry.id}>
            {entry.value}
          </li>
        ))} */}
        {leaderboardData}
      </ul>
    </div>
  );
};

export default Leaderboard;