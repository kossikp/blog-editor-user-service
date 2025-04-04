require('dotenv').config();
const bcryptJs = require('bcryptjs');
const config = require('../config');

const isEmpty = value =>
    value === null ||
    value === undefined ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'string' && value.trim().length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0);

const hasEmptyKey = obj => {
    for (const key in obj._doc) {
        if (isEmpty(obj._doc[key]) && 
            (typeof obj._doc[key] !== 'object') && 
            (typeof obj._doc[key] !== 'boolean')
        ) return true;
    }
    return false;
}

const generateHashPassword = async password => {
    const salt = await bcryptJs.genSaltSync(config.SALT);
    const hash = await bcryptJs.hashSync(password, salt);
    return hash;
}

const whichEnv = () => {
    let environments = {};

    environments.dev = {
        'envName': 'dev',
        'port': process.env.PORT || 4000,
        'redisHost': process.env.REDIS_HOST,
        'redisPort': process.env.REDIS_PORT,
        'mongodbUrl': process.env.MONGODB_URL,
    };

    environments.testing = {
        'envName': 'testing',
        'port': process.env.PORT || 4001,
        'redisHost': process.env.REDIS_HOST,
        'redisPort': process.env.REDIS_PORT,
        'mongodbUrl': process.env.MONGODB_URL,
    };
    
    environments.staging = {
        'envName': 'staging',
        'port': process.env.MONGODB_PORT || 4002,
        'redisHost': process.env.REDIS_HOST,
        'redisPort': process.env.REDIS_PORT,
        'mongodbUrl': process.env.MONGODB_URL,
    };

    environments.prod = {
        'envName': 'prod',
        'port': process.env.PORT || 4003,
        'redisHost': process.env.REDIS_HOST,
        'redisPort': process.env.REDIS_PORT,
        'mongodbUrl': process.env.MONGODB_URL,
    };
   
    let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
    let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.dev;

    return environmentToExport;
}

module.exports = {
    isEmpty,
    whichEnv,
    hasEmptyKey,
    generateHashPassword
}