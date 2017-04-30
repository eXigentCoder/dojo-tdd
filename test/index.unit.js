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

    it('Should call listen if createApp returns a new app', function () {
        const appStub = {
            listen: sinon.spy()
        };
        const createAppStub = function (callback) {
            callback(null, appStub);
        };
        proxyquire(pathToIndexFile, {'./src/create-app': createAppStub});

        appStub.listen.should.have.been.calledOnce();
    });

    it('Should log to the console if createApp returns a new app', function () {
        sinon.spy(console, 'info');
        const appStub = {
            listen: function (port, callback) {
                callback();
                console.info.should.have.been.calledOnce();
            }
        };
        const createAppStub = function (callback) {
            callback(null, appStub);
        };
        proxyquire(pathToIndexFile, {'./src/create-app': createAppStub});
    });
});