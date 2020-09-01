package cn.chich.seller.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.bean.Collect;
import cn.chich.seller.bean.Goods;
import cn.chich.seller.bean.User;
import cn.chich.seller.service.CollectService;
import cn.chich.seller.service.DeptService;
@RequestMapping("/wx/Collect")
@Controller
public class CollectAPIController {
	@Resource
    private CollectService collectService;
	
    @RequestMapping("getCollectList")
    @ResponseBody
    public List<Collect> getCollectList(int userId){
		List<Collect> list=collectService.getCollectList(userId);
	    return list;
    }
    @RequestMapping("getCollectWantList")
    @ResponseBody
    public List<Collect> getCollectWantList(int userId){
    	List<Collect> list=collectService.getCollectWantList(userId);
    	return list;
    }
    
    @RequestMapping("addUserCollect")
    @ResponseBody
    public Map<String, Object> addUserCollect(int userId,int invitationId,String invitationType){
    	Map<String, Object> map=new HashMap<String,Object>();	
    	Collect collect=new Collect();
    	collect.setUserId(userId);
    	collect.setInvitationId(invitationId);
    	collect.setInvitationType(invitationType);
    	int i=collectService.addUserCollect(collect);
    	if(i>0) {
    		map.put("collectId", collect.getId());
    	    map.put("code", 1);
    	}else {
    		map.put("code", 0);
    	}
    	return map;
    }
    
    @RequestMapping("deleteUserCollect")
    @ResponseBody
    public Map<String, Object> deleteUserCollect(int id){
    	Map<String, Object> map=new HashMap<String,Object>();
    	int i=collectService.deleteUserCollect(id);
    	if(i>0) {
    	    map.put("code", 1);
    	}else {
    		map.put("code", 0);
    	}
    	return map;
    }
    
}
