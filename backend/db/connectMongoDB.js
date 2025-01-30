import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config(); 

const connectMongoDB = async () => {
// console.log("process env", process.env.MONGO_URI);

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {  
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectMongoDB;

