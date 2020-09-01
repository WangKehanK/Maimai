package cn.chich.seller.bean;

import java.util.Date;

public class Collect {
	private int id;
	private int userId;
	private int invitationId;
	private String invitationType;
	private Date collectTime;
	private String goodsNo;
	private String goodsTitle;
	private String goodsDesc;
	private String goodsImgs;
	private Double goodsPrice;
	private Double goodsMinPrice;
	private Double goodsMaxPrice;
	private String statusName;
	private int status;
	private int goodsType;
	private String goodsTypeName;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getInvitationId() {
		return invitationId;
	}
	public void setInvitationId(int invitationId) {
		this.invitationId = invitationId;
	}
	public int getGoodsType() {
		return goodsType;
	}
	public void setGoodsType(int goodsType) {
		this.goodsType = goodsType;
	}
	public String getGoodsTypeName() {
		return goodsTypeName;
	}
	public void setGoodsTypeName(String goodsTypeName) {
		this.goodsTypeName = goodsTypeName;
	}
	public String getInvitationType() {
		return invitationType;
	}
	public Double getGoodsMinPrice() {
		return goodsMinPrice;
	}
	public void setGoodsMinPrice(Double goodsMinPrice) {
		this.goodsMinPrice = goodsMinPrice;
	}
	public Double getGoodsMaxPrice() {
		return goodsMaxPrice;
	}
	public void setGoodsMaxPrice(Double goodsMaxPrice) {
		this.goodsMaxPrice = goodsMaxPrice;
	}
	public void setInvitationType(String invitationType) {
		this.invitationType = invitationType;
	}
	public String getGoodsNo() {
		return goodsNo;
	}
	public void setGoodsNo(String goodsNo) {
		this.goodsNo = goodsNo;
	}
	public String getGoodsTitle() {
		return goodsTitle;
	}
	public void setGoodsTitle(String goodsTitle) {
		this.goodsTitle = goodsTitle;
	}
	public String getGoodsDesc() {
		return goodsDesc;
	}
	public void setGoodsDesc(String goodsDesc) {
		this.goodsDesc = goodsDesc;
	}
	public String getGoodsImgs() {
		return goodsImgs;
	}
	public void setGoodsImgs(String goodsImgs) {
		this.goodsImgs = goodsImgs;
	}
	public Double getGoodsPrice() {
		return goodsPrice;
	}
	public void setGoodsPrice(Double goodsPrice) {
		this.goodsPrice = goodsPrice;
	}
	public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	public Date getCollectTime() {
		return collectTime;
	}
	public void setCollectTime(Date collectTime) {
		this.collectTime = collectTime;
	}
	
	
	

	
}
