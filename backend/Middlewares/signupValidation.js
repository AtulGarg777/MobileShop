const Joi = require('joi');

const signupValidation = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(100).required(),
        mobNo: Joi.string().optional(),
        address: Joi.object({
            pincode: Joi.number().required(),
            addressLine: Joi.string().required()
        }),
    })
    let { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "error occured", success: false, error })
    }

    next();
}

module.exports = { signupValidation };