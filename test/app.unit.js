'use strict';
require('./initialise');

const createApp = require('../src/create-app');
const express = require('express');
describe('create-app', function () {
    it("Should return an express app", function (done) {
        createApp(appCreated);
        function appCreated(err, app) {
            if (err) {
                return done(err);
            }
            expect(app).to.be.ok();
            expect(typeof app).to.equal(typeof express());
            done();
        }
    });
});