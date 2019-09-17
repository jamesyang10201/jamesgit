/*spinner */
/**
 * 数字调节器
 * author:林耘宇
 **/

 (function ($) {
    $.fn.extend({
    	an_spinner:function(){
    		var options = {};
            var funstyle = "";
            for(var i= 0; i <arguments.length;i++){
                // console.log(arguments[0]);
                var a = arguments[0];
                if(typeof a == "object"){
                    options = a;
                }else if(typeof a == "string"){
                    funstyle = a;
                }
            };

            var _options = $.extend({
                increment:1,//默认增减值
                min:0,//默认为0
                max:99999,//默认99999
                onClick:function(){}
            }, options);

            var spi = $(this);
            var sub = spi.find("[sub]");
            var val = spi.find("[val]");
            var add = spi.find("[add]");

            // 私有事件
            var getValue = "EVENT_VALUE";

            if(funstyle != ""){
				if(funstyle == "getValue"){
					var fun = arguments[1];
					spi.trigger(getValue, fun);
				};
            }else{

            	// 方法事件绑定
            	spi.bind(getValue, function(e, fun){
					fun(val.val());
            	});

				sub.click(function(e){
					var c = parseInt(val.val());
					if(c > _options.min){
						c -= _options.increment;
						val.val(c);
					};
	            });

	            add.click(function(e){
					var c = parseInt(val.val());
					if(c < _options.max){
						c += _options.increment;
						val.val(c);
					};
	            });
            }; 
    	}
	});
})(jQuery);