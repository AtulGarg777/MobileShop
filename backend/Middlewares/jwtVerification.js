const { userModel } = require('../models/UserModel')
const jwt = require('jsonwebtoken')

let jwtVerification = async (req, res, next) => {

    //get token
    console.log("cookies", req.cookies);

    let token = req.cookies.token;
    console.log(token, "token");


    let { email, mobNo, password, _id } = req.body;

    //find user with that email
    let user = await userModel.findOne({ email });

    //return if user not found
    if (!user) {
        return res.status(404).json({ message: "User doesn't exist", success: false });
    }

    //return if email is not verified
    if (!user.isVerified) {
        return res.json({ message: "Email or User may be not verified", success: false })
    }


    if (token) {
        try {
            //verify jwt token
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log("decoded", decoded);
            next()


            // return res.status(200).json({
            //     decoded,
            //     message: 'Validation Successfull',
            //     success: true,
            //     jwtToken: token,
            //     user: user['name'],
            //     _id: user._id
            // })
        }
        catch (err) {
            res.status(400).json({
                err,
                message: "Invalid Token",
                success: false
            })
        }
    } else {
        next();
    }
}

module.exports = { jwtVerification }