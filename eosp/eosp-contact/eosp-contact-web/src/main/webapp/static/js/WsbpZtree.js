var WsbpZtree = {
	setting : {
		async : {
			enable : true,
			autoParam : [ "id", "attributes.type=type" ],
			url : "",
			dataFilter : function(treeId, parentNode, responseData) {
				var data = [];
				if (typeof responseData.treeData == "string") {
					data = eval("(" + responseData.treeData + ")");
				} else {
					data = responseData.treeData;
				}
				return data;
			},
			otherParam : [],
			contentType : "application/x-www-form-urlencoded",
			dataType : "text",
			type : "post"
		},
		callback : {
			beforeAsync : function (treeId, treeNode) {
			    return true;
			},
			beforeCheck : null,
			beforeClick : null,
			beforeCollapse : null,
			beforeDblClick : null,
			beforeDrag : null,
			beforeDragOpen : null,
			beforeDrop : null,
			beforeEditName : null,
			beforeExpand : null,
			beforeMouseDown : null,
			beforeMouseUp : null,
			beforeRemove : null,
			beforeRename : null,
			beforeRightClick : null,

			onAsyncError : null,
			onAsyncSuccess : function(event, treeId, treeNode, msg) {
				if (treeNode == null) {
					var treeObj = $.fn.zTree.getZTreeObj(treeId);
					var nodes = treeObj.getNodes();
					if (nodes.length > 0) {
						// treeObj.reAsyncChildNodes(nodes[0], "refresh");
					}
				}
			},
			onCheck : null,
			onClick : function(event, treeId, treeNode, clickFlag) {
			},
			onCollapse : null,
			onDblClick : null,
			onDrag : null,
			onDrop : null,
			onExpand : null,
			onMouseDown : null,
			onMouseUp : null,
			onNodeCreated : null,
			onRemove : null,
			onRename : null,
			onRightClick : function(event, treeId, treeNode) {
			}
		},
		check : {
			autoCheckTrigger : false,
			chkboxType : {
				"Y" : "ps",
				"N" : "ps"
			},
			chkStyle : "checkbox",
			enable : false,
			nocheckInherit : false,
			chkDisabledInherit : false,
			radioType : "level"
		},
		data : {
			keep : {
				leaf : false,
				parent : false
			},
			key : {
				checked : "checked",
				children : "children",
				name : "name",
				title : "",
				url : "url"
			},
			simpleData : {
				enable : false,
				idKey : "id",
				pIdKey : "pId",
				rootPId : null
			}
		},
		edit : {

		},
		view : {
			dblClickExpand : false,
			showLine : true,
			selectedMulti : false,
			addDiyDom:function addDiyDom(treeId, treeNode){}
		}
	},
	/**
	 * 创建ZTree,需提前引入zree相关文件
	 * 
	 * @param $obj
	 *            tree
	 * @param setting
	 *            配置json
	 */
	createZtree : function($obj, setting, data) {

		$.fn.zTree.init($obj, setting, data);
	},
	/**
	 * 创建异步ztree
	 * 
	 * @param ztreeId
	 *            ul的id
	 * @param dataUrl
	 *            json数据来源url
	 * 
	 * @param funOnClick
	 *            点击相应函数
	 * @param autoParamArray
	 *            异步树自动提交参数数组
	 * @param funDataFilter
	 *            数据过滤函数
	 */
	createZtreeById : function(ztreeId, dataUrl, funOnClick, autoParamArray,
			funDataFilter, otherParamArray) {

		if (funOnClick)
			this.setting.callback.onClick = funOnClick;
		if (funDataFilter)
			this.setting.async.dataFilter = funDataFilter;
		if (autoParamArray) {
			this.setting.async.autoParam = autoParamArray;
		}
		if (dataUrl) {
			this.setting.async.url = dataUrl;
		}
		this.setting.async.otherParam = otherParamArray || [];
		this.createZtree($("#" + ztreeId), this.setting);
	},

	/**
	 * 创建默认ID为#ztree的ztree,对外开放已过时
	 * 
	 * @param dataUrl
	 *            json数据来源url
	 * 
	 * @param funOnClick
	 *            点击相应函数
	 * @param autoParamArray
	 *            异步树自动提交参数数组
	 * @param funDataFilter
	 *            数据过滤函数
	 * 
	 */
	createZtreeDefault : function(dataUrl, funOnClick, autoParamArray,
			funDataFilter, otherParamArray) {
		this.createZtreeById("ztree", dataUrl, funOnClick, autoParamArray,
				funDataFilter, otherParamArray);
	},

	/**
	 * 带checkbox配置的企业树
	 * 
	 * @param funOnClick
	 *            点击响应函数
	 * 
	 * @param funDataFilter
	 *            过滤函数
	 * @param checkJson
	 *            checkbox设置json 例： { autoCheckTrigger : false, chkboxType : {
	 *            "Y" : "ps", "N" :"ps" }, chkStyle : "checkbox", enable :
	 *            false, nocheckInherit : false, chkDisabledInherit : false,
	 *            radioType : "level" }
	 */
	orgTree : function(funOnClick, funDataFilter, checkJson) {
		if (checkJson) {
			if (checkJson.autoCheckTrigger)
				this.setting.check.autoCheckTrigger = checkJson.autoCheckTrigger;
			if (checkJson.chkboxType)
				this.setting.check.chkboxType = checkJson.chkboxType;
			if (checkJson.chkStyle)
				this.setting.check.chkStyle = checkJson.chkStyle;
			if (checkJson.enable)
				this.setting.check.enable = checkJson.enable;
			if (checkJson.nocheckInherit)
				this.setting.check.nocheckInherit = checkJson.nocheckInherit;
			if (checkJson.chkDisabledInherit)
				this.setting.check.chkDisabledInherit = checkJson.chkDisabledInherit;
			if (checkJson.radioType)
				this.setting.check.radioType = checkJson.radioType;
		}
		if (funOnClick)
			this.setting.callback.onClick = funOnClick;
		if (funDataFilter)
			this.setting.async.dataFilter = funDataFilter;
		this.setting.async.url = "treeUtils/entTree.json";
		this.createZtree($("#ztree"), this.setting);
	},

	/**
	 * 带checkbox配置的企业部门树
	 * 
	 * @param funOnClick
	 *            点击响应函数
	 * 
	 * @param funDataFilter
	 *            过滤函数
	 * @param checkJson
	 *            checkbox设置json 例： { autoCheckTrigger : false, chkboxType : {
	 *            "Y" : "ps", "N" :"ps" }, chkStyle : "checkbox", enable :
	 *            false, nocheckInherit : false, chkDisabledInherit : false,
	 *            radioType : "level" }
	 */
	orgTree : function(funOnClick, funDataFilter, checkJson) {
		if (checkJson) {
			if (checkJson.autoCheckTrigger)
				this.setting.check.autoCheckTrigger = checkJson.autoCheckTrigger;
			if (checkJson.chkboxType)
				this.setting.check.chkboxType = checkJson.chkboxType;
			if (checkJson.chkStyle)
				this.setting.check.chkStyle = checkJson.chkStyle;
			if (checkJson.enable)
				this.setting.check.enable = checkJson.enable;
			if (checkJson.nocheckInherit)
				this.setting.check.nocheckInherit = checkJson.nocheckInherit;
			if (checkJson.chkDisabledInherit)
				this.setting.check.chkDisabledInherit = checkJson.chkDisabledInherit;
			if (checkJson.radioType)
				this.setting.check.radioType = checkJson.radioType;
		}
		if (funOnClick)
			this.setting.callback.onClick = funOnClick;
		if (funDataFilter)
			this.setting.async.dataFilter = funDataFilter;
		this.setting.async.url = "treeUtils/entDeptTree.json";
		this.createZtree($("#ztree"), this.setting);
	},

	entTreeDefault : function(funOnClick, funDataFilter, enableCheckbox) {
		if (funOnClick)
			this.setting.callback.onClick = funOnClick;
		if (funDataFilter)
			this.setting.async.dataFilter = funDataFilter;
		// this.setting.check.enable = enableCheckbox;
		this.setting.async.url = "treeUtils/entTree.json";
		// this.setting.async.otherParam = [ "check", enableCheckbox ];
		this.createZtree($("#ztree"), this.setting);
	},

	entDeptTreeDefault : function(funOnClick, funDataFilter, enableCheckbox) {
		if (funOnClick)
			this.setting.callback.onCheck = funOnClick;
		if (funDataFilter)
			this.setting.async.dataFilter = funDataFilter;
		// this.setting.check.enable = enableCheckbox;
		this.setting.async.url = "treeUtils/entDeptTree.json";
		// this.setting.async.otherParam = [ "check", enableCheckbox ];
		this.createZtree($("#ztree"), this.setting);
	},

}