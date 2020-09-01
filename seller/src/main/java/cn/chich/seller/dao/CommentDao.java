package cn.chich.seller.dao;

import cn.chich.seller.bean.Comment;

public interface CommentDao {

	int addComment(Comment comment);

	Comment getCommentByOrdersId(int ordersId);


}
