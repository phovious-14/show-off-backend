const jwt = require("jsonwebtoken")
const {userModel} = require("../model/userModel")

const authenticate = async (req,res,next) => {
    try {

        const token = req.headers['authorization'];   // get token from cookie
        
        const verifyToken = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY) // verify token

        const rootUser = await userModel.findOne({_id:verifyToken._id, "tokens.token":token}) // find user with token
        if(!rootUser){ throw new Error("unauthorized user") } // if user not found

        req.token = token // add token to request
        req.rootUser = rootUser // getting whole documetn of student 

        next()

    } catch (error) {
        res.status(403).send("unauthorized token provided")
    }
}

module.exports = authenticate