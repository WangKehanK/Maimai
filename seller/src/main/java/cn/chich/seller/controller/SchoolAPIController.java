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
@RequestMapping("/wx/School")
@Controller
public class SchoolAPIController {
	@Resource
    private SchoolService schoolService;
	
    @RequestMapping("getAllSchool")
    @ResponseBody
    public List<School> getAllSchool(HttpServletRequest request){
    	List<School> allSchool = schoolService.getAllSchool();
    	return allSchool;
    }
}
