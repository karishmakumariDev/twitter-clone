import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js"; 
import authRoutes from "./routes/auth.routes.js"; // Fix typo in variable name

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000; 

app.use("/api/auth", authRoutes);

app.use(express.json());

async function startServer() {
    try {
        await connectMongoDB();
        startNodeServer();
    } catch(err) {
        console.log("error while starting server", err.message);
    }
}

function startNodeServer() {
    app.listen(8000, () => {
        console.log(`Server is running on port ${PORT}`);
        
    });
}


startServer();
