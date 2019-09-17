-- ----------------------------------------------------------------------------
-- 开发人员注意，
-- 1，本代码来自生成工具，不能保证完全正确，开发人员需检测代码正确行
-- 2，本sql不能直接执行
-- 3，如其他参数需要调整自行修改后执行
-- ----------------------------------------------------------------------------

-- 配置t_con_out--ConOut表的数据模型注册
-- 注意修改SUBSYS_ID，MANAGER_NAME，TYPE_字段
DELETE FROM T_SYS_DATA_MODEL WHERE ID = 't_con_out';

INSERT INTO T_SYS_DATA_MODEL(ID, NAME_, TYPE_, CONTENT_, MANAGER_NAME, SUBSYS_ID) 
VALUES ('t_con_out', 'ConOut', 'TABLE', 't_con_out', 'wsbp_main_ModelManager', 'eosp-contact');


-- 配置t_con_out--ConOut表的数据模型注册
-- 注意修改SUBSYS_ID，MANAGER_NAME，TYPE_字段
DELETE FROM T_SYS_MODULE WHERE ID = 'ConOut_module';
INSERT INTO T_SYS_MODULE (ID, PID, CODE_, NAME_, DISPLAY_COMPT, SORT_, SUBSYS_ID) 
VALUES ('ConOut_module', NULL, 'ConOut_module', '外部联系人', 'eospContact/conOut/index.html', 2, 'eosp-contact');


-- 配置eosp-contact的默认菜单方案
DELETE FROM T_SYS_MENU_SCHEME WHERE ID = 'eosp-contact_default_menu_scheme';
INSERT INTO T_SYS_MENU_SCHEME (ID, NAME_, DEFAULT_, SORT_, SUBSYS_ID)
VALUES ('eosp-contact_default_menu_scheme', '默认菜单方案', 0, 2,'eosp-contact');

-- 配置t_con_out--ConOut表的菜单
-- 注意修改PID，MENU_NAME，MENU_ICON，SORT_字段
DELETE FROM T_SYS_MENU WHERE ID = 'ConOut_menu';
INSERT INTO T_SYS_MENU (ID, PID, MENU_SCHEME_ID, MENU_NAME, MENU_URL, MENU_SHOW, MENU_ICON, SORT_, SUBSYS_ID) 
VALUES ('ConOut_menu', 'contact_data_manage_menu', 'eosp-contact_default_menu_scheme', '外部联系人', 'ConOut_module', 0, NULL,2,'eosp-contact');


-- 配置t_con_out--ConOut表的展示模型
-- 注意修改NAME_，ID_NAME字段
DELETE FROM T_SYS_VIEW_MODEL WHERE ID = 'ConOut_vm';
INSERT INTO T_SYS_VIEW_MODEL (ID, NAME_, MODULE_ID, DATA_MODEL_ID, ID_NAME, PID_NAME, WHERE_CLAUSE, ORDER_CLAUSE, GROUP_CLAUSE, SUBSYS_ID)
VALUES ('ConOut_vm', 'ConOut', 'ConOut_module', 't_con_out', 'ID',null, NULL, NULL, NULL, 'eosp-contact');


-- 配置t_con_out--ConOut的显示字段，默认是全部显示的，开发人员根据不同需求自行调整
-- ------------------------------------------------------------------------------------
-- DECORATION 的可选配置： [DICT:字典id] [FORMAT:yyyy-MM-dd] [NUMBER:##,###.00] [CUSTOMIZED:java类]
-- ALIGN 可选值：left、center、right
-- ------------------------------------------------------------------------------------
DELETE FROM T_SYS_VIEW_MODEL_DISPLAY WHERE PID = 'ConOut_vm';
INSERT INTO T_SYS_VIEW_MODEL_DISPLAY (ID, PID, NAME_, LABEL_, DISPLAY_SEQ, DECORATION, WIDTH, ALIGN, STYLE, SORTABLE, RESIZABLE)
VALUES ('ConOut_vm_NAME_', 'ConOut_vm', 'NAME_', '姓名',1,null, '200', 'center', NULL, 'true', NULL);
INSERT INTO T_SYS_VIEW_MODEL_DISPLAY (ID, PID, NAME_, LABEL_, DISPLAY_SEQ, DECORATION, WIDTH, ALIGN, STYLE, SORTABLE, RESIZABLE) 
VALUES ('ConOut_vm_TELPHONE_', 'ConOut_vm', 'TELPHONE_', '手机',2,null, '200', 'center', NULL, 'true', NULL);
INSERT INTO T_SYS_VIEW_MODEL_DISPLAY (ID, PID, NAME_, LABEL_, DISPLAY_SEQ, DECORATION, WIDTH, ALIGN, STYLE, SORTABLE, RESIZABLE) 
VALUES ('ConOut_vm_EMAIL_', 'ConOut_vm', 'EMAIL_', '邮箱',3,null, '200', 'center', NULL, 'true', NULL);
INSERT INTO T_SYS_VIEW_MODEL_DISPLAY (ID, PID, NAME_, LABEL_, DISPLAY_SEQ, DECORATION, WIDTH, ALIGN, STYLE, SORTABLE, RESIZABLE) 
VALUES ('ConOut_vm_COMPANY_', 'ConOut_vm', 'COMPANY_', '公司',4,null, '200', 'center', NULL, 'true', NULL);
INSERT INTO T_SYS_VIEW_MODEL_DISPLAY (ID, PID, NAME_, LABEL_, DISPLAY_SEQ, DECORATION, WIDTH, ALIGN, STYLE, SORTABLE, RESIZABLE) 
VALUES ('ConOut_vm_JOB_NAME', 'ConOut_vm', 'JOB_NAME', '职务',5,null, '200', 'center', NULL, 'true', NULL);



-- 配置t_con_out--ConOut的字段搜索，默认配置的是全部字段，开发人员根据不同需求自行调整
-- OP 的可选值: eq(等于), ne(不等于), like(相似), notLike(不相似), gt(大于), gte(大于等于), lt(小于), lte(小于等于), between(两者之间)
DELETE FROM T_SYS_VIEW_MODEL_SEARCH WHERE PID = 'ConOut_vm';
insert into T_SYS_VIEW_MODEL_SEARCH (ID, PID, NAME_, LABEL_, COMPT_NAME, COMPT_PARAMS, OP, DISPLAY_SEQ, DECORATION)
values ('ConOut_vm_NAME_', 'ConOut_vm', 'NAME_','姓名', 'text', null, 'like', 1, null);




-- 配置t_con_out--ConOut的操作用例，开发人员根据不同需求自行调整
-- ------------------------------------------------------------------------------------
-- SHOW_TYPE 的可选值：embed（平铺工作区）、dialog（弹出）、ajax（Ajax提交后台）
-- TYPE_ 的可选值 ：C、 U、V、D、S、O
-- ------------------------------------------------------------------------------------
DELETE FROM T_SYS_VIEW_MODEL_ACTION WHERE PID = 'ConOut_vm';
INSERT INTO T_SYS_VIEW_MODEL_ACTION (ID, PID,TYPE_, BUTTON_ID, NAME_, DISPLAY_COMPT, EVENT_TYPE, SHOW_TYPE, STYLE, DISPLAY_SEQ, DECORATION) 
VALUES ('ConOut_vm_create', 'ConOut_vm','C','create', '添加外部联系人', 'eospContact/conOut/toAdd.html', 'button', 'embed', NULL, 1, NULL);
INSERT INTO T_SYS_VIEW_MODEL_ACTION (ID, PID,TYPE_, BUTTON_ID, NAME_, DISPLAY_COMPT, EVENT_TYPE, SHOW_TYPE, STYLE, DISPLAY_SEQ, DECORATION)
VALUES ('ConOut_vm_export', 'ConOut_vm',null,'export', '批量导出', '', 'button', '', NULL, 2, NULL);

INSERT INTO T_SYS_VIEW_MODEL_ACTION (ID, PID,TYPE_, BUTTON_ID, NAME_, DISPLAY_COMPT, EVENT_TYPE, SHOW_TYPE, STYLE, DISPLAY_SEQ, DECORATION) 
VALUES ('ConOut_vm_update', 'ConOut_vm','U','update', '修改', 'eospContact/conOut/toEdit.html', 'button', 'embed', NULL, 3, NULL);
INSERT INTO T_SYS_VIEW_MODEL_ACTION (ID, PID,TYPE_, BUTTON_ID, NAME_, DISPLAY_COMPT, EVENT_TYPE, SHOW_TYPE, STYLE, DISPLAY_SEQ, DECORATION) 
VALUES ('ConOut_vm_delete', 'ConOut_vm','D','delete', '删除', 'eospContact/conOut/del.json', 'button', 'ajax', NULL, 4, '确定将删除该数据？');
INSERT INTO T_SYS_VIEW_MODEL_ACTION (ID, PID,TYPE_, BUTTON_ID, NAME_, DISPLAY_COMPT, EVENT_TYPE, SHOW_TYPE, STYLE, DISPLAY_SEQ, DECORATION) 
VALUES ('ConOut_vm_view', 'ConOut_vm','V','view', '浏览', 'eospContact/conOut/toView.html', 'button', 'embed', NULL, 5, NULL);


-- 树模型
DELETE FROM T_SYS_VIEW_MODEL WHERE ID = 'ConOut_tree_vm';
INSERT INTO T_SYS_VIEW_MODEL (ID, NAME_, MODULE_ID, DATA_MODEL_ID, ID_NAME, PID_NAME, WHERE_CLAUSE, ORDER_CLAUSE, GROUP_CLAUSE, SUBSYS_ID)
VALUES ('ConOut_tree_vm', '项目分类树', 'ConOut_module', 't_con_out', 'ID','PID_', 'DELETED_ = 0', 'SORT_', NULL, 'eosp-contact');


DELETE FROM T_SYS_VIEW_MODEL_DISPLAY WHERE PID = 'ConOut_tree_vm';
INSERT INTO T_SYS_VIEW_MODEL_DISPLAY (ID, PID, NAME_, LABEL_, DISPLAY_SEQ, DECORATION, WIDTH, ALIGN, STYLE, SORTABLE, RESIZABLE)
VALUES ('ConOut_tree_vm_NAME_', 'ConOut_tree_vm', 'NAME_', '分类名称',3,null, '200','center', NULL, 'true', NULL);



