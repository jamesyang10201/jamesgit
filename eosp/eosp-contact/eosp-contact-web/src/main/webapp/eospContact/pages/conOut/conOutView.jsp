<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="cfn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fw" uri="http://com.wisesoft.components/sys/compt"%>
<!doctype html>
<html>
<head>
<title>浏览</title>
<fw:sys_head />
<fw:sys_script />
<script type="text/javascript" src="${contextPath}/eospContact/js/conOut/conOutView.js"></script>
</head>
<body class="f-bg-white">
	<div compt="appForm" winid="conOut" >
		<div class="appform-body">
			<div class="appform-content" >
				<form id="conOutForm">
					<table class="m-table-form table">
						<tr>
							<td class="table-head" align="right">姓名</td>
							<td>
								<div class="name" id="name">${conOutVO.name }</div>
							</td>
						</tr>
						<tr>
							<td class="table-head" align="right">手机</td>
							<td>
								<div class="telphone" id="telphone">${conOutVO.telphone }</div>
							</td>
						</tr>
						<tr>
							<td class="table-head" align="right">邮箱</td>
							<td>
								<div class="email" id="email">${conOutVO.email }</div>
							</td>
						</tr>
						<tr>
							<td class="table-head" align="right">公司</td>
							<td>
								<div class="company" id="company">${conOutVO.company }</div>
							</td>
						</tr>
						<tr>
							<td class="table-head" align="right">职务</td>
							<td>
								<div class="jobName" id="jobName">${conOutVO.jobName }</div>
							</td>
						</tr>
					</table>
				</form>
			</div>
		</div>
		<div class="appform-foot">
		      <button type="button" cancel class="layui-btn layui-btn-primary">关闭</button>
		</div>
	</div>
</body>
</html>
