import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js"; 

export const signup = async (req, res) => {
    console.log("signup called");
    try {
        console.log("reqbody", req.body);
        const { fullName, username, email, password } = req.body;
        
        console.log("fullName:", fullName);
        console.log("userName:", username);
        console.log("email:", email);
        console.log("password:", password);

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already in use" });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        // Save user and generate token
        if (newUser) {
            await newUser.save();
            generateTokenAndSetCookie(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg, 
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const login = async (req,res) => {
console.log("login called");

try{

    const{username,password}  =req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

    if(!user || !isPasswordCorrect) {
        return res.status(400).json({error: "Invalid username or password"})
    }

    generateTokenAndSetCookie(user._id,res);
    
    res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
        profileImg: user.profileImg,
        coverImg: user.coverImg, 
    });

}catch(error){
    console.log("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}
}


export const logout = async (req,res) => {
    console.log("logout");
 try{
  res.cookie("jwt","",{maxAge:0})
  res.status(200).json({message: "Logged out successfully"});
 }catch(error){
 console.log("Error in logout controller ", error.message);
 res.status(500).json({error:"Internal Server Error"});
 }
}

export const getMe = async (req, res) => {
    console.log("getMe");
	try {
        console.log("User in getMe:", req.user);
		const user = await User.findById(req.user._id).select("-password");
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

