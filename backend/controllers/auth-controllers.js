export const signup = async (req,res) => {
    try{
     const{fullName, username,email,password} = req.body; 
     console.log("fullName",fullName);
     console.log("userName",username);
     console.log("email",email);
     console.log("password",password);

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(!emailRegex.test(email)) {
        return res.status(400).json({error: "Invalid email format"});
     }

     const existingUser = await User.findOne({username});
     
    }catch(error){

    }
}

export const login = async (req,res) => {
    res.json({
        data:"you hit the login endpoint"
    })
}


export const logout = async (req,res) => {
    res.json({
        data:"you hit the logout endpoint"
    })
}

