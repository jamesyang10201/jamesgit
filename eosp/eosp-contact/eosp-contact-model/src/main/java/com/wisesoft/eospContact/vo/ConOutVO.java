package com.wisesoft.eospContact.vo;

import com.wisesoft.eospContact.po.ConOutPO;
import com.wisesoft.store.Model;

/**
	*@Readme
	*@className com.wisesoft.eospContact.vo.ConOutVO
	*@FileName ConOutVO.java
	*@author CodeGenerator
	*@date
	*@history
	*/
public class ConOutVO extends ConOutPO<ConOutVO> {
	private static final long serialVersionUID = 112121212L;

	public ConOutVO() {
		super();
	}

	public ConOutVO(String modelManangerName){
		super(modelManangerName);
	}

	@SuppressWarnings("rawtypes")
	public ConOutVO(Model model) {
		super(model);
	}
}
