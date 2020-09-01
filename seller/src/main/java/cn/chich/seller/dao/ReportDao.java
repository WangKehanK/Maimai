package cn.chich.seller.dao;

import java.util.List;

import cn.chich.seller.bean.Report;

public interface ReportDao {

	List<Report> reportList();

	List<Report> selectReports(String goodsNo);

	int handleReports(int id, int status);

	int addReport(Report report);

}
