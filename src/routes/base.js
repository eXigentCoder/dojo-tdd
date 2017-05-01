'use strict';
const router = require('express').Router({mergeParams: true});
module.exports = router;

router.get('/', function (req, res) {
    res.json();
});
