<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="cfn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="sys_compt" uri="http://com.wisesoft.components/sys/compt"%>
<!doctype html>
<html>
<head>
	<title>hrPost</title>
	<sys_compt:sys_head />
	<sys_compt:sys_script />
	<script type="text/javascript" src="${contextPath}/eospContact/js/conOut/conOutIndex.js"></script>
	<link rel="stylesheet" href="${contextPath}/static/css/new-skin.css" />
</head>
<body workspace="true" >
<input id="pid" value="${pid}" type="hidden" name="pid">
<div class="m-panel g-h-max">
	<div class="panel-head">
		<div class="m-toolbar">
			<div class="item">
				<div class="title">外部联系人</div>
			</div>
			<div class="item">
				<div id="conOut_action" class="u-group" compt="actionbar" viewmodelid="ConOut_vm"></div>
			</div>
			<div id="conOut_search" class="item f-right" compt="searchbar" viewmodelid="ConOut_vm"  outshow="1" itemwidth="150px"></div>
		</div>
	</div>
	<div class="panel-body g-h-max f-p-xs">
		<div id="conOut_data" compt="dataTable" viewmodelid="ConOut_vm" multiple="false"></div>
	</div>
</div>
</body>
</html>