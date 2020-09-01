package cn.chich.seller.controller;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
 
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
 
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
 
import cn.chich.seller.dao.PictureDao;
 
@Controller
@RequestMapping("/layuis")
public class LayUploadController {
	@Resource
	private PictureDao pictureDao;
//	@Resource
	
	
	@RequestMapping("/f")
	public String s(HttpServletRequest request){

		return "/layuiUpload";
		
	}
	@ResponseBody
	@RequestMapping(value="/upload",method=RequestMethod.POST)
	public Map<String,Object> upString(HttpServletRequest request) throws Exception{
		Map<String,Object> resultMap=new HashMap<String, Object>();
		Map<String,Object> Map=new HashMap<String, Object>();
		
		
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();//文件集合
		
			
		
//			if(!file.isEmpty()){
				//上传文件路径
				String path=request.getSession().getServletContext().getRealPath("/imag");
				System.err.println(path);
				// 检查目录
				File uploadDir = new File(path);
				if (!uploadDir.isDirectory()) {
					// 如果不存在，创建文件夹
					if (!uploadDir.exists()) {
						uploadDir.mkdirs();
					}
				}
				
				for (Map.Entry<String, MultipartFile> entity : fileMap.entrySet()) {
					SimpleDateFormat df2 = new SimpleDateFormat("yyyyMMddHHmmss");
					String date=df2.format(new Date());
					/*System.err.println(date+"当前时间");*/
					MultipartFile file2=entity.getValue();
					String filename=file2.getOriginalFilename();
				
					File filepath=new File(path,filename);
				//判断路径是否存在，如果不存在就创建一个
					if(!filepath.getParentFile().exists()){
						filepath.getParentFile().mkdirs();
					}
				
				
				//重命名
				// 扩展名
				String fileExt = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();//扩展名
				Date date2=df2.parse(date);
				//新的文件名
				String newFileName=date+"_"+new Random().nextInt(100)+"."+fileExt;
				/*System.err.println("新文件名："+newFileName);*/
				//request.getContextPath()
				//保存的路径
				String Savepath="/imag/"+newFileName;
				/*System.out.println("存储路径"+Savepath);*/
		
				pictureDao.insertPicture(date2,newFileName,Savepath);
				//将上传的文件保存到目标文件中
				file2.transferTo(new File(path+File.separator+newFileName));
				/*System.out.println(path+File.separator+filename);*/
				
				resultMap.put("code",0);
				resultMap.put("msg","success");
				Map.put("src",path);
				resultMap.put("data",Map);
			}
			return resultMap;
		}
	}