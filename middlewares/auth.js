const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTEAPI";

const auth = (req, res, next)=>{

    try {
        let token = req.cookies?.uid;
        if(token){
            console.log(token);
            //token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY );
            console.log(user);
            req.userId = user.id;
        }
        else{
            console.log(token);
            return res.status(401).json({message: "Unauthorized User"});
        }

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized User"});
    }

}

module.exports = auth;