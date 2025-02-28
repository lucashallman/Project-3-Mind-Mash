const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    triviapoints: Int
    correctTriviaCount: Int
    totalTriviaCount: Int
    correctRiddleCount: Int
    totalRiddleCount: Int
  }



  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type LeaderboardEntry {
    id: ID!
    username: String!
    score: Int!
    timestamp: String!
  }

  type Query {
    getLeaderboard: [LeaderboardEntry]
    me: User
  }

  type Mutation {
    addScore(username: String!, score: Int!): LeaderboardEntry
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    
  }
`


export default typeDefs;
