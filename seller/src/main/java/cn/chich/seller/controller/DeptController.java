package cn.chich.seller.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.bean.Dept;
import cn.chich.seller.service.DeptService;
@Controller
public class DeptController {
	@Resource
    private DeptService deptService;
	
    @RequestMapping("getDeptOpt")
    @ResponseBody
    public List<Dept> getDeptOpt(HttpServletRequest request,int schoolId){
    	List<Dept> allDeptById = deptService.getAllDeptById(schoolId);
    	
    	return allDeptById;
    }
}
