'use strict';
require('../initialise');
const httpMocks = require('node-mocks-http');
const router = require('../../src/routes/base');
const events = require('events');
const http = require('http');
const _ = require('lodash');

describe('[Unit] Exercise 1 - Base Router', function () {
    describe("'/' route", function () {
        it('1.1 Should be able to use the GET verb on the / route', function (done) {
            const reqOptions = {
                method: 'GET',
                url: '/'
            };
            const req = httpMocks.createRequest(reqOptions);
            const res = httpMocks.createResponse({
                eventEmitter: events.EventEmitter
            });
            res.on('end', function () {
                expect(res._getStatusCode()).to.equal(200);
                done();
            });
            router(req, res, next);

            function next(err) {
                if (err) {
                    return done(err);
                }
                return done(new Error('Next should not have been called'));
            }
        });
        describe('1.2 Should not allow verbs other than the GET, HEAD, OPTIONS verb on the / route', function () {
            const methods = _.pull(http.METHODS, 'GET', 'HEAD', 'OPTIONS');
            methods.forEach(function (method) {
                it(`Should result in the next function being called for the ${method} method`, function (done) {
                    const reqOptions = {
                        method: method,
                        url: '/'
                    };
                    const req = httpMocks.createRequest(reqOptions);
                    const res = httpMocks.createResponse({
                        eventEmitter: events.EventEmitter
                    });
                    res.on('end', function () {
                        done(new Error('res.end should not have been called'));
                    });
                    router(req, res, next);

                    function next(err) {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    }
                });
            });
        });
    });
});