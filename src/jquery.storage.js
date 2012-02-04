(function($) {
	var local = localStorage;
	var session = sessionStorage;
	var defaultOption = {
		type: null,
		encripto: true,
		expire: null
	};
	
	$.localStorage = $.localStorage ? $.localStorage : (function() {
		return {
			setItem: function(key, value, option) {
				if (option) {
					option = $.extend(defaultOption, option);
					if (option.type == "json") {
						value = JSON.stringify(value);
					}
					if (option.encripto) {
						value = encode(value);
					}
					local.setItem(key, value);
					if (option.expire) {
						var date = new Date();
						local.setItem(key + "_expire", getExpireDate(date, option.expire));
					}
				} else {
					local.setItem(key, value);
				}
			},
			getItem: function(key, option) {
				if (!this.hasItem(key, option)) {
					return null;
				}
				var value = local.getItem(key);
				if (!value) {
					return value;
				}
				if (option) {
					option = $.extend(defaultOption, option);
					if (option.encripto) {
						value = decode(value);
					}
					if (option.type == "json") {
						value = JSON.parse(value);
					}
				}
				return value;
			},
			removeItem: function(key, option) {
				local.removeItem(key);
				local.removeItem(key + "_expire");
			},
			clear: function() {
				local.clear();
			},
			hasItem: function(key, option) {
				var expire = local.getItem(key + "_expire");
				if (!isExpired(expire)) {
					this.removeItem(key, option);
					return false;
				}
				var value = local.getItem(key);
				return value ? true : false;
			},
			isActive: function() {
				return local ? true : false;
			}
		};
	})();
	
	$.sessionStorage = $.sessionStorage ? $.sessionStorage : (function() {
		return {
			setItem: function(key, value, option) {
				if (option) {
					option = $.extend(defaultOption, option);
					if (option.type == "json") {
						value = JSON.stringify(value);
					}
					if (option.encripto) {
						value = encode(value);
					}
					session.setItem(key, value);
					if (option.expire) {
						var date = new Date();
						session.setItem(key + "_expire", getExpireDate(date, option.expire));
					}
				} else {
					session.setItem(key, value);
				}
			},
			getItem: function(key, option) {
				if (!this.hasItem(key, option)) {
					return null;
				}
				var value = session.getItem(key);
				if (!value) {
					return value;
				}
				if (option) {
					option = $.extend(defaultOption, option);
					if (option.encripto) {
						value = decode(value);
					}
					if (option.type == "json") {
						value = JSON.parse(value);
					}
				}
				return value;
			},
			removeItem: function(key, option) {
				session.removeItem(key);
				session.removeItem(key + "_expire");
			},
			clear: function() {
				session.clear();
			},
			hasItem: function(key, option) {
				var expire = session.getItem(key + "_expire");
				if (!isExpired(expire)) {
					this.removeItem(key, option);
					return false;
				}
				var value = session.getItem(key);
				return value ? true : false;
			},
			isActive: function() {
				return session ? true : false;
			}
		};
	})();
	
	function getExpireDate(date, additional) {
		if (!additional) {
			return date2string(date);
		}
		if (additional.year) {
			date.setYear(date.getYear() + additional.year);
		}
		if (additional.month) {
			date.setMonth(date.getMonth() + additional.month);
		}
		if (additional.date) {
			date.setDate(date.getDate() + additional.date);
		}
		if (additional.hour) {
			date.setHours(date.getHours() + additional.hour);
		}
		if (additional.minute) {
			date.setMinutes(date.getMinutes() + additional.minute);
		}
		if (additional.second) {
			date.setSecond(date.getSeconds() + additional.second);
		}
		return date2string(date);
	}
	function date2string(date) {
		var str = date.getFullYear() + "/"
				+ (date.getMonth() + 1) + "/"
				+ date.getDate() + " "
				+ date.getHours() + ":"
				+ date.getMinutes() + ":"
				+ date.getSeconds();
		return str;
	}
	function isExpired(expire) {
		if (!expire) {
			return false;
		}
		var date = new Date();
		return date < expire;
	}
	function encode(value) {
		return btoa(unescape(encodeURIComponent(value)));
	}
	function decode(value) {
		return decodeURIComponent(escape(atob(value)));
	}
})(jQuery);
