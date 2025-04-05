const bcryptJs = require('bcryptjs');

const { User } = require('../models/User');

const user = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@example.com',
    password: 'password',
    confirmPassword: 'password'
}

const createUser = async data => {
    const user = await User({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
    });
    await user.save();
}

module.exports = {
    user,
    createUser,
}