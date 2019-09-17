/*global  window , an_IE,document,console */
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
})(jQuery);