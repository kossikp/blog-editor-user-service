const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../config');
const { User } = require('../models/User');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.USER_ACCESS_SECRET;

module.exports = passport => {
    passport.use('user',
        new JwtStrategy(opts, (payload, done) => {
            User.findById(payload.id).then(user => {
                if (user) return done(null, user);
                return done(null, false);
            }).catch(err => console.log(err));
        })
    );
};