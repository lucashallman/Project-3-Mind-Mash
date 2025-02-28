import { gql } from '@apollo/client';


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      
    }
  }
`;

export const QUERY_ME1 = gql`
    query me($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            email
            password
            triviapoints
            correctTriviaCount
            totalTriviaCount
            correctRiddleCount
            totalRiddleCount
        }
    }
`

export const QUERY_USER = gql`
    query getUser($username: String!) {
        user(username: $username) {
            _id
            username
            email
            password
            triviapoints
            correctTriviaCount
            totalTriviaCount
            correctRiddleCount
            totalRiddleCount
        }
    }
`

export const GET_LEADERBOARD = gql`
    query {
        getLeaderboard {
            id
            username
            score
            timestamp
        }
    }
`