var moment = require('moment');

var register = function (Handlebars) {
	var helpers = {
		// put all of your helpers inside this object
		moment: function (date, format) {
			return moment(date).format(format);
		},
		substring: function (string, min, max) {
			return string.substring(min, max);
		},
		formatCurrency: function (value) {
			return ('R$' + value.toFixed(2).toString().replace(".", ","));
		},
		ifCond: function (v1, operator, v2, options) {
			switch (operator) {
				case '==':
					return (v1 == v2) ? options.fn(this) : options.inverse(this);
				case '===':
					return (v1 === v2) ? options.fn(this) : options.inverse(this);
				case '!=':
					return (v1 != v2) ? options.fn(this) : options.inverse(this);
				case '!==':
					return (v1 !== v2) ? options.fn(this) : options.inverse(this);
				case '<':
					return (v1 < v2) ? options.fn(this) : options.inverse(this);
				case '<=':
					return (v1 <= v2) ? options.fn(this) : options.inverse(this);
				case '>':
					return (v1 > v2) ? options.fn(this) : options.inverse(this);
				case '>=':
					return (v1 >= v2) ? options.fn(this) : options.inverse(this);
				case '&&':
					return (v1 && v2) ? options.fn(this) : options.inverse(this);
				case '||':
					return (v1 || v2) ? options.fn(this) : options.inverse(this);
				default:
					return options.inverse(this);
			}
		},
		multiply: function(value, multiplier, offset) {
			return parseFloat(value)*(parseFloat(multiplier) + parseFloat(offset));
		},
		log: function(obj) {
			console.log(obj);
		}
	};

	if (Handlebars && typeof Handlebars.registerHelper === "function") {
		// register helpers
		for (var prop in helpers) {
			Handlebars.registerHelper(prop, helpers[prop]);
		}
	} else {
		// just return helpers object if we can't register helpers here
		return helpers;
	}

};

module.exports.register = register;
module.exports.helpers = register(null);
