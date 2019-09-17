//公共方法类 所有方法均可以直接调用
    //设置对象zindex
    //参数：对象路径， zindex层级
    //使用方法 an_setZindex(element, index);
	var 
    an_setZindex = function (element, index) 
    {
        $(element).css("z-index", index);
    },
    //IEtest 浏览器甄别
    an_IE = function () 
    {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 0;
        var ieversion;
        if (Sys.ie) {
            ieversion = parseInt(Sys.ie);
            if (ieversion < 11) {
                return ieversion ;
            }
        }
        else {
            return '请在IE下测试！' ;
        }
    },
    //浏览器启动全屏
    an_fullscreen = function () 
    {
        //ie浏览启动器全屏(需要设置ie浏览器Internet选项-安全-Internet-自定义级别中-对未标记为可安全执行脚本的ActiveX控件初始化并执行脚本 点启用）
        var ieInto = function () 
        {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
                wscript.SendKeys("{F11}");
            }
        }
        //非ie浏览器启动全屏
        var into = function (element) 
        {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            }
            else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
            else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }
            else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            ieInto();
        }
        else {
            into(document.documentElement);
        }
    },
    //退出全屏
    an_exitFullscreen = function () 
    {
        //ie浏览退出器全屏
        var ieExit = function () 
        {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
                wscript.SendKeys("{F11}");
            }
        }
        //非ie浏览器退出全屏
        var exit = function () 
        {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            ieExit();
        }
        else {
            exit();
        }
    },
    //敲击回车事件
    //an_enter({element:要绑定回车事件的dom节点、id、class,callback:回车事件中要执行的函数})----调用回车事件函数
    an_enter = function (element, callback) 
    {
        var element = element == undefined ? document : element;
        $(element).keydown(function () 
        {
            if (event.keyCode == 13) {
                callback();
            }
        }) 
    },
    //移除回车事件
    //an_unenter({element:要移除回车事件的dom节点、id、class})------调用移除回车事件函数
    an_unEnter = function (element) 
    {
        $(element).off("keydown");
    },
    //读取数据方法 传入数据地址和加载完成后执行的方法callback
    //an_loaddata("xx.json", function(data){ console.log(data) })
    an_loaddata = function (dataUrl, callback) 
    {
        $.get(dataUrl, function (data, status) 
        {
            if (status == "success") {
                callback(data);
            }
            else {
                console.log(dataUrl + "|load data is failure!");
            };
        });
    },
    //弹出覆盖层...
    an_overlay = function (target, content, callback, style) 
    {
        var overlaydiv = '<div class="loading_bg ' + style + ' animated fadeIn">' + content + '</div>';
        if (target == 'top' && window.top.$('body').find('.loading_bg').length == 0) {
            window.top.$('body').append(overlaydiv);
        }
        else if (target == 'top' && window.top.$('body').find('.loading_bg').length == 1) {
            window.top.$('body').find('.loading_bg').html(content);
        }
        else if (target == 'self' && $('body').find('.loading_bg').length == 0) {
            $('body').append(overlaydiv);
        }
        else if (target == 'self' && $('body').find('.loading_bg').length == 1) {
            $('body').find('.loading_bg').html(content);
        }
        else if (target != 'self' && target != 'top' && $('body').find('.loading_bg').length == 0) 
        {
            $(target).append(overlaydiv);
            $(target).find('.loading_bg').css({
                'position' : 'absolute'
            });
        }
        else if (target != 'self' && target != 'top' && $('body').find('.loading_bg').length == 1) {
            $(target).find('.loading_bg').html(content);
        }
        if (typeof callback == 'function') 
        {
            callback();
        }
    },
    an_closeoverlay = function (callback) 
    {
        var loading_bg = window.top.$('body').find('.loading_bg');
        loading_bg.addClass('fadeOut');
        setTimeout(function () 
        {
            loading_bg.remove();
            if (typeof callback == 'function') 
            {
                callback();
            }
        }, 200);
    },
    //页面加载loding...
    an_loading = function (target, text, callback) 
    {
        var content = '<div class="loading_bg_center"><span class="quarters-loader"></span><p id="loadingtext">' + text + '</p></div>';
        an_overlay(target, content);
        if (typeof callback == 'function') 
        {
            callback();
        }
    },
    //内容拷贝
    an_copy = function (content, tip) 
    {
        if ($("#copytextarea").length == 0)
        {
            $('body').append("<textarea id='copytextarea' style='height:0; border:0; width:0; display:block; opacity:0'></textarea>");
        }
        var copybox = $("#copytextarea");
        copybox.text(content);
        copybox.select();
        // 选择对象 
        document.execCommand("Copy");
        // 执行浏览器复制命令 
        alert(tip);
    },
    //自动滚动条
    an_scrollbar = function ()
    {
        $('.scrollbar').each(function (index, element) 
        {
            var scrh = $(this).height(), scrw = $(this).width();
            $(this).mCustomScrollbar(
            {
                setWidth : scrw, setHeight : scrh, axis : "y", scrollbarPosition : "inside", autoDraggerLength : true, 
                autoHideScrollbar : true, autoExpandScrollbar : true, alwaysShowScrollbar : 0, mouseWheel : {
                    enable : true 
                },
                keyboard : {
                    enable : true 
                },
                theme : "minimal-dark", scrollInertia : 800, live : 'on' 
            });
        });
    },
    //默认图片...
    an_img = function () 
    {
        $("img[src='#']").each(function (index, element) 
        {
            var imgW = $(this).width(), imgH = $(this).height();
            if ($(this).attr('title') == '' || $(this).attr('title') == undefined) {
                var imgtitle = '';
            }
            else {
                var imgtitle = $(this).attr('title') + ' ';
            }
            $(this).removeAttr('src').attr('data-src', 'holder.js/' + imgW + 'x' + imgH + '?font=Lucida Family&text=' + imgtitle + imgW + '×' + imgH);
        });
    },
   
    //页面跳转...
    an_url = function (url, target) 
    {
        if (target == 'top') {
            top.location = url;
        }
        else if (target == 'self') {
            self.location = url;
        }
        else {
            window.top.contentWindow.find(target).attr('src', url);
        }
    },
    //ajax加载...
    an_dataurl = function () 
    {
        $("[data-url]").each(function () 
        {
            var dataurl = $(this).attr('data-url');
            var datacallback = $(this).attr('data-callback');
            $(this).load(dataurl, datacallback);
        });
    },
    //a链接默认失效
    an_a = function () 
    {
        $("[href='#']").each(function (index, element) 
        {
            $(this).attr('href', 'javascript:void(0)');
        });
    },
    //单选多选样式渲染
    an_checked = function ()
    {
        $(".an_checkbox").each(function (index, element) 
        {
            var $this = $(element), 
			    $text = $this.attr('title'),
			    package = '';
            if ($this.attr('type') == 'checkbox' && $this.hasClass('switch') == false) {
                package = '<label class="i-checks"></label>' 
            }
            else if ($this.attr('type') == 'radio') {
                package = '<label class="i-checks"></label>' 
            }
            else if ($this.attr('type') == 'checkbox' && $this.hasClass('switch'))
            {
                package = '<label class="i-switch m-r-sm"></label>';
                $text = '<span class="textmax">' + $this.attr('title') + '</span>';
            }
            if ($this.parent().is('label')) {
                //已经封装过的选择器不在渲染
                return false 
            }
            else {
                $this.wrap(package);
                $this.after(' <i></i>' + $text);
            }
            var clickbox = $this.parent();
            if ($this.hasClass('checkbox-inline')) {
                clickbox.addClass('checkbox-inline');
            }
        });
    },
    //随机颜色获取
    an_getRandomColor = function () 
    {
        return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
    },
    //判断是否为近似颜色
    //使用 isSimilarColor("#FFFFFF","#F0FFFE",10);
    an_isSimilarColor = function (sHexColorA, sHexColorB, nOffset) 
    {
        this.offsetNum = Math.abs(nOffset);
        this.offsetNum > 255 ? this.offsetNum = this.offsetNum - 256 : "";
        var arrNumA = [parseInt(sHexColorA.substring(1, 3), 16), parseInt(sHexColorA.substring(3, 5), 
        16), parseInt(sHexColorA.substring(5, 7), 16)];
        // console.log(arrNumA,"aaa")
        var arrNumB = [parseInt(sHexColorB.substring(1, 3), 16), parseInt(sHexColorB.substring(3, 5), 
        16), parseInt(sHexColorB.substring(5, 7), 16)];
        // console.log(arrNumB, "bbb")
        for (var i = 0; i < arrNumA.length; i++) 
        {
            // console.log(arrNumA[i], arrNumB[i], this.offsetNum, i)
            if (Math.abs(arrNumA[i] - arrNumB[i]) > this.offsetNum) {
                return false;
            }
        }
        return true;
    },
    an_closesearch = function (e, h, i)
    {
        var t = $(e).text();
        if (t == '高级搜索')
        {
            $(i).layout('panel', 'north').panel('resize', {
                height : h
            });
            $(i).layout('resize');
            $(e).text('关闭搜索');
        }
        if (t == '关闭搜索')
        {
            $(i).layout('panel', 'north').panel('resize', {
                height : 1
            });
            $(i).layout('resize');
            $(e).text('高级搜索');
        }
    },
    //中继器
    //设置中继器，属性 方法 都可以
    an_setWindow = function (options)
    {
        var element = this.window.top.an_element;
        if (element) {
            this.window.top.an_element = $.extend(this.window.top.an_element, options);
        }
        else {
            this.window.top.an_element = options;
        }
    },
    //从中继器获取，设置的属性 方法
    an_getWindow = function (options)
    {
        return this.window.top.an_element;
    },
    //执行 为idXX的iframe里面的name方法，options为参数
    an_toWindow = function (id, name, options) 
    {
        //平级查找||当前子集查找
        var box = window.top.$("#" + id)[0] || $("#" + id)[0];
        if (!box) {
            //平级子集查找
            box = window.top.$("iframe").contents().find("#" + id)[0];
        }
        box = box.contentWindow;
        // var box = window.top.document.getElementById(id).contentWindow;
        // var windowbox = element[0] ? element : $(this).contents().find("#" + id);
        if (box && box[name]) {
            //element.call(name);
            box[name](options);
        }
        else {
            console.log("don't have this id!") 
        }
    };
    $.fn.an_queue = function (options)
    {
        var fun = options.queue;
        $(this).queue("goqueue", fun);
        // $.fn.an_queue.start();
    };
    $.fn.an_queue.next = function (time)
    {
        var $this = $(this);
        if (time) {
            var s = setTimeout(function ()
            {
                $this.dequeue("goqueue");
            }, time) 
        }
        else {
            $this.dequeue("goqueue");
        }
    };
 //图片加载等待
    $.fn.an_imgLoad = function (options)
    {
        var opts = $.extend({
            time : 4000, ///等待载入时间，如果超过这个时间就直接执行回调  
            callback : function () {} //默认回调  
        }, options);
        var $this = this, i = 0, j = 0, len = this.length;
        $this.each(function ()
        {
            var _this = this, dateSrc = $(_this).attr("date-src"), imgsrc = dateSrc ? dateSrc : _this.src;
            var img = new Image();
            img.onload = function ()
            {
                img.onload = null;
                _this.src = imgsrc;
                i++;
            };
            img.src = imgsrc;
        });
        var t = window.setInterval(function ()
        {
            j++;
            //$("#msg").html(i);  
            if (i == len || j * 200 >= opts.time) {
                window.clearInterval(t);
                opts.callback();
            };
        }, 200);
    };
	/*global  window , an_IE,document,console */
/**
 * 对话框模块
 * author:chenxiaoying
 **/
(function ($) {
    "use strict";
    var DBODYHOFFSET = 84,
        DIALOGZ = 9000,
        massageCfg = {
            "成功": {title: "成功!", icon: 'check', buttons: [{text: '确定'}]},
            "错误": {title: "错误!", icon: 'times', buttons: [{text: '返回'}]},
            "禁止": {title: "禁止!", icon: 'minus', buttons: [{text: '返回'}]},
            "警告": {title: "警告!", icon: 'warning', buttons: [{text: '返回'}, {text: '继续'}]},
            "选择": {title: "选择!", icon: 'exclamation'},
            "提示": {title: "提示!", icon: 'exclamation'},
            "default": {title: "提示!", icon: 'question'}
        },
        find = function (argu) {
            var id, o, windowbox;
            if (argu) {
                if (typeof argu === "object") {
                    windowbox = $(argu).parents(".an_dialog");
                    //如果长度是0，表示没有找到，弹出的是内嵌iframe
                    //怎么才能获取外面的窗体对象呢
                    if (windowbox.length === 0) {
                        //argu = window.winIndex;
                        windowbox=undefined;
                    }
                }
                if (typeof argu === "string") {
                    id = argu.indexOf("#") > -1 ? argu : "#" + argu;
                    //获取窗体，这里可能会有问题
                    o = window.top.$(id);
                    windowbox = o[0] ? o : window.top.$('iframe').contents().find(id);
                }
            }
            return windowbox;
        },
    //显示窗口动画
        doAnimation = function (e, name, callback) {
            var ie = andy.IE();
            if (!(ie <= 8)) {
                e.addClass(name);
                window.setTimeout(function () {
                    e.removeClass(name);
                    if (callback) {
                        callback(e);
                    }
                }, 500);
            } else {
                if (callback) {
                    callback(e);
                }
            }
        },
    //设置窗口位置,默认居中
        setPos = function (win, x, y) {
            var winShadow, iframeW, windowH, windowW, args, t = "", l = "", r = "", b = "";
            winShadow = win.next('.an_dialog_shadow');
            //args = $(win.eq(0)).data("an_dialog").options;
            args = window.top.$.data(win[0], "an_dialog").options;
            iframeW = win.parents("html")[0] || window.top;
            windowH = $(iframeW).height();
            windowW = $(iframeW).width();
            l = x || ((windowW - win.width()) / 2);
            t = y || ((windowH - win.height()) / 2);
            t = (andy.IE() === 6&&t!=="") ? t + iframeW.scrollTop:t;
            if (args.location) {
                if (args.location.indexOf("left") !== -1) {
                    l = 5;
                }
                if (args.location.indexOf("top") !== -1) {
                    t = 5;
                    t = (andy.IE() === 6&&t!=="") ? t + iframeW.scrollTop:t;
                }
                if (args.location.indexOf("right") !== -1) {
                    r = 5;
                    l = "";
                }
                if (args.location.indexOf("bottom") !== -1) {
                    b = 5;
                    t = "";
                    if( andy.IE() === 6){
                        // alert("iframeW.scrollTop-"+iframeW.scrollTop+", iframeW.clientHeight-"+iframeW.clientHeight);
                       t = iframeW.scrollTop + iframeW.clientHeight- 5 -win.eq(0).height();
                    }
                }
            }
            // _top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight/2));
                  
             // alert("l-"+l+",t-"+t+",r-"+r+",b-"+b);
            win.eq(0).css({"left": l, "top": t, "right": r, "bottom": b}); 
            winShadow.css({"left": l, "top": t, "right": r, "bottom": b});
        },
    //重置窗口大小
        reSize = function (win, w, h) {
            var options, iframeW, windowH, windowW, winShadow, winMask, winBody, bodyHeightOff;
            //options = win.data("an_dialog").options;
            //options = $(win.eq(0)).data("an_dialog").options;
            options = window.top.$.data(win[0], "an_dialog").options;
            winShadow = win.next('.an_dialog_shadow');
            winMask = winShadow.next('.an_dialog_mask');
            winBody = win.find('.an_dialog_body');
            iframeW = win.parents("html")[0] || window.top;
            windowH = $(iframeW).height();
            windowW = $(iframeW).width();
            bodyHeightOff = options.buttons && options.buttons.length > 0 ? DBODYHOFFSET : DBODYHOFFSET - 45;
            if (arguments.length === 2 && w === "max") {
                win.height (windowH - 30);
                win.width (windowW - 20);
                winBody.height (windowH - bodyHeightOff - 30);
                winBody.width(windowW - 20 - 4);
            } else {
                if (h !== undefined) {
                    h = h > windowH ? windowH - 20 : h;
                    win.height (h);
                    winBody.height(h === "" ? h : h - bodyHeightOff);
                }
                if (w !== undefined) {
                    w = w > windowW ? windowW - 20 : w;
                    win.width (w);
                    winBody.width(w === "" ? w : w - 4);
                }
            }
            winShadow.height (win.outerHeight() + 2);
            winShadow.width (win.outerWidth() + 2);
            winMask.height(windowH);
            winMask.width(windowW);
        },
        close = function (win) {
            var winShadow, winMask, moveRect, options, parent;
            if (win) {
                winShadow = win.next('.an_dialog_shadow');
                winMask = winShadow.next('.an_dialog_mask');
                try {
                    //options = $(win.eq(0)).data("an_dialog").options;
                    options = window.top.$.data(win[0], "an_dialog").options;
                }
                catch (e) {
                    throw "can not close this dialog!";
                }
                if (!options.onBeforeClose || (options.onBeforeClose && options.onBeforeClose())) {
                    doAnimation(winShadow, options.aniClose);
                    doAnimation(win.eq(0) || win, options.aniClose, function () {
                        //移除框
                        moveRect = win.nextAll('div[dialogMoveRect="true"]');
                        if (moveRect) {
                            moveRect.remove();
                        }
                        ////console.log(win.parent('body').data('events')["click"]);
                        //隐藏窗体
                        win.hide();
                        winShadow.hide();
                        winMask.hide();
                        //解除事件绑定
                        //执行关闭事件
                        if (options.onClose) {
                            options.onClose();
                        }
                        //如果有父窗体，需要关闭父窗体
                        if (options.parent) {
                            parent = find(options.parent);
                            if (parent) {
                                close(parent);
                            }
                        }
                        //移除窗体
                        win.remove();
                        winShadow.remove();
                        winMask.remove();
                    });
                }
            }
        },
       
        headDragInit = function () {
            var root, module = {}, dmouseDown, wMain, wMask, wShadow, moveRect, dmouseMove, dragStart = false, pos = {}, posing = {}, offset = {}, dragType, dmouseUp, changeCursor,
                cursor = [{cls: "move", coe: [1, 1, 0, 0]},
                    {cls: "n-resize", coe: [0, 1, 0, -1]},
                    {cls: "ne-resize", coe: [0, 1, 1, -1]},
                    {cls: "e-resize", coe: [0, 0, 1, 0]},
                    {cls: "se-resize", coe: [0, 0, 1, 1]},
                    {cls: "s-resize", coe: [0, 0, 0, 1]},
                    {cls: "sw-resize", coe: [1, 0, -1, 1]},
                    {cls: "w-resize", coe: [1, 0, -1, 0]},
                    {cls: "nw-resize", coe: [1, 1, -1, -1]}];
            moveRect = window.top.$('<div dialogMoveRect="true" style="border: 1px dashed dodgerblue; position: absolute; "></div>');
            //wMain = win.eq(0);
            //改变鼠标样式，有9种可能,从上开始，顺时针一圈
            changeCursor = function (e) {
                var target = e.target || e.srcElement;
                if (dragStart) {
                    return;
                }
                dragType = "";
                //目标元素或者目标元素在拖动元素里面
                //这种情况鼠标样式可以由css控制
                if (target.getAttribute("an_dialog_drag")) {
                    wMain = $(target).parents(".an_dialog");
                    if (target.getAttribute("an_dialog_drag") === "true") {
                        dragType = 0;
                    }
                } else if (target.getAttribute("an_dialog_resize")) {
                    wMain = $(target);
                } else if (target.getAttribute("an_dialog")) {
                    wMain = $(target).parents(".an_dialog");
                } else {
                    wMain = undefined;
                }
                if (wMain) {
                    if (wMain.attr("an_dialog_resize") === "true") {
                        //上
                        if (wMain.position().top < e.y && e.y < wMain.position().top + 5) {
                            dragType = 1;
                        }
                        //右
                        if (wMain.position().left + wMain.outerWidth() > e.x && e.x > wMain.position().left + wMain.outerWidth() - 5) {
                            dragType = dragType ? 2 : 3;
                        }
                        //下
                        if (wMain.position().top + wMain.outerHeight() > e.y && e.y > wMain.position().top + wMain.outerHeight() - 5) {
                            dragType = dragType ? 4 : 5;
                        }
                        //左
                        if (wMain.position().left < e.x && e.x < wMain.position().left + 5) {
                            dragType = dragType === 1 ? 8 : (dragType === 5 ? 6 : 7);
                        }
                    }
                    wShadow = wMain.next();
                    wMask = wShadow.next();
                    wMain.css("cursor", dragType ? cursor[dragType].cls : "");
                }
                return dragType;
            };
            dmouseDown = function (e) {
                changeCursor(e);
                if (wMain && dragType !== "") {
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    dragStart = true;
                    //pos.x = posing.x = e.x;
                    //pos.y = posing.y = e.y;
                    pos.x = posing.x = e.clientX;
                    pos.y = posing.y = e.clientY;
                    moveRect.css("left", wMain.offset().left);
                    moveRect.css("top", wMain.offset().top);
                    moveRect.css("z-index", DIALOGZ + root.winIndex * 4 + 3);
                    moveRect.width(wMain.outerWidth());
                    moveRect.height(wMain.outerHeight());
                    wMain.parent('body').append(moveRect);
                    wMain.parent('body').css("cursor", cursor[dragType].cls);
                    wMask.addClass("an_dialog_dragLayer");
                }
            };
            dmouseMove = function (e) {
                var coe;
                if (!dragStart) {
                    changeCursor(e);
                } else {
                    offset.x = e.clientX - posing.x;
                    offset.y = e.clientY - posing.y;
                    coe = cursor[dragType].coe;
                    moveRect.css("left", moveRect.offset().left + offset.x * coe[0]);
                    moveRect.css("top", moveRect.offset().top + offset.y * coe[1]);
                    moveRect.width(moveRect.width() + offset.x * coe[2]);
                    moveRect.height(moveRect.height() + offset.y * coe[3]);
                    posing.x = e.clientX;
                    posing.y = e.clientY;
                    //return true;
                }
            };
            dmouseUp = function (e) {
                var coe, x, y, w, h, options,iframeW;
                if (dragStart === true && wMain && cursor[dragType]) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    offset.x = e.clientX - pos.x;
                    offset.y = e.clientY - pos.y;
                    coe = cursor[dragType].coe;
                    x = wMain.position().left + offset.x * coe[0];
                    y = wMain.position().top + offset.y * coe[1];
                    w = wMain.width() + offset.x * coe[2];
                    h = wMain.height() + offset.y * coe[3];
                    //options = wMain.data("an_dialog").options;
                    options = window.top.$.data(wMain[0], "an_dialog").options;
                    if ((coe[2] + coe[3]) !== 0||coe[2]*coe[3]===-1) {
                        options.onResize(w, h);
                        reSize(wMain, w, h);
                    }
                    if ((coe[0] + coe[1]) !== 0) {
                        options.onMove(x, y);
                        if(andy.IE() === 6){
                             iframeW = wMain.parents("html")[0] || window.top;
                             y = y - iframeW.scrollTop;
                        }                        
                        setPos(wMain, x, y);
                    }
                    dragStart = false;
                    wMain.parent('body').css("cursor", "");
                    wMask.removeClass("an_dialog_dragLayer");
                    moveRect.remove();
                }
            };
            module.bindEvent = function (r) {
                root = r;
                if (root.addEventListener) {
                    root.addEventListener("mousedown", dmouseDown);
                    root.addEventListener("mousemove", dmouseMove);
                    root.addEventListener("mouseup", dmouseUp);
                } else if (root.attachEvent) {
                    root.document.attachEvent("onmousedown", dmouseDown);
                    root.document.attachEvent("onmousemove", dmouseMove);
                    root.document.attachEvent("onmouseup", dmouseUp);
                } else {
                    throw "can not add dialogform event listener";
                }
            };
            module.unbindEvent = function (r) {
                root.removeEventListener("mousedown", dmouseDown);
                root.removeEventListener("mousemove", dmouseMove);
                root.removeEventListener("mouseup", dmouseUp);
                //detachEvent(event,function);
            };
            return module;
        };

    //构造函数
    $.fn.an_dialog = function (options, params) {
        var args, method;
        if (typeof options === "string") {
            method = $.fn.an_dialog.methods[options];
            if (method) {
                //有mothed则调用之
                return method(this, params);
            }
            throw 'The method of' + options + 'is undefined';
            return false;
        }

        args = $.extend({}, $.fn.an_dialog.defaults, options);

        return this.each(function () {
            var root, win, show, iframeW, iframeOnload, organize, maxSize, bindHandler, setZ;
            root = args.locMyself ? window : window.top;

            if (args.div) {
                root = window;
            }
            //显示窗体
            show = function (win) {
                var winShadow, winMask;
                winShadow = win.next('.an_dialog_shadow');
                winMask = winShadow.next('.an_dialog_mask');
                if(args.maxSize){
                    reSize(win, "max");
                }else {
                    reSize(win, args.width, args.height);
                }
                setPos(win);
                setZ(win, root.winIndex);
                win.eq(0).show();
                if (args.modalval) {
                    winMask.addClass("an_dialog_maskshow");
                    winShadow.show();
                }
                doAnimation(win.eq(1), args.aniOpen);
                doAnimation(win.eq(0), args.aniOpen, args.onOpen);
                if (!args.url && !args.data) {
                    args.onLoad();
                }
            };

            //设置
            setZ = function (win, n) {
                var winShadow, winMask;
                winShadow = win.next('.an_dialog_shadow');
                winMask = winShadow.next('.an_dialog_mask');
                win.css("z-index", DIALOGZ + n * 4 + 2);
                winShadow.css("z-index", DIALOGZ + n * 4 + 1);
                winMask.css("z-index", DIALOGZ + n * 4);
            };

            maxSize = function (e) {
                var options, w = (e&&e.data) || win;
                options = window.top.$.data(w[0], "an_dialog").options;
                if (e.target.className.indexOf("restore") > -1) {
                    $(e.target).removeClass("tool-restore");
                    $(e.target).addClass("tool-max");
                    reSize(w, e.target.getAttribute("reW"), e.target.getAttribute("reH") || "");
                } else {
                    $(e.target).addClass("tool-restore");
                    $(e.target).removeClass("tool-max");
                    e.target.setAttribute("reW", options.width||w.width());
                    e.target.setAttribute("reH", options.height||w.height());
                    reSize(w, "max");
                }
                setPos(win);
            };

            //绑定事件
            bindHandler = function (win) {
                var i;
                //添加关闭事件
                win.delegate(".tool-close", 'click', win, function (e) {
                    close(e.data);
                });
                if (args.maximizable) {
                    win.delegate(".tool-max", 'click', win, maxSize);
                    win.delegate(".tool-restore", 'click', win, maxSize);
                }
                //遮罩
                win.delegate('.an_dialog_mask', 'click', win, close);
                // win.eq(2).delegate(".an_dialog_mask", 'click', win, close);
                if (args.buttons) {
                    for (i = 0; i < args.buttons.length; i++) {
                        if (args.massage && massageCfg[args.massage.type] && massageCfg[args.massage.type].buttons) {
                            win.callback = args.massage.callback;
                            args.buttons[i].handler = args.buttons[i].handler || function (e) {
                                    if (e.data.callback) {
                                        e.data.callback(e.data);
                                    }
                                    close(e.data);
                                };
                        }
                        win.delegate("div[bt_index=" + i + "]", 'click', win, args.buttons[i].handler);
                    }
                }
            };            //组装窗体
            organize = function () {
                var getTools, getIcon, getBottons, getContent, getTitle, dom;
                dom = '<div an_dialog="true" an_dialog_resize = ' + args.resizeable + ' class="animated an_dialog '+ args.cls +'" style="display: none">' +
                    '<div an_dialog="true" class="an_dialog_header">' +
                    ' #icon#<div an_dialog_drag = ' + args.draggable + ' class="an_dialog_title '+ (args.draggable ? "an_dialog_drag":"") +'">#title#</div>' +
                    '<div an_dialog="true" class="an_dialog_tool">#tools#<a href="javascript:void(0)"  class="tool-close' +
                    '"></a></div></div>' +
                    '#content# #bottons#</div>' +
                    '<div class="an_dialog_shadow animated" style="display: none; margin-bottom: 7px;"></div>' +
                    '<div class="an_dialog_mask"></div>';
                //标题
                getTitle = function () {
                    var title;
                    if (args.massage) {
                        title = massageCfg[args.massage.type].title;
                    }
                    return title || args.title;
                };
                //图标
                getIcon = function () {
                    var icon = "";
                    if (args.icon) {
                        icon = '<div class="an_dialog_icon ' + args.icon + '"></div>';
                    }
                    if (args.massage && massageCfg[args.massage.type]) {
                        icon = '<div class="an_dialog_icon ' + massageCfg[args.massage.type].icon + '"></div>';
                    }
                    return icon;
                };
                //工具栏
                getTools = function () {
                    var s = "",cell, mode = '<a class="tool-#type#" href="javascript:void(0)" #attr#></a>';
                    if (args.collapsible) {
                        s += mode.replace("#type#", "collapse");
                    }
                    if (args.minimizable) {
                        s += mode.replace("#type#", "min");
                    }
                    if (args.maximizable) {
                        cell = mode.replace("#type#", args.maxSize?"restore":"max");
                        s += cell.replace("#attr#","reW = " + (options.width) + " reH ="+ options.height);
                    }
                    return s;
                };
                //按钮
                getBottons = function () {
                    var s = "", i, mode = '<div style = "#style#"  bt_index="#index#" class="#class#" > #text# #iconCls#</div>';
                    if (args.massage) {
                        args.buttons = args.buttons || massageCfg[args.massage.type].buttons;
                    }

                    if (args.buttons) {
                        s = '<div class="an_dialog_footer" style="position: relative;">';
                        if (args.massage) {
                            mode = mode.replace("#class#", "an_d_massage_btn col-xs-" + 12 / args.buttons.length);
                            mode = mode.replace("#style#", "_width:"+(400/args.buttons.length-1)+"px");
                         } else {
                            mode = mode.replace("#class#", "btn btn-default");
                            mode = mode.replace("#style#", "*min-width:20px");
                        }
                        for (i = args.buttons.length-1; i >= 0; i--) {
                            s += mode.replace("#index#", i).replace("#text#", args.buttons[i].text || "");
                            if (args.buttons[i].iconCls) {
                                s = s.replace("#hasIcon#", "l-btn-icon-left");
                                s = s.replace("#iconCls#", '<span class="l-btn-icon' + args.buttons[i].iconCls + '">&nbsp;</span>');
                            } else {
                                s = s.replace("#iconCls#", "").replace("#hasIcon#", "");
                            }
                        }
                        s += "</div>";
                    }
                    // console.log(s);
                    return s;
                };

                //内容
                getContent = function () {
                    var winbody, c, el;
                    //嵌入链接页面
                    if (args.url) {
                        winbody = '<iframe frameborder="0" an_dialog="true" src = #content# class="an_dialog_body"></iframe><div style="z-index: 1;position: absolute;" class="loading_bg_center"><span class="quarters-loader"></span></div>';
                        //先显示loading，载入页面
                        c = args.url;
                    } else {
                        winbody = '<div an_dialog="true" class="an_dialog_body">#content#</div>';
                        if (args.data) {
                            c = '<div class="loading_bg_center"><span class="quarters-loader"></span></div>';
                            $.ajax({
                                url: args.data, success: function (responseText) {
                                    args.onLoad();
                                    winbody = win.find('.loading_bg_center').replaceWith(responseText);
                                }
                            });
                        } else {
                            if (args.massage) {
                                c = args.massage.content;
                            }
                            if (args.html) {
                                c = args.html;
                            }
                            if (args.div) {
                                el = document.createElement("div");
                                $(el).append(args.div.clone(true));
                                c = el.innerHTML;
                                c = c.replace(/id="*/g, 'id="c_');
                            }
                            if(args.mediaBox){
                                c = $(root.document).an_mediabox("get",args.mediaBox);
                            }
                        }
                    }
                    winbody = winbody.replace("#content#", c);
                    // console.log(winbody);
                    return winbody;
                };

                dom = dom.replace("#title#", getTitle());
                dom = dom.replace("#icon#", getIcon());
                dom = dom.replace("#tools#", getTools());               
                dom = dom.replace("#content#", getContent());
                 dom = dom.replace("#bottons#", getBottons());
                // console.log(dom);
                return dom;
            };

            if (args.id && root.$('body').find('div').is('#' + args.id)) {
                //可以让已弹出的框抖动一下
                return false;
            }

            win = root.$(organize());

            //在子页面中通过createByDialog传入win对象,但是只能在页面加载完成后执行
            if (args.url) {
                iframeW = win.find('.an_dialog_body')[0];
                iframeOnload = function () {
                    win.find('.loading_bg_center').remove();
                    args.onLoad();
                    if (iframeW.contentWindow && iframeW.contentWindow.createByDialog) {
                        iframeW.contentWindow.createByDialog(win);
                    }
                    iframeW.contentWindow.dialog=win;
                };
                if (iframeW.attachEvent) {
                    iframeW.attachEvent("onload", iframeOnload);
                } else {
                    iframeW.addEventListener("load", iframeOnload);
                }
            }

            root.winIndex = root.winIndex || 1;
            args.id = args.id || ((args.locMyself ? "win_" : "rootWin_") + root.winIndex);
            win.eq(0).attr('id', args.id);
            //给子页面查找父节点提供依据！！！但依然找不到
            win.find('iframe').attr('dialogid', args.id);
            win.attr({aniClose: args.aniClose});
            if (args.massage) {
                win.eq(0).addClass("an_d_massage");
            }
            bindHandler(win);
            if (args.onBeforeOpen(win)) {
                root.$('body').append(win);
                root.winIndex++;
                //绑定属性数据到上窗口上
                window.top.$.data(root.$("#" + args.id)[0], "an_dialog", {options: args});

                show(win);

                //页面里的所有窗体关闭完了需要卸载鼠标事件绑定
                if (!root.hasDialogHandler) {
                    headDragInit().bindEvent(root);
                    root.hasDialogHandler = true;
                }
            }
        });
    };
    //定义对外接口方法
    $.fn.an_dialog.methods = {
        options: function (jq) {
            var opts = window.top.$.data(jq[0], "an_dialog").options;
            return opts;
        },
        move: function (jq, options) {
            setPos(jq, options.left, options.top);
        },
        resize: function (jq, options) {
            reSize(jq, options.width, options.height);
        },
        //提供方法找到窗体,options可以是一个id,窗体内的一个子元素
        find: function (jq, options) {
           return find(options);
        },
        close: function (jq, id) {
            var windowbox;
            //如果jq就是窗体对象
            if (jq.attr("an_dialog") === "true") {
                windowbox = jq;
            } else if (id) {
                windowbox = find(id);
            }
            if (windowbox) {
                close(windowbox);
            }
        }
    };
    $.fn.an_dialog.defaults = {
        title: '窗口',
        width: 400,
        height: "",
        reloadid: 'datagrid', //默认刷新父级#datagrid数据列表；
        modalval: true,
        source: this, //触发元素，或者是父窗口id
        aniOpen: "fadeInDown",//打开动画
        aniClose: "zoomOut",//关闭动画
        locMyself: false,//自己页面内弹出
        maximizable: false,
        draggable: true,
        resizeable: false,
        collapsible: false,
        closable: true,
        cls:"",
        onLoad: function () {
            //console.log("onLoad");
        },
        onBeforeOpen: function () {
            //console.log("onBeforeOpen");
            return true;
        },
        onOpen: function () {
            //console.log("onOpen");
        },
        onBeforeClose: function () {
            //console.log("onBeforeClose");
            return true;
        },
        onClose: function () {
            //console.log("onClose");
            return true;
        },
        onResize: function (w, h) {
            //console.log("onResize w:" + w + ",h:" + h);
        },
        onMove: function (x, y) {
            //console.log("onMove  x:" + x + ",y:" + y);
        }
    };

    //关闭对话框,旧的方式,以后会摒弃
    $.fn.extend({
        an_closedialogform: function (options) {
            var args, defaults = {
                closeiframe: '',
                //设置需要关闭的窗体
                reloadparent: false
                //设置是否刷新父级
            };
            args = $.extend(defaults, options);
            this.each(function () {
                var fraid, windowbox;
                if (args.closeiframe === '' || options.closeiframe === undefined) {
                    fraid = $(window.frameElement).attr('id'); //获得弹出前所在窗口的ID，用于传参
                } else {
                    fraid = args.closeiframe;
                }
                windowbox = find(fraid);
                if (windowbox) {
                    close(windowbox);
                    if (options.reloadparent === true) {
                        window.top.reload_Abnormal_Monitor.call();
                    } else {
                        return false;
                    }
                }
            });
        }
    });
})(jQuery);