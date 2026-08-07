const { userModel } = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        let { email, mobNo, password, _id, token } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not exist", success: false });
        }

        if (!user.isVerified) {
            return res.json({ message: "Email or User may be not verified", success: false })
        }

        let comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return res.status(403).json({ message: "Invalid Password or Mobile", success: false })
        }

        const jwtToken = jwt.sign(
            { mobNo: user.mobNo, _id: user._id },
            process.env.VITE_JWT_SECRET,
            { expiresIn: '24h' })

        res.status(200).json({ message: "login successfully", success: true, jwtToken, user: user['name'], _id: user._id })

    }
    catch (err) {
        res.status(500).json({ message: "Error Occured! Try Again", err, success: false })
    }
}

module.exports = { login };