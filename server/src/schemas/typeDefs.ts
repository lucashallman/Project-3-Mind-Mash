const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    triviapoints: Int
    correctTriviaCount: Int
    totalTriviaCount: Int
    correctRiddleCount: Int
    totalRiddleCount: Int
  }

  input UserUpdateArgs {
    username: String!
    fieldName: String!
    value: Int!
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
    user(username: String!): User
  }

  type Mutation {
    addScore(username: String!, score: Int!): LeaderboardEntry
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    updateUserScore(input: UserUpdateArgs!): User
  }
`


export default typeDefs;
