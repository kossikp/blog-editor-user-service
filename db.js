const mongoose = require('mongoose');
const config = require('./config')

module.exports = callback => {
    let mongodbUrl = config.env.mongodbUrl;
    mongoose.set('strictQuery', false);
    const db = mongoose.connect(mongodbUrl, {});
    callback(db);
}

mongoose.Promise = global.Promise