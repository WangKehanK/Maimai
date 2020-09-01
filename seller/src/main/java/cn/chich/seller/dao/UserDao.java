package cn.chich.seller.dao;
import java.util.Date;
import java.util.List;
import java.util.Map;

import cn.chich.seller.bean.User;

public interface UserDao {
	User login(String userName, String pwd);

	List<Map<String, Object>> initChart1();

	List<Map<String, Object>> initChart2();

	List<Map<String, Object>> initChart3();

	List<Map<String, Object>> initChart4();
	
	List<Map<String, Object>> initChart5();
	
	List<Map<String, Object>> initChart6();

	int editUserInfo(User user);

	User getUser(int userId);

	int changePwd(String userName, String pwd);
	
	List<User> getAllUser();

	User getUserById(int id);

	int modifyUserInfo(User user);

	List<User> selectUser(String nickName);

	int frozenUserById(int id, int status);

	List<User> selectVioUserById(int id);

	int unFrozenUserById(int id, int status);

	int updateUserInfo(User user);

	User selectUserByOpenId(String openId);

	int addUserInfo(User user);

	int addWXUserInfo(User user);

	int editWXUserInfo(User user);

	int authCenter(User user);

	int getReportNum(int id);

	int updataUserReportNum(int userId);

	int updateUserCreditVal(int userId, int starNum);

}
