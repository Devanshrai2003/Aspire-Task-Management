const {Router} = require("express");
const {UserModel} = require("../database");
const { z } = require("zod");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const path = require("path");
const JWT_SECRET = process.env.JWT_SECRET;

const userRouter = Router();

//Add the user to the Database
userRouter.post("/signup", async function(req, res) {
    
    const requiredBody = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(8).max(30),
    email: z.string().email().min(5).max(100),
    })
    
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success){
       return res.json({
            message: parsedDataWithSuccess.error.issues[0].message
        })
    }
    
    const {username, password, email} = parsedDataWithSuccess.data; 

    const hashedPassword = await bcrypt.hash(password, 5)

    await UserModel.create({
        username: username,
        password: hashedPassword,
        email: email
    })

    res.json({
        message: "You have successfully signed up"
    })

    res.sendFile(path.join(__dirname, "public/homepage.html"));

})


// Match username and password and generate a token if password matches
userRouter.post("/login", async function(req, res) {
    
    const {username, password} = req.body;

    const user = await UserModel.findOne({
        username: username,
    })

    if(!user){
        return res.status(403).json({
          message: "Incorrect username or password",
        });
      }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
        return res.status(403).json({
        message: "Incorrect username or password",
        });
    }

    if(passwordMatch){
       const token = jwt.sign({
            id: user._id
        }, JWT_SECRET);

        res.json({
            token,
            userId: user._id,
            message: "Login successful",
        });
    }

})

module.exports = {
    userRouter: userRouter,
}