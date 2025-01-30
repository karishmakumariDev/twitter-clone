import express from "express"
import { login, logout, signup } from "../controllers/auth-controllers.js";
import dotenv from "dotenv" 
const router = express.Router();

dotenv.config();//mongodb+srv://kumarikarishma311329:123456@cluster0.irmdb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
console.log(process.env.MONGO_URI)
router.post("/signup", signup);
router.get("/login",login);
router.post("/logout",logout);



export default router;