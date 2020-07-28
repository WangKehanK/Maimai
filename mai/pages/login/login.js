// pages/logo/logo.js
var util = require('../../util.js');


const app = getApp();
Page({

  data: {
    schoolArray: [],
    schoolIdArray: [],
    index: 0,
    schoolId: 0,
    userInfo: null,
    currentTab: 0,
    inputShowed: false,
    inputVal: "",
    curPage: 1, //当前第几页
    pageNum: 10, //每页几条数据
    curPage1: 1, //当前第几页(搜索)
    pageNum1: 10, //每页几条数据(搜索)
    curPage2: 1,
    pageNum2: 10,
    isShowLoadMore1: false, //是否正在上拉加载更多
    isShowLoadMore2: false, //是否正在上拉加载更多
    loadText1: '加载中', //加载容器的文本内容
    loadText2: '加载中', //加载容器的文本内容
    isPullDownRefresh: false, //判断是否正在下拉刷新
    imgHost: '', //用于存放图片的主机名前缀
    goodList: [], //商品列表
    wantList: [], //求购列表
    status: 1010, //用户认证状态，如果非认证状态不让查看商品详情
    version: '0'

  },
  setVersion() {
    var that = this;
    app.requestFun(

      app.globalData.apiConfig.getReportNum,
      'GET', {
        'id': 1
      },
      function(res) {
        that.setData({
          version: res.data.reportNum
        })
      }

    )
  },
  //guoshen
  onLoad: function(options) {
    this.setVersion();
    if (this.data.version = '0') {
      if (options.goodId) {
        wx.navigateTo({
          url: '../goodDetail/goodDetail?id=' + options.goodId
        })
      }
      var that = this;
      that.getAllSchool();
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            clientHeight: res.windowHeight
          });
        }
      })
      that.setData({
        'imgHost': app.globalData.apiConfig.imgHost
      })
      if (this.data.version == 0) {
        that.getGoodList(that.data.schoolId);
        wx.setStorageSync('mid', 12);
      }
    }
  },
  getAllSchool: function() {
    const that = this;
    if (!that.data.isPullDownRefresh) {
      wx.showLoading({
        title: '拼命加载中...',
        icon: 'loading',
        mask: true
      })
    } else {
      wx.showNavigationBarLoading(); //在标题栏中显示加载
    }
    //发送请求获取求购商品列表
    app.requestFun(
      app.globalData.apiConfig.getAllSchool,
      'GET', {},
      function(res) {
        if (res.statusCode == 200) {
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
          var schoolArr = ['全部'];
          var schoolIdArr = [0];
          for (var i = 0; i < res.data.length; i++) {
            schoolArr.push(res.data[i].name);
            schoolIdArr.push(res.data[i].id);
          }
          that.setData({
            schoolArray: schoolArr,
            schoolIdArray: schoolIdArr
          })
        }
      }
    )
  },
  getGoodList: function(schoolId) {
    const that = this;

    if (true) {
      if (!that.data.isPullDownRefresh) {
        wx.showLoading({
          title: '拼命加载中...',
          icon: 'loading',
          mask: true
        })
      } else {
        wx.showNavigationBarLoading(); //在标题栏中显示加载
      }
      //发送请求获取相关商品列表
      app.requestFun(
        app.globalData.apiConfig.getAllGoodsUrl,
        'GET', {
          userId: 12,
          curPage: that.data.curPage1,
          pageNum: that.data.pageNum1,
          schoolId: 0
        },
        function(res) {
          if (res.statusCode == 200) {
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
            if (res.data.length > 0) {
              for (var i = 0; i < res.data.length; i++) {
                var imgArr = [];
                res.data[i].createTime = util.formatDate(res.data[i].createTime);
                for (var j = 0; j < res.data[i].goodsImgs.split(",").length; j++) {
                  imgArr.push(res.data[i].goodsImgs.split(",")[j])
                }
                res.data[i].goodsImgs = imgArr;
              }
              if (that.data.curPage1 > 1) {
                that.setData({
                  goodList: that.data.goodList.concat(res.data),
                  isShowLoadMore1: false
                })
              } else {
                that.setData({
                  goodList: res.data
                })
              }
            } else {
              // that.setData({
              //   goodList: res.data
              // })
            }
            if (res.data.length < 10) {
              //没有更多数据了
              that.setData({
                isShowLoadMore1: true,
                loadText1: '没有更多商品了'
              })
            } else {
              //还有更多数据
              that.setData({
                isShowLoadMore1: false,
                loadText1: '加载中'
              })
            }

          }
        }
      )
    }
  },
  goGoodCon: function(e) {
    var _id = e.currentTarget.dataset.id;
    var _userId = e.currentTarget.dataset.userid;
    var _goodno = e.currentTarget.dataset.goodno;
    var that = this;

    if (_goodno.indexOf("SP") != -1) {
      wx.navigateTo({
        url: '../goodDetailGS/goodDetail?id=' + _id + '&userId=' + '12'
      })
    }
  },

  onGotUserInfo: function(e) {

    if (e.detail.errMsg == "getUserInfo:ok") {
      var encryptedData = e.detail.encryptedData; //加密的用户信息
      var iv = e.detail.iv; //加密算法的初始向量
      wx.showLoading({
        title: '正在登录中...',
        icon: 'loading',
        mask: true
      })
      wx.login({
        success: function(res) {
          if (res.code) {
            var code = res.code;
            wx.request({
              url: app.globalData.apiConfig.loginUrl,
              data: {
                "code": code,
                "encryptedData": encryptedData,
                "iv": iv
              },
              method: 'GET',
              success: function(res) {
                //解密成功后 获取自己服务器返回的结果
                if (res.data.code > 0) {
                  wx.hideLoading();
                  wx.setStorageSync('token', res.data.userInfo.accessToken);
                  wx.setStorageSync('mid', res.data.userInfo.id);
                  wx.setStorageSync('nickName', res.data.userInfo.nickName);
                  wx.setStorageSync('avatarUrl', res.data.userInfo.avatarUrl);
                  wx.setStorageSync('status', res.data.userInfo.status);
                  wx.reLaunch({ //关闭所有页面，打开到应用内的某个页面
                    url: "/pages/index/index"
                  })
                } else {
                  console.log('解密失败')
                }
              }
            })
          }
        },
        fail: function() {
          console.log("启用wx.login函数，失败！");
        },
      })
    } else {
      wx.showModal({
        title: '请授权',
        content: '亲！不提供信息无法登录的哟',
        showCancel: false
      })
    }
  },
  onReady: function() {

  },
  onShow: function() {

  },

  onHide: function() {

  },

  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})