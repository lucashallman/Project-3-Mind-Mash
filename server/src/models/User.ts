import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the User document
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  triviapoints: number;
  correctTriviaCount: number;
  totalTriviaCount: number;
  correctRiddleCount: number;
  totalRiddleCount: number;
  //thoughts: Schema.Types.ObjectId[];
  isCorrectPassword(password: string): Promise<boolean>;
}

// Define the schema for the User document
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    triviapoints: {
      type: Number,
      default: 0,
    },
    correctTriviaCount: {
      type: Number,
      default: 0,
    },
    totalTriviaCount: {
      type: Number,
      default: 0,
    },
    correctRiddleCount: {
      type: Number,
      default: 0,
    },
    totalRiddleCount: {
      type: Number,
      default: 0,
    },
    // thoughts: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Thought',
    //   },
    // ],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

userSchema.pre<IUser>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
