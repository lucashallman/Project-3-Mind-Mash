import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
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
    Displaydata = data.getLeaderboard
  } else {
    Displaydata = testArray
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      <ol>
        {Displaydata.map((entry: any) => (
          <li key={entry.id}>
            {entry.username}: {entry.score}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;