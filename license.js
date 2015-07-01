var nlf = require('nlf'),
    _ = require('lodash');

module.exports = function (config, callback) {
    config = _.merge({
        nlf: {
            depth: 0
        },
        licenses: [],
        proprietaries: [],
        ignores: []
    }, config);
    nlf.find(config.nlf, function (err, data) {
        var invalids = [];
        _.each(data, function (moduleData) {
            var valid = false;
            _.each(moduleData.summary(), function (license) {
                if (license == 'proprietary' && config.proprietaries.indexOf(moduleData.name) !== -1) {
                    valid = true;
                } else if (config.licenses.indexOf(license) !== -1) {
                    valid = true;
                } else if (config.ignores.indexOf(moduleData.name) !== -1) {
                    valid = true;
                }
            });
            if (!valid) {
                invalids.push(moduleData);
            }
        });
        callback(invalids);
    });
};
