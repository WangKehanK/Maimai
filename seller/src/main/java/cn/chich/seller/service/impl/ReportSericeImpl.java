package cn.chich.seller.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.chich.seller.bean.Report;
import cn.chich.seller.dao.ReportDao;
import cn.chich.seller.service.ReportService;
@Service("ReportService")
public class ReportSericeImpl implements ReportService {

	@Resource
	private ReportDao reportDao;
	@Override
	public List<Report> reportList() {
		return reportDao.reportList();
	}
	@Override
	public List<Report> selectReports(String goodsNo) {
		return reportDao.selectReports(goodsNo);
	}
	@Override
	public int handleReports(int id, int status) {
		return reportDao.handleReports(id, status);
	}
	@Override
	public int addReport(Report report) {
		return reportDao.addReport(report);
	}

}
