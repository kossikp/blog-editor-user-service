const mongoose = require('mongoose');
const config = require('./config')

module.exports = callback => {
    let mongoUrl = config.env.mongoUrl;
    mongoose.set('strictQuery', false);
    const db = mongoose.connect(mongoUrl, {});
    callback(db);
}

mongoose.Promise = global.Promise