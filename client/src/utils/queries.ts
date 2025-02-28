import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            triviapoints
            correctTriviaCount
            totalTriviaCount
            correctRiddleCount
            totalRiddleCount
        }
    }
`