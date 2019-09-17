/**
 * 前端的统一配置参数文件
 * author:liao.qinghua
 * @param jQuery
 */
(function(jq) {
	jq.extend({
		config:{
			openFormType:"dialog",//dialog:弹出，embed：嵌入
			debug:true //开启调试模式
		}
	});
})(jQuery);


(function($) {
	$.extend({
		config:{
			openFormType:"dialog",//dialog:弹出，embed：嵌入
			debug:true, //开启调试模式
			dataTableDependency:'dataGrid',//dataTable组件依赖的列表组件，dataList（基于ligerui实现的列表组件）,dataGrid(基于layui实现的列表组件)
			topActionShow:{//顶部操作按钮显示配置
				enable:false,//是否开启
				showType:"alone",//操作按钮显示方式，group:组合体，alone：独立
				outShow:10,//外部显示个数
				showFilter:function(action){//过滤器
					if($.config.dataRowActionShow.enable==true){//如果开启了数据行显示按钮,
						return $.inArray(action.type,['U','V','D']) == -1;
					}else {//否则全部显示
						return true;
					}
				}
			},
			dataRowActionShow:{//数据行操作按钮显示配置
				enable:true,//是否开启
				showType:"alone",//操作按钮显示方式，group:组合体，alone：独立
				outShow:3,//外部显示个数
				align:'center',
				disabledFilter:function(action,rowData){//是否禁用按钮过滤器
					return false;
				},
				showFilter:function(action,rowData){//过滤器
					return $.inArray(action.type,['U','V','D']) != -1;
				}
			}
		}
	});
})($);


