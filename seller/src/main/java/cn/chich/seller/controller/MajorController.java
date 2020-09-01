package cn.chich.seller.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.bean.Major;
import cn.chich.seller.service.MajorService;

@Controller
public class MajorController {
	@Resource
    private MajorService majorService;
	
    @RequestMapping("getMajorOpt")
    @ResponseBody
    public List<Major> getMajorOpt(HttpServletRequest request,int deptId){
    	List<Major> majorOpt=majorService.getMajorOpt(deptId);
    	return majorOpt;
    }
}
