/*global andy,template,$*/
/**
 * 框架
 * @param options
 1.数据 统一JSO区分 常用不常用
 2.当有一级菜单且为常用菜单时，头部导航显示一级菜单带图标；如果没有一级常用菜单，不显示头部导航（整个头部导航部分去除，不包括面包屑）；
 3.面包屑通过参数进行配置，是否有
 4.自动识别头部导航和面包屑的变化，保持layouthead的高度动态变化
 5.当点击头部一级菜单时，左侧滑动出当前菜单下子集菜单（手风琴菜单出现最好做一个css 动画，向下滑动渐变出现）
 6.右侧为当前所选节点下的不常用菜单，当前仅显示子集一级菜单先不做扩展（如果能支持多级最好）；右侧菜单随用户点击打开的业务菜单变化动态变化；
 7.当头部的一级菜单没有子集时，仅打开对应的页面，不在展开左侧导航面版
 8.参数支持配置打开默认页面
 9.保留原有的仅显示头部菜单模式，即头部多级下拉菜单，但注意头部仅显示常用菜单，不常用菜单还是在右侧隐藏菜单中显示
 */
andy.framework = function (options) {
    var arg,
    //模板预编译
        unusualMenuRender, LeftMenuRender, pathRender,
    //相关函数
        bindMouseEvent, refreshUnusualMenu, frameworkInit, refreshPath, refreshTargetIframe, chooseFistMenu,
    //菜单数据
        menuData,
    //不常用菜单数据，遍历获得，避免二次获取数据{menu1:[1,2,3]}
        unusualMenu = {},
    //当前选中的系统
        currentSys,
        currentFistMenu,
    //默认值
        defaults = {
            menuJsonUrl: "",//菜单
            type: "topMenu",//topMenu顶部菜单，leftMenu左侧菜单,noMenu没有菜单只有导航栏
            hasNav: true,//有路径栏
            centerIframeID: "stage"  // 中间窗口id
        },
        /**
         * 更新左侧菜单，采用元素切换的方式，不用每次都重构dom树
         * @param data 被选中节点的数据
         */
        refreshUnusualMenu = function (data) {
            var list = [], getMenu;
            var str = "", sample = '{{each list as value i}} <li class="mor"> <a href="{{list[i].url}}" target="{{list[i].target}}">{{list[i].text}}</a></li>{{/each}}';


            //获取不常用菜单的数据
            getMenu = function (data) {
                var i = 0;
                for (i; i < data.children.length; i++) {
                    if (data.children[i].often === false) {
                        list.push(data.children[i]);
                    }
                    if (data.children[i].children && data.children[i].children.length > 0) {
                        getMenu(data.children[i]);
                    }
                }
            };
            if (data.children && data.id) {
                if (unusualMenu[data.id]) {
                    list = unusualMenu[data.id];
                } else {
                    getMenu(data);
                    unusualMenu[data.id] = list;
                }
                if (list.length > 0) {
                    LeftMenuRender = LeftMenuRender ? LeftMenuRender : template.compile(sample);
                    str = LeftMenuRender({list: list});
                }
            }
            document.getElementById("unusualMenu").innerHTML = str;
        };
    /**
     * 更新不常用菜单
     * @param data 被选中节点的数据
     */
    refreshUnusualMenu = function (data) {
        var list = [], getMenu;
        var str = "", sample = '{{each list as value i}} <li class="mor"> <a href="{{list[i].url}}" target="{{list[i].target}}">{{list[i].text}}</a></li>{{/each}}';


        //获取不常用菜单的数据
        getMenu = function (data) {
            var i = 0;
            for (i; i < data.children.length; i++) {
                if (data.children[i].often === false) {
                    list.push(data.children[i]);
                }
                if (data.children[i].children && data.children[i].children.length > 0) {
                    getMenu(data.children[i]);
                }
            }
        };
        if (data.children && data.id) {
            if (unusualMenu[data.id]) {
                list = unusualMenu[data.id];
            } else {
                getMenu(data);
                unusualMenu[data.id] = list;
            }
            if (list.length > 0) {
                unusualMenuRender = unusualMenuRender ? unusualMenuRender : template.compile(sample);
                str = unusualMenuRender({list: list});
            }
        }
        document.getElementById("unusualMenu").innerHTML = str;
    };
    /**
     * 更新路径
     * !!!!!!!!!!!!!!!!!!!!!!!前面需要增加一个房子+主页home
     */
    refreshPath = function (e) {
        var indexs = event.target.getAttribute("index").split("_");
        var i = 0, str = "", sample = '{{each list as value i}} <li {{if i===list.length-1}}class="activate"{{/if}}> <a href="javascript:void(0)" target="stage"></a>{{list[i].text}} {{if i!==list.length-1}}<i class="iconfont"></i>{{/if}}</li>{{/each}}';
        var list = [], data = jQuery.extend(true, {}, menuData);
        for (i; i < indexs.length; i++) {
            data = data[indexs[i]] || data.children[indexs[i]];
            if (data) {
                list.push(data);
            }
        }
        if (list.length > 0) {
            pathRender = pathRender ? pathRender : template.compile(sample);
            str = pathRender({list: list});
        }
        document.getElementById("u-path").innerHTML = str;
    };
    /**
     * 刷新页面
     * @param url
     */
    refreshTargetIframe = function (url) {
        document.getElementById(arg.centerIframeID).src = url;
    };
    /**
     * 选中一级菜单,切换到菜单对应的系统
     */
    chooseFistMenu = function (event) {
        var hasChild, leftBox, index = this.getAttribute("index");
        //已经被选中
        if (index === currentSys) {
            if (arg.type === "topMenu") {
                return;//top菜单情况不做变化
            } else {
                //left收起菜单
            }
        }
        //切换按钮状态
        this.className = "activate";
        if (currentFistMenu) {
            currentFistMenu.className = "";
        }
        //刷新常用菜单
        refreshUnusualMenu(menuData[index]);

        //如果是左侧菜单，控制菜单滑出
        if (arg.type === "leftMenu") {
            leftBox = $('#leftnavbox');
            hasChild = menuData[index].children && menuData[index].children.length > 0 ? true : false;
            //没有子菜单&&打开=收回
            if (leftBox.css('display') === "block" && !hasChild) {
                andy.floatbox(leftBox);
            } else if (hasChild && (leftBox.css('display') === "none" || leftBox.attr("currentSys") === index)) {
                andy.floatbox(leftBox);
            }
            $("#leftM_" + leftBox.attr("currentSys")).hide();
            $("#leftM_" + index).fadeIn();
            leftBox.attr({"currentSys": index});
        }


        currentSys = index;
        currentFistMenu = this;
    };
    /**
     * 绑定鼠标事件
     */
    bindMouseEvent = function () {
        //绑定一级菜单点击事件
        //$(".ic a:first").on("click", chooseFistMenu);
        $(".ic").find("a:first").on("click", chooseFistMenu);
        //顶部导航鼠标进入
        if (arg.type === "topMenu") {
            $(document).on('mouseenter', '#top_nav a', function (e) {
                var $this = $(e.target);
                $this.is('a') || ($this = $this.closest('a'));//如果没有a 就返回a的第一个父级
                var $li = $this.parent().siblings("li");
                $li.find("ul:visible").animate({width: 'hide'}, "fast");
                if ($this.parent().parent().attr("id") != "top_nav") {
                    $this.next().animate({width: 'show'}, "fast");
                }
            });


            //鼠标离开顶部菜单执行 除去一级菜单
            $(document).on('mouseleave', '#top_nav', function (e) {
                var $ul = $("." + "u-topmenu").find('ul:visible');
                $ul.each(function (index, e) {
                    $(e).animate({width: 'hide'}, "fast");
                });
            });
        }

            // 顶部菜单二三级点击
            $(document).on('click', '#top_nav a,#menu-right a', function (e) {
                var $this = $(e.target);
                $this.is('a') || ($this = $this.closest('a'));//如果没有a 就返回a的第一个父级
                refreshPath(this);
            });

    };
    /**
     * 主框架更新
     */
    frameworkInit = function () {
        //处理标题过长的情况
        //默认选中第一个一级菜单

        //激活不常用菜单
        $("[an-combo]").an_combo({});
        //绑定鼠标事件
        bindMouseEvent();
        //渲染布局
        andy.layout($("body"));
    };
    arg = $.extend(defaults, options);
    andy.loaddata(arg.menuJsonUrl, function (data) {
        menuData = data;
        var render = template.compile(document.body.innerHTML);
        document.body.innerHTML = render({list: data, option: arg});
        frameworkInit();
    });
};