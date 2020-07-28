// pages/add/add.js
const uploadUrl = require('../../config').uploadUrl;
const postUrl = require('../../config').postUrl;
var util = require('../../util.js');  
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    title: '',
    content: '',
    photos: [],
    photoStr: '',
    maxPrice: '',
    minPrice: '',
    phone: '',
    typeVal: null
  },
  titleVal: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  contentVal: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  maxPriceVal: function (e) {
    this.setData({
      maxPrice: e.detail.value
    })
  },
  minPriceVal: function (e) {
    this.setData({
      minPrice: e.detail.value
    })
  },
  //选择类型
  chooseClassify: function () {
    var typeVal = this.data.typeVal == null ? null : this.data.typeVal.id;
    wx.navigateTo({
      url: '../postCate/postCate?cate_type=' + typeVal
    })
  },
  postFun: function (e) {
    const that = this;
    if (that.data.title == "") {
      wx.showToast({
        title: '请输入商品名称',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (that.data.content == "") {
      wx.showToast({
        title: '请输入商品简介',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (that.data.maxPrice == "") {
      wx.showToast({
        title: '请输入您期望的最高价格',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (that.data.minPrice == "") {
      wx.showToast({
        title: '请输入您期望的最低价格',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (that.data.typeVal == null || that.data.typeVal == "") {
      wx.showToast({
        title: '请选择类型',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.showModal({
      title: '平台只负责发布、展示，与平台本身无关，平台不负任何责任',
      content: '是否确定发布',
      success(res) {
        if (res.confirm) {
          let token = wx.getStorageSync('token');
          if (token) {
            var want = {
              'id': e.currentTarget.dataset.id,
              'goodsTitle': that.data.title,
              'goodsDesc': that.data.content,
              'goodsMaxPrice': that.data.maxPrice,
              'goodsMinPrice': that.data.minPrice,
              'goodsType': that.data.typeVal.id
            };
            wx.showLoading({
              title: '正在发布中...',
              icon: 'loading',
              mask: true
            })
            //提交商品发布
            app.requestFun(
              app.globalData.apiConfig.editWant,
              'GET',
              want,
              function (res) {
                wx.hideLoading();
                if (res.data.code > 0) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000,
                    success: function () {
                      setTimeout(function () {
                        app.globalData.isIndexRefresh = true;
                        app.globalData.isMeRefresh = true;
                        wx.navigateTo({
                          url: '../mypublish/mypublish'
                        })
                      }, 2000)
                    }
                  })

                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            )
          } else {
            wx.reLaunch({
              url: "/pages/login/login"
            })
          }
        } else {

        }
      }
    })

  },
  getReportNum() {
    app.requestFun(
      app.globalData.apiConfig.getReportNum,
      'GET',
      { id: wx.getStorageSync('mid') },
      function (res) {
        var res = res.data;
        if (res.code > 0) {
          if (res.reportNum >= 3) {
            wx.showToast({
              title: '账户被封锁无法发布',
              icon: 'none',
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)
              }
            })
          }
        } else {
          wx.showToast({
            title: '接口请求失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    )
  },
  //获取商品数据
  getGoodDate() {
    var that = this;
    app.requestFun(
      app.globalData.apiConfig.getWantDetail,
      'GET',
      {
        id: that.data.id,
        userId: wx.getStorageSync('mid'),
        goodsType: 'want'
      },
      function (res) {
        if (res.statusCode == 200) {

          wx.hideLoading();
          if (res.data.code == 1) {
            res.data.data.createTime = util.formatDate(res.data.data.createTime);
            var myData = {};
            myData.id = res.data.data.goodsType;
            myData.typeName = res.data.data.goodsTypeName;
            that.setData({
              id: res.data.data.id,
              title: res.data.data.goodsTitle,
              content: res.data.data.goodsDesc,
              minPrice: res.data.data.goodsMinPrice,
              maxPrice: res.data.data.goodsMaxPrice,
              typeVal: myData
            })
          } else {
          }
        }
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    app.checkLogin();
    var that = this;
    var _id = options.id;
    that.getReportNum();
    var _cateType = options.cateType;
    if (_cateType) {
      that.setData({
        'typeVal': _cateType
      })
    }
    if (_id) {
      that.setData({
        'id': _id
      })
      wx.showLoading({
        title: '拼命加载中...',
        icon: 'loading',
        mask: true
      })
      that.getGoodDate();
    }
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