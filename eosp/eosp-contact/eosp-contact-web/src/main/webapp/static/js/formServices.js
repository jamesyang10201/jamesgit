/**
 * 事件管理器，初始化;form表单ajax提交：post、form表单提交：postForm penghoude
 */
function eventManager() {
	this.eventList = new Array(); // handler列表
	this.addEventHandler = function(fun) {// 添加handler
		this.eventList.push(fun);
	};
	this.fireEvent = function()// 触发事件列表
	{
		var length = this.eventList.length;
		for (var i = 0; i < length; i++) {
			var fun = this.eventList[i];
			if (typeof fun == "function") {
				fun.call();
			}
		}
	};
};
/**
 * 实例化一个事件管理器,文档加载完成事件管理器,在子页面调用DocLoadEvent.AddEventHandler()方法添加处理过程,即可依次触发注册的方法.
 * 主要为了解决模板页和子页面文档加载完成事件的触发顺序问题
 */
var docLoadEvent = new eventManager();
$(function() {
	docLoadEvent.fireEvent(); // 在此处统一触发处理函数,不要在子页面自行触发.

});
/**
 * ajax方法 arg = { url:"", formId:"", validator:true, validatorfun:funtion(){}
 * error:function(){}, postData:{}, success:function(){} }
 */
var services = services || {
	post : function(arg) {
		this._functions.beforeCall();
		var self = this;
		$.ajax({
			type : "POST",
			url : arg.url,
			cache : false,
			beforeSend : function() {
				if (arg.validator) {
					var boolval = andy.fromVerify($("#" + arg.formId));
					
					if (!boolval && arg.validatorfun) {
						arg.validatorfun(boolval);
					}
				
					return boolval;
				}
			},
			data : arg.postData,
                        timeout: 80000,
			success : function(resp) {
				self._functions.afterCall(resp);
				var objresp = resp;
				if (typeof resp == "string") {
					objresp = eval("(" + resp + ")");
				}
				if (objresp.success) {
					alert('操作成功!');
					arg.success(objresp);
				} else {
					// 提示不成功
					winAlert("操作失败.因:" + objresp["msg"],null,null,"错误");
				}
			},
			error : arg.error || this._functions.error
		});
	},
	postForm : function(arg) {
		this._functions.beforeCall();
		var self = this;
		$("#" + arg.formId).attr("action",arg.url);
		$("#" + arg.formId).ajaxSubmit({
			type : 'post', // 提交方式 get/post
			
			beforeSubmit : function() {
				if (arg.validator) {
					var boolval =andy.fromVerify($("#" + arg.formId));
					if (!boolval && arg.validatorfun) {
						arg.validatorfun(boolval);
					}
				
					return boolval;
				}
				return true;
			},

			success : function(resp, status, xhr) {
				self._functions.afterCall(resp);
				var objresp = resp;
				if (typeof resp == "string") {
					objresp = eval("(" + resp + ")");
				}
				if (objresp.success) {
					alert('操作成功!');
					arg.success(objresp);
					
					
				} else {
					// 提示不成功
					winAlert("操作失败.因:" + objresp["msg"],null,null,"错误");
				}
			}
		});
	},
	_functions : {
		error : function(error) {
			services._functions.afterCall(error);
		},
		beforeCall : function() {
			// openLoading();
		},
		afterCall : function(data) {
			// closeLoading();
			if (typeof data === "object" && data.RedirectTo)
				location.href = data.RedirectTo;

		}
	}
};
