import mongoose from "mongoose";

const connectMongodb = async () => {
    try {
        const conne = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conne.connection.host}`);
    } catch (error) {  
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectMongodb;
