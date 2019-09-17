/**
 * 
 */
$(function() {
	/**
	 * 处理下拉框
	 */
	setselect();
	/**
	 * 处理单选
	 */
	setradiobox();
	/**
	 * 处理多选
	 */
	setcheckbox();
	/**
	 * 处理浏览
	 */
	setspan();
	/**
	 * 处理开关
	 */
	intswitch();
	
});
/**
 * /** 处理单选
 */
function setradiobox() {
	$("input[tgcontrol='radiobox']").each(
			function(i) {
				var dataSource = $(this).attr("dataSource");
				var url = $(this).attr("url");
				var valueField = $(this).attr("valueField");
				var textField = $(this).attr("textField");
				var value = $(this).val();
				var cid = $(this).attr("id");
				var cname = $(this).attr("tname");
				var ccss = $(this).attr("tclass");
				if (dataSource && dataSource != "") {
					var objdata = dataSource;
					if (typeof objdata == "string") {
						objdata = eval("(" + objdata + ")");
					}
					binData(objdata, value, textField, valueField, cid,
							"radio", cname, ccss);
				} else {
					if (url && url != "") {
						if (url.indexOf("code/load") > -1
								&& getRequest('projectId') != "") {
							url=url.replace("$projectId",getRequest('projectId'));
						}
						$.post(url, function(reg) {
							var jsonData;
							if (typeof reg == "string") {
								var ojbdata = eval("(" + reg + ")");
								jsonData = ojbdata;
							} else {
								jsonData = reg;
							}
							if (typeof jsonData == "string") {
								jsonData = eval("(" + jsonData + ")");
							}

							if (jsonData) {
								binData(jsonData, value, textField, valueField,
										cid, "radio", cname, ccss);
							}
						});
					}
				}
			});
}
function setspan() {
	$("span[id^='tgspan']").each(
			function(i) {
				var dataSource = $(this).attr("dataSource");
				var url = $(this).attr("url");
				var valueField = $(this).attr("valueField");
				var textField = $(this).attr("textField");
				var value = $(this).html();
				var cid = $(this).attr("id");
				var cname = $(this).attr("tname");
				var ccss = $(this).attr("tclass");
				var type = $(this).attr("tgcontrol");
				if (dataSource && dataSource != "") {
					var objdata = dataSource;
					if (typeof objdata == "string") {
						objdata = eval("(" + objdata + ")");
					}
					var txt = getText(objdata, value, textField, valueField,
							type);
					$(this).html(txt);
				} else {
					var spanobj = this;
					if (url && url != "") {
						if (url.indexOf("code/load") > -1
								&& getRequest('projectId') != "") {
							url=url.replace("$projectId",getRequest('projectId'));
						}
						$.post(url, function(reg) {
							var jsonData;
							if (typeof reg == "string") {
								var ojbdata = eval("(" + reg + ")");
								jsonData = ojbdata;
							} else {
								jsonData = reg;
							}
							if (typeof jsonData == "string") {
								jsonData = eval("(" + jsonData + ")");
							}

							if (jsonData) {
								var txt = getText(jsonData, value, textField,
										valueField, type);
								$(spanobj).html(txt);
							}
						});
					}
				}
			});
}
/**
 * 处理多选
 */
function setcheckbox() {
	$("input[tgcontrol='checkbox']").each(
			function(i) {
				var dataSource = $(this).attr("dataSource");
				var url = $(this).attr("url");
				var valueField = $(this).attr("valueField");
				var textField = $(this).attr("textField");
				var value = $(this).val();
				var cid = $(this).attr("id");
				var cname = $(this).attr("tname");
				var ccss = $(this).attr("tclass");
				if (dataSource && dataSource != "") {
					var objdata = dataSource;
					if (typeof objdata == "string") {
						objdata = eval("(" + objdata + ")");
					}
					binData(objdata, value, textField, valueField, cid,
							"checkbox", cname, ccss);
				} else {
					if (url && url != "") {
						if (url.indexOf("code/load") > -1
								&& getRequest('projectId') != "") {
							url=url.replace("$projectId",getRequest('projectId'));
						}
						$.post(url, function(reg) {
							var jsonData;
							if (typeof reg == "string") {
								var ojbdata = eval("(" + reg + ")");
								jsonData = ojbdata;
							} else {
								jsonData = reg;
							}
							if (typeof jsonData == "string") {
								jsonData = eval("(" + jsonData + ")");
							}

							if (jsonData) {
								binData(jsonData, value, textField, valueField,
										cid, "checkbox", cname, ccss);
							}
						});
					}
				}
			});
}
/**
 * 处理下拉框
 */
function setselect() {
	$("select[tgcontrol='select']").each(
			function(i) {
				var dataSource = $(this).attr("dataSource");
				var url = $(this).attr("url");
				var valueField = $(this).attr("valueField");
				var textField = $(this).attr("textField");
				var value = $(this).attr("value");
				var cid = $(this).attr("id");
				var cname = $(this).attr("name");
				var ccss = $(this).attr("class");
				if (dataSource && dataSource != "") {
					var objdata = dataSource;
					if (typeof objdata == "string") {
						objdata = eval("(" + objdata + ")");
					}
					binData(objdata, value, textField, valueField, cid,
							"select", cname, ccss);
				} else {
					if (url && url != "") {
						if (url.indexOf("code/load") > -1
								&& getRequest('projectId') != "") {
							url=url.replace("$projectId",getRequest('projectId'));
						}
						$.post(url, function(reg) {
							var jsonData;
							if (typeof reg == "string") {
								var ojbdata = eval("(" + reg + ")");
								jsonData = ojbdata;
							} else {
								jsonData = reg;
							}
							if (typeof jsonData == "string") {
								jsonData = eval("(" + jsonData + ")");
							}

							if (jsonData) {
								binData(jsonData, value, textField, valueField,
										cid, "select", cname, ccss);
							}
						});
					}
				}
			});
}
/**
 * 设置tg标签中select、checkbox、
 * 
 * @param objdata
 */
function getText(objdata, value, textField, valueField, type) {
	var distext = "";
	switch (type) {
	case "checkbox":
		if (value.indexOf(',') > -1) {
			var valpar = value.split(',');
			for (var i = 0; i < valpar.length; i++) {
				if (distext != "") {
					distext += ",";
				}
				distext += getTextpar(objdata, valpar[i], textField, valueField);

			}
		} else {
			distext = getTextpar(objdata, value, textField, valueField);
		}
		break;
	default:
		distext = getTextpar(objdata, value, textField, valueField);
		break;

	}
	return distext;
}

function getTextpar(objdata, value, textField, valueField) {
	var svalue = value;
	var distext = svalue;
	$.each(objdata, function(n) {
		var txt = "";
		var ovalue = "";
		var selected = "";
		$.each(this, function(name, value) {
			if (name == textField) {
				txt = value;
			} else if (name == valueField) {
				ovalue = value;
			}
			if (txt != "" && ovalue != "") {
				return false;
			}
		});

		if (ovalue == svalue) {
			distext = txt;
			return false;
		}
	});
	return distext;
}

function binData(objdata, value, textField, valueField, cid, type, cname, ccss) {
	var svalue = value;

	$.each(objdata, function(n) {
		var txt = "";
		var ovalue = "";
		var selected = "";
		$.each(this, function(name, value) {
			if (name == textField) {
				txt = value;
			} else if (name == valueField) {
				ovalue = value;
			}
			if (txt != "" && ovalue != "") {
				return false;
			}
		});

		if (type == "checkbox" && svalue.indexOf(',') > -1) {
			var parvalue = svalue.split(',');
			if ($.inArray(ovalue, parvalue) > -1) {
				selected = "checked=\"checked\"";
			}
		} else {
			if (ovalue == svalue) {
				if (type == "select")
					selected = "selected=\"selected\"";
				else
					selected = "checked=\"checked\"";
			}
		}
		switch (type) {
		case "radio":
			$("#" + cid).parent().append(
					"<label class=\" " + ccss
							+ "\"><input  type=\"radio\"  name=\"" + cname
							+ "\"  " + selected + " value=\"" + ovalue + "\">"
							+ txt + "</label>");
			break;
		case "checkbox":
			$("#" + cid).parent().append(
					"<label class=\" " + ccss
							+ "\"><input  type=\"checkbox\"  name=\"" + cname
							+ "\"  " + selected + " value=\"" + ovalue + "\">"
							+ txt + "</label>");
			break;
		case "select":
			$("#" + cid).append(
					"<option value='" + ovalue + "' " + selected + " >" + txt
							+ "</option>");
			break;

		}

	});
}

function onupfile(txtid,valid,uploadfile,attachmentType,attachmentSize) {
	var url = contextPath + "/componentsupload/toUflie.html?txtid=" + txtid+'&valid=' + valid+'&file='+uploadfile+'&type='+attachmentType+'&size='+attachmentSize;
	showDialog("upfile", "附件上传", url, 500, 150, true, onupfileDialogClose);

}
function onupfileDialogClose(options) {
	if (options && options.data) {
		$("#" + options.data.txtid).val(options.data.uploadFilename);
		$("#" + options.data.valid).val(options.data.physicsFilename);
	}
}
function intswitch()
{
	$("div[id^='switch']").each(
			function(i) {
			 $(this).switchs({
				      changeAfter: function($el) {
				    	  if($($el).parent().is('.on'))
				    		  {
				    		  $($el).val("1");
				    		  }
				    	  else
				    		  {
				    		  $($el).val("0");
				    		  }
				     }
				     });
			});
	
}
