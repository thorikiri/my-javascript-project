(function($) {
    $.fn.hashchange = function(config) {
        var defaults = {};
        var options = $.extend(defaults, config);
        return this.each(function(i) {
            if (options.callback) {
                $(this).bind("hashchange", options.param, options.callback);
            } else {
                $(this).trigger("hashchange", options.param);
            }
        });
    };
})(jQuery);