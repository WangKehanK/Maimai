package cn.chich.seller.interceptor;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class LoginHandlerIntercepter implements HandlerInterceptor {
	 
	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// 页面渲染完成之后执行		
	}
 
	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		// 目标方法后	
	}
 
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) throws Exception {
		
 		HttpSession session = request.getSession();
 		String uri = request.getRequestURI(); 
 		//uri.indexOf("xxx")返回的是xxx在URI中存在的位置，-1表示请求中没有xxx
		if(session.getAttribute("user")!=null || uri.indexOf("login")!=-1|| uri.indexOf("wx")!=-1) {// 说明登录成功 或者 执行登录功能不拦截
		
			return true;
			
		}else {
			//如果是ajax请求响应头会有x-requested-with  
	        if (request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")){ 
	            PrintWriter out = response.getWriter();  
	            out.print("sessionTimeout");//session失效
	            out.flush();
	        }
	        System.out.println("拦截成功");
	        return false;
		}
	}
}