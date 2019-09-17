/*tabs */
/**
 * 分页模块
 * author:林耘宇
 **/
(function ($) {
    $.fn.extend({
        an_tabs:function(){
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
                index:1,//默认打开
                fit:true,//默认自适应
                height:0,
                width:0,
                hidden:"",//隐藏tabs:0不可见 1可见 [1, 0, 1];
                onClick:function(){}
            }, options);

            var _stringclass = {
                head:"m-tabs-header",
                body:"m-tabs-content",
                hidden:"f-hidden",
                item:"item",
                active:"activate"
            };

            var tabs = $(this);
            var head = $(this).children("."+_stringclass.head);
            var body = $(this).children("."+_stringclass.body);
            var item = body.children("." + _stringclass.item);

            if(funstyle != ""){
                //方法写入
                if(funstyle == "hidden"){
                    var arr = arguments[1];
                    var choose = getChoose(arr);
                    _options.hidden = arr;
                    show(choose);

                    head.find("li").each(function(i, e){
                        var t = $(e);
                        t.removeClass();
                        if(isHidden(i) == 0){
                            t.hide();
                        }else if(isHidden(i) == 1){
                            t.show();
                            if(i == choose){
                                t.toggleClass(_stringclass.active);
                            }
                        };
                    });

                    // 默认选择第一个 显示的页签
                    function getChoose(arr){
                        var choose = 0;
                        for(var i = 0; i < arr.length; i++){
                            if(arr[i] == 1){
                                choose = i;
                                break;
                            }
                        };
                        return choose;
                    };
                };
            }else{

                if($(this)[0]){
                    $(this)[0].option = _options;
                }
                
                
                var tabstyle = "";
                var contentstyle = "";
                // var pheight = tabs.parent().height();//父级高度

                // console.log(tabs.parent().css("height"))
                var bodyPadding = parseInt(item.css("padding-left"));
                if(!bodyPadding){
                    bodyPadding = 0;
                }
    			//alert(bodyPadding);
    			
                var headHeight = head.outerHeight() + bodyPadding *2;
                
                if(!_options.fit){
                    var pheight = tabs.parent().height();
                    var pwidth = tabs.parent().width();
                    if(_options.height>0){
                        pheight = _options.height;
                    }
                    if(_options.width>0){
                        pwidth = _options.width;
                    }
                    tabs.height(pheight).width(pwidth);
                    body.children().height(pheight - headHeight-1).width(pwidth - bodyPadding*2-2);
                }else{
                    fitlayout();
                    tabs.bind("layout", function(){
                        fitlayout();
                    })
                };

                start();

                function start(){
                    if(tabs.children().find(_stringclass.head)){
                        choose(_options.index - 1);
                    }

                    //绑定事件
                    head.find("li").each(function(i, e){
                        var $e = $(e);
                        $e.is('li') || ($e = $e.closest('li'));
                        $e.click(function(event){
                            choose(i);
                            _options.onClick(event);
                            tabs.trigger(andy.EVENT_CLICK, i+1);
                        })
                    })
                };

                function choose(index){
                    head.children("ul").children().each(function(i, e){
                        var t = $(e);
                        if(index == i){
                            if(!t.hasClass(_stringclass.active)){
                                t.toggleClass(_stringclass.active);
                            }
                        }else{
                            if(isHidden(i) == 0){
                                t.hide()
                                // t.addClass(_stringclass.hidden);
                            }
                            t.removeClass();
                        }
                    })
                    // hiddenTabs();
                    show(index);
                };

                function fitlayout(){
                    var pheight = tabs.parent().height();
                    var pwidth = tabs.parent().width();
                    tabs.height(pheight).width(pwidth);
                    body.children().height(pheight - headHeight-1).width(pwidth - bodyPadding*2-2);
                    // tabs.trigger("layout_complete");//出发布局结束
                };
            };

            function show(index){
                body.children().each(function(i, e){
                    var t = $(e);
                    if(index == i){
                        if(t.hasClass(_stringclass.hidden)){
                            t.toggleClass(_stringclass.hidden);
                            // andy.layout(t);
                        }
                    }else{
                        t.addClass(_stringclass.hidden);
                    }
                });
                if(body[0]){
                    andy.layout(body);
                };
            };

            // 执行隐藏
            function isHidden(index){
                if(_options.hidden != ""){
                    if(typeof(_options.hidden[index]) == "number"){
                        return _options.hidden[index];
                    }
                }else{
                    return 1;
                };
            };
        }
    })
})(jQuery);