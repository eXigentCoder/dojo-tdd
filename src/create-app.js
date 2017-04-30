'use strict';
const express = require('express');

module.exports = function createApp(callback) {
    const app = express();
    return callback(null, app);
};