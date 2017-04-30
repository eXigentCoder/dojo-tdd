'use strict';
const util = require('util');
const packageJson = require('./package.json');
const port = 8843;
const createApp = require('./src/create-app');

createApp(appCreated);

function appCreated(err, app) {
    if (err) {
        throw err;
    }
    app.listen(port, function () {
        console.info(util.format('%s is listening at http://%s:%s', packageJson.name, 'localhost', port));
    });
}