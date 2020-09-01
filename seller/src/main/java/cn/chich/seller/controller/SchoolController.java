package cn.chich.seller.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.bean.School;
import cn.chich.seller.service.SchoolService;

@Controller
public class SchoolController {
	@Resource
    private SchoolService schoolService;
	
    @RequestMapping("getSchoolOpt")
    @ResponseBody
    public  List<School> getSchoolOpt(HttpServletRequest request){
    	List<School> allSchool = schoolService.getAllSchool();
    	return allSchool;
    }
}
