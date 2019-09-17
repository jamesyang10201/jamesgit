-- 系统初始化
delete from t_sys_sub_system where id = 'eosp-contact';
INSERT INTO t_sys_sub_system(ID, FULL_NAME, SHORT_NAME, CODE_, TYPE_, URL_, ICON_, COLOR_, SORT_, CLIENT_SECRET, DESCRIPTION, AUTH_KEY, IS_INNER_SYS) 
VALUES ('eosp-contact', '通讯录', '通讯录', 'eosp-contact', NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, 1);

-- 配置eosp-crm的默认菜单方案
DELETE FROM T_SYS_MENU_SCHEME WHERE ID = 'eosp-contact_default_menu_scheme';
INSERT INTO T_SYS_MENU_SCHEME (ID, NAME_, DEFAULT_, SORT_, SUBSYS_ID)
VALUES ('eosp-contact_default_menu_scheme', '通讯管理菜单方案', 0, 1,'eosp-contact');


DELETE FROM t_sys_menu WHERE ID ='contact_data_manage_menu';
INSERT INTO t_sys_menu(ID, PID, MENU_SCHEME_ID, MENU_NAME, MENU_URL, MENU_TYPE, MENU_GROUP, MENU_SHOW, MENU_ICON, SORT_, MENU_HELP, TARGET_, ICON_COLOR, SUBSYS_ID, AUTH_KEY)
VALUES ('contact_data_manage_menu', NULL , '', '通讯模块管理', '', NULL, NULL, 0, NULL, 1, '', NULL, NULL, 'eosp-contact', '');