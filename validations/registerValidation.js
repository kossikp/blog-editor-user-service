const validator = require('validator');
const { isEmpty } = require('../utils/common');

module.exports = data => {

    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    let errors = {};

    if (!validator.isLength(data.firstName, { max: 64 })) errors.firstName = 'First name should be maximum 64 characters';
    if (isEmpty(data.firstName)) errors.firstName = 'First name field is required!';

    if (!validator.isLength(data.lastName, { max: 64 })) errors.lastName = 'Last name should be maximum 64 characters';
    if (isEmpty(data.lastName)) errors.lastName = 'Last name field is required!';

    if (!validator.isEmail(data.email)) errors.email = 'Email should be valid and be maximum 128 characters';
    if (isEmpty(data.email)) errors.email = 'Email field is required';

    if (isEmpty(data.password)) errors.password = 'Password field is required';
    if (isEmpty(data.confirmPassword)) errors.confirmPassword = 'Confirm Password field is required';
    if (!validator.equals(data.password, data.confirmPassword)) errors.password = 'Passwords do not match!';

    return {
        errors,
        isValid: isEmpty(errors)
    }
}