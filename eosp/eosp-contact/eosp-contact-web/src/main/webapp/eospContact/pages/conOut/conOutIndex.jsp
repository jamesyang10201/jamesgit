<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="cfn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="sys_compt" uri="http://com.wisesoft.components/sys/compt"%>
<!doctype html>
<html>
<head>
<title>conOut</title>
<sys_compt:sys_head />
<sys_compt:sys_script />
<script type="text/javascript" src="${contextPath}/eospContact/js/conOut/conOutIndex.js"></script>
</head>
<body workspace="true" >
<div class="g-layout">
	<div class="layout-left" style="width: 250px">
		<div class="m-panel g-h-max">
			<div class="panel-head">
				<div class="m-toolbar">
					<div class="item">
						<div class="title">项目分类</div>
					</div>
				</div>
			</div>
			<div class="panel-body g-h-max f-p-xs">
				<div id="ConOut_tree_data" url="eospContact/conOut/dataList/" viewmodelid="ConOut_tree_vm" multiple="false" showhead="false"></div>
			</div>
		</div>
	</div>
	<div class="layout-center">
		<iframe id="subIframe" name="subIframe" src="eospContact/conOut/subIndex.html" width="100%" height="100%" frameborder="0"></iframe>
	</div>
</div>
</body>
</html>