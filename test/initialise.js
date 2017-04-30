'use strict';
const chai = require('chai');
const dirtyChai = require('dirty-chai');
chai.use(dirtyChai);

global.chai = chai;
global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should();