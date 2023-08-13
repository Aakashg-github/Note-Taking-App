const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTEAPI";   

const signup = async (req,res)=> {
    //existing user check
    //hashed password
    //user genration
    //token generation

    const {fullname , signup_email , signup_password} = req.body;
    try{
        const existinguser = await userModel.findOne({email : signup_email}); 
        if(existinguser){
            return res.redirect('/');
        }

        const hashedPassword = await bcrypt.hash(signup_password,10);

        const result = await userModel.create({
            email : signup_email,
            password : hashedPassword,
            username : fullname
        });

        const token = jwt.sign({email : result.email, id : result._id},SECRET_KEY);
        // res.status(201).json({user : result, token : token});
        res.cookie('uid',token);
        return res.redirect('/note');

    }catch(error){
        console.log(error);
        res.status(500).json({message : "something went wrong"});
    }
}

const signin = async (req,res)=> {
    const {email , password}=req.body;
    try{
        const existinguser = await userModel.findOne({email : email}); 
        if(!existinguser){
            return res.redirect('/');
        }

    const matchPassword = await bcrypt.compare(password,existinguser.password);

    if(!matchPassword){
        return res.status(400).json({message : "password not matched"});
    }

    const token = jwt.sign({email : existinguser.email, id : existinguser._id},SECRET_KEY);
    // res.status(201).json({user : existinguser, token : token});
    res.cookie('uid',token);
    return res.redirect('/note');

    }catch(error){
        console.log(error);
        res.status(500).json({message : "something went wrong"});
    }
}

module.exports = {signup,signin};