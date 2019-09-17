/**
 * 列表初始化和操作相关js
 */

/*$(function() {
	 $(".panel-body").height($(window).height() - 100);
});
*/


/**
 *  grid分页
 * @param pagerId 分页器ID
 * @param gridId 列表id
 * @param options 
 *       其他参数(json类型),如{url:"",afterLoad:function,submitParam:{}} 
 *       url:请求列表内容的url
 *       afterLoad:数据加载完回调函数
 *       submitParam:需要提交的额外参数
 */
function gridInit(pagerId,gridId,options){

	 $("#"+pagerId).an_pagination({
	        onSelectPage: function(pageNumber, pageSize){
        	    var pager = {
        	        "pageNumber": pageNumber,
        	        "pageSize": pageSize
        	    };
        	    var params = {};
        	    if(typeof options.submitParam =="function"){
        	    	params = options.submitParam();
        	    }else{
        	    	params = options.submitParam;
        	    }
        	    $.extend(pager, params);
        	    $.get(options.url, pager, function (resp) {
        	        var total = $(resp).attr("totalSize");
        	        total = total ? total : 0;
        	        $("#"+ gridId +" > tbody").empty().append($(resp).children("tbody").children("tr"));
        	        $("#" + pagerId).an_pagination("total",{
        	            total: total
        	        });
        	        if (options.afterLoad) {
        	        	options.afterLoad();
        	        }
        	    }, "TEXT");
	        }
	    });
	 //默认加载
	 refreshPage(pagerId);
}
/**
 * 绑定选中行事件
 * @param gridId 数据列表ID
 * @param singleSelect 是否单选，true表示单选,false表示多选
 * @param onSelected 选中自定义事件
 */
function  bindSelectRowEvent(gridId,singleSelect,onSelected){
	 //增加选中事件
	 $("#"+ gridId +" tbody").delegate("tr", "click", function () {
	       var $tr =  $("#"+ gridId +" tbody tr");
	       if(singleSelect == undefined ? true:singleSelect){
	    	   $tr.removeClass("current");
	       }
	       $(this).toggleClass("current");
	       if(onSelected && $(this).hasClass("current")){
	    	   onSelected($tr);
	       }
    });
}
/**
 * 获取选中行数据的id
 * @param gridId
 * @returns
 */
function getSelectedId(gridId) {
	$trs = getSelectedTr(gridId);
	var rowid = [];
	if($trs.length>1){
		$trs.each(function(){
			rowid.push($(this).attr("rowid"));
		});
	}else{
		rowid = $trs.attr("rowid");
	}
    return rowid;
}
/**
 * 获取选中的tr
 * @param gridId
 * @returns
 */
function getSelectedTr(gridId) {
	return $("#"+gridId+ " tbody .current");
}

/**
 * 选取选中tr的子元素
 * @param gridId
 * @param selector jQuery选择器
 * @returns
 */
function getSelectedObj(gridId,selector) {
	return getSelectedTr(gridId).find(selector);
}


/**
 * 获取选中行
 * @param gridId
 * @returns
 */
function getRowId($tr) {
	return $tr.attr("rowid");
}


/**
 * 刷新分页器当前页
 * @param paginationId
 */
function refreshPage(paginationId){
	 $("#"+paginationId).an_pagination('select');
}