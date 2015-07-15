var fs = require('fs');
var path = require('path');
var _ = require('underscore');

module.exports = function(filePath, data, options, done) {
	options = (options || {});
	_.defaults(options, {
		encoding: 'utf-8',
		replacer: null,
		space: null
	});

	filePath = path.normalize(filePath);
	fs.readFile(filePath, { encoding: options.encoding }, function(error, content) {
		if (error) {
			return done(error, data);
		}

		data = _.extend({}, data, JSON.parse(content));
        fs.writeFile(filePath, JSON.stringify(
        	data, options.replacer, options.space
    	), function(error) {
			return done.call(error, data);
		});
	});
}