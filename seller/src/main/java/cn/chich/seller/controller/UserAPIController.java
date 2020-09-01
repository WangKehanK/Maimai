package cn.chich.seller.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import cn.chich.seller.bean.User;
import cn.chich.seller.service.UserService;
import cn.chich.seller.util.AesCbcUtil;
import cn.chich.seller.util.HttpRequest;
import net.sf.json.JSONObject;

@RequestMapping("/wx/User")
@Controller
public class UserAPIController {
	@Resource
    private UserService userService;
	String appID="wx1fb7d30e5e81137e";
	String appSecret="3f11329833b809d687e10e686e653fdb";
	/**
	 * 处理登录请求
	 */
    @RequestMapping(value = "/getOpenid")
    @ResponseBody
    public Map getOpenid(String encryptedData, String iv, String code) {
        Map map = new HashMap();
        //登录凭证不能为空
        if (code == null || code.length() == 0) {
            map.put("code", 0);
            map.put("msg", "code 不能为空");
            return map;
        }

        //小程序唯一标识   (在微信小程序管理后台获取)
        String wxspAppid = appID;
        //小程序的 app secret (在微信小程序管理后台获取)
        String wxspSecret = appSecret;
        //授权（必填）
        String grant_type = "authorization_code";
        String grant_type2 = "client_credential";


        //////////////// 1、向微信服务器 使用登录凭证 code 获取 session_key 和 openid ////////////////
        //请求参数
        String params = "appid=" + wxspAppid + "&secret=" + wxspSecret + "&js_code=" + code + "&grant_type=" + grant_type;
        String params2 = "appid=" + wxspAppid + "&secret=" + wxspSecret + "&grant_type=" + grant_type2;
        //发送请求
        String sr = HttpRequest.sendGet("https://api.weixin.qq.com/sns/jscode2session", params);
        String sr2 = HttpRequest.sendGet("https://api.weixin.qq.com/cgi-bin/token", params2);
        //解析相应内容（转换成json对象）
        JSONObject json = JSONObject.fromObject(sr);
        JSONObject json2 = JSONObject.fromObject(sr2);
        //获取会话密钥（session_key）
        String session_key = json.get("session_key").toString();
        String access_token = json2.get("access_token").toString();
        System.out.print(access_token);
        //用户的唯一标识（openid）
        String openid = (String) json.get("openid");

        //////////////// 2、对encryptedData加密数据进行AES解密 ////////////////
        try {
            String result = AesCbcUtil.decrypt(encryptedData, session_key, iv, "UTF-8");
            if (null != result && result.length() > 0) {
                map.put("code", 1);
                map.put("msg", "解密成功");
               

                JSONObject userInfoJSON = JSONObject.fromObject(result);
                User user = new User();
                user.setNickName((String)userInfoJSON.get("nickName"));
                user.setHeadimg((String)userInfoJSON.get("avatarUrl"));
                user.setOpenId((String) userInfoJSON.get("openId"));
                user.setGender((int)userInfoJSON.get("gender"));
                User user1=userService.selectUserByOpenId(user.getOpenId());
                if(user1!=null) {
                	userService.updateUserInfo(user);
                	user.setId(user1.getId());
                }else {
                	userService.addWXUserInfo(user);
                }
                
                Map userInfo = new HashMap();
                userInfo.put("openId", userInfoJSON.get("openId"));
                userInfo.put("nickName", userInfoJSON.get("nickName"));
                userInfo.put("gender", userInfoJSON.get("gender"));
                userInfo.put("city", userInfoJSON.get("city"));
                userInfo.put("province", userInfoJSON.get("province"));
                userInfo.put("country", userInfoJSON.get("country"));
                userInfo.put("avatarUrl", userInfoJSON.get("avatarUrl"));
                userInfo.put("unionId", userInfoJSON.get("unionId"));
                userInfo.put("accessToken",access_token);
                userInfo.put("id",user.getId());
                if(user1!=null) {
                	userInfo.put("qq",user1.getQq());
                	userInfo.put("email",user1.getEmail());
                	userInfo.put("phone",user1.getPhone());
                	userInfo.put("schoolId",user1.getSchoolId());
                	userInfo.put("schoolName",user1.getSchoolName());
                	userInfo.put("deptId",user1.getDeptId());
                	userInfo.put("deptName",user1.getDeptName());
                	userInfo.put("majorId",user1.getMajorId());
                	userInfo.put("majorName",user1.getMajorName());
                	userInfo.put("addr",user1.getAddr());
                	userInfo.put("remark",user1.getRemark());
                	userInfo.put("userName",user1.getUserName());
                	userInfo.put("idNum,",user1.getIdNum());
                	userInfo.put("status,",user1.getStatus());
                }
                map.put("userInfo", userInfo);
                return map;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("code", 0);
        map.put("msg", "解密失败");
        return map;
    }
    @RequestMapping("getUserInfoById")
    @ResponseBody
    public Map getUserInfoById(String id){
    	Map map = new HashMap();
    	User user=userService.getUserById(Integer.parseInt(id));
    	if(user.getFroEndTime()!=null&&System.currentTimeMillis()>user.getFroEndTime().getTime()) {
			//更新用户状态为已认证1011，违规次数=0
			userService.unFrozenUserById(user.getId(),1011);
		}
    	map.put("data", user);
    	map.put("code", 1);
    	return map;
    }
    @RequestMapping("getReportNum")
    @ResponseBody
    public Map getReportNum(int id){
    	Map map = new HashMap();
    	int reportNum=userService.getReportNum(id);
    	map.put("reportNum", reportNum);
    	map.put("code", 1);
    	return map;
    }
    @RequestMapping("editWXUser")
    @ResponseBody
    public Map editWXUser(User user){
    	Map map = new HashMap();
    	int i=userService.editWXUserInfo(user);
    	if(i>0) {
    		User user1=userService.getUser(user.getId());
	    	map.put("userInfo", user1);
	    	map.put("code", 1);
    	}else {
    		map.put("code", 0);
    	}
    	return map;
    }
    @RequestMapping("authCenter")
    @ResponseBody
    public Map authCenter(User user){
    	Map map = new HashMap();
    	int i=userService.authCenter(user);
    	if(i>0) {
    		User user1=userService.getUser(user.getId());
    		map.put("userInfo", user1);
    		map.put("code", 1);
    	}else {
    		map.put("code", 0);
    	}
    	return map;
    }
  //获取当前日期时间的string类型用于文件名防重复
    public String dates(){
         Date currentTime = new Date();
         SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
         String dateString = formatter.format(currentTime);
         return dateString;
    }
    @RequestMapping("uploadUrl")
    @ResponseBody
    public Map uploadPicture(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	Map map=new HashMap<String,Object>();
	//获取从前台传过来得图片
        MultipartHttpServletRequest req =(MultipartHttpServletRequest)request;
        MultipartFile multipartFile =  req.getFile("file");
       	//获取图片的文件类型
        String contentType = multipartFile.getContentType();
         int lastIndex = contentType.lastIndexOf("/");
        System.out.println(contentType.substring((lastIndex+1),contentType.length()));
        System.out.println(multipartFile.getName());
	//根据获取到的文件类型截取出图片后缀
        String type=contentType.substring((lastIndex+1),contentType.length());
        System.out.println(contentType);
 
        String filename;
	// request.getRealPath获取我们项目的根地址在加上我们要保存的地址
        String realPath = request.getSession().getServletContext().getRealPath("/wximg/");
        System.out.println(realPath);
        try {
            File dir = new File(realPath);
			if (!dir.isFile()) { //是目录
	            if (!dir.exists()) { 
	                dir.mkdir();
	            }
            }
            //获取到当前的日期时间用户生成文件名防止文件名重复
            String filedata=this.dates();

	    //生成一个随机数来防止文件名重复
            int x=(int)(Math.random()*1000);
            filename="renzheng"+filedata+x;
	    //将文件的地址和生成的文件名拼在一起.
            File file  =  new File(realPath,filename+"."+type);
            if(!file.getParentFile().exists()){
				file.getParentFile().createNewFile();
			}
            multipartFile.transferTo(file);
            map.put("code", 1);
            map.put("data", "/wximg/"+filename+"."+type);

        } catch (IOException e) {
            e.printStackTrace();
        } catch (IllegalStateException e) {
            e.printStackTrace();
        }
        return map;
    }
}
