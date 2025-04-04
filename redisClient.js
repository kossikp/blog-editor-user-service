const redis = require('redis');

const redisClient = redis.createClient({
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        // password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', err => console.error('Redis error:', err));
module.exports = redisClient;
