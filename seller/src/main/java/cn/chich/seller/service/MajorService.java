package cn.chich.seller.service;

import java.util.List;
import java.util.Map;

import cn.chich.seller.bean.Major;

public interface MajorService {

	List<Major> getMajorOpt(int deptId);

	List<Major> getAllMajor();

}
