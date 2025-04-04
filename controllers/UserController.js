const { Router } = require('express');

const config = require('../config');
const { User } = require('../models/User');
const passport = require('../middleware/passport');

module.exports = ({ config, db }) => {
  let api = Router();

  return api;
};