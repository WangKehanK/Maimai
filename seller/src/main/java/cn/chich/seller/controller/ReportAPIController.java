package cn.chich.seller.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.bean.Report;
import cn.chich.seller.service.ReportService;
@RequestMapping("/wx/Report")
@Controller
public class ReportAPIController {
	@Resource
    private ReportService reportService;
   
    @RequestMapping("addReport")
    @ResponseBody
    public Map addReport(Report report){
    	Map<String, Object> map=new HashMap<String,Object>();
    	int i =reportService.addReport(report);
    	if(i>0){
    		map.put("code", 1);
 		}else {
 			map.put("code", 0);
 		}
		return map;
    }
}
