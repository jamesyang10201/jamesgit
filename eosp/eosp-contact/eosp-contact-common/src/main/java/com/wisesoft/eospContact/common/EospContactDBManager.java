package com.wisesoft.eospContact.common;

import com.wisesoft.store.ModelManager;

/**
 *@Readme EospContact对象管理器
 *@className com.wisesoft.eospContact.common.EospContactDBManager
 *@FileName EospContactDBManager.java
 *@author CodeGenerator
 *@history 修改说明
 */
public class EospContactDBManager {

	public static final String MANAGER_NAME = "wsbp_main_ModelManager";
	
	public static ModelManager getEospContactModelManager(){
		return ModelManager.use(MANAGER_NAME);
	}

}
