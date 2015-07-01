#! /usr/bin/env node

require('colors');
var fs = require('fs'),
    license = require('./license.js'),
    _ = require('lodash');

var configPath = process.cwd() + '/license.json';
var config = {};
if (fs.existsSync(configPath)) {
    config = require(configPath);
} else {
    console.log('No license.json found'.yellow);
}
license(config, function (invalids) {
    if (invalids.length) {
        _.each(invalids, function (moduleData) {
            console.log(moduleData.id, moduleData.summary().join(', ').red);
        });
    } else {
        console.log('All licenses are compatible'.green);
    }
});
