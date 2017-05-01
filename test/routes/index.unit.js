'use strict';
require('../initialise');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const baseRouter = require('../../src/routes/base');

describe('Exercise 1 - Base Route', function () {
    it('Should use the base router on the / route', function () {
        const routerSpy = {
            use: sinon.spy()
        };
        const expressStub = {
            Router: function () {
                return routerSpy;
            }
        };

        proxyquire('../../src/routes', {'express': expressStub});
        routerSpy.use.should.have.been.calledWith('/', baseRouter);
    });
});