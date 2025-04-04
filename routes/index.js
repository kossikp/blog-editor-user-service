const express = require('express');

const config = require('../config');
const initializeDb = require('../db');
const middleware = require('../middleware');

const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');

let router = express.Router();

initializeDb(db => {
    router.use(middleware({ config, db }));
    router.use('/', UserController({ config, db }));
    router.use('/login', LoginController({ config, db }));
    router.use('/register', RegisterController({ config, db }));
});

module.exports = router;