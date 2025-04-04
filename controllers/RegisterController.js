const jwt = require('jsonwebtoken');
const { Router } = require('express');

const { User } = require('../models/User');
const { generateHashPassword } = require('../utils/common')
const registerValidation = require('../validations/registerValidation');

module.exports = ({ config, db }) => {
    let api = Router();

    api.post('/', async (req, res) => {
        try {
            const { errors, isValid } = registerValidation(req.body);
            if (!isValid) return res.status(400).json({ success: false, errors});

            const { firstName, lastName, email, password } = req.body;

            const emailExists = await User.findOne({ email: email });

            if (emailExists) {
                errors.email = 'Email already exists!';
                return res.status(409).json({ success: false, errors });
            }

            const hashPassword = generateHashPassword(password);

            const user = User({
                firstName,
                lastName,
                email,
                password: hashPassword
            });

            const payload = {
                id: user._id,
                email: user.email
            };

            jwt.sign(
                payload,
                config.USER_REGISTRATION_SECRET,
                {},
                err => {
                    if (err) return res.status(500).json({ success: false, error: err.message });
                    user.save((err, user) => {
                        if (err) return res.status(500).json({ success: false, error: err.message });
                        res.status(200).json({ success: true, data: user, message: 'User successfully registered!' });
                    });
                }
            );
        } catch(err) {
            return res.status(500).json({ success: false, error: err.message });
        }
    });

    return api;
}