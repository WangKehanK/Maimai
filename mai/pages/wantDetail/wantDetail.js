// pages/wantDetail/wantDetail.js
var util = require('../../util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   wantDetail: null,
    wantId: 0,
    mid: 0,
    collectId: 0
  },
  //去投诉
  goReport: function (e) {
    conl
    var _id = e.currentTarget.dataset.id;
    var _violatorid = e.currentTarget.dataset.violatorid;
    wx.navigateTo({
      url: '../report/report?id=' + _id + '&violator_id=' + _violatorid
    })
  },
  //拨打电话
  callPhone: function (e) {
    var _phone = e.currentTarget.dataset.phone;
    wx.showModal({
      title: '拨打电话',
      content: '是否拨打' + _phone,
      success(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: _phone
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  //商品收藏
  addCollect(e) {
    const that = this;
    var _id = e.currentTarget.dataset.id;
    wx.showLoading({
      title: '正在获取中...',
      icon: 'loading',
      mask: true
    })
    app.requestFun(
      app.globalData.apiConfig.addUserCollect,
      'GET',
      {
        'userId': wx.getStorageSync('mid'),
        'invitationId': _id,
        'invitationType': 'want'
      },
      function (res) {
        wx.hideLoading();
        if (res.statusCode == 200) {
          wx.hideLoading();
          that.setData({
            collectId: 1
          })
          wx.showToast({
            title: "收藏成功",
            icon: 'none',
            duration: 1500
          })
        }
      }
    )
  },
  //取消商品收藏
  delCollect(e) {
    const that = this;
    var _id = e.currentTarget.dataset.id;
    wx.showLoading({
      title: '正在获取中...',
      icon: 'loading',
      mask: true
    })
    app.requestFun(
      app.globalData.apiConfig.deleteUserCollect,
      'GET',
      {
        'id': _id
      },
      function (res) {
        wx.hideLoading();
        if (res.statusCode == 200) {
          wx.hideLoading();
          that.setData({
            collectId: 0
          })
          wx.showToast({
            title: "取消收藏成功",
            icon: 'none',
            duration: 1500
          })
        }
      }
    )
  },
  //请求商品详情数据
  getData: function (_id, mid) {
    var that = this;
    app.requestFun(
      app.globalData.apiConfig.getWantDetail,
      'GET',
      {
        id: _id,
        userId: mid,
        wantType: 'want'
      },
      function (res) {
        if (res.statusCode == 200) {
          wx.hideLoading();
          if (res.data.code == 1) {
            res.data.data.createTime = util.formatDate(res.data.data.createTime);
            that.setData({
              wantDetail: res.data.data,
              collectId: res.data.collectId
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
              success: function () {
                wx.switchTab({
                  url: '../index/index'
                })
              }
            })
          }
        }
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '详情'
    })
    wx.showLoading({
      title: '拼命加载中...',
      icon: 'loading',
      mask: true
    })
    var that = this;
    var _id = options.id;
    that.setData({
      wantId: _id
    })
    let mid = wx.getStorageSync('mid');
    if (mid) {
      that.setData({
        mid: mid
      })
    } else {
      // console.log("您还未登录请先登录");
      wx.reLaunch({
        url: "/pages/login/login"
      })
    }
    that.getData(that.data.wantId, that.data.mid);
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
})