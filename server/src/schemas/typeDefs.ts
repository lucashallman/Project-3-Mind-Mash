const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }

  input ThoughtInput {
    thoughtText: String!
    thoughtAuthor: String!
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
