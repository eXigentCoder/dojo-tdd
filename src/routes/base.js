'use strict';
const router = require('express').Router({mergeParams: true});
module.exports = router;
const packageJson = require('../../package.json');

router.get('/', function (req, res) {
    res.json({
        name: packageJson.name
    });
});
