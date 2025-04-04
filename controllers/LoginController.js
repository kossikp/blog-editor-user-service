const jwt = require('jsonwebtoken');
const bcryptJs = require('bcryptjs');
const randomstring = require('randomstring');
const validator = require('validator');
const { Router } = require('express');

const { User } = require('../models/User');

module.exports = ({ config, db }) => {
	let api = Router();

	return api;
};