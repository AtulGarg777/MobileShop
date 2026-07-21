const Joi = require('joi');
const { userModel } = require('../models/UserModel');


const loginValidation = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(100).required(),
    })
    let { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "error occured", success: false, error })
    }

    next();
}

module.exports = { loginValidation };