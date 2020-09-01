package cn.chich.seller.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.chich.seller.bean.Comment;
import cn.chich.seller.dao.CommentDao;
import cn.chich.seller.service.CommentService;
@Service("CommentService")
public class CommentServiceImpl implements CommentService {
	@Resource
	private CommentDao commentDao;
	@Override
	public int addComment(Comment comment) {
		return commentDao.addComment(comment);
	}
	@Override
	public Comment getCommentByOrdersId(int ordersId) {
		return commentDao.getCommentByOrdersId(ordersId);
	}

}
