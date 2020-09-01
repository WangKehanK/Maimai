package cn.chich.seller.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class User {
    private int id;
    private String openId;
    private String userName;
    private String nickName;
    private String phone;
    private String pwd;
    private String addr;
    private String qq;
    private String email;
    private String headimg;
    private int schoolId;
    private String schoolName;
	private int deptId;
    private String deptName;
    private int majorId;
    private String majorName;
    //性别(0男1女)
    private int gender;
    private String genderName;
    //状态（1：未认证；2：已认证；3：已冻结）
    private int status;
    private String isShow;
    private String statusName;
    //违规次数
    private int reportNum;
    private String idNum;
    //信誉值
    private int creditVal;
    private Date createTime;
    private Date froTime;
    private Date froEndTime;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date lastLoginTime;
    private String remark;
    private String idCardImg;
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getIsShow() {
		return isShow;
	}
	public void setIsShow(String isShow) {
		this.isShow = isShow;
	}
	public int getCreditVal() {
		return creditVal;
	}
	public void setCreditVal(int creditVal) {
		this.creditVal = creditVal;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOpenId() {
		return openId;
	}
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public String getMajorName() {
		return majorName;
	}
	public void setMajorName(String majorName) {
		this.majorName = majorName;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getGenderName() {
		return genderName;
	}
	public void setGenderName(String genderName) {
		this.genderName = genderName;
	}
	public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getNickName() {
		return nickName;
	}
	public String getAddr() {
		return addr;
	}
	public String getQq() {
		return qq;
	}
	public String getEmail() {
		return email;
	}
	public String getHeadimg() {
		return headimg;
	}
	public int getSchoolId() {
		return schoolId;
	}
    public String getSchoolName() {
		return schoolName;
	}
	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}
	public int getDeptId() {
		return deptId;
	}
	public int getMajorId() {
		return majorId;
	}
	public int getGender() {
		return gender;
	}
	public int getStatus() {
		return status;
	}
	public int getReportNum() {
		return reportNum;
	}
	public Date getLastLoginTime() {
		return lastLoginTime;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setHeadimg(String headimg) {
		this.headimg = headimg;
	}
	public void setSchoolId(int schoolId) {
		this.schoolId = schoolId;
	}
	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}
	public void setMajorId(int majorId) {
		this.majorId = majorId;
	}
	public void setGender(int gender) {
		this.gender = gender;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public void setReportNum(int reportNum) {
		this.reportNum = reportNum;
	}
	public Date getFroTime() {
		return froTime;
	}
	public void setFroTime(Date froTime) {
		this.froTime = froTime;
	}
	public void setLastLoginTime(Date lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}
	public String getIdNum() {
		return idNum;
	}
	public void setIdNum(String idNum) {
		this.idNum = idNum;
	}
	public String getIdCardImg() {
		return idCardImg;
	}
	public void setIdCardImg(String idCardImg) {
		this.idCardImg = idCardImg;
	}
	public Date getFroEndTime() {
		return froEndTime;
	}
	public void setFroEndTime(Date froEndTime) {
		this.froEndTime = froEndTime;
	}
    
}