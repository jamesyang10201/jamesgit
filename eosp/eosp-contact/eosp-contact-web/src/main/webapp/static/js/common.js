/**
查询时拼接查询条件
*/
function getSearchParam() {
	var keySearch=$("#keySearch");
	var inputs = $("#searchbox input");
	
	var bk=keySearch.attr("name");
	var bv=keySearch.val();
	
	if(bv!="" && bv!=null){
		return $.parseJSON("{\""+bk+"\""+":"+"\""+bv+"\"}");
	}
	
	var param = "{";
	for (var i = 0; i < inputs.length; i++) {
		var k = inputs[i].name;
		var v = inputs[i].value;
		param += "\"" + k + "\"" + ":\"" + v + "\",";
	}
	
	var ii = param.lastIndexOf(",", param.length);
	param = param.substring(0, ii);
	param += "}";
	return $.parseJSON(param);
}

/**
*高级查询
*/
function advSearch(){
	$("#keySearch").val("");
	refreshlist();
}

/** 基础js方法，弹层、弹窗、消息提示框、获url参数据值 penghoude  */
/**
 * 
 /**
  * 提示框
  * iwidth 宽
  * iheight 高
  * typemsg 消息类型（成功/错误/禁止/提示）
  * fun 回调方法
  */
function winAlert(msg, iwidth, iheight, typemsg, fun) {
	$(document).an_dialog({
		location : "center",
		width : iwidth || 300,
		height : iheight || 150,
		onClose:fun,
		massage : {
			content : msg,
			type :typemsg || "成功"
		}
	});
	// alert(msg);
}
/**
 * 确认框
 * 
 * @param msg
 *            提示信息
 * @returns
 */
function winConfirm(msg) {
	return confirm(msg);
}
/**
 * 关闭窗口
 * 
 * @param dlgId
 *            对话框ID
 * @param showTier
 *            是否弹出层(默认true)
 */
function closeWindow(dlgId) {
	$(document).an_dialog('close', dlgId);
}
/**
 * 打开窗口
 * 
 * @param dlgId
 *            对话框ID
 * @param title
 *            标题
 * @param url
 *            展示内容的链接
 * @param width
 * @param height
 * @param modalval
 * @param onClose
 *            关闭对话框时的回调函数
 */
function showDialog(dlgId, title, url, width, height, modalval, onClose) {
	$(document).an_dialog({
		title : title,
		id : dlgId,
		width : width || 900,
		height : height || 700,
		modalval : modalval === undefined ? true : modalval,
		url : url,
		onClose : onClose
	});
}

/**
 * 打开窗口(非弹层)
 * 
 * @param url
 *            地址
 * @param iWidth
 *            宽度
 * @param iHeight
 *            高度
 * @param scrolltype
 *            0无滚动条 1有滚动条
 * @param type
 *            1一般窗口 2模态窗口 3非模态窗口(IE支持)
 * @returns
 */
function winOpenForm(url, iWidth, iHeight, scrolltype, type) {
	var iTop = (window.screen.height - iHeight) / 2;
	var iLeft = (window.screen.width - iWidth) / 2;
	if (type == 1) {
		var vr0 = window
				.open(
						url,
						"_blank",
						"Width="
								+ iWidth
								+ " ,Height="
								+ iHeight
								+ ",top="
								+ iTop
								+ ",left="
								+ iLeft
								+ ",toolbar=no,menubar=no,location=no,direction=no,resizable=yes,status=no,scrollbars="
								+ (scrolltype == 1 ? "yes" : "no"));
		return vr0;
	} else if (type == 2) { // 传入window对象
		var rv1 = window.showModalDialog(url, window, "dialogWidth:" + iWidth
				+ ";dialogHeight:" + iHeight + ";dialogTop:" + iTop
				+ "px;dialogLeft:" + iLeft + "px;help:0"
				+ ";resizable:1;status:0;scroll:" + scrolltype + ";");
		return rv1;
	} else if (type == 3) { // 传入window对象
		var rv2 = window.showModelessDialog(url, window, "dialogWidth:"
				+ iWidth + ";dialogHeight:" + iHeight + ";dialogTop:" + iTop
				+ "px;dialogLeft:" + iLeft + "px;help:0"
				+ ";resizable:1;status:0;scroll:" + scrolltype + ";");
		return rv2;
	}
}
/**
 * 获取控件value值
 * 
 * @param id
 *            控件id
 */
function getValById(id) {
	return $("#" + id).val();
}
/**
 * tab标签
 * 
 * @param arg {
 *            fit:true, width:400, height:300, index:1 }
 */
function showTabs(tabid, arg) {
	$("#" + tabid).an_tabs(arg);
}
/**
 * form表单验证
 * 
 * @param obj
 *            验证对象
 * @param arg
 *            验证参数
 */
function formVerify(obj, arg) {
	$(obj).verify(arg);
}
/**
 * 设置表单状态
 * @param obj
 * @param arg
 */
function setStatusVerify(obj, arg) {
  $(obj).verify("setStatus", arg);
}
/**
 * 获取url中参数，无参数时返回集合
 * 
 * @param paraName
 *            参数名称
 * @returns
 */
function getRequest(paraName, argurl) {
	var url = argurl || location.href;
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	var paraObj = {};
	for (var i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j
				.indexOf("=") + 1, j.length);
	}
	if (arguments.length == 0) {
		return paraObj;
	} else {
		var returnValue = paraObj[paraName.toLowerCase()];
		if (typeof (returnValue) == "undefined") {
			return "";
		} else {
			return returnValue;
		}
	}
}
