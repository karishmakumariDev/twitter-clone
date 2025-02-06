import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js"; 
import authRoutes from "./routes/auth.routes.js"; // Fix typo in variable name
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import cloudinary from "cloudinary";

dotenv.config(); 


cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});


const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/notifications", notificationRoutes);

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
        console.log(`Server is running on port ${8000}`);
        
    });
}


startServer();
