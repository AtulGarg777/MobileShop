const { userModel } = require('../models/UserModel');
const bcrypt = require('bcrypt');


const signup = async (req, res) => {
    try {
        let { name, email, password, mobNo, address } = req.body;
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "user already exist", success: false })
        } else {
            console.log('error');

        }
        console.log("signup");

        let newUser = new userModel({ name, email, password, mobNo, address });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(200).json({ message: "Singup Successfully", success: true })
    } catch (err) {
        res.status(500).json({ message: "internal Server error", success: false })
    }
}

module.exports = { signup };