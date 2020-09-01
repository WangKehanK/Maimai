package cn.chich.seller.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.service.BaseCodeService;

@Controller
public class BaseCodeController {
	@Resource
    private BaseCodeService baseCodeService;
	
    @RequestMapping("getBaseCodeOpt")
    @ResponseBody
    public List<Map<String,Object>> getBaseCodeOpt(String typeNo){
    	List<Map<String,Object>> baseCodeOpt =baseCodeService.getBaseCodeOpt(typeNo);
    	return baseCodeOpt;
    }
}
