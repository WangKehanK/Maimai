package cn.chich.seller.dao;

import java.util.List;
import java.util.Map;

public interface BaseCodeDao {

	List<Map<String, Object>> getBaseCodeOpt(String typeNo);

}
