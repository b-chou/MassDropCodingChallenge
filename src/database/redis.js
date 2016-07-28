const redis = require('redis');
const Promise = require('bluebird');

// Connection Configurations
const PORT = '6379';
const HOST = 'localhost';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const storage = redis.createClient(PORT, HOST);

storage.on('error', (err) => {
  console.log('Error:', err);
});

storage.set('LastIndex', 0);

module.exports = storage;

// delete all values from all db's --> storage.flushdbAsync()
