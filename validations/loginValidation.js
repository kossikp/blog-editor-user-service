const validator = require('validator');
const { isEmpty } = require('../utils/common');

module.exports = data => {
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    let errors = {};

    if (!validator.isEmail(data.email)) errors.email = 'Email should be valid!';
    if (isEmpty(data.email)) errors.email = 'Email field is required!';

    if (isEmpty(data.password)) errors.password = 'Password field is required!';

    return {
        errors,
        isValid: isEmpty(errors)
    }
}