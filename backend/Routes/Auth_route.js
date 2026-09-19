const express = require('express');
const router = express.Router();
const { signupValidation } = require('../Middlewares/signupValidation');
const { loginValidation } = require('../Middlewares/loginValidation');
const { signup } = require('../Controllers/signup');
const { login } = require('../Controllers/login');
const verifyEmail = require('../Controllers/verifyEmail');
const { jwtVerification } = require('../Middlewares/jwtVerification');

router.post('/signup', signupValidation, signup)

router.post('/login', loginValidation, jwtVerification, login);

router.post('/verifyEmail', verifyEmail);

module.exports = router;