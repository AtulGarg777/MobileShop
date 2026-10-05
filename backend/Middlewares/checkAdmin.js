const { userModel } = require('../models/UserModel');

let checkAdmin = async (req, res, next) => {
    // let { email } = req.body;
    console.log(req.cookies);


    let user = await userModel.findOne({ email }, { role: 1 });

    if (!user) {
        return res.status(400).json({ message: "user not found", success: false })
    }

    if (user?.role != "admin") {
        return res.status(403).json({ message: "Only Admin can access this", success: false })
    }

    // next();
}

module.exports = { checkAdmin }