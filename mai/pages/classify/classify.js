// pages/classify/classify.js
// const getTieziCateUrl = require('../../config').getTieziCateUrl;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postCate:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //跳转至分类商品列表页
  goList: function (e){
    var _id=e.currentTarget.dataset.id;
    var _name=e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../cateGoodList/cateGoodList?cateid='+_id+'&name='+_name
    })
  },
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '正在获取中...',
      icon: 'loading',
      mask: true
    })
    app.requestFun(
      app.globalData.apiConfig.goodsTypeList,
      'GET',
      {
      },
      function(res){
        wx.hideLoading();
        if (res.statusCode==200){
          that.setData({
            'postCate': res.data
          })
        }else{
          wx.showToast({
            title: '获取帖子分类失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})