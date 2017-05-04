'use strict';
require('../initialise');
const httpMocks = require('node-mocks-http');
const router = require('../../src/routes/base');
const events = require('events');
const http = require('http');
const _ = require('lodash');
const packageName = require('../../package.json');
//TODO refactor this mock http logic to prevent duplication.

describe('[Unit] Exercise 1 - Base Router', function () {
    describe("'/' route", function () {
        it('1.1 Should be able to use the GET verb on the / route', function (done) {
            const reqOptions = {
                method: 'GET',
                url: '/'
            };
            mockRequest(router, reqOptions, resComplete, shouldCallNext(done));
            function resComplete(res) {
                expect(res.statusCode).to.equal(200);
                done();
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
                    mockRequest(router, reqOptions, shouldNotReturnResponse(done), shouldCallNext(done));
                });
            });
        });
        describe('1.3 The response should contain:', function () {
            it('1.3.1 The name of the application', function (done) {
                const reqOptions = {
                    method: 'GET',
                    url: '/'
                };
                mockRequest(router, reqOptions, resComplete, shouldNotCallNext(done));
                function resComplete(res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.name).to.equal(packageName.name);
                    done();
                }
            });
        });
    });
});

function mockRequest(middlewareOrRouter, reqOptions, responseCallback, nextCallback) {
    const req = httpMocks.createRequest(reqOptions);
    const res = httpMocks.createResponse({
        eventEmitter: events.EventEmitter
    });
    res.on('end', function () {
        let resToReturn;
        try {
            resToReturn = {
                statusCode: res._getStatusCode(),
                body: JSON.parse(res._getData()),
                headers: res._getHeaders(),
                raw: res
            };
        }
        catch (err) {
            return responseCallback(err);
        }
        responseCallback(null, resToReturn);
    });
    middlewareOrRouter(req, res, nextCallback);
}

function shouldNotCallNext(done) {
    return function next(err) {
        if (err) {
            return done(err);
        }
        return done(new Error('Next should not have been called'));
    };
}

function shouldCallNext(done) {
    return function next(err) {
        if (err) {
            return done(err);
        }
        return done();
    };
}

function shouldNotReturnResponse(done) {
    return function resComplete() {
        done(new Error('res.end should not have been called'));
    };
}