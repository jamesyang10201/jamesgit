package com.wisesoft.eospContact.service;

import com.wisesoft.eospContact.api.IConOut;

/**
 *@Readme ConOutService对象
 *@className com.wisesoft.eospContact.service.IConOutService
 *@FileName IConOutService.java
 *@author CodeGenerator
 *@history 修改说明
 */
public interface IConOutService {

	/**
	 * 新增数据
	 * 
	 * @param modelManagerName 模型管理名称
	 * @param conOut 
	 * @return IConOut
	 * @history 修改说明
	 */
	public IConOut insert(String modelManagerName, IConOut conOut);
	
	
	/**
	 * 
	 * 修改数据
	 * @param modelManagerName 模型管理名称
	 * @param conOut 对象
	 * @return IConOut
	 * @history 修改说明
	 */
	public IConOut update(String modelManagerName, IConOut conOut);
	
	
	/**
	 * 通过id删除数据
	 * 
	 * @param modelManagerName 模型管理名称
	 * @param id 数据对象id
	 * @return boolean
	 * @history 修改说明
	 */
	public boolean deleteById(String modelManagerName, String id);

}
