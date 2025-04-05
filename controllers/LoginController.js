const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Router } = require('express');

const loginValidation = require('../validations/loginValidation');

const { User } = require('../models/User');

module.exports = ({ config, db }) => {
	let api = Router();

	api.post("/", async (req, res) => {
		try {

			const { errors, isValid } = loginValidation(req.body);
			if (!isValid) return res.status(400).json({ success: false, errors });

			const { email, password } = req.body;
			const user  = await User.findOne({ email: `${email}` }).exec();

			if (!user) return res.status(404).json({ success: false, message: 'Incorrect email or password!' });

			bcrypt.compare(password, user.password).then(async isMatch => {

				if (!isMatch) return res.status(404).json({ success: false, message: 'Incorrect email or password!' });

				const payload = {
					id: user._id,
					email: user.email,
				};

				jwt.sign(
					payload,
					config.USER_SESSION_SECRET,
					{ expiresIn: config.USER_SESSION_TOKEN_EXPIRES_IN },
					(err, token) => {
						if (err) return res.status(500).json({ success: false, error: err.message });
						res.status(200).json({
							success: true,
							message: 'User successfully logged in!',
							token: "Bearer " + token
						});
					}
				);
			});
		} catch (err) {
			return res.status(500).json({ success: false, error: err.message });
		}
	});

	return api;
};