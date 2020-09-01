package cn.chich.seller.controller;

import java.io.File;
import java.nio.file.Path;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.DefaultFileItemFactory;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUpload;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import cn.chich.seller.bean.User;
import cn.chich.seller.service.UserService;

@Controller
public class UserController {
	@Resource
	private UserService userService;

	/**
	 * 处理登录请求
	 */
	@RequestMapping("/login")
	@ResponseBody
	public Map login(String userName, String pwd, HttpSession session) {
		User user = userService.login(userName, pwd);
		Map<String, Object> map = new HashMap<String, Object>();
		if (user != null) {
			// 登录成功，将user对象设置到HttpSession作用范围域中
			session.setAttribute("user", user);
			map.put("success", true);
		} else {
			map.put("success", false);

		}
		return map;
	}

	/**
	 * 编辑用户信息
	 * 
	 * @param user
	 * @param session
	 * @return
	 */
	@RequestMapping("/editUserInfo")
	@ResponseBody
	public Map editUserInfo(User user, HttpSession session) {
		Map<String, Object> map = new HashMap<String, Object>();
		int i = userService.editUserInfo(user);
		if (i > 0) {
			User user1 = userService.getUser(user.getId());
			session.setAttribute("user", user1);
			map.put("success", true);
		} else
			map.put("success", false);
		return map;
	}

	@ResponseBody
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public Map<String, Object> upString(HttpSession session,MultipartFile file) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		String filename = file.getOriginalFilename();
		String type = filename.substring(filename.lastIndexOf(".")+1).toLowerCase();
		SimpleDateFormat df2 = new SimpleDateFormat("yyyyMMddHHmmss");
		String date = df2.format(new Date());
		String newFileName = date + "_" + new Random().nextInt(100) + "." + type;
		String savepath = "/imag/" + newFileName;
		String path = session.getServletContext().getRealPath("/imag")+"\\"+newFileName;
		file.transferTo(new File(path));
		resultMap.put("code", 0);
		resultMap.put("msg", "success");
		resultMap.put("src", savepath);
	
		return resultMap;
	}

	@RequestMapping("/changePwd")
	@ResponseBody
	public Map changePwd(String pwd,String userName, HttpSession session) {
		Map<String, Object> map = new HashMap<String, Object>();
		int i = userService.changePwd(userName,pwd);
		if (i > 0)
			map.put("success", true);
		else
			map.put("success", false);
		return map;
	}

	@RequestMapping("/initChart1")
	@ResponseBody
	public List<Map<String, Object>> initChart1() {
		List<Map<String, Object>> initChartMap = userService.initChart1();
		return initChartMap;
	}

	@RequestMapping("/initChart2")
	@ResponseBody
	public List<Map<String, Object>> initChart2() {
		List<Map<String, Object>> initChartMap = userService.initChart2();
		return initChartMap;
	}

	@RequestMapping("/initChart3")
	@ResponseBody
	public List<Map<String, Object>> initChart3() {
		List<Map<String, Object>> initChartMap = userService.initChart3();
		return initChartMap;
	}

	@RequestMapping("/initChart4")
	@ResponseBody
	public List<Map<String, Object>> initChart4() {
		List<Map<String, Object>> initChartMap = userService.initChart4();
		return initChartMap;
	}

	@RequestMapping("/initChart5")
	@ResponseBody
	public List<Map<String, Object>> initChart5() {
		List<Map<String, Object>> initChartMap = userService.initChart5();
		return initChartMap;
	}

	@RequestMapping("/initChart6")
	@ResponseBody
	public List<Map<String, Object>> initChart6() {
		List<Map<String, Object>> initChartMap = userService.initChart6();
		return initChartMap;
	}

	@RequestMapping("usersList")
	@ResponseBody
	public List<User> usersList() {
		List<User> list = new ArrayList<User>();
		list = userService.getAllUser();
		for (User u : list) {
			if (u.getFroEndTime() != null && System.currentTimeMillis() > u.getFroEndTime().getTime()) {
				// 更新用户状态为已认证1011，违规次数=0
				userService.unFrozenUserById(u.getId(), 1011);
			}
		}
		return list;
	}

	@RequestMapping("getUserById")
	public ModelAndView getUserById(HttpServletRequest request, String id) {
		ModelAndView mav = new ModelAndView();
		User user = userService.getUserById(Integer.parseInt(id));
		mav.addObject("user1", user);
		mav.setViewName("/page/user/editUser");
		return mav;
	}

	@RequestMapping("selectVioUserById")
	@ResponseBody
	public List<User> selectVioUserById(String id) {
		List<User> list = userService.selectVioUserById(Integer.parseInt(id));
		return list;
	}

	@RequestMapping("modifyUserInfo")
	@ResponseBody
	public Map modifyUserInfo(HttpServletRequest request, User user) {
		Map<String, Object> map = new HashMap<String, Object>();
		int i = userService.modifyUserInfo(user);
		if (i > 0) {
			map.put("success", true);
		} else {
			map.put("success", false);
		}
		return map;
	}

	@RequestMapping("selectUser")
	@ResponseBody
	public List<User> selectUser(String nickName) {
		List<User> userList = userService.selectUser(nickName);
		return userList;
	}

	/**
	 * 冻结
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("frozenUserById")
	@ResponseBody
	public Map frozenUserById(int id, int status) {
		Map<String, Object> map = new HashMap<String, Object>();
		int i = 0;
		if (status == 1012) {// 冻结
			i = userService.frozenUserById(id, status);
		} else {
			i = userService.unFrozenUserById(id, status);
		}
		if (i > 0)
			map.put("success", true);
		else
			map.put("success", false);
		return map;
	}

}