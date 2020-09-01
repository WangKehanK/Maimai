package cn.chich.seller.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;


import cn.chich.seller.bean.User;
import cn.chich.seller.dao.UserDao;
import cn.chich.seller.service.UserService;


@Service("UserService")
public class UserServiceImpl implements UserService {
	@Resource
	private UserDao userDao;
	@Override
	public User login(String userName, String pwd) {
		return userDao.login(userName, pwd);
	}

	@Override
	public List<Map<String,Object>> initChart1() {
		return userDao.initChart1();
	}
	
	@Override
	public List<Map<String,Object>> initChart2() {
		return userDao.initChart2();
	}
	
	@Override
	public List<Map<String,Object>> initChart3() {
		return userDao.initChart3();
	}
	
	@Override
	public List<Map<String,Object>> initChart4() {
		return userDao.initChart4();
	}

	@Override
	public List<Map<String, Object>> initChart5() {
		return userDao.initChart5();
	}
	
	@Override
	public List<Map<String, Object>> initChart6() {
		return userDao.initChart6();
	}

	@Override
	public int editUserInfo(User user) {
		return userDao.editUserInfo(user);
	}

	@Override
	public User getUser(int userId) {
		
		return userDao.getUser(userId);
	}

	@Override
	public List<User> getAllUser() {
	  List<User> usersList =this.userDao.getAllUser();
	  return usersList;
	}
	
	@Override
	public User getUserById(int id) {
		User stuInfo =this.userDao.getUserById(id);
        return stuInfo;  
	}

	@Override
	public int modifyUserInfo(User user) {
		return userDao.modifyUserInfo(user);
	}

	@Override
	public List<User> selectUser(String nickName) {
		return userDao.selectUser(nickName);
	}

	@Override
	public int frozenUserById(int id,int status) {
		return userDao.frozenUserById(id,status);
	}

	@Override
	public List<User> selectVioUserById(int id) {
		return userDao.selectVioUserById(id);
	}

	@Override
	public int unFrozenUserById(int id, int status) {
		return userDao.unFrozenUserById(id,status);
	}

	@Override
	public int updateUserInfo(User user) {
		return userDao.updateUserInfo(user);
	}

	@Override
	public User selectUserByOpenId(String openId) {
		return userDao.selectUserByOpenId(openId);
	}

	@Override
	public int addUserInfo(User user) {
		return userDao.addUserInfo(user);
	}
	
	@Override
	public int addWXUserInfo(User user) {
		return userDao.addWXUserInfo(user);
	}

	@Override
	public int editWXUserInfo(User user) {
		return userDao.editWXUserInfo(user);
	}

	@Override
	public int authCenter(User user) {
		return userDao.authCenter(user);
	}

	@Override
	public int getReportNum(int id) {
		return userDao.getReportNum(id);
	}

	@Override
	public int updataUserReportNum(int userId) {
		return userDao.updataUserReportNum(userId);
	}

	@Override
	public int updateUserCreditVal(int userId, int starNum) {
		return userDao.updateUserCreditVal(userId,starNum);
	}

	@Override
	public int getStatusById(int id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int changePwd(String userName, String pwd) {
		// TODO Auto-generated method stub
		return userDao.changePwd(userName,pwd);
	}

}

