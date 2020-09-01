package cn.chich.seller.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.bean.Goods;
import cn.chich.seller.bean.Report;
import cn.chich.seller.service.GoodsService;
import cn.chich.seller.service.ReportService;
import cn.chich.seller.service.UserService;

@Controller
public class ReportController {
	@Resource
    private ReportService reportService;
	@Resource
    private GoodsService goodsService;
	@Resource
    private UserService userService;
    @RequestMapping("reportList")
    @ResponseBody
    public List<Report> reportList(){
    	List<Report> list = new ArrayList<Report>();
    	list=reportService.reportList();
		return list;
    }
    @RequestMapping("selectReports")
    @ResponseBody
    public List<Report> selectGoods(String goodsNo){
    	List<Report> list =reportService.selectReports(goodsNo);
    	return list;
    }
    @RequestMapping("handleReports")
    @ResponseBody
    public Map handleReports(int id,int status,int userId,int goodsId){
    	Map<String, Object> map=new HashMap<String,Object>();
    	if(status==1041) {//确认违规
    		//用户违规次数加一
    		userService.updataUserReportNum(userId);
    		int goodsStatus=1023;//删除
    		goodsService.updateGoodsStatusById(goodsId, goodsStatus);
    		int reportNum=userService.getReportNum(userId);
    		if(reportNum>=3) {
    			int froStatus=1012;//已冻结
    			userService.frozenUserById(userId,froStatus);//违规次数达到3次，冻结账户
    		}
    	}
    	reportService.handleReports(id,status);//状态更新---确认违规，无违规
		return map;
    }
}
