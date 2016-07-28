'use strict';

var redis = require('redis');
var Promise = require('bluebird');

// Connection Configurations
var PORT = '6379';
var HOST = 'localhost';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

var storage = redis.createClient(PORT, HOST);

storage.on('error', function (err) {
  console.log('Error:', err);
});

storage.set('LastIndex', 0);

module.exports = storage;

// delete all values from all db's --> storage.flushdbAsync()