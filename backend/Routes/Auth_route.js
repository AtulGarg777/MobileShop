const express = require('express');
const router = express.Router();
const { signupValidation } = require('../Middlewares/signupValidation');
const { loginValidation } = require('../Middlewares/loginValidation');
const { signup } = require('../Controllers/signup');
const { login } = require('../Controllers/login');

router.post('/signup', signupValidation, signup)

router.post('/login', loginValidation, login);

module.exports = router;