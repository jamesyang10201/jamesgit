package com.wisesoft.eospContact.controller;

import javax.annotation.Resource;

import com.wisesoft.core.util.StringUtil;
import com.wisesoft.eospContact.common.IEospContactConstants;
import com.wisesoft.sys.components.helper.ViewModelHelper;
import com.wisesoft.sys.components.vo.TreeViewModel;
import com.wisesoft.sys.components.vo.ViewModelParams;
import com.wisesoft.sys.model.vo.ViewModelVO;
import com.wisesoft.sys.session.UserSessionContext;
import com.wisesoft.web.spring.bind.annotation.JsonParam;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wisesoft.eospContact.service.impl.ConOutServiceImpl;
import com.wisesoft.eospContact.api.IConOut;
import com.wisesoft.eospContact.vo.ConOutVO;

import com.wisesoft.web.controller.BaseController;
import com.wisesoft.web.spring.MVResult;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 *@Readme ConOutController对象
 *@className com.wisesoft.eospContact.controller.ConOutController
 *@FileName ConOutController.java
 *@author CodeGenerator
 *@history 修改说明
 */
@Controller(value="eospContact_ConOutController")
@RequestMapping("eospContact/conOut")
public class ConOutController extends BaseController {
	
	private String resourceUrl="/eospContact/pages/conOut/";
	
	@Resource(name="eospContact_ConOutService")
	private ConOutServiceImpl conOutService;
	
	/**
	 * 跳转到首页
	 * @return
	 */
	@RequestMapping("index")
	public MVResult index() {
		return MVResult.instance().viewName(resourceUrl + "conOutIndex.jsp");
	}
	
	/**
	 * 跳转到新增页面
	 * @return
	 */
	@RequestMapping("toAdd")
	public MVResult toAdd() {
		
		MVResult mv = new MVResult();
		ConOutVO vo = new ConOutVO();
		mv.addObject("conOutVO", vo);
		mv.addObject(KEY_OPERATE, "add");
		mv.viewName(resourceUrl+"conOutAdd.jsp");
		
		return mv;
	}
	
	/**
	 * 跳转到修改页面
	 * @param id
	 * @return
	 */
	@RequestMapping("toEdit")
	public MVResult toEdit(String id) {
		
		MVResult mv = new MVResult();
		IConOut conOut = conOutService.getById(null, id);
		ConOutVO vo = null;
		if(conOut != null) {
			vo = (ConOutVO) conOut;
		}
		mv.addObject("conOutVO", vo);
		mv.addObject(KEY_OPERATE, "edit");
		mv.viewName(resourceUrl+"conOutAdd.jsp");
		return mv;
	}
	
	/**
	 * 浏览页面
	 * @param id
	 * @return
	 */
	@RequestMapping("toView")
	public MVResult toView(String id)  {

		MVResult mv = new MVResult();
		IConOut conOut = conOutService.getById(null, id);
		ConOutVO vo = null;
		if(conOut != null) {
			vo = (ConOutVO) conOut;
		}
		mv.addObject("conOutVO", vo);
		mv.viewName(resourceUrl+"conOutView.jsp");
		
		return mv;
	}
	
	/**
	 * 新增
	 * @param vo
	 * @return
	 */
	@RequestMapping("add")
	public MVResult add(ConOutVO vo) {
		
		MVResult mv = new MVResult();
		IConOut conOut = conOutService.insert(null, vo);
		if (conOut != null) {
			mv.addObject("id", conOut.getId());
		}
		return mv.setSuccess(conOut != null);
	}
	
	
	/**
	 * 修改数据
	 * @param vo
	 * @return
	 */
	@RequestMapping("edit")
	public MVResult edit(ConOutVO vo)  {
		conOutService.update(null, vo);
		return MVResult.retSuccess();
	}

	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@RequestMapping("del")
	public MVResult del(String id) {
		conOutService.deleteById(null, id);
		return MVResult.retSuccess();
	}

	@ResponseBody
	@RequestMapping("dataList/{viewModelId}")
	public List<Map<String, Object>> getDataList(@PathVariable("viewModelId")String viewModelId, @JsonParam ViewModelParams params, String id, Integer pageNumber, Integer pageSize) {
		if (StringUtil.hasText(viewModelId)) {
			if(params==null){
				params=new ViewModelParams();
			}
			if(pageNumber!=null){
				params.setPageNumber(pageNumber);
			}
			if(pageSize!=null){
				params.setPageSize(pageSize);
			}
			ViewModelVO config = ViewModelHelper.getViewModel(viewModelId, UserSessionContext.getUserId(), UserSessionContext.getLocale(), UserSessionContext.getAuthorizeIdentitys());
			if (config == null || !StringUtil.hasText(config.getDataModelManagerName()) || !StringUtil.hasText(config.getDataModelContent())) {
				return null;
			}
			TreeViewModel currencyModel = ViewModelHelper.getTreeViewModel(config);
			ViewModelHelper.addViewModelFilterCondition(currencyModel, params);

			// 多租户数据隔离
			String tenementId = UserSessionContext.getTenementId();
			if (StringUtil.isNotBlank(tenementId)) {
				currencyModel.setTenementId(tenementId);
			} else {
				currencyModel.nul(ConOutVO.C_TENEMENT_ID);
			}
			currencyModel.eq(ConOutVO.C_DELETED, IEospContactConstants.DELETE_USING);
			//排序
			currencyModel.asc(ConOutVO.C_SORT);
			ViewModelHelper.addViewModelOrderbyCondition(currencyModel, params);

			return currencyModel.queryData(id, config, params).getList();
		}
		return null;
	}
	/**
		* 子页面（列表）
		* @return
		*/
	@RequestMapping("subIndex")
	public MVResult subIndex(String pid) {
		return MVResult.instance()
			.addObject("pid",pid)
			.viewName(resourceUrl + "conOutSubIndex.jsp");
	}



}
