//数据接口

// var api = "http://localhost:8080/seller";
// var imgHost = "http://localhost:8080/seller";
var api = "http://ec2-13-59-78-67.us-east-2.compute.amazonaws.com";
var imgHost = "http://ec2-13-59-78-67.us-east-2.compute.amazonaws.com";
var config = {
  imgHost,
  loginUrl: `${api}/wx/User/getOpenid.action`,  //登录接口
  getUserInfoById: `${api}/wx/User/getUserInfoById.action`,  //获取用户信息接口
  editWXUser: `${api}/wx/User/editWXUser.action`, //修改用户基本信息接口
  authCenter: `${api}/wx/User/authCenter.action`, //认证中心提交接口
  getReportNum: `${api}/wx/User/getReportNum.action`, //获取用户违规次数
  uploadUrl: `${api}/wx/User/uploadUrl.action`, //上传图片
  delImgurl: `${api}/wx/User/delImgurl.action`,  //删除图片
  getMajorData: `${api}/wx/Major/getMajorData.action`,  //获取学校、院系、专业接口
  goodsTypeList: `${api}/wx/GoodsType/goodsTypeList.action`, //获取所有商品类型列表
  getAllSchool: `${api}/wx/School/getAllSchool.action`,  //获取学校、院系、专业接口
//出售商品
  getAllGoodsUrl: `${api}/wx/Goods/getAllGoodsUrl.action`, //获取所有出售商品列表
  addGoodUrl: `${api}/wx/Goods/addGoodUrl.action`,   //发布商品出售信息
  getGoodDetail: `${api}/wx/Goods/getGoodDetail.action`,   //商品出售信息详情
  selectGoodsByGoodsTitle: `${api}/wx/Goods/selectGoodsByGoodsTitle.action`, //搜索商品
  getGoodTypeList: `${api}/wx/Goods/getGoodTypeList.action`, //根据分类拿相关商品
  getGoodsListByUserId: `${api}/wx/Goods/getGoodsListByUserId.action`, //查看该用户所有商品
  updateGoodStatus: `${api}/wx/Goods/updateGoodStatus.action`, //商品上架、下架
  editGood: `${api}/wx/Goods/editGood.action`,   //修改商品出售信息
//求购商品
  getAllWantUrl: `${api}/wx/Want/getAllWantUrl.action`, //获取所有求购商品列表
  addWantUrl: `${api}/wx/Want/addWantUrl.action`,   //发布商品求购信息
  getWantDetail: `${api}/wx/Want/getWantDetail.action`,   //商品求购信息详情
  getWantListByUserId: `${api}/wx/Want/getWantListByUserId.action`, //查看该用户所有商品
  selectWantByWantTitle: `${api}/wx/Want/selectWantByWantTitle.action`, //搜索求购商品
  updateWantStatus: `${api}/wx/Want/updateWantStatus.action`, //商品上架、下架
  editWant: `${api}/wx/Want/editWant.action`,   //修改商品求购信息
// 收藏
  getCollectList: `${api}/wx/Collect/getCollectList.action`,   //收藏列表
  getCollectWantList: `${api}/wx/Collect/getCollectWantList.action`,   //收藏列表
  addUserCollect: `${api}/wx/Collect/addUserCollect.action`,   //收藏列表
  deleteUserCollect: `${api}/wx/Collect/deleteUserCollect.action`,   //取消收藏
//订单
  getUserOrdersList: `${api}/wx/Orders/getUserOrdersList.action`,//我买到的
  getUserSaleOrdersList: `${api}/wx/Orders/getUserSaleOrdersList.action`,//我卖出的
  saveOrders: `${api}/wx/Orders/saveOrders.action`,
  updateOrderStatus: `${api}/wx/Orders/updateOrderStatus.action`,
  transComp: `${api}/wx/Orders/transComp.action`,
  //评价
  addComment: `${api}/wx/Comment/addComment.action`,
  getCommentByOrdersId: `${api}/wx/Comment/getCommentByOrdersId.action`,
  //投诉
  addReport: `${api}/wx/Report/addReport.action`,
};

module.exports = config;