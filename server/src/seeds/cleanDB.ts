//import models from '../schemas/index.js';
//import db from '../config/connection.js';

import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models";

dotenv.config();

const cleanDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB.");

        //clear collections
        await User.deleteMany();
        console.log("Users cleared.");

        //space for other models

        console.log("All collections cleared. Please seed database.")
    } catch (err) {
        console.error("Error clearing database:", err);
    } finally {
        mongoose.connection.close();
        console.log("Mongo connection closed.")
    }
}

cleanDB();