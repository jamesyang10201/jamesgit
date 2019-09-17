
$(function(){
	// var conOut_search_ins=$("#conOut_search").searchbar();
	//
	// conOut_search_ins.on("search",function(filter){
	// 	conOut_ins.reloadData(filter);
	// });
	initTree();
});


var ConOut_tree_ins = null;
function initTree(){
	ConOut_tree_ins=$("#ConOut_tree_data").dataTree();

	/*主列表选中事件, 刷新子列表页面*/
	ConOut_tree_ins.on("select", function(action) {
		/*获取树状列表选择行数据id*/
		var _pid = ConOut_tree_ins.getSelectedId();
		if (_pid) {
			/*页面跳转*/
			$("#subIframe").attr("src","eospContact/conOut/subIndex.html?pid="+_pid);
		}
	});

}