(function (window) {
    "use strict";
    var module = {};

    //全局属性配置
    module.UI_ATTR = ["an-tabs", "an-accordion", "an-datagrid", "an-combo"];
    //全局布局配置
    module.UI_LAYOUT = ["g-layout", "g-max", "g-h-max"];
    //全局自动执行配置
    module.UI_PERFORM = ["u-switch"];
    //全局事件名定义
    module.EVENT_CLICK = "andy_click";//点击事件

    // 全局延迟等级
    module.SETTIME_01 = 100;
    module.SETTIME_02 = 200;

    // IE6渲染开关
    module.LAYOUT_IE6 = false;

    //设置对象zindex
    //参数：对象路径， zindex层级
    //使用方法 an_setZindex(element, index);
    module.setZindex = function (element, index) {
        $(element).css("z-index", index);
    };

    // 获取浏览器
    module.getBrowser = function() {
        var andy = {};
        var pf = (navigator.platform || "").toLowerCase(),
            ua = navigator.userAgent.toLowerCase(),
            s;
        function toFixedVersion(ver, floatLength) {
            ver = ("" + ver).replace(/_/g, ".");
            floatLength = floatLength || 1;
            ver = String(ver).split(".");
            ver = ver[0] + "." + (ver[1] || "0");
            ver = Number(ver).toFixed(floatLength);
            return ver;
        }

        function updateProperty(target, name, ver) {
            target = andy[target]
            target.name = name;
            target.version = ver;
            target[name] = ver;
        }
    // 提供三个对象,每个对象都有name, version(version必然为字符串)
    // 取得用户操作系统名字与版本号，如果是0表示不是此操作系统
        var platform = andy.platform = {
            name: (window.orientation != undefined) ? 'iPod' : (pf.match(/mac|win|linux/i) || ['unknown'])[0],
            version: 0,
            iPod: 0,
            iPad: 0,
            iPhone: 0,
            android: 0,
            win: 0,
            linux: 0,
            mac: 0
        };

        (s = ua.match(/windows ([\d.]+)/)) ? updateProperty("platform", "win", toFixedVersion(s[1])) :
            (s = ua.match(/windows nt ([\d.]+)/)) ? updateProperty("platform", "win", toFixedVersion(s[1])) :
                (s = ua.match(/linux ([\d.]+)/)) ? updateProperty("platform", "linux", toFixedVersion(s[1])) :
                    (s = ua.match(/mac ([\d.]+)/)) ? updateProperty("platform", "mac", toFixedVersion(s[1])) :
                        (s = ua.match(/ipod ([\d.]+)/)) ? updateProperty("platform", "iPod", toFixedVersion(s[1])) :
                            (s = ua.match(/ipad[\D]*os ([\d_]+)/)) ? updateProperty("platform", "iPad", toFixedVersion(s[1])) :
                                (s = ua.match(/iphone ([\d.]+)/)) ? updateProperty("platform", "iPhone", toFixedVersion(s[1])) :
                                    (s = ua.match(/android ([\d.]+)/)) ? updateProperty("platform", "android", toFixedVersion(s[1])) : 0;
    //============================================
    //取得用户的浏览器名与版本,如果是0表示不是此浏览器
        var browser = andy.browser = {
            name: "unknown",
            version: 0,
            ie: 0,
            firefox: 0,
            chrome: 0,
            opera: 0,
            safari: 0,
            mobileSafari: 0,
            adobeAir: 0 //adobe 的air内嵌浏览器
        };

        (s = ua.match(/trident.*; rv\:([\d.]+)/)) ? updateProperty("browser", "ie", toFixedVersion(s[1])) : //IE11的UA改变了没有MSIE
            (s = ua.match(/msie ([\d.]+)/)) ? updateProperty("browser", "ie", toFixedVersion(s[1])) :
                (s = ua.match(/firefox\/([\d.]+)/)) ? updateProperty("browser", "firefox", toFixedVersion(s[1])) :
                    (s = ua.match(/chrome\/([\d.]+)/)) ? updateProperty("browser", "chrome", toFixedVersion(s[1])) :
                        (s = ua.match(/opera.([\d.]+)/)) ? updateProperty("browser", "opera", toFixedVersion(s[1])) :
                            (s = ua.match(/adobeair\/([\d.]+)/)) ? updateProperty("browser", "adobeAir", toFixedVersion(s[1])) :
                                (s = ua.match(/version\/([\d.]+).*safari/)) ? updateProperty("browser", "safari", toFixedVersion(s[1])) : 0;

    //下面是各种微调
    //mobile safari 判断，可与safari字段并存
        (s = ua.match(/version\/([\d.]+).*mobile.*safari/)) ? updateProperty("browser", "mobileSafari", toFixedVersion(s[1])) : 0;

        if (platform.iPad) {
            updateProperty("browser", 'mobileSafari', '0.0');
        }

        if (browser.ie) {
            if (!document.documentMode) {
                document.documentMode = Math.floor(browser.ie)
                //http://msdn.microsoft.com/zh-cn/library/cc817574.aspx
                //IE下可以通过设置 <meta http-equiv="X-UA-Compatible" content="IE=8"/>改变渲染模式
                //一切以实际渲染效果为准
            } else if (document.documentMode !== Math.floor(browser.ie)) {
                updateProperty("browser", "ie", toFixedVersion(document.documentMode))
            }
        }
    //============================================
    //取得用户浏览器的渲染引擎名与版本,如果是0表示不是此浏览器
        andy.engine = {
            name: 'unknown',
            version: 0,
            trident: 0,
            gecko: 0,
            webkit: 0,
            presto: 0
        };

        (s = ua.match(/trident\/([\d.]+)/)) ? updateProperty("engine", "trident", toFixedVersion(s[1])) :
            (s = ua.match(/gecko\/([\d.]+)/)) ? updateProperty("engine", "gecko", toFixedVersion(s[1])) :
                (s = ua.match(/applewebkit\/([\d.]+)/)) ? updateProperty("engine", "webkit", toFixedVersion(s[1])) :
                    (s = ua.match(/presto\/([\d.]+)/)) ? updateProperty("engine", "presto", toFixedVersion(s[1])) : 0;

        if (andy.browser.ie) {
            if (andy.browser.ie == 6) {
                updateProperty("engine", "trident", toFixedVersion("4"))
            } else if (browser.ie == 7 || browser.ie == 8) {
                updateProperty("engine", "trident", toFixedVersion("5"))
            }
        };
        return andy;
    };
    
    
    //浮动面板
    module.floatbox = function (a) {
           if(a.is('.top')){
               if(a.is(':hidden')){
                   a.show()
                   var floath=a.outerHeight();
                   a.css('top',0-floath-5+'px').animate({top:'0px'},300);
                   }
               else {
                   var floath=a.outerHeight();
                   a.animate({top:0-floath-5+'px'},300,function(){a.hide()});
                   }
              }
            
             if(a.is('.bottom')){
               if(a.is(':hidden')){
                   a.show()
                   var floath=a.outerHeight();
                   a.css('bottom',0-floath-5+'px').animate({bottom:'0px'},300);
                   }
               else {
                   var floath=a.outerHeight();
                   a.animate({bottom:0-floath-5+'px'},300,function(){a.hide()});
                   }
              }
            if(a.is('.left')){
               if(a.is(':hidden')){
                   a.show()
                   var floatw=a.outerWidth();
                   a.css('left',0-floath-5+'px').animate({left:'0px'},300);
                   }
               else {
                   var floath=a.outerWidth();
                   a.animate({left:0-floath-5+'px'},300,function(){a.hide()});
                   }
              }
        
          if(a.is('.right')){
               if(a.is(':hidden')){
                   a.show()
                   var floatw=a.outerWidth();
                   a.css('right',0-floath-5+'px').animate({right:'0px'},300);
                   }
               else {
                   var floath=a.outerWidth();
                   a.animate({right:0-floath-5+'px'},300,function(){a.hide()});
                   }
              }
    };
    //浮动面板事件响应
    module.floatact = function () {
        $("[an-float]").each(function(index, element) {
            var act=$(this).attr('option');
            if(act=='click'){
                $(this).click(function(){andy.floatbox($(this))})
                }
            else if(act=='leave'){
                $(this).on("mouseleave", function(){
                    andy.floatbox($(this));
                    })
                }
        });
    };
    

    //IEtest 浏览器甄别
    module.IE = function () {
        // var Sys = {};
        // var ua = navigator.userAgent.toLowerCase();
        // var s;
        // (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 0;
        // var ieversion;
        // console.log(Sys);
        // if (Sys.ie) {
        //     ieversion = parseInt(Sys.ie);

        //     if (ieversion < 11) {
        //         return ieversion;
        //     }
        // }else {
        //     // 不是IE 返回99
        //     return 99;
        // }
        var ie = andy.getBrowser().browser.ie;
        var ieVersion = parseInt(ie);
        // if(ie = 0){
        //     return 99;
        // }
        return ieVersion;
    };

    // 判断是否是谷歌浏览器
    module.isChrome = function(){
        // var browser = {};  
        // //    console.dir(navigator);  
        // var userAgent = navigator.userAgent.toLowerCase(); 
        // /*for(osvId in navigator){ 
        //     var value222=navigator[osvId]; 
        //     document.writeln(osvId+":&nbsp;"+value222+'<br>'); 
        // }*/  
        // var lang22=navigator.language; 
        // var s;  
        // (s = userAgent.match(/msie ([\d.]+)/)) ? browser.ie = s[1] : (s = userAgent.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] : (s = userAgent.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] :  
        // (s = userAgent.match(/opera.([\d.]+)/)) ? browser.opera = s[1] : (s = userAgent.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0; 
        // var is = false;
        // // console.log(navigator);
        // if(browser.chrome){
        //     is = true;
        // }
        // return is;
    }
    //浏览器启动全屏
    module.an_fullscreen = function () {
        //ie浏览启动器全屏(需要设置ie浏览器Internet选项-安全-Internet-自定义级别中-对未标记为可安全执行脚本的ActiveX控件初始化并执行脚本 点启用）
        var ieInto = function () {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
                wscript.SendKeys("{F11}");
            }
        }
        //非ie浏览器启动全屏
        var into = function (element) {
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
    };
    //退出全屏
    module.exitFullscreen = function () {
        //ie浏览退出器全屏
        var ieExit = function () {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
                wscript.SendKeys("{F11}");
            }
        }
        //非ie浏览器退出全屏
        var exit = function () {
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
    };
    //敲击回车事件
    //an_enter({element:要绑定回车事件的dom节点、id、class,callback:回车事件中要执行的函数})----调用回车事件函数
    module.enter = function (element, callback) {
        var element = element == undefined ? document : element;
        $(element).keydown(function () {
            if (event.keyCode == 13) {
                callback();
            }
        })
    };
    //移除回车事件
    //an_unenter({element:要移除回车事件的dom节点、id、class})------调用移除回车事件函数
    module.unEnter = function (element) {
        $(element).off("keydown");
    }; 
    //读取数据方法 传入数据地址和加载完成后执行的方法callback
    //an_loaddata("xx.json", function(data){ console.log(data) })
    module.loaddata = function (dataUrl,data,callback) {
        if(arguments.length === 2){
            callback = data;
            data = undefined;
        }
        $.get(dataUrl, data,function (data, status) {
            if (status == "success") {
                callback(data);
            }else {
                console.log(dataUrl + "|load data is failure!");
            };
        });
    };
    //传出数据方法 data结构{name:"xxx", id:"xx"}
    module.postdata = function(dataUrl, data, callback){
        $.post(dataUrl, data, function (data, status) {
            if (status == "success") {
                callback(data);
            }else {
                console.log(dataUrl + "|load data is failure!");
            };
        });
    };
    //数据转换string -> json
    module.stringToJson = function(string){
        var data = string;
        if(typeof data == "string"){
            data = eval("("+data+")");
        }
        return data;
    };

    //弹出覆盖层...
    module.overlay = function (target, content, callback, style) {
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
        else if (target != 'self' && target != 'top' && $('body').find('.loading_bg').length == 0) {
            $(target).append(overlaydiv);
            $(target).find('.loading_bg').css({
                'position': 'absolute'
            });
        }
        else if (target != 'self' && target != 'top' && $('body').find('.loading_bg').length == 1) {
            $(target).find('.loading_bg').html(content);
        }
        if (typeof callback == 'function') {
            callback();
        }
    };
    module.closeoverlay = function (callback) {
        var loading_bg = window.top.$('body').find('.loading_bg');
        loading_bg.addClass('fadeOut');
        setTimeout(function () {
            loading_bg.remove();
            if (typeof callback == 'function') {
                callback();
            }
        }, 200);
    };
    //页面加载loding...
    module.loading = function (target, text, callback) {
        var content = '<div class="loading_bg_center"><span class="quarters-loader"></span><p id="loadingtext">' + text + '</p></div>';
        an_overlay(target, content);
        if (typeof callback == 'function') {
            callback();
        }
    };
    //内容拷贝
    module.copy = function (content, tip) {
        if ($("#copytextarea").length == 0) {
            $('body').append("<textarea id='copytextarea' style='height:0; border:0; width:0; display:block; opacity:0'></textarea>");
        }
        var copybox = $("#copytextarea");
        copybox.text(content);
        // 选择对象
        copybox.select();
        // 执行浏览器复制命令
        document.execCommand("Copy");
        alert(tip);
    };
    //自动滚动条
    module.scrollbar = function () {
        $('.scrollbar').each(function (index, element) {
            var scrh = $(this).height(), scrw = $(this).width();
            $(this).mCustomScrollbar(
                {
                    setWidth: scrw,
                    setHeight: scrh,
                    axis: "y",
                    scrollbarPosition: "inside",
                    autoDraggerLength: true,
                    autoHideScrollbar: true,
                    autoExpandScrollbar: true,
                    alwaysShowScrollbar: 0,
                    mouseWheel: {
                        enable: true
                    },
                    keyboard: {
                        enable: true
                    },
                    theme: "minimal-dark",
                    scrollInertia: 800,
                    live: 'on'
                });
        });
    };
    //默认图片...
    module.img = function () {
        $("img[src='#']").each(function (index, element) {
            var imgW = $(this).width(), imgH = $(this).height();
            if ($(this).attr('title') == '' || $(this).attr('title') == undefined) {
                var imgtitle = '';
            }
            else {
                var imgtitle = $(this).attr('title') + ' ';
            }
            $(this).removeAttr('src').attr('data-src', 'holder.js/' + imgW + 'x' + imgH + '?font=Lucida Family&text=' + imgtitle + imgW + '×' + imgH);
        });
    };

    //页面跳转...
    module.url = function (url, target) {
        if (target == 'top') {
            top.location = url;
        }
        else if (target == 'self') {
            self.location = url;
        }
        else {
            window.top.contentWindow.find(target).attr('src', url);
        }
    };
    //ajax加载...
    module.dataurl = function () {
        $("[data-url]").each(function () {
            var dataurl = $(this).attr('data-url');
            var datacallback = $(this).attr('data-callback');
            $(this).load(dataurl, datacallback);
        });
    };
    //a链接默认失效
    module.a = function () {
        $("[href='#']").each(function (index, element) {
            $(this).attr('href', 'javascript:void(0)');
        });
    };
    //单选多选样式渲染
    module.checked = function () {
        $(".an_checkbox").each(function (index, element) {
            var $this = $(element),
                $text = $this.attr('title'),
                packagee = '';
            if ($this.attr('type') == 'checkbox' && $this.hasClass('switch') == false) {
                packagee = '<label class="i-checks"></label>'
            }
            else if ($this.attr('type') == 'radio') {
                packagee = '<label class="i-checks"></label>'
            }
            else if ($this.attr('type') == 'checkbox' && $this.hasClass('switch')) {
                packagee = '<label class="i-switch m-r-sm"></label>';
                $text = '<span class="textmax">' + $this.attr('title') + '</span>';
            }
            if ($this.parent().is('label')) {
                //已经封装过的选择器不在渲染
                return false
            }
            else {
                $this.wrap(packagee);
                $this.after(' <i></i>' + $text);
            }
            var clickbox = $this.parent();
            if ($this.hasClass('checkbox-inline')) {
                clickbox.addClass('checkbox-inline');
            }
        });
    };
    //随机颜色获取
    module.getRandomColor = function () {
        return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
    };
    //判断是否为近似颜色
    //使用 isSimilarColor("#FFFFFF","#F0FFFE",10);
    module.isSimilarColor = function (sHexColorA, sHexColorB, nOffset) {
        this.offsetNum = Math.abs(nOffset);
        this.offsetNum > 255 ? this.offsetNum = this.offsetNum - 256 : "";
        var arrNumA = [parseInt(sHexColorA.substring(1, 3), 16), parseInt(sHexColorA.substring(3, 5),
            16), parseInt(sHexColorA.substring(5, 7), 16)];
        // console.log(arrNumA,"aaa")
        var arrNumB = [parseInt(sHexColorB.substring(1, 3), 16), parseInt(sHexColorB.substring(3, 5),
            16), parseInt(sHexColorB.substring(5, 7), 16)];
        // console.log(arrNumB, "bbb")
        for (var i = 0; i < arrNumA.length; i++) {
            // console.log(arrNumA[i], arrNumB[i], this.offsetNum, i)
            if (Math.abs(arrNumA[i] - arrNumB[i]) > this.offsetNum) {
                return false;
            }
        }
        return true;
    };
    module.closesearch = function (e, h, i) {
        var t = $(e).text();
        if (t == '高级搜索') {
            $(i).layout('panel', 'north').panel('resize', {
                height: h
            });
            $(i).layout('resize');
            $(e).text('关闭搜索');
        }
        if (t == '关闭搜索') {
            $(i).layout('panel', 'north').panel('resize', {
                height: 1
            });
            $(i).layout('resize');
            $(e).text('高级搜索');
        }
    };
    //中继器
    //设置中继器，属性 方法 都可以
    module.setWindow = function (options) {
        var element = window.top.an_element;
        if (element) {
            window.top.an_element = $.extend(window.top.an_element, options);
        }
        else {
            window.top.an_element = options;
        }
    };

    //从中继器获取，设置的属性 方法
    module.getWindow = function (options) {
        return window.top.an_element;
    };

    // 自动执行
    module.perform = function(){
        // 元件类功能执行
        for(var i = 0;i<andy.UI_PERFORM.length;i++){
            var name = andy.UI_PERFORM[i];
            if(name == "u-switch"){
                $("body").find("." + name).each(function(index, cell){
                    $(cell).switchs();
                });
            };
        };
        // 控件tabs accrodion datagrid等执行
        for(var i = 0;i<andy.UI_ATTR.length;i++){
            var name = andy.UI_ATTR[i];
            if(name == "an-tabs"){
                // $("["+name+"]").an_tabs({});
                $("body").find("["+name+"]").each(function(i, e){
                    var tabs = $(e);
                    if(tabs.attr(name) != "an-tabs"){
                        tabs.attr(name, "an-tabs");
                        tabs.an_tabs({});
                    }
                    
                })
            }else if(name == "an-datagrid"){
                $("body").find("["+name+"]").each(function(i, e){
                    var datagrid = $(e);
                    // datagrid.an_datagrid({});
                    if(datagrid.attr(name) != "an-datagrid"){
                        datagrid.attr(name, "an-datagrid");
                        datagrid.an_datagrid({});
                    }
                });
                // $("["+name+"]").an_datagrid({});
            }else if(name == "an-combo"){
                $("body").find("["+name+"]").each(function(i, e){
                    var combo = $(e);
                    // combo.an_combo({});
                    if(combo.attr(name) != "an-combo"){
                        combo.attr(name, "an-combo");
                        combo.an_combo({});
                    }
                });
            };
        };
        //默认执行图片占位
        andy.img();
        // andy.formlayout();
        //input布局默认执行
        // andy.inputLayout();
    };
    
    module.layout = function(e){
        if(andy.IE() == 6 && andy.LAYOUT_IE6 == false){
            return false;
        };
        // 去除滚动条
        // console.log(e);
        // if(e){
        //     e.css("overflow", "hidden");
        // }
        // $("body").children().find("g-layout").each(function(index, lay){
        //     console.log(index);
        //     $(lay).css("overflow", "hidden");
        //     $(lay).find("layout-head").css("overflow", "hidden");
        //     $(lay).find("layout-left").css("overflow", "hidden");
        //     $(lay).find("layout-right").css("overflow", "hidden");
        //     $(lay).find("layout-center").css("overflow", "hidden");
        //     $(lay).find("layout-foot").css("overflow", "hidden");
        // });

        var body = $("body");
        if(e){
            body = e;
            // body.css("overflow", "");
        };

        body.each(function(index, element){
            var $element = $(element);
            var parentWidth, parentHeight;
            if($element.parent().is('body')){
                parentWidth=$(window).width();
                parentHeight=$(window).height();
                // alert("body:"+parentWidth+ parentHeight);
            }else{
                var parentElement = $element.parent();
                parentWidth=parentElement.width();
                parentHeight=parentElement.height();
            };
            for(var i = 0;i<andy.UI_LAYOUT.length;i++){
                var name = andy.UI_LAYOUT[i];
                if($element.hasClass(name)){
                    if(name == "g-layout"){
                        //设置框架各个元素的尺寸
                        andy.autolayout($element,parentWidth,parentHeight);
                    }else if(name == "g-max"){
                        andy.gmax($element);//最大化
                    }else if(name == "g-h-max"){
                        andy.hmax($element);//高度填充
                    };
                    
                };
            };
            for(var i = 0;i<andy.UI_ATTR.length;i++){
                var name = andy.UI_ATTR[i]; 
                // ["an-tabs", "an-accordion", "an-datagrid"]
                var attrName = $element.attr(name);
                if(attrName == "an-tabs"){
                    andy.tabsLayout($element);
                }else if(attrName == "an-datagrid"){
                    andy.datagridLayout($element);
                };
            };
            if($element.children("div").length > 0){
                // 处理子集为DIV的对象
                $element.children("div").each(function(i, el){
                    andy.layout($(el));
                });
                // 渲染表单问题 待处理
                andy.formlayout();
            }else if($element.children("table").length > 0){
                // 处理子集为table的对象
                $element.children("table").each(function(i, el){
                    andy.layout($(el)); 
                });
                andy.formlayout();
            }else if($element.children("form").length > 0){
                // 处理子集为form的对象
                $element.children("form").children("table").each(function(i, el){
                    andy.layout($(el)); 
                });
                andy.formlayout();
            }else if($element.children("iframe").length > 0){
                // console.log($element.children("iframe"))
                // IE6强制刷新
                var ieversion = andy.IE();
                if(ieversion <= 8){
                    var iframe = $element.children("iframe");
                    var src = iframe.attr("src");
                    iframe.attr("src", src);
                };
            };
        });

        // 恢复滚动条
        // body.find("g-layout").each(function(index, lay){
        //     $(lay).css("overflow", "");
        //     $(lay).find("layout-head").css("overflow", "");
        //     $(lay).find("layout-left").css("overflow", "");
        //     $(lay).find("layout-right").css("overflow", "");
        //     $(lay).find("layout-center").css("overflow", "");
        //     $(lay).find("layout-foot").css("overflow", "");
        // });
        
    };

    //tabs布局
    module.tabsLayout = function(tabs){
        // console.log(tabs[0].options)
        var pheight = tabs.parent().height();
        var pwidth = tabs.parent().width();
        var tabsDiv = tabs[0];
        if (tabsDiv.option && tabsDiv.option.fit == false){
            if(tabsDiv.option.height > 0){
                pheight = tabsDiv.option.height;
            };
            if(tabsDiv.option.width > 0){
                pwidth = tabsDiv.option.width;
            };
        };
        var head = tabs.children(".m-tabs-header");
        var body = tabs.children(".m-tabs-content");
        var item = body.children(".item");
        var bodyPadding = parseInt(item.css("padding-left"));
        if(typeof(bodyPadding) != "number"){
            bodyPadding = 0;
        };
        
        var headHeight = head.outerHeight() + bodyPadding *2;
        tabs.height(pheight).width(pwidth);
        body.children().height(pheight - headHeight-1).width(pwidth - bodyPadding*2-2);
    }

    //datagrid布局
    module.datagridLayout = function(datagrid){
        var pheight = datagrid.parent().parent().parent().height();
        var pwidth = datagrid.parent().parent().parent().width();
        // console.log(pheight, pwidth, datagrid.offsetParent());
        datagrid.an_tableLayout(datagrid, pwidth, pheight);
    }

    module.autolayout = function(element,pw,ph){
        if(element[0]){
            element.outerWidth(pw).outerHeight(ph);
        };
        var layout = element;
        var layhead = layout.children(".layout-head");
        var layleft = layout.children(".layout-left");
        var layright = layout.children(".layout-right");
        var layfoot = layout.children(".layout-foot");
        var laycenter = layout.children(".layout-center");

        if(layhead[0]){
            layhead.width(pw);
        };

        if(layfoot[0]){
            layfoot.width(pw);
        };

        if(layleft[0]){
            var layheadHeight = 0;
            var layfootHeight = 0;

            if(layhead[0]){
                layheadHeight = layhead.height();
            };
            if(layfoot[0]){
                layfootHeight = layfoot.height();
            };
            layleft.height(ph - layheadHeight - layfootHeight);
            layleft.css('top',layheadHeight+'px');
        };

        if(layright[0]){
            var layheadHeight = 0;
            var layfootHeight = 0;
            if(layhead[0]){
                layheadHeight = layhead.height();
            };
            if(layfoot[0]){
                layfootHeight = layfoot.height();
            };

            layright.height(ph - layheadHeight - layfootHeight);
            layright.css('top',layheadHeight+'px');
        };

        if(laycenter[0]){
            var layleftWidth = 0;
            var layrightWidth = 0;
            var layheadOuterHeight = 0;
            var layfootOuterHeight = 0;
            var layleftOuterWidth = 0;

            if(layleft[0]){
                layleftWidth = layleft.width();
                layleftOuterWidth = layleft.outerWidth();
            };
            if(layright[0]){
                layrightWidth = layright.width();
            };
            if(layhead[0]){
                layheadOuterHeight = layhead.outerHeight();
            };
            if(layfoot[0]){
                layfootOuterHeight = layfoot.outerHeight();
            };
            laycenter.width(pw - layleftWidth - layrightWidth);
            laycenter.height(ph - layheadOuterHeight - layfootOuterHeight);
            // alert("laycenter:"+laycenter.width() + laycenter.height());
            laycenter.css({'top':layheadOuterHeight+'px','left':layleftOuterWidth+'px'});
            // alert(layheadOuterHeight, layleftWidth, layrightWidth);
        };

        if(laycenter.children().is('iframe')){
            var h = laycenter.height();
            laycenter.children('iframe').height(h);
            laycenter.css('overflow','hidden');
        };
    };
    
    //动态高度填充 上下平分
    module.hmax = function(element){
        var parenth = element.parent().height();
        var parentw = element.parent().width();
        var hmaxn = element.siblings('.g-h-max').length + 1;
        var sibls = $(element).siblings().not('.g-h-max');
        var sibl = sibls.not('.u-float');
        var siblingn = sibl.length;
        var sum = 0;
        for (var i = 0; i < siblingn; i++) {
            sum += $(sibl[i]).outerHeight();
        };
        var hmaxH = parseInt((parenth - sum) / hmaxn);
        var topp = parseInt(element.css("padding-top"));
        var bottomp = parseInt(element.css("padding-bottom"));
        var leftp = parseInt(element.css("padding-left"));
        var rightp = parseInt(element.css("padding-right"));

        if(typeof(topp) == "number"){
            hmaxH -= topp;
        };
        if(typeof(bottomp) == "number"){
            hmaxH -= bottomp;
        };
        if(typeof(leftp) == "number"){
            parentw -= leftp;
        };
        if(typeof(rightp) == "number"){
            parentw -= rightp;
        };
        element.height(hmaxH).width(parentw);
        // element.siblings('.g-h-max').height(hmaxH);
    };

    //动态处理填充尺寸溢出
    module.gmax = function(element){
        // $('.g-max').each(function(index, element) {
        var pw=element.parent().width();
        var ph=element.parent().height();
        var wp=0;
        var wp_l = parseInt(element.css('padding-left'));
        // 左边边线
        var wp_b_l = parseInt(element.css('border-left'));
        var wp_r = parseInt(element.css('padding-right'));
        var wp_b_r = parseInt(element.css('border-right'));
        var hp=0;//parseInt(element.css('padding-top'))+parseInt(element.css('padding-bottom'));
        var hp_t = parseInt(element.css('padding-top'));
        var hp_b_t = parseInt(element.css('border-top'));
        var hp_b = parseInt(element.css('padding-bottom'));
        var hp_b_b = parseInt(element.css('border-bottom'));
        
        if(typeof(wp_l) == "number"){
            wp += wp_l;
        };
        // if(typeof(wp_b_l) == "number"){
        //     wp += wp_b_l;
        // };
        if(typeof(wp_r) == "number"){
            wp += wp_r;
        };
        // if(typeof(wp_b_r) == "number"){
        //     wp += wp_b_r;
        // };
        if(typeof(hp_t) == "number"){
            hp += hp_t;
        };
        // if(typeof(hp_b_t) == "number"){
        //     hp += hp_b_t;
        // };
        if(typeof(hp_b) == "number"){
            hp += hp_b;
        };
        // if(typeof(hp_b_b) == "number"){
        //     hp += hp_b_b;
        // };
        // 考虑了边框问题
         element.height(ph-hp);
         element.width(pw-wp);
        // }); 
    };

    //动态处理u-panel结构 针对panel-head\panel-body\panel-foot布局
    module.panelauto = function(){
        $('.u-panel.u-datagrid').each(function(index, element) {
            var upanel = $(element);
            var Pw=upanel.parent().width(), Ph=upanel.parent().height();
            upanel.height(Ph);
            var panelheight = upanel.outerHeight();
            var head = upanel.children(".panel-head");
            var body = upanel.children(".panel-body");
            var foot = upanel.children(".panel-foot");

            if(body[0]){
                body.height(panelheight - (head.outerHeight()||0) - (foot.outerHeight()||0));
            }
        }); 

        // var windowWidth = $('.u-panel.window').parent().outerWidth();
        // $('.u-panel.window').width(windowWidth);
        $('.u-panel.window').each(function(index, element) {
            var upanel = $(element);
            var padding_top = parseInt(upanel.parent().css("padding-top"));
            var padding_bottom = parseInt(upanel.parent().css("padding-bottom"));
            var Pw=upanel.parent().width(), Ph=upanel.parent().height() - padding_top - padding_bottom;
            // upanel.css("height", Ph);
            upanel.height(Ph);
            var panelheight = upanel.height();//parseInt(upanel.css("height"));
            var head = upanel.children(".panel-head");
            var body = upanel.children(".panel-body");
            var b_padding_top = parseInt(body.css("padding-top"));
            var b_padding_bottom = parseInt(body.css("padding-bottom"));
            var foot = upanel.children(".panel-foot");

            if(body){
                body.height(panelheight - (head.outerHeight()||0) - (foot.outerHeight()||0) - b_padding_top - b_padding_bottom);
            };
        }); 
    };

    //ui布局渲染
    module.uiLayout = function(element){
        // andy.UI_ATTR
        for(var i = 0;i<andy.UI_ATTR.length;i++){
            // console.log(element.children().find("["+name+"]"))
            var name = andy.UI_ATTR[i];
            element.children().find("["+name+"]").trigger("layout");
        }
        
    };
    /**
     * 表单布局
     */
    module.formlayout = function(){
        // console.log($(".m-table-form").children().find("u-formitem"));

        $(".m-table-form").find(".u-formitem").each(function(index, element){
            var $element = $(element);
            var thisW = $element.width(),
                thisPH = $element.parent().height();
            if ($element.parents('.m-table-form').is('.inline')) {
                // 设置td高度 下面内容是以td高度为准
                // 现在新的 高度是 CSS处理的
                // if($element.hasClass("u-input-span")){
                //     $element.parent().height(thisPH);
                // };

                var maxHeight = 0;
                $element.parent().parent().find('.u-input-span, .u-input,textarea').each(function(i, e){
                    // 获取到所有TD内容的 最大高度
                    var cell = $(e);
                    if(maxHeight == 0){
                        maxHeight = cell.outerHeight();
                    }else if(cell.outerHeight() > maxHeight){
                        maxHeight = cell.outerHeight();
                    };
                });

                $element.parent().siblings().each(function(i, e){
                    var cell = $(e);
                    cell.height(maxHeight);
                });
                $element.parent().height(maxHeight);

                $element.find('.u-input-span, .u-input,textarea').each(function(i, e){
                    var cell = $(e);
                    andy.inputLayout(cell);
                });
            }else{
                $element.find('.u-input').each(function(i, e){
                    var input = $(e);
                    
                    if(!input.parent().hasClass("u-group")){
                        input.outerWidth(thisW);
                    }else{
                        andy.inputLayout(input);
                    }
                });
            };
        });

        $(".u-group").find(".u-input").each(function(i, e){
            // 屏蔽是因为解决了字体图标的问题
            // var input = $(e);
            // andy.inputLayout(input);
            var input = $(e);
            // var t = "";
            // if(t == ""){
            //     t = setTimeout(function(){
                    andy.inputLayout(input);
            //         t = "";
            //     }, andy.SETTIME_01);
            // }
        });

    };

    // input布局
    module.inputLayout = function(input){
        var pw = input.parent().width();
        var cw = 0;
        input.siblings().each(function(j, element){
            // 处理验证TOOLTIP 宽度
            if($(element).hasClass("infobox") == false){
                pw -= $(element).outerWidth();
            };
        });
        // 如果是ie浏览器 >8的
        // console.log(andy.IE());
        if(andy.IE() > 0){
            pw -= 1;
        };
        if(pw <= 0){
            // 同级宽度整体==input 所以 input被换行了
            input.css("width", "100%");
        }else{
            input.outerWidth(pw);
        };
    };

    //收缩layout
    module.shrinkageLayout = function(options){
        var opts = $.extend({
            element:"", //传入操作对象
            min:0,//收缩最小值
            max:100,//收缩最大值
            direction:"v",//收缩方向 v垂直 l水平
            isAnimation:true,//是否有动画效果
            time:100,//动画作用时间 毫秒
            callback: function () {
            } //默认回调
        }, options);

        var element = opts.element;
        var oldHeight = element.height();
        var oldWidth = element.width();
        var min = opts.min;
        var max = opts.max;
        var time = opts.time;
        if(!opts.isAnimation){
            time = 0;
        }

        if(opts.direction == "v"){
            if(element.height() != min){
                element.animate({height:min + 'px'}, time, function(){
                    $.fn.layoutMain();
                    opts.callback(element);
                });
            }else{
                element.animate({height:max + 'px'}, time, function(){
                    $.fn.layoutMain();
                    opts.callback(element);
                });
            }
        }

        if(opts.direction == "l"){
            if(element.width() != min){
                element.animate({width:min + 'px'}, time, function(){
                    $.fn.layoutMain();
                    opts.callback(element);
                });
            }else{
                element.animate({width:max + 'px'}, time, function(){
                    $.fn.layoutMain();
                    opts.callback(element);
                });
            }
        }
    };

    //弹出combo
    module.combo = function(options){
        var opts = $.extend({
            combo:"", //combo对象
            showEvent:"click",//默认触发事件
            hiddenEvent:"mouseleave", //默认隐藏事件
            setTime:200,//缓冲时间
            showComplete: function () {
                //完成显示回调  
            },
            hiddenComplete:function(){
                // 隐藏完成回调
            }
        }, options);


        var combo = opts.combo;
        combo.touchTarget = combo.find("[combo]").first();
        combo.showTarget = combo.children(":gt(0)").each(function(i, e){
            if($(e).is("[combo='"+combo.touchTarget.attr("combo")+"']")){
                return $(e);
            }
        });
        // 获取 设置对象
        var getOption = combo.attr("opstion");
        var getValueElement = "";
        if(getOption){
            getOption = getOption.split(",");
            // 处理设置
            for(var i = 0; i < getOption.length; i++){
                var o = getOption[i].split(":");
                if(o[0] == "show"){
                    // showEvent = o[1];
                    opts.showEvent = o[1];
                }else if(o[0] == "hidden"){
                    opts.hiddenEvent = o[1];
                }
            }
        };
        var timeHanld = "";
        combo.touchTarget.bind(opts.showEvent, function(e){
            if(combo.hasClass("open")){
                combo.showTarget.css("display", "none");
                combo.removeClass("open");
            }else{
                combo.showTarget.css("display", "block");
                combo.addClass("open");
                opts.showComplete();
            }
        });

        combo.on(opts.hiddenEvent, function(e){
            timeHanld = setTimeout(function(){
                combo.showTarget.css("display", "none");
                // closeAll();
                combo.removeClass("open");
                opts.hiddenComplete();
                timeHanld = "";
            }, opts.setTime);
        });

        combo.mouseover(function(e){
            if(timeHanld != ""){
                clearTimeout(timeHanld);
                timeHanld = "";
            }
        });
    };
    
    //执行 为idXX的iframe里面的name方法，options为参数
    // id, name, options
    module.toWindow = function () {
        //平级查找||当前子集查找
        var id = arguments[0];
        var name = arguments[1];
        var box = window.top.$("#" + id)[0] || $("#" + id)[0];
        if (!box) {
            //平级子集查找
            box = window.top.$("iframe").contents().find("#" + id)[0];
        }
        box = box.contentWindow;
        // var box = window.top.document.getElementById(id).contentWindow;
        // var windowbox = element[0] ? element : $(this).contents().find("#" + id);

        var args = [];
        if (arguments.length > 2) {
            for (var i = 2, len = arguments.length; i < len; i++) {
                args.push(arguments[i]);
            }
        }
        ;

        if (box && box[name]) {
            box[name].apply(this, args);
        }
        else {
            console.log("don't have this id!")
        }
    };

    /***
     * 执行回调数组，主要用于组件模块的回调数组，
     * 要求每个函数必须有返回值，true表示继续正常执行，false
     * @param arr 函数数组
     * @param args 执行函数参数
     */
    module.arrayFunCall = function (arr, args) {
        var iden = true;
        if (arr.length > 0) {
            var i = 0;
            for (i; i < arr.length; i++) {
                if (typeof arr[i] === "function") {
                    iden = iden && arr[i](args);
                }
            }
        }
        return iden;
    };

    /**
     * 对象合并
     * @returns {*|{}} 任意个参数
     */
    module.extend = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        //如果第一个值为bool值，那么就将第二个参数作为目标参数，同时目标参数从2开始计数
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }
        // 当目标参数不是object 或者不是函数的时候，设置成object类型的
        if (typeof target !== "object" && !andy.isFunction(target)) {
            target = {};
        }
        //如果extend只有一个函数的时候，那么将跳出后面的操作
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            // 仅处理不是 null/undefined values
            if ((options = arguments[i]) != null) {
                // 扩展options对象
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    // 如果目标对象和要拷贝的对象是恒相等的话，那就执行下一个循环。
                    if (target === copy) {
                        continue;
                    }
                    // 如果我们拷贝的对象是一个对象或者数组的话
                    if (deep && copy && ( andy.isPlainObject(copy) || (copyIsArray = andy.isArray(copy)) )) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && andy.isArray(src) ? src : [];
                        } else {
                            clone = src && andy.isPlainObject(src) ? src : {};
                        }
                        //不删除目标对象，将目标对象和原对象重新拷贝一份出来。
                        target[name] = andy.extend(deep, clone, copy);
                        // 如果options[name]的不为空，那么将拷贝到目标对象上去。
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // 返回修改的目标对象
        return target;
    };

    window.andy = module;
})(window);

$.fn.an_queue = function (options) {
    var fun = options.queue;
    $(this).queue("goqueue", fun);
    // $.fn.an_queue.start();
};
$.fn.an_queue.next = function (time) {
    var $this = $(this);
    if (time) {
        var s = setTimeout(function () {
            $this.dequeue("goqueue");
        }, time)
    }
    else {
        $this.dequeue("goqueue");
    }
};
//图片加载等待
$.fn.an_imgLoad = function (options) {
    var opts = $.extend({
        time: 4000, ///等待载入时间，如果超过这个时间就直接执行回调
        callback: function () {
        } //默认回调
    }, options);
    var $this = this, i = 0, j = 0, len = this.length;
    $this.each(function () {
        var _this = this, dateSrc = $(_this).attr("date-src"), imgsrc = dateSrc ? dateSrc : _this.src;
        var img = new Image();
        img.onload = function () {
            img.onload = null;
            _this.src = imgsrc;
            i++;
        };
        img.src = imgsrc;
    });
    var t = window.setInterval(function () {
        j++;
        //$("#msg").html(i);
        if (i == len || j * 200 >= opts.time) {
            window.clearInterval(t);
            opts.callback();
        }
    }, 200);
};

$.fn.layoutMain = function(){
    if(andy.IE() == 6){
        //框架执行
        if(andy.LAYOUT_IE6){
            andy.layout();
        };  
    }else{
        andy.layout();
        // andy.formlayout();
    };
    
    // andy.hmax()//高度填充
    // andy.gmax()//最大化
    // andy.panelauto()//panel适应
    // andy.formlayout();
    //input布局
    // andy.inputLayout();
};
$(function(){
    $.fn.layoutMain();
    andy.perform();//自动执行
    andy.floatact();//浮动面板响应动作
});

$(document).ready(function(){
    var t = null;
    var setTime = andy.SETTIME_02;
    $(window).resize(function(e){
        if(t){
            window.clearTimeout(t);
        };
        t = window.setTimeout(function(){
            $.fn.layoutMain();
            t = null;
            // if(andy.IE() > 6){
                t = window.setTimeout(function(){
                    $.fn.layoutMain();
                    t = null;
                }, setTime/2);
            // };
            
        }, setTime);
    })
});/*global  window , an_IE,document,console */
/**
 * 对话框模块
 * author:chenxiaoying
 **/
(function ($) {
    "use strict";
    var DBODYHOFFSET = 35 + 40 + 13 - 3,//head+bottom + bodypadiing
        DIALOGZ = 9000,
        DIALOGROOTID = "systemstage",//默认的弹出页，没有的话就在winTop
        massageCfg = {
            "成功": {title: "成功!", icon: 'f-color-success', buttons: [{text: '确定'}]},
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
                    windowbox = $(argu).parents(".u-panel");
                    //如果长度是0，表示没有找到，弹出的是内嵌iframe
                    //怎么才能获取外面的窗体对象呢
                    if (windowbox.length === 0) {
                        //argu = window.winIndex;
                        windowbox = undefined;
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
            if (!(ie <= 8) || ie === 0) {
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
            var iframeW, windowH, windowW, args, t = "", l = "", r = "", b = "";

            //args = $(win.eq(0)).data("an_dialog").options;
            args = window.top.$.data(win[0], "an_dialog").options;
            iframeW = win.parents("html")[0] || window.top;
            windowH = $(iframeW).height();
            windowW = $(iframeW).width();
            l = x || ((windowW - win.width()) / 2);
            t = y || ((windowH - win.height()) / 2);
            t = (andy.IE() === 6 && t !== "") ? t + iframeW.scrollTop : t;
            if (args.location) {
                if (args.location.indexOf("left") !== -1) {
                    l = 5;
                }
                if (args.location.indexOf("top") !== -1) {
                    t = 5;
                    t = (andy.IE() === 6 && t !== "") ? t + iframeW.scrollTop : t;
                }
                if (args.location.indexOf("right") !== -1) {
                    r = 5;
                    l = "";
                }
                if (args.location.indexOf("bottom") !== -1) {
                    b = 5;
                    t = "";
                    if (andy.IE() === 6) {
                        // alert("iframeW.scrollTop-"+iframeW.scrollTop+", iframeW.clientHeight-"+iframeW.clientHeight);
                        t = iframeW.scrollTop + iframeW.clientHeight - 5 - win.eq(0).height();
                    }
                }
            }
            // _top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight/2));

            // alert("l-"+l+",t-"+t+",r-"+r+",b-"+b);
            win.eq(0).css({"left": l, "top": t, "right": r, "bottom": b});
        },
    //重置窗口大小
        reSize = function (win, w, h) {
            var options, iframeW, windowH, windowW, winMask, winBody, bodyHeightOff, data;
            data = window.top.$.data(win[0], "an_dialog");
            if (data && data.options) {
                options = data.options;
                winMask = win.next('.u-panel-mask');
                winBody = win.find('.panel-body');
                iframeW = win.parents("html")[0] || window.top;
                windowH = $(iframeW).height();
                windowW = $(iframeW).width();
                bodyHeightOff = options.buttons && options.buttons.length > 0 ? DBODYHOFFSET : DBODYHOFFSET - 40;
                if (arguments.length === 2 && w === "max") {
                    win.height(windowH - 20);
                    win.width(windowW - 10);
                    winBody.height(windowH - bodyHeightOff);
                    winBody.width(windowW - 10);
                } else {
                    if (h !== undefined) {
                        h = h > windowH ? windowH - 10 : h;
                        win.height(h);
                        winBody.height(h === "" ? h : h - bodyHeightOff);
                    }
                    if (w !== undefined) {
                        w = w > windowW ? windowW - 10 : w;
                        win.width(w);
                        winBody.width(w === "" ? w : w - 10);
                    }
                }
                winMask.height(iframeW.scrollHeight);
                winMask.width(iframeW.scrollWidth);
            }
        },
        close = function (win) {
            var winMask, moveRect, options, parent;
            if (win) {
                winMask = win.next('.u-panel-mask');
                try {
                    //options = $(win.eq(0)).data("an_dialog").options;
                    options = window.top.$.data(win[0], "an_dialog").options;
                }
                catch (e) {
                    throw "can not close this dialog!";
                }
                if (!options.onBeforeClose || (options.onBeforeClose && options.onBeforeClose())) {
                    doAnimation(win.eq(0) || win, options.aniClose, function () {
                        //移除框
                        moveRect = win.nextAll('div[dialogMoveRect="true"]');
                        if (moveRect) {
                            moveRect.remove();
                        }
                        ////console.log(win.parent('body').data('events')["click"]);
                        //隐藏窗体
                        win.hide();
                        winMask.hide();
                        //解除事件绑定
                        //执行关闭事件
                        if (options.onClose) {
                            options.onClose(options);
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
                        winMask.remove();
                    });
                }
            }
        },

        headDragInit = function () {
            var root, module = {}, dmouseDown, wMain, wMask, moveRect, dmouseMove, dragStart = false, pos = {}, posing = {}, offset = {}, dragType, dmouseUp, changeCursor,
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
                    wMain = $(target).parents(".u-panel");
                    if (target.getAttribute("an_dialog_drag") === "true") {
                        dragType = 0;
                    }
                } else if (target.getAttribute("an_dialog_resize")) {
                    wMain = $(target);
                } else if (target.getAttribute("an_dialog")) {
                    wMain = $(target).parents(".u-panel");
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
                    wMask = wMain.next();
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
                var coe, x, y, w, h, options, iframeW;
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
                    if ((coe[2] + coe[3]) !== 0 || coe[2] * coe[3] === -1) {
                        options.onResize(w, h);
                        reSize(wMain, w, h);
                    }
                    if ((coe[0] + coe[1]) !== 0) {
                        options.onMove(x, y);
                        if (andy.IE() === 6) {
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
            var root, win,dialogRoot, show, iframeW, iframeOnload, organize, maxSize, bindHandler, setZ;
            if(args.locMyself){
                root = window;
            }else{
                dialogRoot = window.top.document.getElementById(DIALOGROOTID);
                root = dialogRoot?dialogRoot.contentWindow:window.top;
            }

            //显示窗体
            show = function (win) {
                var winMask, winBody;
                winMask = win.next('.u-panel-mask');
                if (args.maxSize) {
                    reSize(win, "max");
                } else {
                    reSize(win, args.width, args.height);
                }
                setPos(win);
                setZ(win, root.winIndex);
                win.eq(0).show();
                if (args.modalval) {
                    winMask.addClass("u-panel-maskshow");
                }
                $(root).resize(function (event) {
                    reSize(win);
                });
                doAnimation(win.eq(0), args.aniOpen, args.onOpen);
                if (!args.url && !args.data) {
                    args.onLoad();
                }
            };

            //设置
            setZ = function (win, n) {
                var winMask;
                winMask = win.next('.u-panel-mask');
                win.css("z-index", DIALOGZ + n * 4 + 2);
                winMask.css("z-index", DIALOGZ + n * 4);
            };

            maxSize = function (e) {
                var options, w = (e && e.data) || win;
                options = window.top.$.data(w[0], "an_dialog").options;
                if (e.target.className.indexOf("restore") > -1) {
                    $(e.target).removeClass("tool-restore");
                    $(e.target).addClass("tool-max");
                    reSize(w, e.target.getAttribute("reW"), e.target.getAttribute("reH") || "");
                } else {
                    $(e.target).addClass("tool-restore");
                    $(e.target).removeClass("tool-max");
                    e.target.setAttribute("reW", options.width || w.width());
                    e.target.setAttribute("reH", options.height || w.height());
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
                win.delegate('.u-panel-mask', 'click', win, close);
                // win.eq(2).delegate(".u-panel-mask", 'click', win, close);
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
            };
            //组装窗体
            organize = function () {
                var getTools, getIcon, getBottons, getContent, getTitle, dom;
                dom = '<div style="position: absolute;" an_dialog="true" an_dialog_resize = ' + args.resizeable + ' class="animated u-panel window ' + args.cls + '" style="display: none">' +
                    '<div an_dialog="true" class="panel-head">' +
                    ' <div an_dialog_drag = ' + args.draggable + ' class="panel-head-title ' + (args.draggable ? "an_dialog_drag" : "") + '"> #icon# #title#</div>' +
                    '<div an_dialog="true" class="panel-head-bar">#tools#<i class="iconfont tool-close" title="关闭">&#xe602;</i>' +
                    '</div></div>' +
                    '#content# #bottons#</div>' +
                    '<div class="u-panel-mask"></div>';
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
                        icon = '<i class="iconfont "' + args.icon + '">&#xe62c;</i>';
                    }
                    if (args.massage && massageCfg[args.massage.type]) {
                        icon = '<i class="iconfont ' + massageCfg[args.massage.type].icon + '"></i>';
                    }
                    return icon;
                };
                //工具栏
                getTools = function () {
                    var s = "", cell, mode = '<i class="iconfont tool-#type#"" href="javascript:void(0)" #attr#> #icon# </i>';
                    if (args.collapsible) {
                        s += mode.replace("#type#", "collapse").replace("#tip#", "收起").replace("#icon#", "");
                    }
                    if (args.minimizable) {
                        s += mode.replace("#type#", "min").replace("#tip#", "最小化").replace("#icon#", "");
                    }
                    if (args.maximizable) {
                        if (args.maxSize) {
                            cell = mode.replace("#type#", "restore").replace("#tip#", "还原").replace("#icon#", "&#xe60c;");
                        } else {
                            cell = mode.replace("#type#", "max").replace("#tip#", "最大化").replace("#icon#", "&#xe616;");
                        }

                        s += cell.replace("#attr#", "reW = " + (options.width) + " reH =" + options.height);
                    }
                    return s;
                };
                //按钮
                getBottons = function () {
                    var s = "", i, mode = '<div  bt_index="#index#" class="#class#" > #text# #iconCls#</div>';
                    if (args.massage) {
                        args.buttons = args.buttons || massageCfg[args.massage.type].buttons;
                    }

                    if (args.buttons) {
                        s = '<div class="panel-foot">';
                        //if (args.massage) {
                        //    mode = mode.replace("#class#", "an_d_massage_btn col-xs-" + 12 / args.buttons.length);
                        //    mode = mode.replace("#style#", "_width:"+(400/args.buttons.length-1)+"px");
                        // } else {
                        mode = mode.replace("#class#", "u-btn texture");
                        //    mode = mode.replace("#style#", "*min-width:20px");
                        //}
                        for (i = args.buttons.length - 1; i >= 0; i--) {
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
                        winbody = '<iframe frameborder="0" an_dialog="true" src = #content# class="panel-body"></iframe><div style="z-index: 1;position: absolute;" class="loading_bg_center"><span class="quarters-loader"></span></div>';
                        //先显示loading，载入页面
                        c = args.url;
                    } else {
                        winbody = '<div an_dialog="true" class="panel-body">#content#</div>';
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
                            if (args.mediaBox) {
                                c = $(root.document).an_mediabox("get", args.mediaBox);
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
                //TODO 可以让已弹出的框抖动一下
                return false;
            }

            win = root.$(organize());

            //在子页面中绑定dialog对象
            if (args.url) {
                iframeW = win.find('.panel-body')[0];
                iframeOnload = function () {
                    win.find('.loading_bg_center').remove();
                    iframeW.contentWindow.dialog = win;
                    if (iframeW.contentWindow.onresize) {
                        iframeW.contentWindow.onresize();
                    }
                    args.onLoad();
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
        width: 800,
        height: 600,
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
        cls: "",
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


    //$(window).resize();
})(jQuery);/*datagrid */
/**
 * 数据列表模块
 * author:林耘宇
 **/
(function ($) {
    $.fn.extend({
        an_datagrid:function(){
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

            var tl = $.extend({
                table:'',//表格id
                lockTable:{
                    lockRow:0,//固定行数
                    lockColumn:0//固定列数                    
                },
                width:"100%",//表格显示宽度（实质是外出div宽度）
                height:"100%",//表格显示高度（实质是外出div高度）
                doubleClickRow:function(){}//双击行事件
            }, options);

            var tableId=tl.table;
            if(tableId == ''){
                //没有传入id自己通过对象获取
                tableId = $(this).attr("id");
            };
            var table = $("#" + tableId);
            var ptable = table.parent();
            var tpheight = ptable.height();//父级高度
            var tpwidth = ptable.width();//父级宽度

            // 私有事件
            var lock = "EVENT_LOCK";

            if(tl.height != "100%" || tl.height > 0){
                tpheight = tl.height;
            }else if(tl.height == "100%"){
                // tpheight = tl.height;
            };
            if(tl.width > 0){
                tpwidth = tl.width;
            }else if(tl.width == "100%"){
                // tpheight = tl.width;
            };

            if(funstyle != ""){
                if(funstyle == "locakTable"){
                    var thislock = {
                        lockRow:0,//固定行数
                        lockColumn:0//固定列数    
                    };
                    var locktable = arguments[1];
                    thislock = $.extend(thislock, locktable);
                    table.trigger(lock, thislock);
                }else if(funstyle == "getValue"){
                    // var fun = arguments[1];
                    // combo.trigger(getVal, fun);
                };
            }else{
                var box = $("<div style = 'position:relative;clear:both;'></div>");
                table.wrap(box);
                // console.log("2", tpwidth, tpheight, ptable[0].clientHeight, ptable.parent().height());
                // box.width(tpwidth).height(tpheight);

                // 锁定行列
                table.bind(lock, function(e, locktable){
                    var table = $("#" + tableId);
                    table.an_tableLock({
                        table:tableId,//table的id
                        lockRow:locktable.lockRow,//固定行数
                        lockColumn:locktable.lockColumn,//固定列数
                        width:tpwidth,//表格显示宽度（实质是外出div宽度）
                        height:tpheight//表格显示高度（实质是外出div高度）
                    });
                    var pheight = table.parent().parent().parent().height();
                    var pwidth = table.parent().parent().parent().width();
                    table.an_tableLayout(table, pwidth, pheight);
                    
                });
                //锁定行列
                var lr = tl.lockTable.lockRow;
                var lc = tl.lockTable.lockColumn;

                if(lr > 1 || lc > 1){
                    table.an_tableLock({
                        table:tableId,//table的id
                        lockRow:lr,//固定行数
                        lockColumn:lc,//固定列数
                        width:tpwidth,//表格显示宽度（实质是外出div宽度）
                        height:tpheight//表格显示高度（实质是外出div高度）
                    });
                };

                var pheight = table.parent().parent().parent().height();
                var pwidth = table.parent().parent().parent().width();
                table.an_tableLayout(table, pwidth, pheight);
            };
        },
        an_tableLayout:function(element, pw, ph){
            var scrollWidth = 17;
            var tableId = element[0].id;
            var table = element;
            var boxid = 'divBoxing-' + tableId;
            var bodyid = 'divBoxingbody-' + tableId;
            var headid = 'divBoxinghead-' + tableId;
            var fixedid = 'divBoxingfixed-'+tableId;

            var divBox = $("#" + boxid);//table活动体对象
            var divBoxhead = $("#" + headid);//锁定行对象
            var divBoxbody = $("#" + bodyid);//锁定列对象
            var divBoxfixed = $("#" + fixedid);//锁定头部交叉对象
            var th = $("#"+tableId+"_h");
            var tw = $("#"+tableId+"_w");

            var lheight = ph;
            var lwidth = pw;
            if(table.height() <= ph){
                // 没有滚动条的时候不计算滚动条宽度
                scrollWidth = 0;
            };
            // 锁定行列渲染
            divBox.parent().width(lwidth).height(lheight);
            divBox.width(lwidth).height(lheight);
            divBoxhead.width(divBox.width() - scrollWidth);
            th.height(table.height());
            divBoxbody.height(divBox.height() - scrollWidth);
            tw.width(table.width());

            // ----------------------------------------------选中行列操作

            // 选中行 动作
            var setStatus = function(element, status){
                if(element.parent().is("td")){
                    element.prop("checked", status);
                    if(status){
                        element.parents("tr").addClass("current");
                    }else{
                        element.parents("tr").removeClass("current");
                    }
                    
                };
            };
            var setCheck = function(index, element, status){
                element.find("input").each(function(i, input1){
                    var cell = $(input1);
                    // 非数字类型为全选 或者 是单选
                    if(typeof(index) != "number" || index == i){
                        if(cell.prop("checked") != status){
                            setStatus(cell, status);
                        };
                    };
                    
                 });
            };
            // 设置所有
            var setItemAll = function(status){
                if(divBox[0]){
                    setCheck("", divBox.find("table"), status);
                }else{
                    setCheck("", table, status);
                };
                setCheck("", divBoxhead.find("table"), status);
                setCheck("", divBoxbody.find("table"), status);
                setCheck("", divBoxfixed.find("table"), status);
            };
            // 设置单个
            var setItem = function(index, status){
                if(divBox[0]){
                    setCheck(index, divBox.find("table"), status);
                }else{
                    setCheck(index, table, status);
                };
                setCheck(index, divBoxhead.find("table"), status);
                setCheck(index, divBoxbody.find("table"), status);
                setCheck(index, divBoxfixed.find("table"), status);
            };


            // ---------------------------------------------------树点击管理
            var getClassName = function(tr, name){
                var c = tr.children("."+name);
                var classname = c.attr("class");
                return classname
            };
            // 获取自己的层级
            var getGroupIndex = function(tr, classname){
                var name = getClassName(tr, classname);
                var namestr = name.split(" ");
                var nop = namestr[1].substr(0, 1);
                var non = parseInt(namestr[1].substr(1, namestr.length));
                return non;
            }   
            // 获取自己的文件夹
            var getGroup = function(tr){
                var name = getClassName(tr, "node");
                var namestr = name.split(" ");
                var nop = namestr[1].substr(0, 1);
                var non = parseInt(namestr[1].substr(1, namestr.length));
                if(non > 1){
                    non -= 1;
                };
                var preFirstGroup = tr.prevAll(".group"+nop+ non).first();
                return preFirstGroup;
            }
            // 遍历对象 点击对象class 点击对象 是否开启
            var setNodeStatus = function(tr, fclass, clickt,  isOpen){
                // 设置节点显示状态
                var tclass = tr.attr("class");
                if(tclass && tclass.substr(0, tclass.length - 1) == fclass.substr(0, fclass.length - 1)){
                    // 操作文件夹
                    if(isOpen){
                        $(tr).css("display", "");
                    }else{
                        $(tr).css("display", "none");
                    }
                }else{
                    // 操作节点
                    if(isOpen){
                        var preFirstGroup = getGroup(tr);
                        // 如果它的父级文件夹开着 那么它就显示
                        if(preFirstGroup[0] && preFirstGroup.children("td").hasClass("open")){
                            $(tr).css("display", "");
                        };
                    }else{
                        var preFirstGroup = getGroup(tr);
                        var clickIndex = getGroupIndex(clickt, "group");
                        var current = getGroupIndex(tr, "node");
                        if(preFirstGroup.children("td").hasClass("open") == false || current > clickIndex){
                            $(tr).css("display", "none");
                        };
                    };
                };
            };

            // 事件绑定
            var bindEvent = function(element){
                // 勾选事件绑定
                element.find("input").each(function(index, input){
                    var cell = $(input);
                    if(cell.parent().is("th") || cell.parent().is("td")){
                        cell.unbind("click");
                        cell.click(function(e){
                            if(cell.prop("checked")){
                                cell.parents("tr").addClass("current");
                                setItem(index, true);
                                // console.log("操作勾选");
                                // 操作勾选动作
                                if(cell.parent().is("th")){
                                    // setCheck(element, true);
                                    setItemAll(true);
                                };
                            }else{
                                cell.parents("tr").removeClass("current");
                                setItem(index, false);
                                // console.log("操作取消");
                                // 操作取消动作
                                if(cell.parent().is("th")){
                                    // setCheck(element, false);
                                    setItemAll(false);
                                };
                            }
                        })
                    };
                    
                });
                // 普通选中行 这个和多选有逻辑冲突 先屏蔽 这个选中行应该是唯一选中状态
                // element.find("table thead,tbody td:not('.group')").each(function(index, td){
                //     var cell = $(td);
                //     cell.unbind("click");
                //     cell.click(function(e){
                //         cell.parents("tr").toggleClass("current");
                //     });
                // });
                // 树表选择
                element.find(".group").each(function(index, group){
                    var cell = $(group);
                    var pcell = cell.parent();
                    var cclass = cell.attr("class");
                    var cname = cclass.split(" ");
                    cclass = cname[0] + cname[1];
                    pcell.addClass(cclass);
                    cell.unbind("click");
                    cell.click(function(e){
                        var g = $(e.target);
                        var tr = g.parent();
                        // 取 以上cclass赋值
                        var fclass = tr.attr("class").split(" ")[0];
                        
                        var isOpen = false;//执行动作
                        if(g.hasClass("open")){
                            isOpen = false;
                            g.removeClass("open");
                        }else{
                            isOpen = true;
                            g.addClass("open");
                        };
                        
                        tr.nextUntil("."+fclass).each(function(i, c){
                            setNodeStatus($(c), fclass, tr, isOpen);
                        });
                        // 锁定锁定行列状态
                        var headtr = divBoxhead.find("tbody tr").eq(tr.index());
                        headtr.nextUntil("."+fclass).each(function(i, c){
                            setNodeStatus($(c), fclass, headtr, isOpen);
                        });
                        var bodytr = divBoxbody.find("tbody tr").eq(tr.index());
                        bodytr.nextUntil("."+fclass).each(function(i, c){
                            setNodeStatus($(c), fclass, bodytr, isOpen);
                        });
                        var fixedtr = divBoxfixed.find("tbody tr").eq(tr.index());
                        fixedtr.nextUntil("."+fclass).each(function(i, c){
                            setNodeStatus($(c), fclass, fixedtr, isOpen);
                        });
                        // 重新渲染锁定行列
                        var pheight = table.parent().parent().parent().height();
                        var pwidth = table.parent().parent().parent().width();
                        table.an_tableLayout(table, pwidth, pheight);
                    });
                    
                });
            };

            
            if(divBox[0]){
                bindEvent(divBox.find("table"));
            }else{
                bindEvent(table);
            };
            bindEvent(divBoxhead.find("table"));
            bindEvent(divBoxbody.find("table"));
            bindEvent(divBoxfixed.find("table"));
        },
        an_tableLock: function(options) {
            var tl = $.extend({
                table:'lockTable',//table的id
                lockRow:1,//固定行数
                lockColumn:1,//固定列数
                width:'100%',//表格显示宽度（实质是外出div宽度）
                height:'100%',//表格显示高度（实质是外出div高度）
                lockRowCss:'lockRowBg',//锁定行的样式
                lockColumnCss:'lockColumnBg'//锁定列的样式
            }, options);

            var tableId=tl.table;
            var table=$('#'+tableId);
            var an_datagrid = "an-datagrid";//渲染字段
            var boxid = 'divBoxing-' + tableId;
            var bodyid = 'divBoxingbody-' + tableId;
            var headid = 'divBoxinghead-' + tableId;
            var fixedid = 'divBoxingfixed-'+tableId;
            var topindex = 50;
            var bottomindex = 1;
            var fiexdindex = 100;

            // if(table){

            // jQuery.fx.interval = 10000;
            var box=$("<div id='"+boxid+"'></div>").scroll(function(e){//在此处添加事件
                if(e.target.scrollTop > 0){
                    divBoxbody.css({"z-index":bottomindex});
                    divBoxhead.css({"z-index":topindex});
                }
                if(e.target.scrollLeft > 0){
                    divBoxbody.css({"z-index":topindex});
                    divBoxhead.css({"z-index":bottomindex});
                }
                divBoxbody.stop().animate({"scrollTop":e.target.scrollTop+'px'}, 0);
                divBoxhead.stop().animate({"scrollLeft":e.target.scrollLeft+'px'}, 0);
            });
            box.css({'width':tl.width, 'height':tl.height, 'overflow':'auto', 'position':'relative', 'clear':'both'});//设置高度和宽度
            table.wrap(box);
            table.addClass('tbLock');

            //创建div
            var divBox = $("#" + boxid);
            divBox.after("<div id = '"+headid+"'></div>");
            divBox.after("<div id = '"+bodyid+"'></div>");
            divBox.after("<div id = '"+fixedid+"'></div>");
            var divBoxhead = $("#" + headid);
            var divBoxbody = $("#" + bodyid);
            var divBoxfixed = $("#" + fixedid);

            var crossNum=tl.lockRow*tl.lockColumn;
            var scrollWidth = 17;
            var rowheights = 0;
            var colwidths = 0;
            if(tl.lockRow>0){
                var tr;
                for(var r=0;r<tl.lockRow;++r){//添加行锁定
                    tr=table.find('thead tr:eq('+r+') >th').addClass('LockRow').addClass(tl.lockRowCss);
                    if(!tr[r]){
                        // 头部不够 锁定body部分
                        tr=table.find('tbody tr:eq('+r+') >td').addClass('LockRow').addClass(tl.lockRowCss);
                    };
                    rowheights += tr[r].offsetHeight;
                    for(var c=0;c<tl.lockColumn;++c){//设置交叉单元格样式，除了锁定单元格外还有交叉单元格自身样式
                        if(tr){
                            table.find('thead tr th:eq('+c+')').addClass('LockCell');
                            tr.find('td:eq('+c+')').addClass('LockCell').addClass(tl.lockRowCss);
                        }
                        
                    }
                }
            }
            if(tl.lockColumn>0){
                var rowNum=$('#'+tableId+' tr').length;
                var tr, th;
                for(var r=(tl.lockRow);r<rowNum;++r){
                    tr=table.find('tr:eq('+r+')');
                    th = table.find('thead tr:eq(0) >th')
                    for(var c=0;c<tl.lockColumn;++c){//添加列锁定
                        if(r == (tl.lockRow)){
                            colwidths += th[c].offsetWidth;
                        }
                        tr.find('td:eq('+c+')').addClass('LockCell').addClass(tl.lockColumnCss);
                    }
                }
            }

            //复制横向

            var boxwidth = divBox.width() - scrollWidth;
            // console.log(divBox.css("width"), "|", tl.width);
            divBoxhead.width(boxwidth);//设置高度和宽度
            var th = table.clone().attr({"id":tableId + "_h"});
            th.removeAttr(an_datagrid);//移除属性名
            th.height(table.height());
            divBoxhead.css({"position":"absolute", "top":"0px", "left":"0px", "overflow":"hidden"});
            divBoxhead.height(rowheights);
            divBoxhead.append(th);

            //复制纵向
            divBoxbody.css({"position":"absolute", "top":"0px", "left":"0px", "overflow":"hidden"});
            var divheight = divBox.height() - scrollWidth;
            divBoxbody.height(divheight)
            var tw = table.clone().attr({"id":tableId + "_w"});
            tw.removeAttr(an_datagrid);//移除属性名
            tw.width(table.width());
            divBoxbody.width(colwidths);//设置高度和宽度
            divBoxbody.append(tw);
            //当table宽度自设置为100%时候

            //复制交叉固定
            divBoxfixed.css({"position":"absolute", "top":"0px", "left":"0px", "overflow":"hidden"});
            divBoxfixed.css({"z-index":fiexdindex});
            
            var fixed = table.clone().attr({"id":tableId + "_f"});
            fixed.removeAttr(an_datagrid);//移除属性名
            divBoxfixed.width(colwidths).height(rowheights);
            // fixed.find("thead tr th:not(.LockCell)").remove();
            divBoxfixed.append(fixed);
            fixed.width(table.width()).height(table.height());
            // $("#lockTable_f").css({'width':'200px', "_width":"200px"});

            //绑定布局事件
            if(rowheights > 0 && colwidths > 0){
                table.bind("layout", function(){
                    var lheight = divBox.parent().parent().height();
                    var lwidth = divBox.parent().parent().width();
                    divBox.parent().width(lwidth).height(lheight);
                    divBox.width(lwidth).height(lheight);
                    fixed.width(table.width()).height(table.height());
                    // table.width(tl.width).height(divBox.height());
                    
                    divBoxhead.width(divBox.width() - scrollWidth);
                    th.height(table.height());
                    divBoxbody.height(divBox.height() - scrollWidth);
                    tw.width(table.width());
                    

                })
            }
                
        }
    });
})(jQuery);/*tabs */
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
})(jQuery);/*
fwq 2016/3/21
switch 组件：
若在input上使用disabled也可以禁用开关
changeBefor 状态改变前，传递checkbox对象作为回掉参数
changeAfter 状态改变后，传递checkbox对象作为回掉参数
setEnable(true/false) 是否禁用开关
setState(true/false)  设置开关状态，开启||关闭
 */
;
( function ( $ ) {

	$.fn.extend( {

		switchs: function () {
			/**
			 * 控制开关样式
			 * @method stateInit
			 * @param  {[Object]}  $element [JQuery对象]
			 * @param  {[Booleam]}  flag
			 * @return {[void]}
			 */

			var stateInit = function ( $element, flag ) {
				var _icon, stateClass;
				$element.find( 'i' )
					.remove();
				$element.removeClass( 'on off' );
				flag ? _icon = '<i class="iconfont ">&#xe61c;</i>' : _icon = '<i class="iconfont ">&#xe61d;</i>';
				flag ? stateClass = 'on' : stateClass = 'off';
				$element.addClass( stateClass )
					.append( _icon )
					.addClass( 'switchState' );
			};
			Config = {
				/**
				 * 方法主程
				 * @method init
				 * @param  {[Object]} option [外部传入的配置]
				 * @return {[void]}
				 */
				init: function ( option ) {
					var defaults = {
						changeBefor: function ( $element ) {

						},
						changeAfter: function ( $element ) {

						}
					};

					var
						$element = $( this ),
						$input = $element.children( 'input' ),
						flag = $input.is( ':checked' ) ? true : false;
					if ( !$element.hasClass( 'switchState' ) ) {
						stateInit( $element, flag );
					}
					var options = $.extend( true, defaults, option || {} );

					$element.unbind( 'click' );
					$element.on( 'click', function ( event ) {
						event.stopPropagation();
						options.changeBefor( $input );

						if ( $input.prop( "disabled" ) ) return;

						var flag = $input.is( ":checked" );

						$input.prop( 'checked', !flag );
						stateInit( $(this), !flag );
						options.changeAfter( $input );
					} );
				},
				/**
				 * 是否禁用
				 * @method setEnable
				 */
				setEnable: function () {
					$( this )
						.children( 'input' )
						.prop( 'disabled', arguments[ 1 ] );
				},
				/**
				 * 开关状态
				 * @method setState
				 */
				setState: function () {
					stateInit( $( this ), arguments[ 1 ] );
					$( this )
						.children( 'input' )
						.prop( 'checked', arguments[ 1 ] );
				}
			}

			var method = arguments[ 0 ];
			if ( Config[ method ] ) {
				method = Config[ method ];
			} else if ( typeof ( method ) == 'object' || !method ) {
				method = Config.init;
			} else {
				$.error( "Something bad happened" );
				return this;
			}
			return method.apply( this, arguments );
		}
	} )
} )( jQuery );
/*global  window , an_IE,document,console */
/**
 * 表单模块  表单js交互，验证，响应样式，tooltip
 * author:chenxiaoying
 *
 * validateInKeyup 鼠标弹起的时候验证，默认是失去焦点验证
 *
 * 结构 <input type="text" class="u-input err" value="错误样式“err”">
 * <input type="text" class="u-input cor" value="正确样式“cor”">
 * <input type="text" class="u-input xs" value="MINI尺寸“xs”">
 * <input type="text" class="u-input" disabled value="禁用样式"><!--在IE8以下，禁用样式会有丢失-->
 * verify="required,phone"
 * 验证顺序和先后顺序有关，先验证required，再验证phone
 **/
(function ($) {
    var module = {}, customIndex = 1;
    if (window.andy) {
        module = window.andy;
    }
    // 日期校验 日期控件的话就不需要
    // isCorrectDate("2015-2-31") false isCorrectDate("2015-2-21") true
    var isCorrectDate = function (value) {
        if (typeof value === "string" && value) { //是字符串但不能是空字符
            var arr = value.split("-"); //可以被-切成3份，并且第1个是4个字符
            if (arr.length === 3 && arr[0].length === 4) {
                var year = ~~arr[0] //全部转换为非负整数
                var month = ~~arr[1] - 1
                var date = ~~arr[2]
                var d = new Date(year, month, date)
                return d.getFullYear() === year && d.getMonth() === month && d.getDate() === date
            }
        }
        return false
    };
    //过滤非法字符
    var quote = function (str) {
        var items = new Array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")");
        items.push(":", ";", "'", "|", "\\", "<", ">", "?", "/", "<<", ">>", "||", "//");
        items.push("admin", "administrators", "administrator", "管理员", "系统管理员");
        items.push("select", "delete", "update", "insert", "create", "drop", "alter", "trancate");
        str = str.toLowerCase();
        for (var i = 0; i < items.length; i++) {
            if (str.indexOf(items[i]) > -1) {
                return false;
            }
        }
        return true;
    };
    //身份证
    var checkIdCard = function (num) {
        num = num.toUpperCase();
        var cityCode = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        if (!cityCode[num.substr(0, 2)]) {
            //alert("地址编码错误");
            return false;
        }
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
        if (!( /(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num) )) {
            //alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
            return false;
        }

        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        //下面分别分析出生日期和校验位
        var len, re;
        len = num.length;
        if (len == 15) {
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            var arrSplit = num.match(re);
            //检查生日日期是否正确
            var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
            var bGoodDay;
            bGoodDay = ( dtmBirth.getYear() == Number(arrSplit[2]) ) && ( ( dtmBirth.getMonth() + 1 ) == Number(arrSplit[3]) ) && ( dtmBirth.getDate() == Number(arrSplit[4]) );
            if (!bGoodDay) {
                //alert('输入的身份证号里出生日期不对！');
                return false;
            } else {
                //将15位身份证转成18位
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0,
                    k;
                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                for (k = 0; k < 17; k++) {
                    nTemp += num.substr(k, 1) * arrInt[k];
                }
                num += arrCh[nTemp % 11];
                return true;
            }
        }
        if (len == 18) {
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var arrSplit = num.match(re);
            //检查生日日期是否正确
            var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
            var bGoodDay;
            bGoodDay = ( dtmBirth.getFullYear() == Number(arrSplit[2]) ) && ( ( dtmBirth.getMonth() + 1 ) == Number(arrSplit[3]) ) && ( dtmBirth.getDate() == Number(arrSplit[4]) );
            if (!bGoodDay) {
                //alert(dtmBirth.getYear());
                //alert(arrSplit[2]);
                //alert('输入的身份证号里出生日期不对！');
                return false;
            } else {
                //检验18位身份证的校验码是否正确。
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var valnum;
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0,
                    k;
                for (k = 0; k < 17; k++) {
                    nTemp += num.substr(k, 1) * arrInt[k];
                }
                valnum = arrCh[nTemp % 11];
                if (valnum != num.substr(17, 1)) {
                    //alert('18位身份证的校验码不正确！应该为：' + valnum);
                    return false;
                }
                return true;
            }
        }
        return false;
    };
    //验证规则
    var VERIFY = {
        trim: {
            check: function (e) {//格式化
                //if (data.element.type !== "password") {
                //    value = String(value || "").trim()
                //}
                e.value = e.value.replace(/(^\s*)|(\s*$)/g, "");
                return true;
            }
        },
        required: {
            message: '不能为空',
            placeholder: "请输入文字...",
            check: function (e) {
                return e.value !== "";
            }
        },
        "int": {
            message: "不是整数，请输入整数",
            placeholder: "请输入整数",
            check: function (e) {
                return /^\-?\d+$/.test(e.value);
            }
        },
        mobile: {
            message: "手机号码不合法",
            placeholder: "请输入手机号",
            check: function (e) {
                return /^(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])\d{8}$/.test(e.value);
            }
        },
        phone: {
            message: "座机号码不合法",
            placeholder: "请输入座机号",
            check: function (e) {
                var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
                var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;
                if (e.value.length > 9) {
                    return phoneRegWithArea.test(e.value);
                }
                return phoneRegNoArea.test(e.value);
            }
        },
        decimal: {
            message: '不是小数，请输入小数',
            placeholder: '请输入小数',
            check: function (e) {
                return /^\-?\d*\.?\d+$/.test(e.value)
            }
        },
        alpha: {
            message: '包含字母以外的非法字符',
            placeholder: '请输入字母',
            check: function (e) {
                return /^[a-z]+$/i.test(e.value);
            }
        },
        alpha_numeric: {
            message: '包含字母或数字以外的非法字符',
            placeholder: '请输入字母或数字',
            check: function (e) {
                return /^[a-z0-9]+$/i.test(e.value)
            }
        },
        alpha_dash: {
            message: '包含字母或数字及下划线以外的非法字符',
            placeholder: '请输入字母或数字及下划线等字符',
            check: function (e) {
                return /^[a-z0-9_\-]+$/i.test(e.value);
            }
        },
        chs: {
            message: '请输入中文字符',
            placeholder: '请输入中文字符',
            check: function (e) {
                return /^[\u4e00-\u9fa5]+$/.test(e.value);
            }
        },
        chs_numeric: {
            message: '请输入中文字符或数字及下划线等特殊字符',
            placeholder: '请输入中文字符或数字及下划线等特殊字符',
            check: function (e) {
                return /^[\\u4E00-\\u9FFF0-9_\-]+$/i.test(e.value);
            }
        },
        qq: {
            message: "腾讯QQ号从10000开始",
            placeholder: "请输入QQ号",
            check: function (e) {
                return /^[1-9]\d{4,10}$/.test(e.value);
            }
        },
        postoffice: {
            message: "邮编格式错误",
            placeholder: "请输入邮编",
            check: function (e) {
                return /^[1-9][0-9]{5}$/.test(e.value);
            }
        },
        idcard: {
            message: "身份证格式错误",
            placeholder: "请输入身份证号",
            check: function (e) {
                return checkIdCard(e.value);
            }
        },
        ipv4: {
            message: "ip地址不正确",
            placeholder: "请输入ip地址",
            check: function (e) {
                //"(([0-9]{1,3}.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
                var ripv4 = /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i;
                return ripv4.test(e.value);
            }
        },
        email: {
            message: "邮箱地址错误",
            placeholder: "请输入邮箱",
            check: function (e) {
                return /^([A-Z0-9]+[_|\_|\.]?)*[A-Z0-9]+@([A-Z0-9]+[_|\_|\.]?)*[A-Z0-9]+\.[A-Z]{2,3}$/i.test(e.value);
            }
        },
        url: {
            message: "URL格式错误",
            placeholder: "请输入链接",
            check: function (e) {
                return /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/.test(e.value);
            }
        },
        //特殊字符
        quote: {
            message: "包含非法字符",
            placeholder: "请输入...",
            check: function (e) {
                return quote(e.value);
            }
        },
        repeat: {
            message: "密码输入不一致",
            check: function (e) {
                var otherId = e.getAttribute("repeat");
                if (otherId) {
                    var otherEl = e.ownerDocument.getElementById(otherId);
                }
                if (!otherEl) {
                    return false;
                }
                return e.value === otherEl.value;
            }
        },
        date: {
            message: '必须符合日期格式 YYYY-MM-DD',
            placeholder: "请输入日期 例如：2016-3-2",
            check: function (e) {
                return isCorrectDate(e.value);
            }
        },
        passport: {
            message: '护照格式错误或过长',
            placeholder: "请输入护照号",
            check: function (e) {
                return /^[a-zA-Z0-9]{4,20}$/i.test(e.value);
            }
        },
        minlength: {
            message: '最少输入{{minlength}}个字',
            placeholder: "请输入{{minlength}}个以上字符",
            check: function (e) {
                var elem = e;
                var num = parseInt(elem.getAttribute("minlength"), 10);
                return elem.value.length >= num;
            }
        },
        maxlength: {
            message: '最多输入{{maxlength}}个字',
            placeholder: "请输入{{maxlength}}个以下字符",
            check: function (e) {
                var elem = e;
                var num = parseInt(elem.getAttribute("maxlength"), 10);
                return elem.value.length <= num;
            }
        },
        greaterthan: {
            message: '请输入大于{{greaterthan}}的数字',
            placeholder: '请输入大于{{greaterthan}}的数字',
            check: function (e) {
                var elem = e;
                var num = parseInt(elem.getAttribute("greaterthan"), 10);
                return parseFloat(elem.value) > num;
            }
        },
        lessthan: {
            message: '请输入小于{{lessthan}}的数字',
            placeholder: '请输入小于{{lessthan}}的数字',
            check: function (e) {
                var elem = e;
                var num = parseInt(elem.getAttribute("lessthan"), 10);
                return parseFloat(elem.value) < num;
            }
        },
        contains: {
            message: "必须包含{{contains}}中的一个",
            placeholder: "必须包含{{contains}}中的一个",
            check: function (e) {
                var val = e.value;
                var vmValue = [].concat(val).map(String);
                var domValue = (e.getAttribute("contains") || "").split(",");
                var has = false;
                for (var i = 0, n = vmValue.length; i < n; i++) {
                    var v = vmValue[i]
                    if (domValue.indexOf(v) >= 0) {
                        has = true;
                        break;
                    }
                }
                return has;
            }
        },
        contain: {//还有问题
            message: "必须包含{{contain}}",
            placeholder: '请输入包含{{contain}}这样格式的字符',
            check: function (e) {
                var val = e.value;
                var vmValue = [].concat(val).map(String);
                var domValue = (e.getAttribute("contain") || "").split(",")
                if (!vmValue.length) {
                    var has = false
                } else {
                    has = true
                    for (var i = 0, n = domValue.length; i < n; i++) {
                        var v = domValue[i]
                        if (vmValue.indexOf(v) === -1) {
                            has = false
                            break
                        }
                    }
                }
                return has;
            }
        },
        pattern: {
            message: '必须匹配/{{pattern}}/这样的格式',
            placeholder: '请输入匹配/{{pattern}}/这样格式的字符',
            check: function (e) {
                var elem = e;
                var pattern = elem.getAttribute("pattern");
                var re = new RegExp('^(?:' + pattern + ')$');
                return re.test(elem.value);
            }
        }
    };
    /**
     * tooltip 提示  以后是一个单独的控件
     * @param element 需要提示的对象
     * @param position 方位，目前仅支持"top","bottom"
     * @param cont 需要提示的内容
     * @param type 样式，为空为黑色，"terr"为红色
     */
    module.tooltip = function (element, position, cont, type) {
        var that = {};
        if (!element.parent().is('.m-tooltip')) {
            element.wrap("<div class='m-tooltip " + type + "'></div>");
        }
        if (position == 'bottom' || position == undefined) {
            var et = element.outerHeight() + 2 + 'px',
                el = '0',
                eb = 'auto',
                er = 'auto',
                ip = '',
                itype = '&#xe605;';
        } else if (position == 'top') {
            var et = 'auto',
                el = '0',
                eb = element.outerHeight() + 2 + 'px',
                er = 'auto',
                ip = 't',
                itype = '&#xe611;';
        }
        var afterhtml = '<div class="infobox" style="top:' + et + '; left:' + el + '; bottom:' + eb + '; right:' + er + '; display: none;">' +
            '<i class="iconfont ' + ip + '">' + itype + '</i>' +
            '<div class="content">' + cont + '</div>' +
            '</div>'
        $(afterhtml).insertAfter(element);
        el = element.next('.infobox');

        module.tooltip.showinfo = function (tooltip) {
            $(tooltip).fadeIn(200);
        };
        module.tooltip.hideinfo = function (tooltip) {
            $(tooltip).fadeOut(200);
        };
        module.tooltip.setContent = function (tooltip, str) {
            $(tooltip).find('.content').html(str);
        };

        return that;
    };
    //在IE8下的input默认提示值
    var placeholder = function () {
        $("[placeholder]").each(function (index, element) {
            var defval = $(element).attr('placeholder');
            if ($(element).val() == '') {
                $(element).val(defval).addClass('place');
            }
            $(element).focus(function () {//获得焦点时
                if ($(this).val() == defval) {
                    $(this).val('').removeClass('place');
                }
            });
            $(element).blur(function () {//失去焦点时
                if ($(this).val() == '') {
                    $(this).val(defval).addClass('place');
                }
            });
        });
    };
    /**
     * 验证正确
     * @param el
     */
    var setCorrect = function (el) {
        $(el).addClass("cor");
    };
    var setError = function (el) {
        $(el).addClass("err");
    };
    //重置
    var reSet = function (el) {
        $(el).removeClass("err cor");
    };
    /**
     * /验证函数
     * @param el 输入框
     * @param toolTip 提示组件对象
     * @returns {boolean} 是否通过验证
     */
    var check = function (el) {
        var toolTip, iden = true, cIden, i, tipStr, rules = el.getAttribute("verify").split(",");
        for (i = rules.length - 1; i >= 0; i--) {
            cIden = VERIFY[rules[i]].check(el);
            if (!cIden) {
                if (el.getAttribute("message")) {
                    tipStr = el.getAttribute("message");
                } else {
                    tipStr = VERIFY[rules[i]].message;
                    if (tipStr.indexOf(rules[i]) > -1) {
                        tipStr = tipStr.replace("{{" + rules[i] + "}}", el.getAttribute(rules[i]));
                    }
                }
                toolTip = $(el).next('.infobox');
                module.tooltip.setContent(toolTip, tipStr);
                module.tooltip.showinfo(toolTip);
                setError(el);
            }
            iden = iden && cIden;
        }
        if (iden) {
            setCorrect(el);
        }
        return iden;
    };
    var bindVerify = function (element, checkFun) {
        if (element.getAttribute("tipPos")) {
            module.tooltip($(element), element.getAttribute("tipPos"), $(element).attr('title'), 'terr');
        } else {
            module.tooltip($(element), 'bottom', $(element).attr('title'), 'terr');
        }
        var eFun = function (event) {
            return checkFun ? checkFun(event.target) : check(event.target);
        };
        //输入中判断，ps有些判断支持，有些不支持
        if (element.getAttribute("validateInKeyup")) {
            $(element).keyup(eFun);
        }
        else {
            $(element).blur(eFun);
        }
        $(element).focus(function (event) {
            reSet($(this));
            module.tooltip.hideinfo($(this).next('.infobox'));
        });
    }
    var fromInit = function () {
        $("[verify]").each(function (index, element) {
            bindVerify(element);
            //element.parentNode.style.width = element.parentNode.parentNode.offsetWidth + "px";
            andy.inputLayout($(element).parent());
            andy.inputLayout($(element));
            if (!element.getAttribute("placeholder")) {
                var rules = element.getAttribute("verify").split(",");
                var placeholder = VERIFY[rules[rules.length - 1]].placeholder;
                if (placeholder) {
                    if (placeholder.indexOf("{{") > -1) {
                        placeholder = placeholder.replace("{{" + rules[rules.length - 1] + "}}", element.getAttribute(rules[rules.length - 1]));
                    }
                    element.setAttribute("placeholder", placeholder);
                }
            }
        });
    };
    //TODO 绑定自定义验证函数
    //TODO 绑定后台ajax验证
    //渲染，对IE8下的输入提示
    var render = function () {
        fromInit();
        //if (window.andy.IE() < 10) {
        //    placeholder();
        //}
    };

    $(document).ready(function () {
        render();
    });

    /**
     * 绑定自定义验证函数
     * @param el input元素
     * @param options {massage:str check:function}
     */
    module.addVerify = function (el, options) {
        var arg, checkName, def = {
            massage: "输入不合法",
            check: function () {
                return true;
            }
        };
        arg = $.extend(def, options);
        checkName = "custom" + customIndex;
        VERIFY[checkName] = arg;
        el.setAttribute("verify", el.getAttribute("verify") ? el.getAttribute("verify") + "," + checkName : checkName);
        bindVerify(el, arg.check);
        customIndex++;
    };
    /**
     * 绑定ajax验证
     * @param el input元素
     * @param options 增加一个message
     *
     * data如果需要自己组织，则 return 一个函数
     * 这里约定后台返回 success成功与否 msg错误消息
     *
     * 要处理异步的问题 还有和一般验证结果相与
     * 是否最后提交的时候也要执行
     */
    module.ajaxVerify = function (el, options) {
        var arg, toolTip, defaults = {
            async: false,
            type: 'get',
            url: '',
            data: {},
            dataType: 'json',
            beforeSend: function () {
            },
            complete: function () {
            },
            //网络请求成功
            success: function () {
            },
            //网络错误
            error: function () {
            }
        };
        if (options) {
            arg = $.extend(defaults, options);
            arg.success = function (argu) {
                if (argu.success) {
                    setCorrect(el);
                } else {
                    toolTip = $(el).next('.infobox');
                    if (tipStr) {
                        module.tooltip.setContent(toolTip, tipStr);
                        module.tooltip.showinfo(toolTip);
                    }
                    setError(el);
                }
                if (options.success) {
                    options.success(argu);
                }
            };
            arg.error = function (argu) {
                alert("error" + argu.toString());
            };
            bindVerify(el, function (e) {
                arg.data = options.data ? options.data() : e.value;
                $.ajax(arg);
            });
        }
    };
    module.fromVerify = function (from) {
        var right = true;
        $(from).find("[verify]").each(function (index, element) {
            right = check(element) && right;
        });
        return right;
    };

})(jQuery);/*accordion */
/**
 * 手风琴模块
 * author:林耘宇
 **/
(function ($) {
    $.fn.extend({
        an_accordion:function(options){
            var _options = $.extend({
                index:1,//默认打开第一个 设置0为全关闭
                isAnimation:true,
                multiple:false,//允许同时打开多个或者关闭多个
                isAllOpen:false,//是否全打开，必须multiple为true时才生效

                fit:true,//默认自适应
                height:0,
                width:0,
                onClick:function(){}
            }, options);

            var _stringclass = {
                head:"panel-head",
                body:"panel-body",
                title:"panel-head-title",
                hidden:"f-hidden",
                active:"activate"
            }

            var accordion = $(this);
            var head = accordion.children().children("."+_stringclass.head);
            var body = accordion.children().children("."+_stringclass.body);
            // var tabstyle = "";
            // var contentstyle = "";

            // if(!_options.fit){
            //     tabstyle = "height:"+_options.height+"px;_height:"+_options.height+"px;width:"+_options.width+"px;";
            //     contentstyle = "height:"+(_options.height - 66)+"px;_height:"+(_options.height - 66)+"px;width:"+(_options.width - 30)+"px;overflow:auto";
            // }

            // tabs.attr("style", tabstyle);
            // body.children().attr("style", contentstyle);

            start();

            function start(){
                if(body){
                    build();
                };

                //绑定事件
                head.each(function(i, e){
                    $(e).click(function(e){
                        show(i+1);
                        // activate
                        head.each(function(index, head){
                            $(head).removeClass("activate");
                        });
                        $(this).addClass("activate");
                        _options.onClick(e);
                    })
                })
            };

            function build(){
                if(_options.multiple || !_options.isAllOpen){
                    body.each(function(i, e){
                        var t = $(e);
                        if(_options.index > 0 && _options.index == (i+1)){
                            if(_options.isAnimation){
                                t.slideDown(200);
                            }
                        }else{
                            if(_options.isAnimation){
                                t.slideUp(200);
                            }else{
                                t.addClass(_stringclass.hidden);
                            }
                        }
                    });
                }else{
                    show();
                }
            }

            function choose(index){
                body.each(function(i, e){
                    var t = $(e);
                    if(t.css("display") == "block" && _options.multiple){

                    }
                })
                show(index);
            }

            function show(index){
                var page = _options.index;
                if(index){
                    page = index;
                }

                body.each(function(i, e){
                    var t = $(e);
                    if(page > 0 &&  page == (i + 1)){
                        if(_options.isAnimation){
                            if(_options.multiple){
                                t.slideToggle(200);
                            }else{
                                t.slideDown(200);
                            }
                        }else{
                            if(_options.multiple){
                                t.toggleClass(_stringclass.hidden);
                            }else{
                                t.removeClass(_stringclass.hidden);
                            }
                        }
                    }else{
                        if(!_options.multiple){
                            if(_options.isAnimation){
                                t.slideUp(200);
                            }else{
                                t.addClass(_stringclass.hidden);
                            }
                        }
                    }
                })
            }
        }
    })
})(jQuery);/*pagination */
/**
 * 分页模块
 * author:林耘宇
 **/
(function ($) {
    $.fn.extend({
        an_pagination:function(){
            var options = {};
            var funstyle = "";
            for(var i= 0; i <arguments.length;i++){
                // console.log(arguments[0]);
                var a = arguments[i];
                if(typeof a == "object"){
                    options = a;
                }else if(typeof a == "string"){
                    funstyle = a;
                }
            };

            if(funstyle != ""){
                if(funstyle == "total"){
                    $(this).trigger("total", options.total);
                }
                if(funstyle == "select"){
                     $(this).trigger("select");
                }
            }else{
                //合并设置
                var _options = $.extend({
                    index:1,//默认打开页面索引
                    total:100,//总条数
                    selectListIndex:1,//选择列表索引默认为1
                    list:[10, 20, 30, 40, 50],//每页列表
                    onSelectPage:function(){}//选择每页显示行数
                }, options);

                var pn = $(this);
                var page_fist = pn.find("[page-fist]");//跳转到第一页
                var page_prev = pn.find("[page-prev]");//跳转到上一页
                var page_next = pn.find("[page-next]");//跳转到下一页
                var page_last = pn.find("[page-last]");//跳转到最后一页
                var page_select = pn.find("[page-select]");
                var page_refresh = pn.find("[page-refresh]");//刷新当前页
                var currentSelectNumber = _options.list[0];
                if(_options.selectListIndex > 1 || options.selectListIndex <= _options.list.length + 1){
                    currentSelectNumber = _options.list[_options.selectListIndex - 1];
                }
                if(page_select){
                    currentSelectNumber = page_select.val();
                }
                var index = _options.index;
                //当前总页数
                var currentNumber = Math.ceil(_options.total/currentSelectNumber);
                //选择每页显示行数
                pn.find("[page-select]").change(function(e){
                    _options.onSelectPage(index, $(e.target).val());
                    currentSelectNumber = $(e.target).val();
                    currentNumber = Math.ceil(_options.total/currentSelectNumber);
                    if(index > currentNumber){
                        index = 1;
                    };
                    changeText();
                });
                pn.bind("select",function(e){
                    _options.onSelectPage(index, currentSelectNumber);
                });
                pn.bind("total", function(e, total){
                    _options.total = total;
                    currentNumber = Math.ceil(_options.total/currentSelectNumber);
                    if(index > currentNumber){
                        index = 1;
                    };
                    changeText();
                })

                if(page_fist){
                    page_fist.click(function(e){
                        if(index != 1){
                            index =1;
                            changeText();
                            _options.onSelectPage(index, currentSelectNumber);
                        }
                    })
                };

                if(page_prev){
                    page_prev.click(function(e){
                        if(index > 1){
                            index -=1;
                            changeText();
                            _options.onSelectPage(index, currentSelectNumber);
                        }
                    })
                };

                if(page_next){
                    page_next.click(function(e){
                        if(index < currentNumber){
                            index +=1;
                            changeText();
                            _options.onSelectPage(index, currentSelectNumber);
                        }
                    })
                };

                if(page_last){
                    page_last.click(function(e){
                        if(index != currentNumber){
                            index = currentNumber;
                            changeText();
                            _options.onSelectPage(index, currentSelectNumber);
                        }
                    })
                };

                if(page_refresh){
                    page_refresh.click(function(e){
                        _options.onSelectPage(index, currentSelectNumber);
                    })
                };

                changeText();

                function changeText(){
                    // pn.find("[page-counts]")page-record
                    var page_counts = pn.find("[page-counts]");
                    var page_recoud = pn.find("[page-record]");
                    var page_index = pn.find("[page-index]");
                    
                    if(page_counts){
                        page_counts.text(currentNumber)
                    }
                    if(page_index){
                        page_index.val(index);
                    }
                    if(page_recoud){
                        page_recoud.text("共"+_options.total+"记录");
                    }
                    
                }

                return _options;

            }

        }
    })
})(jQuery);/*selector */
/**
 * 选择器组件
 * author:林耘宇
 **/
    //必须引入z-tree

(function ($) {
    $.fn.extend({
        an_selector: function () {
            var options = {}, METHODS = {};
            var funstyle = "";
            for (var i = 0; i < arguments.length; i++) {
                // console.log(arguments[0]);
                var a = arguments[0];
                if (typeof a == "object") {
                    options = a;
                } else if (typeof a == "string") {
                    funstyle = a;
                }
            }
            ;

            if (funstyle != "") {
                if (METHODS[funstyle]) {
                    //有mothed则调用之
                    return METHODS[funstyle](this, arguments[1]);
                }
                throw 'The method of' + funstyle + 'is undefined';
                return false;
            } else {
                //合并设置
                var _options = $.extend({
                    treeid: "",//ztree dom的id
                    url: "",//传入ztree结构json
                    nodes: [],//传入本地数据同步加载-ztree
                    rightNodes: [],//已选好的数据
                    getUrl: "",//获取地址数据链接 节点数据连接
                    searchText: "输入工号/名字",
                    leftTitle: "部门结构",
                    setting: "",//默认ztree配置
                    //clickTree: function (url, treeId, text)//自己组织点击的数据 传入一个闭包函数 function(id){return function(){}}
                    submit: function () {
                    }
                }, options);

                var sel = $(this);
                var center = sel.find("[center]");
                var right = sel.find("[right]");
                var choose = sel.find("[choose]");//全选按钮
                var cancel = sel.find("[cancel]");//全部取消按钮
                var submit = sel.find("[submit]");//提交按钮
                var inputText = sel.find("[inputText]");//搜索框
                var search = sel.find("[search]");//搜索按钮
                var leftTitle = sel.find("[leftTitle]");//左边标题
                var chooseData = [];
                var currentTreeNode = "";

                //树设置
                var setting = {
                    callback: {
                        onClick: function (event, treeId, treeNode) {
                            currentTreeNode = treeNode;
                            onTreeClick(currentTreeNode);
                        }
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    }
                };

                if (_options.setting != "") {
                    setting = $.extend(setting, _options.setting);
                }

                var tree = "";
                // 判断是否加载ztree结构json
                if (_options.url == "") {
                    $.fn.zTree.init($("#" + _options.treeid), setting, _options.nodes);
                    tree = $("#" + _options.treeid);
                } else {
                    andy.loaddata(_options.url, function (data) {
                        data = andy.stringToJson(data);
                        $.fn.zTree.init($("#" + _options.treeid), setting, data);
                        tree = $("#" + _options.treeid);
                    })
                }

                //已选框是否有数据
                if (_options.rightNodes.length > 0) {
                    for (var i = 0; i < _options.rightNodes.length; i++) {
                        var data = _options.rightNodes[i];
                        addToRight(data);
                    }
                }
                ;

                // 左边标题
                if (leftTitle) {
                    leftTitle.text(_options.leftTitle);
                }
                ;

                // 进行全选操作
                if (choose) {
                    choose.click(function () {
                        if (center) {
                            center.children().each(function (index, e) {
                                for (var i = 0; i < chooseData.length; i++) {
                                    if ($(e).attr("id") == chooseData[i].id) {
                                        clearSelf($(e));
                                        addToRight(chooseData[i]);
                                    }
                                }
                            })
                        }
                    })
                }
                ;

                // 进行全部取消操作
                if (cancel) {
                    cancel.click(function () {
                        if (right) {
                            right.children().each(function (index, e) {
                                clearSelf($(e));
                                changeCenterFrame(chooseData);
                            })
                        }
                    })
                }


                // 提交按钮
                if (submit) {
                    submit.click(function () {
                        _options.submit(getChooseJson());
                    })
                }


                //搜索按钮
                if (search) {
                    search.click(function () {
                        onTreeClick(currentTreeNode, true);
                    });
                }

                if (inputText) {
                    inputText.val(_options.searchText);
                    inputText.blur(function (e) {
                        if ($(e.target).val() == "") {
                            inputText.val(_options.searchText);
                        }
                    });
                    inputText.focus(function (e) {
                        if ($(e.target).val() == _options.searchText) {
                            inputText.val("");
                        }

                    });
                }

                // 树点击事件 event, treeId, treeNode
                function onTreeClick(treeNode, isSearch) {
                    var params = {}, url = _options.getUrl;
                    var text = "";
                    if (url != "") {
                        if (inputText.val() != _options.searchText && isSearch) {
                            params.search = inputText.val();
                        }
                        params.id = treeNode.id;
                        if (_options.clickTree) {
                            params = _options.clickTree(treeNode);
                        }
                        andy.loaddata(url, params, function (data) {
                            data = andy.stringToJson(data);
                            chooseData = data;
                            changeCenterFrame(data);
                        })
                    }
                };

                function changeCenterFrame(data) {
                    if (center || data) {
                        center.empty();
                        for (var i = 0; i < data.length; i++) {
                            var d = data[i];
                            if (!checkId(right, d.id)) {
                                addToCenter(d);
                            }
                        }
                    }

                };

                // 添加人员到中间
                function addToCenter(data) {
                    if (center) {
                        if (checkDataId(chooseData, data.id) && !checkId(center, data.id)) {
                            center.append("<button class='u-btn sm' id = " + data.id + " data = " + data.data + " name = " + data.name + ">" + data.name + "</button>");
                            var button = $("#" + data.id);
                            button.click(function (e) {
                                clearSelf(button);
                                addToRight(data);
                            })
                        }
                    }
                };

                // 添加人员到右侧
                function addToRight(data) {
                    console.log(data)
                    if (right) {
                        if (!checkId(right, data.id)) {
                            right.append("<button class='u-btn sm' id = " + data.id + " data = " + data.data + " name = " + data.name + ">" + data.name + "<i class='iconfont'>&#xe602;</i></button>");
                            var button = $("#" + data.id);
                            button.click(function (e) {
                                clearSelf(button);
                                addToCenter(data);
                            })
                        }
                    }
                };

                // 查询对象是否有相同id
                function checkId(element, id) {
                    var ishave = false;
                    element.children().each(function (index, e) {
                        if (id == $(e).attr("id")) {
                            ishave = true;
                        }
                    })
                    return ishave;
                };

                // 检查数组是否有相同id
                function checkDataId(data, id) {
                    var ishave = false;
                    for (var i = 0; i < data.length; i++) {
                        var d = data[i];
                        if (id == d.id) {
                            ishave = true;
                        }
                    }
                    ;
                    return ishave;
                }

                //移除自己
                function clearSelf(element) {
                    element.unbind('click');
                    element.remove();
                };

                //获取被选框对象 生成数据后
                function getChooseJson() {
                    var str = "[";
                    right.children().each(function (index, e) {
                        var $this = $(e);
                        var s = "{'id':'" + $this.attr("id") + "','name':'" + $this.attr("name") + "','data':'" + $this.attr("data") + "', 'tId':'" + $this.attr("tId") + "'}";
                        if (str == "[") {
                            str += s;
                        } else {
                            str += "," + s;
                        }

                    })
                    str += "]";
                    var jstr = eval('(' + str + ')');
                    return jstr;
                };
            }

        },
        //属性选择器 一般用在部门选择器
        an_selectorTree: function () {
            var options = {};
            var funstyle = "";
            for (var i = 0; i < arguments.length; i++) {
                // console.log(arguments[0]);
                var a = arguments[0];
                if (typeof a == "object") {
                    options = a;
                } else if (typeof a == "string") {
                    funstyle = a;
                }
            }
            ;

            if (funstyle != "") {
                //方法写入
                // if(funstyle == "total"){
                //     $(this).trigger("total", options.total);
                // }
            } else {
                //合并设置
                var _options = $.extend({
                    treeid: "",//ztree dom的id
                    url: "",//传入ztree结构json
                    nodes: [],//传入本地数据同步加载-ztree
                    rightNodes: [],//已选好的数据
                    leftTitle: "部门结构",
                    submit: function () {
                    }
                }, options);

                var sel = $(this);
                var right = sel.find("[right]");
                var cancel = sel.find("[cancel]");//全部取消按钮
                var submit = sel.find("[submit]");//提交按钮
                var leftTitle = sel.find("[leftTitle]");//左边标题
                var chooseData = [];
                var currentTreeNode = "";
                var treeObject = $.fn.zTree.getZTreeObj(_options.treeid);

                //树设置
                var setting = {
                    treeId: "1",
                    treeObj: null,
                    callback: {
                        onCheck: function (event, treeId, treeNode) {
                            onTreeCheck(treeNode);
                        }
                    },
                    check: {
                        enable: true,
                        chkStyle: "checkbox",
                        chkboxType: {"Y": "s", "N": "s"}
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    }
                };

                var tree = "";
                // 判断是否加载ztree结构json
                if (_options.url == "") {
                    $.fn.zTree.init($("#" + _options.treeid), setting, _options.nodes);
                    tree = $("#" + _options.treeid);
                } else {
                    andy.loaddata(_options.url, function (data) {
                        data = andy.stringToJson(data);
                        $.fn.zTree.init($("#" + _options.treeid), setting, data);
                        tree = $("#" + _options.treeid);
                    })
                }
                ;

                //已选框是否有数据
                if (_options.rightNodes.length > 0) {
                    for (var i = 0; i < _options.rightNodes.length; i++) {
                        var data = _options.rightNodes[i];
                        addToRight(data);
                        var t = $.fn.zTree.getZTreeObj(_options.treeid);
                        // var node = t.getNodeByTId(data.tId);
                        var node = t.getNodeByParam("id", data.id);
                        t.checkNode(node, true, false);
                    }
                }
                ;

                // 左边标题
                if (leftTitle) {
                    leftTitle.text(_options.leftTitle);
                }
                ;

                // 进行全部取消操作
                if (cancel) {
                    cancel.click(function () {
                        if (right) {
                            right.children().each(function (index, e) {
                                var t = $(e);
                                var tObject = $.fn.zTree.getZTreeObj(_options.treeid);
                                var id = t.attr("id");
                                var node = tObject.getNodeByParam("id", id);
                                removeToRight(node);
                            })
                        }
                    })
                }
                ;

                // 提交按钮
                if (submit) {
                    submit.click(function () {
                        _options.submit(getChooseJson());
                    })
                }
                ;

                //节点选取
                function onTreeCheck(treeNode) {
                    if (treeNode) {
                        if (treeNode.checked) {
                            // 选取
                            goCheck(treeNode, true);
                        } else {
                            // 取消
                            goCheck(treeNode, false);
                        }
                    }
                };

                function goCheck(treeNode, isCheck) {
                    if (treeNode && isCheck) {
                        if (treeNode.children) {
                            addToRight(treeNode);
                            for (var i = 0; i < treeNode.children.length; i++) {
                                goCheck(treeNode.children[i], isCheck);
                            }
                        } else {
                            addToRight(treeNode);
                        }
                    } else if (!isCheck) {
                        if (treeNode.children) {
                            removeToRight(treeNode);
                            for (var i = 0; i < treeNode.children.length; i++) {
                                goCheck(treeNode.children[i], isCheck);
                            }
                        } else {
                            removeToRight(treeNode);
                        }
                    }
                };

                // 添加人员到右侧
                function addToRight(data) {
                    if (right) {
                        if (!checkId(right, data.id)) {
                            right.append("<button class='u-btn sm' id = " + data.id + " data = " + data.data + " name = " + data.name + ">" + data.name + "<i class='iconfont'>&#xe602;</i></button>");
                            var button = right.find("#" + data.id);
                            button.click(function (e) {
                                removeToRight(data);
                            })
                        }
                    }
                };

                function removeToRight(data) {
                    var button = right.find("#" + data.id);
                    clearSelf(button);
                    var t = $.fn.zTree.getZTreeObj(_options.treeid);
                    t.checkNode(data, false, false);
                }

                // 查询对象是否有相同id
                function checkId(element, id) {
                    var ishave = false;
                    element.children().each(function (index, e) {
                        if (id == $(e).attr("id")) {
                            ishave = true;
                        }
                    })
                    return ishave;
                }

                // 检查数组是否有相同id
                function checkDataId(data, id) {
                    var ishave = false;
                    for (var i = 0; i < data.length; i++) {
                        var d = data[i];
                        if (id == d.id) {
                            ishave = true;
                        }
                    }
                    ;
                    return ishave;
                }

                //移除自己
                function clearSelf(element) {
                    element.unbind('click');
                    element.remove();
                };

                //获取被选框对象 生成数据后
                function getChooseJson() {
                    var str = "[";
                    right.children().each(function (index, e) {
                        var $this = $(e);
                        var s = "{'id':'" + $this.attr("id") + "','name':'" + $this.attr("name") + "','data':'" + $this.attr("data") + "'}";
                        if (str == "[") {
                            str += s;
                        } else {
                            str += "," + s;
                        }

                    })
                    str += "]";
                    var jstr = eval('(' + str + ')');
                    return jstr;
                };
            }
            ;
        }
    })
})(jQuery);/*combo */
/**
 * 组合框模块
 * author:林耘宇
 **/
 (function ($) {
    $.fn.extend({
        an_combo:function(){
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
                row:5,//默认显示多少行,更多的出现滚动条
                open:false//默认关闭
            }, options);
            
            var combo = $(this);
            var first_ul = combo.find("ul").first();
            var ultotal = combo.find("ul").length;
            var last_li = first_ul.children("li").last();
            var span = combo.children().first();
            
            var span_i = span.children("i");
            var span_button = span.children("button");

            var doc = $(document);
            var win = $(window);

            // var setTime = 200;
            // var timeHanld = "";
            var ul_height = 0;//第一层ul高度

            // 私有事件
            var setRow = "EVENT_ROW";
            var getVal = "EVENT_VALUE";
            var setShow = "EVENT_SHOW";//设置新的显示对象
            // 特殊设置事件
            var addTree = "EVENT_TREE";//创建树多选列表

            // 配置
            var showEvent = "click";//默认显示事件

            // 获取 设置对象
            var getOption = combo.attr("opstion");
            var getValueElement = "";
            if(getOption){
                getOption = getOption.split(",");
                // 处理设置
                for(var i = 0; i < getOption.length; i++){
                    var o = getOption[i].split(":");
                    if(o[0] == "show"){
                        showEvent = o[1];
                    }else if(o[0] == "getValue"){
                        getValueElement = combo.an_combo_choice({
                            showType:o[1]
                        });
                    }
                }
            };
            // console.log(getOption);
            // 入值input
            var inputValue = combo.find("input").each(function(i, input){
                if($(input).attr("type") == "hidden"){
                    return $(input);
                }
            });

            if(funstyle != ""){
                if(funstyle == "row"){
                    var row = arguments[1];
                    if(combo && combo[0]){
                        combo.trigger(setRow, row);
                    };
                }else if(funstyle == "getValue"){
                    var fun = arguments[1];
                    combo.trigger(getVal, fun);
                }else if(funstyle == "setShowTarget"){
                    // 设置新的显示对象
                    var show = arguments[1];
                    combo.trigger(setShow, show);
                }else if(funstyle == "addTree"){
                    // 传入树设置
                    var op = arguments[1];
                    combo.trigger(addTree, op);
                };
            }else{
                 // 兼容IE6 的显示
                if(andy.IE() == 6){
                    combo.find("ul").each(function(i, e){
                        var cell = $(e);
                        if(!cell.prev().is("div")){
                            cell.before("<div></div>");
                        }
                    });
                };

                andy.combo({
                    combo:combo,
                    showEvent:showEvent,
                    showComplete:function(){
                        var cp = combo;
                        var f_ul = combo.showTarget;
                        if(combo.showTarget.is("ul")){
                            showUl(cp, f_ul);
                        }else{
                            show(cp, f_ul);
                        }
                    }
                });

                // 修改限制行
                combo.bind(setRow, function(e, row){
                    _options.row = row;
                });

                // 获取值
                combo.bind(getVal, function(e, fun){
                    if(inputValue[0]){
                        fun(inputValue.val());
                    }
                });

                // 设置新的显示对象
                combo.bind(setShow, function(e, show){
                    setCurrentShow(show, true);
                });

                // 树结构事件绑定
                combo.bind(addTree, function(e, op){
                    createTree(op.treeId, op.setting, op.nodes, op);
                });

                // combo-tree处理
                function createTree(id, set, nodes, op){
                    var treeId = id;
                    
                    //树设置
                    var setting = {
                        treeObj:null,
                        callback:{
                            onCheck:function(event, treeId, treeNode) {
                                onTreeCheck(treeNode);
                            }
                        },
                        check: {
                            enable: true,
                            chkStyle: "checkbox",
                            chkboxType: { "Y": "s", "N": "s" }
                        },
                        data: {
                            simpleData: {
                              enable: true
                            }
                        }
                    };
                    if(set){
                        setting = $.extend(setting, set);
                    };

                    // 插入树结构
                    combo.showTarget.append("<div class='g-h-max'><ul id='"+treeId+"' class='ztree'></ul></div>");
                    var tree = "";
                    // 判断是否加载ztree结构json
                    if(nodes){
                        $.fn.zTree.init($("#" + treeId), setting, nodes);
                        tree = $("#" + treeId);
                        setCurrentShow(combo.showTarget);
                    }else if(op && op.url){
                        andy.loaddata(op.url, function(data){
                            data = andy.stringToJson(data);
                            // console.log(combo.showTarget)
                            $.fn.zTree.init($("#" + treeId), setting, data);
                            tree = $("#" + treeId);
                            setCurrentShow(combo.showTarget);
                        })
                    };
                };

                function onTreeCheck(treeNode){
                    if(treeNode){
                        if(treeNode.checked){
                            // 选取
                            goTreeCheck(treeNode, true);
                        }else{
                            // 取消
                            goTreeCheck(treeNode, false);
                        }
                    }
                };

                function goTreeCheck(treeNode, isCheck){
                    console.log(treeNode, isCheck);
                };

                if(combo.showTarget.is("ul")){
                    combo.find("ul li").click(function(e){
                        var t = $(e.target);
                        if(t.is('li') == false){
                            t = t.closest('li');
                        };
                        // 如果有 入值input 就附上value值
                        if(inputValue[0]){
                            inputValue.val(t.attr("value"));
                        };
                        if(span[0]){
                            if(span.children().has("p")){
                                var text = $(e.target).text();
                                span.children("p").text(text);
                            };
                            
                        };
                        combo.showTarget.css("display", "none");
                        combo.removeClass("open");
                        combo.trigger(andy.EVENT_CLICK, t.attr("value"));
                    }); 
                };

                // 更新显示对象 显示对象 是否清楚以前结构
                function setCurrentShow(show, isClear){
                    if(isClear){
                        combo.showTarget.empty();
                    };
                    if(show instanceof jQuery){  
                        combo.showTarget = show;
                    }else{
                        combo.showTarget = $(show);
                    };
                };

                // 显示层排列
                function showUl(pul, ul){
                    var offset = pul.offset();
                    var pleft = offset.left;
                    var ptop = offset.top;
                    var doc_width = doc.width();
                    var doc_height = doc.height();
                    var doc_scrollTop = doc.scrollTop();
                    var ul_width = ul.outerWidth();
                    setUlHeight();
                    var ulHeight = ul.height();

                    var scrollWidth = 0;
                    if(isHaveScroll()){
                        scrollWidth = 17;
                    };
                    if(doc_width - pleft - scrollWidth >= ul_width){
                        ul.css({"left":"0px","right":"auto"});
                    }else{
                        ul.css({"left":"auto", "right":"0px"});
                    };
                    // 上下排列
                    // console.log(win.height() - (ptop - doc_scrollTop), ulHeight);
                    var buttonHeight = combo.touchTarget.outerHeight();
                    if($(window).height() - (ptop - doc_scrollTop) - buttonHeight <= ulHeight){
                        ul.css("top", -ulHeight + "px");
                    }else{
                        
                        ul.css("top", buttonHeight + "px");
                    }
                };

                // 除开ul的 显示位置
                function show(pdiv, div){
                    var offset = pdiv.offset();
                    var pleft = offset.left;
                    var ptop = offset.top;
                    var doc_width = doc.width();
                    var doc_height = doc.height();
                    var doc_scrollTop = doc.scrollTop();
                    var ul_width = div.outerWidth();
                    var ulHeight = div.height();

                    var scrollWidth = 0;
                    if(isHaveScroll()){
                        scrollWidth = 17;
                    };
                    // 左右排列
                    if(doc_width - pleft - scrollWidth >= ul_width){
                        div.css({"left":"0px","right":"auto"});
                    }else{
                        div.css({"left":"auto", "right":"0px"});
                    };

                    // 上下排列
                    // console.log(win.height() - (ptop - doc_scrollTop), ulHeight);
                    var buttonHeight = combo.touchTarget.outerHeight();
                    if($(window).height() - (ptop - doc_scrollTop) - buttonHeight <= ulHeight){
                        div.css("top", -ulHeight + "px");
                    }else{
                        
                        div.css("top", buttonHeight + "px");
                    }
                };
                // 判断是否有侧边滚动条
                function isHaveScroll(){
                    var have = false;
                    if(doc.height() > win.innerHeight()){
                        have = true;
                    };
                    return have;
                };
                function setUlHeight(){
                    if(ultotal == 1){
                        // 只有大于row的时候才出现滚动条
                        if(first_ul.children().length > _options.row && _options.row != 0){
                            first_ul.addClass("u-overflow-y");
                            ul_height = _options.row * last_li.outerHeight();
                            first_ul.height(ul_height);
                            // u-overflow-y
                        }else{
                            first_ul.removeClass("u-overflow-y");
                            ul_height = 0;//first_ul.children().length * last_li.outerHeight();
                            first_ul.css("height", "");
                        };
                        // console.log(ul_height, first_ul.children().length, last_li.outerHeight());
                        
                    }
                    
                };
            };
        },
        an_combo_choice:function(){
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
                touchTarget:target,
                showType:""//默认显示多少行,更多的出现滚动条
                // open:false//默认关闭
            }, options);

            // type 多选类型:multi-select-close(多选可关闭)
            if(_options.showType == "multi-select-close"){

            };
        }
    });
})(jQuery);/*spinner */
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