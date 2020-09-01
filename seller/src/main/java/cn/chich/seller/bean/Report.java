package cn.chich.seller.bean;

import java.util.Date;

public class Report {
	private int id;
	private int goodsId;
	private String goodsNo;
	//投诉者Id
	private int reportId;
	private String reportName;
	//违规者Id
	private int violatorId;
	private String violatorName;
	private String reportContent;
	private Date createTime;
	private int status;
	private String statusName;
	private String reportNum;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getGoodsId() {
		return goodsId;
	}
	public void setGoodsId(int goodsId) {
		this.goodsId = goodsId;
	}
	public String getGoodsNo() {
		return goodsNo;
	}
	public void setGoodsNo(String goodsNo) {
		this.goodsNo = goodsNo;
	}
	public int getReportId() {
		return reportId;
	}
	public void setReportId(int reportId) {
		this.reportId = reportId;
	}
	public String getReportNum() {
		return reportNum;
	}
	public void setReportNum(String reportNum) {
		this.reportNum = reportNum;
	}
	public String getReportName() {
		return reportName;
	}
	public void setReportName(String reportName) {
		this.reportName = reportName;
	}
	public int getViolatorId() {
		return violatorId;
	}
	public void setViolatorId(int violatorId) {
		this.violatorId = violatorId;
	}
	public String getViolatorName() {
		return violatorName;
	}
	public void setViolatorName(String violatorName) {
		this.violatorName = violatorName;
	}
	public String getReportContent() {
		return reportContent;
	}
	public void setReportContent(String reportContent) {
		this.reportContent = reportContent;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	
}
