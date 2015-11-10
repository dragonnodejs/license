#! /usr/bin/env node
'use strict';

require('colors');
let fs = require('fs'),
    license = require('./license.js');

let configPath = process.cwd() + '/license.json';
let config = {};
if (fs.existsSync(configPath)) {
    config = require(configPath);
} else {
    console.log('No license.json found'.yellow);
}
license(config, invalids => {
    if (invalids.length) {
        for (let moduleData of invalids) {
            console.log(moduleData.id, moduleData.summary().join(', ').red);
        }
    } else {
        console.log('All licenses are compatible'.green);
    }
});
