const express = require("express");
const path = require('path');
const userRouter = require("./routes/userRoutes");
const cookieParser = require('cookie-parser');

const mongoose = require("mongoose");
const noteRouter = require("./routes/noteRoutes");
const staticRouter = require("./routes/staticRoutes");
const app=express();
app.set('view engine' , 'ejs');
app.set('views' , path.resolve("./views"));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/NoteApp").then(()=>{
    console.log("connected!");
}).catch((err)=>{
    console.log("Error on while connecting database");
})

app.use("/" , staticRouter);
app.use("/users",userRouter);
app.use("/note",noteRouter);

app.get("/",(req,res)=>{
    res.send("hello server");
})

app.listen(5000,()=>{
    console.log(`Server is running on http://localhost:5000`)
})