'use strict';

let nlf = require('nlf');

module.exports = (config, callback) => {
    config.nlf = config.nlf || {};
    config.nlf.depth = config.nlf.depth || 0;
    config.licenses = config.licenses || [];
    config.proprietaries = config.proprietaries || [];
    config.ignores = config.ignores || [];
    nlf.find(config.nlf, (err, data) => {
        let invalids = [];
        for (let moduleData of data) {
            let valid = false;
            for (let license of moduleData.summary()) {
                if (license == 'proprietary' && config.proprietaries.indexOf(moduleData.name) !== -1) {
                    valid = true;
                } else if (config.licenses.indexOf(license) !== -1) {
                    valid = true;
                } else if (config.ignores.indexOf(moduleData.name) !== -1) {
                    valid = true;
                }
            }
            if (!valid) {
                invalids.push(moduleData);
            }

        }
        callback(invalids);
    });
};
