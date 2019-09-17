/*
 * zTree树  2016-2-25 penghoude 
 */
var defaultarg;
/*
 * 加载树 {teId:"tree",url:action,onClick:onClick}
 */
function loadTree(arg, setting) {
	defaultarg = arg;
	var setting = setting || {
		data : {
			key : {
				name : "text",
				title : "text"
			},
			simpleData : {
				enable : true,
				idKey : "treeId",
				pIdKey : "parentId",
				rootPId : "ROOT"
			}
		},
		callback : {
			onClick : arg.onClick
		}
	}

	$.post(arg.url,
			function(data) {
				var treeData;
				if (typeof data == "string") {
					var ojbdata = eval("(" + data + ")");
					treeData = ojbdata.treeData;
				} else {
					treeData = data.treeData;
				}
				if (typeof treeData == "string") {
					treeData= eval("(" + treeData + ")");
				} 
				
				if (treeData) {
					var treeObj = $.fn.zTree.init($("#" + arg.teId), setting,
							treeData);
					treeObj.expandAll(true);
				}
			});

}
/*
 * 刷新树
 */
function refreshTree() {
	loadTree(defaultarg);
}
