package com.wisesoft.eospContact.service;

import com.wisesoft.eospContact.api.IConOut;

/**
 *@Readme ConOutOutService对象 对外提供
 *@className com.wisesoft.eospContact.service.IConOutOutService
 *@FileName IConOutService.java
 *@author CodeGenerator
 *@history 修改说明
 */
public interface IConOutOutService {

	
	/**
	 * 通过id获取数据对象
	 * 
	 * @param modelManagerName 模型管理名称
	 * @param id 数据对象id
	 * @return IConOut
	 * @history 修改说明
	 */
	public IConOut getById(String modelManagerName, String id);
	
}
