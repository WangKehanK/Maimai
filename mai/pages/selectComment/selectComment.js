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
    ordersId:0,
    commentInfo:null
  },
  //获取订单详情
  getComment(id) {
    const that = this;
    let token = wx.getStorageSync('token');
    if (token) {
      wx.showLoading({
        title: '拼命加载中...',
        icon: 'loading',
        mask: true
      })
      app.requestFun(
        app.globalData.apiConfig.getCommentByOrdersId,
        'GET',
        {
          'ordersId': id
        },
        function (res) {
          
          if (res.statusCode == 200) {
            wx.hideLoading();
            
            var imgArr = [];
            res.data.commentTime = util.formatDate(res.data.commentTime);
            for (var j = 0; j < res.data.goodsImgs.split(",").length; j++) {
              imgArr.push(res.data.goodsImgs.split(",")[j])
            }
            res.data.goodsImgs = imgArr;
            that.setData({
              'one_1': res.data.starNum,//黄星星数量
              'two_1': 5 - res.data.starNum,//灰星星数量
              commentInfo: res.data
            })
            
          }
        }
      )
    } else {

    }
  },

  onLoad: function (options) {
    this.getComment(options.id);
    
    this.setData({
      'imgHost': app.globalData.apiConfig.imgHost,
      'userInfo': {
        'userId': wx.getStorageSync('mid'),
        'nickName': wx.getStorageSync('nickName'),
        'avatarUrl': wx.getStorageSync('avatarUrl')
      }
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
  toOrderDetail: function () {
    wx.navigateTo({
      url: '../order_detail/order_details'
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