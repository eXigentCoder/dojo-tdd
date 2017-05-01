'use strict';
const createApp = require('../src/create-app');
const defaultTimeout = 10000; //10 seconds

let initialised = false;
before(function (done) {
    if (initialised) {
        return process.nextTick(done);
    }
    initialised = true;
    this.timeout(defaultTimeout);
    createApp(appCreated);

    function appCreated(err, app) {
        if (err) {
            return done(err);
        }
        module.exports.app = app;
        done();
    }
});

module.exports = {
    defaultTimeout,
    app: null
};