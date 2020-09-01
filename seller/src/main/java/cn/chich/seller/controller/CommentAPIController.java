package cn.chich.seller.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.bean.Collect;
import cn.chich.seller.bean.Comment;
import cn.chich.seller.service.CommentService;
import cn.chich.seller.service.OrdersService;
import cn.chich.seller.service.UserService;
@RequestMapping("/wx/Comment")
@Controller
public class CommentAPIController {
	@Resource
    private OrdersService ordersService;
	@Resource
    private CommentService commentService;
	@Resource
    private UserService userService;
    @RequestMapping("addComment")
    @ResponseBody
    public Map<String, Object> addComment(int ordersId,int userId,String commentContent,int starNum){
    	Map<String, Object> map=new HashMap<String,Object>();	
    	int status=1003;//已评价
    	Comment comment=new Comment();
    	comment.setUserId(userId);
    	comment.setOrdersId(ordersId);
    	comment.setCommentContent(commentContent);
    	comment.setStarNum(starNum);
    	//插入评价表
    	commentService.addComment(comment);
    	//更新订单状态
    	ordersService.updateOrderStatus(ordersId,status);
    	//更新用户信誉值
    	userService.updateUserCreditVal(userId,starNum);
		map.put("commentId", comment.getId());
	    map.put("code", 1);
    	return map;
    }
    @RequestMapping("getCommentByOrdersId")
    @ResponseBody
    public Comment getCommentByOrdersId(int ordersId){
    	Comment comment=commentService.getCommentByOrdersId(ordersId);
	    return comment;
    }
}
