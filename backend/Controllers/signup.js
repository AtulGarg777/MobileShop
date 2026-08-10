const { userModel } = require('../models/UserModel');
const bcrypt = require('bcrypt');
const mailTransporter = require('../Utils/mailTransporter');
const crypto = require('crypto');


const signup = async (req, res) => {
    try {
        let { name, email, password, mobNo, address } = req.body;
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "user already exist", success: false })
        }
        let verificationToken = crypto.randomBytes(32).toString('hex');
        const tokenExpires = Date.now() + 24 * 60 * 60 * 1000;

        let newUser = new userModel({ name, email, password, mobNo, address, verificationToken, verificationTokenExpireAt: tokenExpires });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        let baseUrl = process.env.FRONTEND_URL;
        let verifyUrl = `${baseUrl.replace(/\/+$/, "")}/auth/verifyEmail?token=${verificationToken}`;
        mailTransporter({ verifyUrl: verifyUrl, to: email });


        res.status(200).json({ message: "Singup Successfully", success: true })
    } catch (err) {
        res.status(500).json({ message: "internal Server error", success: false })
    }
}

module.exports = { signup };