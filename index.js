require("dotenv").config();

const express =require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

const { userRouter } = require("./routes/user");
const { todosRouter } = require("./routes/todos");
const { default: axios } = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/todos", todosRouter);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the "images" directory
app.use(express.static(path.join(__dirname, "images")));


// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/homepage.html"));
});


async function serve(){
try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to mongoDB")
        app.listen(3000); 
    }catch(error){
        console.log("error connecting to mongoDB")
    }
}

serve();