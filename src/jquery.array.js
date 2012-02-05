(function($) {
	$.reverse = function(object, callback, args) {
		if (!$.isArray(object)) {
			return object;
		}
		var length = object.length;
		if (args) {
			for (var i = length - 1; i >= 0; i--) {
				if (callback.apply(object[i], args) === false) {
					break;
				}
			}
		} else {
			for (var i = length - 1; i >= 0; i--) {
				if (callback.call(object[i], i, object[i]) === false) {
					break;
				}
			}
		}
		return object;
	};
})(jQuery);