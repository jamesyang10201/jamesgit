<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="cfn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fw" uri="http://com.wisesoft.components/sys/compt"%>
<!doctype html>
<html>
<head>
<title>新增</title>
<fw:sys_head />
<fw:sys_script />
<script type="text/javascript" src="${contextPath}/eospContact/js/conOut/conOutAdd.js"></script>

</head>
<body class="f-bg-white">
	<div compt="appForm" winid="conOut" >
		<div class="appform-body">
			<div class="appform-content" >
				<form id="conOutForm">
					<input type="hidden" name="id" id="id" value="${conOutVO.id}" />
					<table class="m-table-form">

						<tr>
							<td class="table-head" align="right">姓名</td>
							<td>
								<input class="u-input" type="text" id="name" name="name" value="${conOutVO.name }">
							</td>
						</tr>
						<tr>
							<td class="table-head" align="right">手机</td>
							<td>
								<input class="u-input" type="text" id="telphone" name="telphone" value="${conOutVO.telphone }">
							</td>
						</tr>
						<tr>
							<td class="table-head" align="right">邮箱</td>
							<td>
								<input class="u-input" type="text" id="email" name="email" value="${conOutVO.email }">
							</td>
						</tr>
						<tr>
							<td class="table-head" align="right">公司</td>
							<td>
								<input class="u-input" type="text" id="company" name="company" value="${conOutVO.company }">
							</td>
						</tr>
						<tr>
							<td class="table-head" align="right">职务</td>
							<td>
								<input class="u-input" type="text" id="jobName" name="jobName" value="${conOutVO.jobName }">
							</td>
						</tr>

					</table>
				</form>
			</div>
		</div>
		<div class="appform-foot">
		      <button validator="verifyForm" type="button" submit="eospContact/conOut/${operate}.json" formId="conOutForm" class="layui-btn" >保存</button>
		      <button validator="verifyForm" type="button" submit="eospContact/conOut/${operate}.json" formId="conOutForm" class="layui-btn" continue="true" >保存并继续</button>
		      <button type="button" cancel class="layui-btn layui-btn-primary">关闭</button>
		</div>
	</div>
</body>
</html>
