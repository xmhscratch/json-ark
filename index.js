var fs = require('fs');
var path = require('path');

var JSONScore = function(filepath, options) {
	this.filepath = path.normalize(filepath);
	options = (options || {});

	this.options.engine.defaults(options, this.options);
	this.options = options;

	this.options.engine.mixin({
		write: this.write.bind(this)
	});

	return this.read();
}

JSONScore.prototype = {
	filepath: null,

	options: {
		defaultValue: [],
		encoding: 'utf-8',
		replacer: null,
		space: null,
		engine: require('underscore')
	},

	read: function() {
		var data = this.options.defaultValue || [];
		try	{
			fs.existsSync(this.filepath);

			data = fs.readFileSync(this.filepath, {
				encoding: this.options.encoding
			}).toString('utf8');

			data = JSON.parse(data);
		}catch(e) {
			data = this.options.defaultValue || [];
		}

		return this.options.engine(data).chain();
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