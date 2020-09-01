package cn.chich.seller.service;

import java.util.List;

import cn.chich.seller.bean.Report;

public interface ReportService {

	List<Report> reportList();

	List<Report> selectReports(String goodsNo);

	int handleReports(int id, int status);

	int addReport(Report report);

}
