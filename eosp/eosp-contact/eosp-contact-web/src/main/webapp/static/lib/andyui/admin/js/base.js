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
});