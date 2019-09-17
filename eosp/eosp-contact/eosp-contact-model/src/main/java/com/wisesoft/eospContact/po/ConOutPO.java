package com.wisesoft.eospContact.po;

import com.wisesoft.eospContact.common.EospContactDBManager;

import com.wisesoft.model.BaseBusizModel;
import com.wisesoft.store.Model;
import com.wisesoft.eospContact.api.IConOut;


/**
	*@Readme ConOutPO对象
	*@className com.wisesoft.eospContact.po.ConOutPO
	*@FileName ConOutPO.java
	*@author CodeGenerator
	*@history 修改说明
	*/
@SuppressWarnings("rawtypes")
public class ConOutPO<T extends ConOutPO> extends BaseBusizModel<T> implements IConOut{

	private static final long serialVersionUID = 1371218408381L;
	/**
		* ConOut
		*/
	public static final String TABLE="t_con_out";

	/**
		* id
		*/
	public static final String C_ID = "ID";
	/**
		* name
		*/
	public static final String C_NAME = "NAME_";
	/**
		* telphone
		*/
	public static final String C_TELPHONE = "TELPHONE_";
	/**
		* email
		*/
	public static final String C_EMAIL = "EMAIL_";
	/**
		* company
		*/
	public static final String C_COMPANY = "COMPANY_";
	/**
		* jobName
		*/
	public static final String C_JOB_NAME = "JOB_NAME";
	/**
		* createUser
		*/
	public static final String C_CREATE_USER = "CREATE_USER";
	/**
		* createDate
		*/
	public static final String C_CREATE_DATE = "CREATE_DATE";
	/**
		* createUserName
		*/
	public static final String C_CREATE_USER_NAME = "CREATE_USER_NAME";
	/**
		* createOrg
		*/
	public static final String C_CREATE_ORG = "CREATE_ORG";
	/**
		* createOrgName
		*/
	public static final String C_CREATE_ORG_NAME = "CREATE_ORG_NAME";
	/**
		* createDept
		*/
	public static final String C_CREATE_DEPT = "CREATE_DEPT";
	/**
		* createDeptName
		*/
	public static final String C_CREATE_DEPT_NAME = "CREATE_DEPT_NAME";
	/**
		* createName
		*/
	public static final String C_CREATE_NAME = "CREATE_NAME";
	/**
		* createIdentify
		*/
	public static final String C_CREATE_IDENTIFY = "CREATE_IDENTIFY";
	/**
		* modifyUser
		*/
	public static final String C_MODIFY_USER = "MODIFY_USER";
	/**
		* modifyUserName
		*/
	public static final String C_MODIFY_USER_NAME = "MODIFY_USER_NAME";
	/**
		* modifyIdentity
		*/
	public static final String C_MODIFY_IDENTITY = "MODIFY_IDENTITY";
	/**
		* modifyDept
		*/
	public static final String C_MODIFY_DEPT = "MODIFY_DEPT";
	/**
		* modifyOrg
		*/
	public static final String C_MODIFY_ORG = "MODIFY_ORG";
	/**
		* modifyDate
		*/
	public static final String C_MODIFY_DATE = "MODIFY_DATE";
	/**
		* tenementId
		*/
	public static final String C_TENEMENT_ID = "TENEMENT_ID";
	/**
		* formId
		*/
	public static final String C_FORM_ID = "FORM_ID";
	/**
		* remark
		*/
	public static final String C_REMARK = "REMARK_";
	/**
		* path
		*/
	public static final String C_PATH = "PATH_";
	/**
		* deleted
		*/
	public static final String C_DELETED = "DELETED_";
	/**
		* state
		*/
	public static final String C_STATE = "STATE_";
	/**
		* sort
		*/
	public static final String C_SORT = "SORT_";

	public ConOutPO() {
		super(EospContactDBManager.MANAGER_NAME, TABLE);
	}

	public ConOutPO(String modelManagerName) {
		super(modelManagerName, TABLE);
	}

	@SuppressWarnings("rawtypes")
	public ConOutPO(Model model) {
		super(model);
	}


	/**
		*
		* @Description: 获取id
		* @return java.lang.String id
		*/
	@Override
	public java.lang.String getId() {
		return getString(C_ID);
	}

	/**
		*
		* @Description: 设置id
		* @param id id
		*/
	@Override
	public void setId(java.lang.String id) {
		set(C_ID, id);
	}

	/**
		*
		* @Description: 获取name
		* @return java.lang.String name
		*/
	@Override
	public java.lang.String getName() {
		return getString(C_NAME);
	}

	/**
		*
		* @Description: 设置name
		* @param name name
		*/
	@Override
	public void setName(java.lang.String name) {
		set(C_NAME, name);
	}

	/**
		*
		* @Description: 获取telphone
		* @return java.lang.String telphone
		*/
	@Override
	public java.lang.String getTelphone() {
		return getString(C_TELPHONE);
	}

	/**
		*
		* @Description: 设置telphone
		* @param telphone telphone
		*/
	@Override
	public void setTelphone(java.lang.String telphone) {
		set(C_TELPHONE, telphone);
	}

	/**
		*
		* @Description: 获取email
		* @return java.lang.String email
		*/
	@Override
	public java.lang.String getEmail() {
		return getString(C_EMAIL);
	}

	/**
		*
		* @Description: 设置email
		* @param email email
		*/
	@Override
	public void setEmail(java.lang.String email) {
		set(C_EMAIL, email);
	}

	/**
		*
		* @Description: 获取company
		* @return java.lang.String company
		*/
	@Override
	public java.lang.String getCompany() {
		return getString(C_COMPANY);
	}

	/**
		*
		* @Description: 设置company
		* @param company company
		*/
	@Override
	public void setCompany(java.lang.String company) {
		set(C_COMPANY, company);
	}

	/**
		*
		* @Description: 获取jobName
		* @return java.lang.String jobName
		*/
	@Override
	public java.lang.String getJobName() {
		return getString(C_JOB_NAME);
	}

	/**
		*
		* @Description: 设置jobName
		* @param jobName jobName
		*/
	@Override
	public void setJobName(java.lang.String jobName) {
		set(C_JOB_NAME, jobName);
	}

	/**
		*
		* @Description: 获取createUser
		* @return java.lang.String createUser
		*/
	@Override
	public java.lang.String getCreateUser() {
		return getString(C_CREATE_USER);
	}

	/**
		*
		* @Description: 设置createUser
		* @param createUser createUser
		*/
	@Override
	public void setCreateUser(java.lang.String createUser) {
		set(C_CREATE_USER, createUser);
	}

	/**
		*
		* @Description: 获取createDate
		* @return java.util.Date createDate
		*/
	@Override
	public java.util.Date getCreateDate() {
		return getDate(C_CREATE_DATE);
	}

	/**
		*
		* @Description: 设置createDate
		* @param createDate createDate
		*/
	@Override
	public void setCreateDate(java.util.Date createDate) {
		set(C_CREATE_DATE, createDate);
	}

	/**
		*
		* @Description: 获取createUserName
		* @return java.lang.String createUserName
		*/
	@Override
	public java.lang.String getCreateUserName() {
		return getString(C_CREATE_USER_NAME);
	}

	/**
		*
		* @Description: 设置createUserName
		* @param createUserName createUserName
		*/
	@Override
	public void setCreateUserName(java.lang.String createUserName) {
		set(C_CREATE_USER_NAME, createUserName);
	}

	/**
		*
		* @Description: 获取createOrg
		* @return java.lang.String createOrg
		*/
	@Override
	public java.lang.String getCreateOrg() {
		return getString(C_CREATE_ORG);
	}

	/**
		*
		* @Description: 设置createOrg
		* @param createOrg createOrg
		*/
	@Override
	public void setCreateOrg(java.lang.String createOrg) {
		set(C_CREATE_ORG, createOrg);
	}

	/**
		*
		* @Description: 获取createOrgName
		* @return java.lang.String createOrgName
		*/
	@Override
	public java.lang.String getCreateOrgName() {
		return getString(C_CREATE_ORG_NAME);
	}

	/**
		*
		* @Description: 设置createOrgName
		* @param createOrgName createOrgName
		*/
	@Override
	public void setCreateOrgName(java.lang.String createOrgName) {
		set(C_CREATE_ORG_NAME, createOrgName);
	}

	/**
		*
		* @Description: 获取createDept
		* @return java.lang.String createDept
		*/
	@Override
	public java.lang.String getCreateDept() {
		return getString(C_CREATE_DEPT);
	}

	/**
		*
		* @Description: 设置createDept
		* @param createDept createDept
		*/
	@Override
	public void setCreateDept(java.lang.String createDept) {
		set(C_CREATE_DEPT, createDept);
	}

	/**
		*
		* @Description: 获取createDeptName
		* @return java.lang.String createDeptName
		*/
	@Override
	public java.lang.String getCreateDeptName() {
		return getString(C_CREATE_DEPT_NAME);
	}

	/**
		*
		* @Description: 设置createDeptName
		* @param createDeptName createDeptName
		*/
	@Override
	public void setCreateDeptName(java.lang.String createDeptName) {
		set(C_CREATE_DEPT_NAME, createDeptName);
	}

	/**
		*
		* @Description: 获取createName
		* @return java.lang.String createName
		*/
	@Override
	public java.lang.String getCreateName() {
		return getString(C_CREATE_NAME);
	}

	/**
		*
		* @Description: 设置createName
		* @param createName createName
		*/
	@Override
	public void setCreateName(java.lang.String createName) {
		set(C_CREATE_NAME, createName);
	}

	/**
		*
		* @Description: 获取createIdentify
		* @return java.lang.String createIdentify
		*/
	@Override
	public java.lang.String getCreateIdentify() {
		return getString(C_CREATE_IDENTIFY);
	}

	/**
		*
		* @Description: 设置createIdentify
		* @param createIdentify createIdentify
		*/
	@Override
	public void setCreateIdentify(java.lang.String createIdentify) {
		set(C_CREATE_IDENTIFY, createIdentify);
	}

	/**
		*
		* @Description: 获取modifyUser
		* @return java.lang.String modifyUser
		*/
	@Override
	public java.lang.String getModifyUser() {
		return getString(C_MODIFY_USER);
	}

	/**
		*
		* @Description: 设置modifyUser
		* @param modifyUser modifyUser
		*/
	@Override
	public void setModifyUser(java.lang.String modifyUser) {
		set(C_MODIFY_USER, modifyUser);
	}

	/**
		*
		* @Description: 获取modifyUserName
		* @return java.lang.String modifyUserName
		*/
	@Override
	public java.lang.String getModifyUserName() {
		return getString(C_MODIFY_USER_NAME);
	}

	/**
		*
		* @Description: 设置modifyUserName
		* @param modifyUserName modifyUserName
		*/
	@Override
	public void setModifyUserName(java.lang.String modifyUserName) {
		set(C_MODIFY_USER_NAME, modifyUserName);
	}

	/**
		*
		* @Description: 获取modifyIdentity
		* @return java.lang.String modifyIdentity
		*/
	@Override
	public java.lang.String getModifyIdentity() {
		return getString(C_MODIFY_IDENTITY);
	}

	/**
		*
		* @Description: 设置modifyIdentity
		* @param modifyIdentity modifyIdentity
		*/
	@Override
	public void setModifyIdentity(java.lang.String modifyIdentity) {
		set(C_MODIFY_IDENTITY, modifyIdentity);
	}

	/**
		*
		* @Description: 获取modifyDept
		* @return java.lang.String modifyDept
		*/
	@Override
	public java.lang.String getModifyDept() {
		return getString(C_MODIFY_DEPT);
	}

	/**
		*
		* @Description: 设置modifyDept
		* @param modifyDept modifyDept
		*/
	@Override
	public void setModifyDept(java.lang.String modifyDept) {
		set(C_MODIFY_DEPT, modifyDept);
	}

	/**
		*
		* @Description: 获取modifyOrg
		* @return java.lang.String modifyOrg
		*/
	@Override
	public java.lang.String getModifyOrg() {
		return getString(C_MODIFY_ORG);
	}

	/**
		*
		* @Description: 设置modifyOrg
		* @param modifyOrg modifyOrg
		*/
	@Override
	public void setModifyOrg(java.lang.String modifyOrg) {
		set(C_MODIFY_ORG, modifyOrg);
	}

	/**
		*
		* @Description: 获取modifyDate
		* @return java.util.Date modifyDate
		*/
	@Override
	public java.util.Date getModifyDate() {
		return getDate(C_MODIFY_DATE);
	}

	/**
		*
		* @Description: 设置modifyDate
		* @param modifyDate modifyDate
		*/
	@Override
	public void setModifyDate(java.util.Date modifyDate) {
		set(C_MODIFY_DATE, modifyDate);
	}

	/**
		*
		* @Description: 获取tenementId
		* @return java.lang.String tenementId
		*/
	@Override
	public java.lang.String getTenementId() {
		return getString(C_TENEMENT_ID);
	}

	/**
		*
		* @Description: 设置tenementId
		* @param tenementId tenementId
		*/
	@Override
	public void setTenementId(java.lang.String tenementId) {
		set(C_TENEMENT_ID, tenementId);
	}

	/**
		*
		* @Description: 获取formId
		* @return java.lang.String formId
		*/
	@Override
	public java.lang.String getFormId() {
		return getString(C_FORM_ID);
	}

	/**
		*
		* @Description: 设置formId
		* @param formId formId
		*/
	@Override
	public void setFormId(java.lang.String formId) {
		set(C_FORM_ID, formId);
	}

	/**
		*
		* @Description: 获取remark
		* @return java.lang.String remark
		*/
	@Override
	public java.lang.String getRemark() {
		return getString(C_REMARK);
	}

	/**
		*
		* @Description: 设置remark
		* @param remark remark
		*/
	@Override
	public void setRemark(java.lang.String remark) {
		set(C_REMARK, remark);
	}

	/**
		*
		* @Description: 获取path
		* @return java.lang.String path
		*/
	public java.lang.String getPath() {
		return getString(C_PATH);
	}

	/**
		*
		* @Description: 设置path
		* @param path path
		*/
	public void setPath(java.lang.String path) {
		set(C_PATH, path);
	}

	/**
		*
		* @Description: 获取deleted
		* @return java.lang.Integer deleted
		*/
	public java.lang.Integer getDeleted() {
		return get(C_DELETED, java.lang.Integer.class);
	}

	/**
		*
		* @Description: 设置deleted
		* @param deleted deleted
		*/
	public void setDeleted(java.lang.Integer deleted) {
		set(C_DELETED, deleted);
	}

	/**
		*
		* @Description: 获取state
		* @return java.lang.Integer state
		*/
	public java.lang.Integer getState() {
		return get(C_STATE, java.lang.Integer.class);
	}

	/**
		*
		* @Description: 设置state
		* @param state state
		*/
	public void setState(java.lang.Integer state) {
		set(C_STATE, state);
	}

	/**
		*
		* @Description: 获取sort
		* @return java.lang.Integer sort
		*/
	public java.lang.Integer getSort() {
		return get(C_SORT, java.lang.Integer.class);
	}

	/**
		*
		* @Description: 设置sort
		* @param sort sort
		*/
	public void setSort(java.lang.Integer sort) {
		set(C_SORT, sort);
	}

}

