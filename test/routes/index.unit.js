'use strict';
require('../initialise');
const httpMocks = require('node-mocks-http');
const router = require('../../src/routes');
const events = require('events');

describe('1.0 Base Route', function () {
    it('Should be able to use the GET verb on the / route', function (done) {
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
});