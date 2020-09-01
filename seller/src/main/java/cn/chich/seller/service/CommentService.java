package cn.chich.seller.service;

import cn.chich.seller.bean.Comment;

public interface CommentService {

	int addComment(Comment comment);

	Comment getCommentByOrdersId(int ordersId);

}
