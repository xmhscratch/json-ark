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
			});

			if (Buffer.isBuffer(data)) {
				data = data.toString('utf8');
			};

			data = JSON.parse(data);
		}catch(e) {}

		return _(data).chain();
	},

	write: function(data, done) {
		fs.writeFile(this.filepath, JSON.stringify(
			data, this.options.replacer, this.options.space
		), function(error) {
			return done.call(error, data);
		});

		return data;
	}
}

module.exports = function(filepath, options) {
	var jsonScore = new JSONScore(filepath, options);
	return jsonScore;
}