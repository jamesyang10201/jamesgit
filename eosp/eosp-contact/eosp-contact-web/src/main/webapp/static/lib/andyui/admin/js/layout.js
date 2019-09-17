function layout(){
	$('.g-layout').each(function(index, element) {
		//设置框架高宽
        if($(element).parent().is('body')){
			var ParentWidth=$(window).width(),
			    ParentHeight=$(window).height();
			}else{
			var ParentWidth=$(element).parent().width(),
			    ParentHeight=$(element).parent().height();	
				}
		alert(ParentHeight);
	    //获得结构框架尺寸
		var LayoutHeadHeight= $(element).children('.layout-head').height(),
		    LayoutLeftWidth= $(element).children('.layout-left').width(),
			LayoutRigthWidth= $(element).children('.layout-right').width(),
			LayoutFootHeight= $(element).children('.layout-foot').height();
		//设置框架各个元素的尺寸
		autolayout(element,ParentWidth,ParentHeight,LayoutHeadHeight,LayoutLeftWidth,LayoutRigthWidth,LayoutFootHeight);
    });
	}
//动态调整框架方法	
function autolayout(index,pw,ph,ind_head,ind_left,ind_right,ind_foot){
	    $(index).width(pw).height(ph);
	    $(index).children('.layout-head').width(pw).height(ind_head);
		$(index).children('.layout-left').height(ph-ind_head-ind_foot).width(ind_left).css('top',ind_head+'px');
		$(index).children('.layout-right').height(ph-ind_head-ind_foot).width(ind_right).css('top',ind_head+'px');
		$(index).children('.layout-foot').width(pw).height(ind_foot);
		$(index).children('.layout-center').width(pw-ind_left-ind_right).height(ph-ind_head-ind_foot-2).css({'top':ind_head+'px','left':ind_left+'px'});
	}
	
//动态高度填充
function hmax(){
$('.g-h-max').each(function(index, element) {
	var parenth = $(element).parent().height(),
		hmaxn = $(element).siblings('.g-h-max').length + 1,
		sibls = $(element).siblings().not('.g-h-max'),
		sibl = sibls.not('.u-float'),
		siblingn = sibl.length,
		sum = 0;
	for (var i = 0; i < siblingn; i++) {
		sum += $(sibl[i]).outerHeight();
	};
	var hmaxH = (parenth - sum) / hmaxn;
	$(element).css('height', hmaxH + 'px');
	$(element).siblings('.g-h-max').css('height', hmaxH + 'px');
});
}

//动态处理填充尺寸溢出
function pmauto(){
$('.f-fit').each(function(index, element) {
	var  Pw=$(element).parent().width(),
		 Ph=$(element).parent().height(),
		 wp=parseInt($(element).css('padding-left'))+parseInt($(element).css('padding-right')),
		 hp=parseInt($(element).css('padding-top'))+parseInt($(element).css('padding-bottom'));
		 $(element).height(Ph-hp);
		 $(element).width(Pw-wp);
	});	
};
	
$(function(){
	layout();
	});