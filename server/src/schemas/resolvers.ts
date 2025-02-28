import {  User } from '../models/index.js';
import Leaderboard from '../models/Leaderboard.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 
interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  correctTriviaCount?: number;
  totalTriviaCount?: number;
  correctRiddleCount?: number;
  totalRiddleCount?: number;
}

interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}


interface Context {
  user?: User;
}

const resolvers = {
  Query: {
 
    me: async (_parent: any, _args: any, context: Context): Promise<User | null> => {
     
      if (context.user) {
        return User.findOne({ _id: context.user._id })//.populate('thoughts');
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
    getLeaderboard: async () => {
      return await Leaderboard.find().sort({ score: -1 }).limit(10);
    },
    user: async (_: any,  { username }: { username: String} ) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error(`User with username ${username} not found`);
        }
        return user;
      } catch (error) {
        console.error(error);
        throw new Error('Server error while fetching user');
      }
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    addScore: async (_:any, {username, score}: { username: string; score: number}) => {
      const newEntry = new Leaderboard({ username, score });
      return await newEntry.save();
    }
   
  },
};

export default resolvers;
