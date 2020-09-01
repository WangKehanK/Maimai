package cn.chich.seller.bean;

import java.util.Date;

public class Comment {
	
	private int id;
	private int ordersId;
	private int commentUserId;
	private String commentContent;
	private String commentUserName;
	private String goodsTitle;
	private String goodsImgs;
	private String ordersNo;
	private String headimg;
	private String commentHeadimg;
	private String nickName;
	private int userId;
	private int starNum;	
	private Date commentTime;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getStarNum() {
		return starNum;
	}
	public void setStarNum(int starNum) {
		this.starNum = starNum;
	}
	public int getOrdersId() {
		return ordersId;
	}
	public String getHeadimg() {
		return headimg;
	}
	public void setHeadimg(String headimg) {
		this.headimg = headimg;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public int getCommentUserId() {
		return commentUserId;
	}
	public void setCommentUserId(int commentUserId) {
		this.commentUserId = commentUserId;
	}
	public String getCommentUserName() {
		return commentUserName;
	}
	public void setCommentUserName(String commentUserName) {
		this.commentUserName = commentUserName;
	}
	public String getCommentHeadimg() {
		return commentHeadimg;
	}
	public void setCommentHeadimg(String commentHeadimg) {
		this.commentHeadimg = commentHeadimg;
	}
	public void setOrdersId(int ordersId) {
		this.ordersId = ordersId;
	}
	public String getGoodsTitle() {
		return goodsTitle;
	}
	public void setGoodsTitle(String goodsTitle) {
		this.goodsTitle = goodsTitle;
	}
	public String getGoodsImgs() {
		return goodsImgs;
	}
	public void setGoodsImgs(String goodsImgs) {
		this.goodsImgs = goodsImgs;
	}
	public String getOrdersNo() {
		return ordersNo;
	}
	public void setOrdersNo(String ordersNo) {
		this.ordersNo = ordersNo;
	}
	public String getCommentContent() {
		return commentContent;
	}
	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public Date getCommentTime() {
		return commentTime;
	}
	public void setCommentTime(Date commentTime) {
		this.commentTime = commentTime;
	}
	 
	  
}
