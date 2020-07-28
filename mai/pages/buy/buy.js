// pages/buy/buy.js
const app = getApp()
const imgHost = require('../../config').imgHost;
var util = require('../../util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgHost: '',
    ordersList: []
  },
  //获取该用户订单列表
  getUserOrdersList() {
    const that = this;
    let token = wx.getStorageSync('token');
    if (token) {
      wx.showLoading({
        title: '拼命加载中...',
        icon: 'loading',
        mask: true
      })
      app.requestFun(
        app.globalData.apiConfig.getUserOrdersList,
        'GET',
        {
          'userId': wx.getStorageSync('mid')
        },
        function (res) {
          if (res.statusCode == 200) {
            wx.hideLoading();
            for (var i = 0; i < res.data.length; i++) {
              var imgArr = [];
              res.data[i].createTime = util.formatDate(res.data[i].createTime);
              for (var j = 0; j < res.data[i].goodsImgs.split(",").length; j++) {
                imgArr.push(res.data[i].goodsImgs.split(",")[j])
              }
              res.data[i].goodsImgs = imgArr;
            }
            that.setData({
              ordersList: res.data
            })
          }
        }
      )
    }
  },
  //交易完成
  transComp(e){
    const that = this;
    var _id = e.currentTarget.dataset.id;
    var _goodsId = e.currentTarget.dataset.goodsid;
    var _flag = e.currentTarget.dataset.flag;//交易完成/交易取消
    let token = wx.getStorageSync('token');
    if (token) {
      wx.showLoading({
        title: '拼命加载中...',
        icon: 'loading',
        mask: true
      })
      app.requestFun(
        app.globalData.apiConfig.transComp,
        'GET',
        {
          'orderId': _id,
          'goodsId': _goodsId,
          'flag': _flag
        },
        function (res) {
          if (res.statusCode == 200) {
            wx.hideLoading();
            that.getUserOrdersList();
          }
        }
      )
    }
  },
  //立即评价
  goComment(e) {
    const that = this;
    var _id = e.currentTarget.dataset.id;
    var _saleUserId = e.currentTarget.dataset.saleuserid;
    wx.navigateTo({
      url: '../comment/comment?id=' + _id + '&saleUserId=' + _saleUserId
    })
  },
  //查看评价
  selectComment(e) {
    const that = this;
    var _id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../selectComment/selectComment?id=' + _id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserOrdersList();
    this.setData({
      'imgHost': app.globalData.apiConfig.imgHost
    })
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
  toOrderDetail: function (e) {
    var _id = e.currentTarget.dataset.goodsid;
    var _userId = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '../goodDetail/goodDetail?id=' + _id + '&userId=' + _userId
    })
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