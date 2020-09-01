package cn.chich.seller.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.bean.Dept;
import cn.chich.seller.bean.Major;
import cn.chich.seller.bean.School;
import cn.chich.seller.service.DeptService;
import cn.chich.seller.service.MajorService;
import cn.chich.seller.service.SchoolService;
@RequestMapping("/wx/Major")
@Controller
public class MajorAPIController {
	@Resource
    private MajorService majorService;
	@Resource
    private SchoolService schoolService;
	@Resource
    private DeptService deptService;
	
    @RequestMapping("getMajorData")
    @ResponseBody
    public List<Map<String,Object>> getMajorData(){
    	List<Map<String,Object>> majordata=new ArrayList<Map<String,Object>>();  
    	Map<String,Object> schoolMap=new HashMap<>();
    	Map<String,Object> deptMap=new HashMap<>();
    	Map<String,Object> majorMap=new HashMap<>();
    	
    	List<School> schoolList=schoolService.getAllSchool();
    	List<Dept> deptList=deptService.getAllDept();
    	List<Major> majorList=majorService.getAllMajor();
    	
    	schoolMap.put("schoolList", schoolList);
    	deptMap.put("deptList", deptList);
    	majorMap.put("majorList", majorList);
    	
    	majordata.add(schoolMap);
    	majordata.add(deptMap);
    	majordata.add(majorMap);
    	return majordata;
    }
}
