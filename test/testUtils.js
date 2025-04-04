const bcryptJs = require('bcryptjs');

const { User } = require('../models/User');

const user = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@example.com',
    password: 'password'
}

const getSignInData = data => {
    return {
        email: data.email,
        password: data.password
    };
}


const createUser = async data => {
    const user = await User({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
    });
    user.save().then(user => {
        console.log(`User ${user.firstName} successfully created!`);
    }).catch(err => console.log(err.message));
}

module.exports = {
    user,
    createUser,
    getSignInData,
}