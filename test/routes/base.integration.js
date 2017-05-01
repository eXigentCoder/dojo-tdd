'use strict';
const common = require('../integration-initialise');
const request = require('supertest');
const http = require('http');
const _ = require('lodash');

describe('[Integration] Exercise 1 - Base Router', function () {
    describe("GET '/' route", function (done) {
        it('1.1 Should result in a 200 response when doing a GET on the / route', function () {
            request(common.app).get('/')
                .expect(200)
                .end(done);
        });
        describe('1.2 Should not allow verbs other than the GET, HEAD, OPTIONS verb on the / route', function () {
            const methods = _.pull(http.METHODS, 'GET', 'HEAD', 'OPTIONS', 'CONNECT');
            methods.forEach(function (method) {
                it(`Should result in the next function being called for the ${method} method`, function (done) {
                    request(common.app)[method.toLowerCase()]('/')
                        .expect(404)
                        .end(done);
                });
            });
        });
    });
});
