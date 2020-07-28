// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    isPullDownRefresh:false  //判断是否正在下拉刷新
  },
  //获取该用户发布的商品列表
  showUser(){
    const that=this;
    let token = wx.getStorageSync('token');
    let userInfo = {
      'nickName':wx.getStorageSync('nickName'),
      'avatarUrl':wx.getStorageSync('avatarUrl'),
      'status': wx.getStorageSync('status')
    };
    that.setData({
      userInfo: userInfo
    })
    if(token){
      if(that.data.isPullDownRefresh){
        wx.showLoading({
          title: '拼命加载中...',
          icon: 'loading',
          mask: true,
          duration: 2000
        })
      }
      app.requestFun(
        app.globalData.apiConfig.getUserInfoById,
        'GET',
        {
          'id': wx.getStorageSync('mid')
        },
        function (res) {
          if (!that.data.isPullDownRefresh) {
            //初步加载
            wx.hideLoading();
          } else {
            //下拉刷新
            that.setData({
              'isPullDownRefresh': false
            })
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }
          if (res.statusCode == 200) {
            wx.hideLoading();
            if (res.data.code == 1) {
              res.data.data.avatarUrl = res.data.data.headimg;
              that.setData({
                userInfo: res.data.data
              })
            }
          }
        }
      )
    }else{
      wx.reLaunch({
        url: "/pages/login/login"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.showUser();
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
    if(app.globalData.isMeRefresh){
      var that = this;
      that.showUser();
      app.globalData.isMeRefresh=false;
    }
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

  //下拉刷新
  onPullDownRefresh:function(){
    console.log('下拉刷新');
    var that = this;
    that.setData({
      'isPullDownRefresh': true
    })
    that.showUser();
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