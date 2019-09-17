/*datagrid */
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
})(jQuery);