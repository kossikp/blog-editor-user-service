const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { Router } = require('express');
const randomstring = require('randomstring');

const config = require('../config');
const { User } = require('../models/User');

module.exports = ({ config, db }) => {
    let api = Router();

    return api;
}