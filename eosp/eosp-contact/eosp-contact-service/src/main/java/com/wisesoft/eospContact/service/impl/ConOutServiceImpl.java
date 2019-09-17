package com.wisesoft.eospContact.service.impl;

import org.springframework.stereotype.Service;

import com.wisesoft.core.util.StringUtil;
import com.wisesoft.dubbo.spring.annotation.ServiceExt;
import com.wisesoft.store.Model;
import com.wisesoft.service.BaseServiceImpl;

import com.wisesoft.eospContact.service.IConOutOutService;
import com.wisesoft.eospContact.service.IConOutService;
import com.wisesoft.eospContact.vo.ConOutVO;
import com.wisesoft.eospContact.api.IConOut;

/**
	*@Readme ConOutService对象
	*@className com.wisesoft.eospContact.service.ConOutService
	*@FileName ConOutService.java
	*@author CodeGenerator
	*@history 修改说明
	*/
@ServiceExt(value = "eospContact_ConOutService", interfaceClass = IConOutOutService.class)
public class ConOutServiceImpl extends BaseServiceImpl<ConOutVO>
	implements IConOutService, IConOutOutService {


	/**
		* 构建模型
		*
		* @return ConOutVO
		* @history 修改说明
		*/
	@Override
	public ConOutVO createModel() {
		return new ConOutVO();
	}

	/**
		* 构建模型
		*
		* @param modelManagerName 模型管理名称
		* @return ConOutVO
		* @history 修改说明
		*/
	public ConOutVO createModel(String modelManagerName) {
		ConOutVO vo = createModel();
		if (StringUtil.hasText(modelManagerName)) {
			vo.modelManagerName(modelManagerName);
		}
		return vo;
	}

	/**
		* 维护模型
		*
		* @param modelManagerName 模型管理名称
		* @param vo
		* @history 修改说明
		*/
	private void buildModel(String modelManagerName, ConOutVO vo) {
		if(StringUtil.hasText(modelManagerName)) {
			vo.modelManagerName(modelManagerName);
		}
	}

	/**
		* 通过id获取数据对象
		*
		* @param modelManagerName 模型管理名称
		* @param id 数据对象id
		* @return IConOut
		* @history 修改说明
		*/
	@Override
	public IConOut getById(String modelManagerName, String id) {
		ConOutVO vo = createModel(modelManagerName);
		vo.setId(id);
		return vo.queryForObject();
	}

	/**
		* 新增数据
		*
		* @param modelManagerName 模型管理名称
		* @param conOut
		* @return IConOut
		* @history 修改说明
		*/
	@Override
	public IConOut insert(String modelManagerName, IConOut conOut) {
		if(conOut == null) {
			return null;
		}
		ConOutVO vo = (ConOutVO) conOut;
		buildModel(modelManagerName, vo);
		return this.insert(vo);
	}

	/**
		*
		* 修改数据
		* @param modelManagerName 模型管理名称
		* @param conOut 对象
		* @return IConOut
		* @history 修改说明
		*/
	@Override
	public IConOut update(String modelManagerName, IConOut conOut) {
		if(conOut == null) {
			return null;
		}
		ConOutVO vo = (ConOutVO) conOut;
		buildModel(modelManagerName, vo);
		return this.update(vo);
	}

	/**
		* 通过id删除数据
		*
		* @param modelManagerName 模型管理名称
		* @param id 数据对象id
		* @return boolean
		* @history 修改说明
		*/
	@Override
	public boolean deleteById(String modelManagerName, String id) {
		ConOutVO vo = createModel(modelManagerName);
		vo.setId(id);
		vo.setStatus(Model.DELETE);
		return vo.delete() != null;
	}

}
