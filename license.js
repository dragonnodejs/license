var nlf = require('nlf'),
    _ = require('underscore');

module.exports = function (config, callback) {
    config.nlf = config.nlf || {};
    config.nlf.depth = config.nlf.depth || 0;
    config.licenses = config.licenses || [];
    config.proprietaries = config.proprietaries || [];
    config.ignores = config.ignores || [];
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
