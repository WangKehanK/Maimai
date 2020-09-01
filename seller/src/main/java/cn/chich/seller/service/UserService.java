package cn.chich.seller.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import cn.chich.seller.bean.User;
import cn.chich.seller.bean.User;

public interface UserService {
	public User login(String userName, String pwd);

	public List<Map<String, Object>> initChart1();
	
	public List<Map<String, Object>> initChart2();
	
	public List<Map<String, Object>> initChart3();
	
	public List<Map<String, Object>> initChart4();
	
	public List<Map<String, Object>> initChart5();
	
	public List<Map<String, Object>> initChart6();

	public int editUserInfo(User user);

	public User getUser(int userId);

	public int changePwd(String userName,String pwd);
	
	public List<User> getAllUser();
	 
	public User getUserById(int id);
	
	public int getStatusById(int id);

	public int modifyUserInfo(User user);

	public List<User> selectUser(String nickName);

	public int frozenUserById(int id, int status);

	public List<User> selectVioUserById(int id);

	public int unFrozenUserById(int id, int status);

	public int updateUserInfo(User user);

	public User selectUserByOpenId(String openId);

	public int addUserInfo(User user);

	public int addWXUserInfo(User user);

	public int editWXUserInfo(User user);

	public int authCenter(User user);

	public int getReportNum(int id);

	public int updataUserReportNum(int userId);

	public int updateUserCreditVal(int userId, int starNum);

}
