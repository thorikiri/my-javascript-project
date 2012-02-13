(function($) {
    $.fn.loading = function(method, config) {
        var defaults = {
            type: "floatingBarsG",
            initHide: true,
            zindex: 10
        };
        var options = $.extend(defaults, config);
        if (!method || method == "init" || options.method == "init") {
            return this.each(function(i) {
                var that = $(this);
                if (options.initHide) {
                    that.hide();
                }
                LOADING_TYPE[options.type](that);
            });
        } else if (method == "show" || options.method == "show") {
            var that = $(this);
            return this.each(function(i) {
                $(this).css({
                            "position": "absolute",
                            "top": (window.innerHeight - parseSize(that.css("height"))) / 2,
                            "left": (window.innerWidth - parseSize(that.css("width"))) / 2,
                            "z-index": options.zindex})
                        .fadeIn(method.showSpeed ? method.showSpeed : "normal");
            });
        } else if (method == "hide" || options.method == "hide") {
            return this.each(function(i) {
                $(this).fadeOut(method.hideSpeed ? method.hideSpeed : "normal", function() {
                    $(this).css({
                        "position": "static",
                        "z-index" : -1,
                        "top": "0px",
                        "left": "0px"
                    });
                });
            });
        }
        return this;
    };
    
    function parseSize(size) {
        if ($.isNumeric(size)) {
            return size;
        } else if (size.indexOf("px") >= 0) {
            return parseInt(size.replace("px", ""));
        }
        return 0;
    };
    var LOADING_TYPE = {
        "floatingBarsG": function(that) {
            for (var i = 0; i < 8; i++) {
                $("<div></div>").addClass("blockG").attr("id", "rotateG_0" + (i + 1)).appendTo(that);
            }
        },
        "facebookG": function(that) {
            for (var i = 0; i < 3; i++) {
                $("<div></div<").addClass("facebook_blockG").attr("id", "blockG_" + (i + 1)).appendTo(that);
            }
        },
        "circleG": function(that) {
            for (var i = 0; i < 3; i++) {
                $("<div></div>").addClass("circleG").attr("id", "circleG_" + (i + 1)).appendTo(that);
            }
        },
        "outer-barG": function(that) {
            var child = $("<div></div>").addClass("bar-animationG").attr("id", "front-barG");
            for (var i = 0; i < 3; i++) {
                $("<div></div>").addClass("bar-lineG").attr("id", "barG_" + (i + 1)).appendTo(child);
            }
            child.appendTo(that);
        },
        "circularG": function(that) {
            for (var i = 0; i < 8; i++) {
                $("<div></div>").addClass("circularG").attr("id", "circularG_" + (i + 1)).appendTo(that);
            }
        },
        "floatingCirclesG": function(that) {
            for (var i = 0; i < 8; i++) {
                $("<div></div>").addClass("f_circleG").attr("id", "frotateG_0" + (i + 1)).appendTo(that);
            }
        },
        "circular3dG": function(that) {
            for (var i = 0; i < 8; i++) {
                $("<div></div>").addClass("circular3dG").attr("id", "circular3d_" + (i + 1) + "G").appendTo(that);
            }
        },
        "bowlG": function(that) {
            $("<div></div>").addClass("ballG").appendTo($("<div></div>").addClass("ball_holderG").appendTo($("<div></div>").addClass("bowl_ringG").appendTo(that)));
        }
    };
})(jQuery);