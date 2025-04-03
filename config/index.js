const randomstring = require('randomstring');

const { whichEnv } = require('../utils/common');

const USER_SESSION_SECRET = randomstring.generate({ length: 64, charset: 'alphanumeric' });
const USER_SESSION_TOKEN_EXPIRES_IN = 60 * 60 * 0.30; // 1 day

module.exports = {
    'SALT': 10,
    'bodyLimit': '100kb',

    'env': whichEnv(),

    'bodyLimit': '100kb',

    'APP_NAME': 'blog-editor-user-service',

    'USER_SESSION_SECRET': USER_SESSION_SECRET,
    'USER_SESSION_TOKEN_EXPIRES_IN': USER_SESSION_TOKEN_EXPIRES_IN,
    'USER_ACCESS_SECRET': process.env.USER_ACCESS_SECRET,
}