$(function(){
	var _pid = $("#pid").val();
	var conOut_action_ins=$("#conOut_action").actionbar();
	var conOut_ins=$("#conOut_data").dataTable({
		params:{
			"pid":_pid
		}
	});
	var conOut_search_ins=$("#conOut_search").searchbar();

	conOut_search_ins.on("search",function(filter){
		conOut_ins.reloadData(filter);
	});

	conOut_action_ins.on("actionClick",function(action){
		var actType=action.type;
		var selected =conOut_ins.getSelectedId();
		var uri=$.urlAddParams(action.uri,{"id":selected});
		if (actType == "C"||actType == "S") {
			if(actType == "C"){
				uri=$.urlAddParams(action.uri,{"pid":_pid});
			}
			//新增或查询（可以理解为不需要选中数据的操作）
			$.openForm({id:'conOut',title:action.name,url:uri,msg:action.msg,showType:action.showType,onClose :function(){
					conOut_ins.reloadData();
					window.parent.conOut_tree_ins.reloadData();
				}});
		}else {
			//其他操作（可以理解为需要选中数据的操作）
			if (selected) {
				$.openForm({id:'conOut',title:action.name,url:uri,msg:action.msg,showType:action.showType,onClose :function(){
						conOut_ins.reloadData();
						window.parent.conOut_tree_ins.reloadData();
					}});
			} else {
				$.winAlert("请选择一条记录.");
			}
		}
	});
})




