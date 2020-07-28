// pages/me/me.js
const app = getApp()
// const getUserGood = require('../../config').getUserGood; 
// const delGood = require('../../config').delGood; 
// const updateGood = require('../../config').updateGood; 
Page({

  /**
   * 页面的初始数据

   */
  data: {
    email:'',
    qq:'',
    phone:'',
    addr:'',
    remark:'',
    userInfo: null,
    isPullDownRefresh: false,  //判断是否正在下拉刷新
    majorIndex: [0, 0, 0],
    majorArray: [ [],[],[] ],
    pickerArry:[]
  },
  //获取该用户信息
  getUserInfoById() {
    const that = this;
    let token = wx.getStorageSync('token');
    if (token) {
      if (!that.data.isPullDownRefresh) {
        wx.showLoading({
          title: '拼命加载中...',
          icon: 'loading',
          mask: true
        })
      } else {
        wx.showNavigationBarLoading(); //在标题栏中显示加载
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
    } else {
      wx.reLaunch({
        url: "/pages/login/login"
      })
    }
  },
  formSubmit: function (e) {
    var that=this;
    let { email, qq, phone, addr,remark} = e.detail.value;
    if (!email || !qq || !phone || !addr) {
      wx.showToast({
        title: '必填项不得为空',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    var user={};
    user.id = that.data.userInfo.id;
    user.email = email;
    user.qq = qq;
    user.phone = phone;
    user.addr = addr;
    user.remark = remark;
    app.requestFun(
      app.globalData.apiConfig.editWXUser,
      'GET',
      user,
      function (res) {
        if (res.data.code=1){
          res.data.userInfo.avatarUrl = res.data.userInfo.headimg;
          that.setData({
            userInfo: res.data.userInfo
          })
          wx.showToast({
            title: '信息修改成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../../pages/me/me',
            })
          }, 1500)
        }
      }
    )
  },
  formReset() {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfoById();
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
    if (app.globalData.isMeRefresh) {
      var that = this;
      that.getUserInfoById();
      app.globalData.isMeRefresh = false;
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

 // 下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      'isPullDownRefresh': true
    })
    that.getUserInfoById();
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