const redis = require("redis");

const url = process.env.REDIS_URL

const client = redis.createClient({
    url: url
})

module.exports = client;