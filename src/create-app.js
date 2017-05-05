'use strict';
const express = require('express');
const routes = require('./routes/index');
module.exports = function createApp(callback) {
    const app = express();
    app.use(routes);
    return callback(null, app);
};