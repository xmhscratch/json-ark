var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var JSONScore = function(filepath, options) {
	options = (options || {});
	_.defaults(options, this.options);
	this.options = options;

	this.filepath = path.normalize(filepath);

	_.mixin({
		write: this.write.bind(this)
	});

	return this.read();
}

JSONScore.prototype = {
	filepath: null,

	options: {
		encoding: 'utf-8',
		replacer: null,
		space: null
	},

	read: function() {
		var data = {};
		try	{
			fs.existsSync(this.filepath);

			data = fs.readFileSync(this.filepath, {
				encoding: this.options.encoding
			}).toString('utf8');

			data = JSON.parse(data);
		}catch(e) {
			data = {};
		}

		return _(data).chain();
	},

	write: function(data) {
		fs.writeFileSync(this.filepath, JSON.stringify(
			data, this.options.replacer, this.options.space
		), {
			encoding: this.options.encoding
		});

		return data;
	}
}

module.exports = function(filepath, options) {
	return new JSONScore(filepath, options);
}