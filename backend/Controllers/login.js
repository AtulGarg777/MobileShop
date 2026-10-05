const { userModel } = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        let { email, mobNo, password, _id } = req.body;
        let user = await userModel.findOne({ email });

        console.log("verification part");

        if (!user) {
            return res.status(404).json({ message: "User doesn't exist", success: false });
        }

        if (!user.isVerified) {
            return res.json({ message: "Email or User may be not verified", success: false })
        }


        let comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
            return res.status(403).json({ message: "Invalid Password or Mobile", success: false })
        }


        let jwtToken = jwt.sign(
            {
                mobNo: user.mobNo,
                _id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' });

        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax'
        })

        res.status(200).json({ message: "login successfully", success: true, user: user['name'], _id: user._id, email })

    }
    catch (err) {
        res.status(500).json({ message: "Error Occured! Try Again", err, success: false })
    }
}

module.exports = { login };