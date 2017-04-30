'use strict';
require('./initialise');
const proxyquire = require('proxyquire');
const pathToIndexFile = '../index';
const sinon = require('sinon');

describe('Index.js', function () {
    it('Should call create app', function () {
        const createAppStub = sinon.spy();
        proxyquire(pathToIndexFile, {'./src/create-app': createAppStub});
        createAppStub.should.have.been.calledOnce();
    });

    it('Should throw the error if createApp causes an error', function () {
        const testError = new Error('Test error');
        const createAppStub = function (callback) {
            callback(testError);
        };
        expect(function () {
            proxyquire(pathToIndexFile, {'./src/create-app': createAppStub});
        }).to.throw(testError);
    });
});