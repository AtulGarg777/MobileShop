const { userModel } = require("../models/UserModel");

async function verifyEmail(req, res) {
    try {
        let { token } = req.query;
        // console.log(token);

        if (!token) {
            return res.json({ message: "Token Not Found", success: false });
        }


        let user = await userModel.findOne({
            verificationToken: token,
            verificationTokenExpireAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.json({ message: 'Token is Invalid', success: false })
        }


        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpireAt = undefined;
        await user.save();

        res.json({ message: 'Email Verified Successfully', success: true });
    } catch (err) {
        res.json({ message: 'Server Error During Email Verification', success: false });
    }
}

module.exports = verifyEmail;