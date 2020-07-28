const app = getApp()
const imgHost = require('../../config').imgHost;
var util = require('../../util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, 
    imgHost: '',
    collectList: [],
    collectWantList:[],
    userInfo: null,
    isPullDownRefresh: false  //判断是否正在下拉刷新
  },
  //获取该用户发布的商品列表
  getCollectList() {
    const that = this;
    let token = wx.getStorageSync('token');
    let userInfo = {
      'mid': wx.getStorageSync('mid')
    };
    that.setData({
      userInfo: userInfo
    })
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
        app.globalData.apiConfig.getCollectList,
        'GET',
        {
          userId: that.data.userInfo.mid
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
            for (var i = 0; i < res.data.length; i++) {
              var imgArr = [];
              res.data[i].collectTime = util.formatDate(res.data[i].collectTime);
              for (var j = 0; j < res.data[i].goodsImgs.split(",").length; j++) {
                imgArr.push(res.data[i].goodsImgs.split(",")[j])
              }
              res.data[i].goodsImgs = imgArr;
            }
            that.setData({
              collectList: res.data
            })
            console.log(res.data)
          }
        }
      )
    } else {
      wx.reLaunch({
        url: "/pages/login/login"
      })
    }
  },
  //收藏的求购商品
  getCollectWantList() {
    const that = this;
    let token = wx.getStorageSync('token');
    let userInfo = {
      'mid': wx.getStorageSync('mid')
    };
    that.setData({
      userInfo: userInfo
    })
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
        app.globalData.apiConfig.getCollectWantList,
        'GET',
        {
          userId: that.data.userInfo.mid
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
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].createTime = util.formatDate(res.data[i].createTime);
            }
            that.setData({
              collectWantList: res.data
            })
          }
        }
      )
    } else {
      wx.reLaunch({
        url: "/pages/login/login"
      })
    }
  },
  //跳转至商品详情页面
  goGoodCon: function (e) {
    console.log(e.currentTarget.dataset)
    var _id = e.currentTarget.dataset.id;
    var _userId = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '../goodDetail/goodDetail?id=' + _id + '&userId=' + _userId
    })
  },
  //跳转至求购详情页面
  goWantCon: function (e) {
    var _id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../wantDetail/wantDetail?id=' + _id
    })
  },
  //取消收藏
  goDel(e) {
    const that = this;
    var _id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '取消收藏',
      content: '是否取消收藏该商品',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在处理中...',
            icon: 'loading',
            mask: true
          })
          app.requestFun(
            app.globalData.apiConfig.deleteUserCollect,
            'GET',
            {
              'id':_id
            },
            function (res) {
              if (res.statusCode == 200) {
                wx.hideLoading();
                wx.showToast({
                  title:"取消收藏成功",
                  icon: 'none',
                  duration: 1500
                })
                setTimeout(function () {
                  that.getCollectList();
                  that.getCollectWantList();
                }, 1000)
              }
            }
          )
        } else if (res.cancel) {
        }
      }
    })
  },
  swiperchange: function (e) {
    var that = this
    that.setData({
      'currentTab': e.detail.current
    })
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.checkLogin();
    that.setData({
      'imgHost': imgHost
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })
    this.getCollectList();
    this.getCollectWantList();
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
      that.getCollectList();
      that.getCollectWantList();
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

  //下拉刷新
  onPullDownRefresh: function () {
    console.log('下拉刷新');
    var that = this;
    that.setData({
      'isPullDownRefresh': true
    })
    that.getCollectList();
    that.getCollectWantList();
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