//index.js
//获取应用实例
var util = require('../../util.js');
const app = getApp()
// const getCateGoodList = require('../../config').getCateGoodList; 
const imgHost = require('../../config').imgHost;
Page({
  data: {
    cateId: 0, //分类的ida
    curPage: 1, //当前第几页
    pageNum: 10, //每页几条数据
    isShowLoadMore: false, //是否正在上拉加载更多
    loadText: '加载中', //加载容器的文本内容
    isPullDownRefresh: false, //判断是否正在下拉刷新
    imgHost: '',
    goodList: [], //商品列表
  },
  //事件处理函数
  goAdd: function() {
    //跳转至新增发布页面
    wx.navigateTo({
      url: '../add/add'
    })
  },
  //跳转至商品详情页面
  goGoodCon: function(e) {
    if (this.data.status == 1011) {
      var _id = e.currentTarget.dataset.id;
      var _userId = e.currentTarget.dataset.userid;
      wx.navigateTo({
        url: '../goodDetail/goodDetail?id=' + _id + '&userId=' + _userId
      })
    } else {
      wx.showToast({
        title: '账户未认证或者已冻结，无法查看',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //跳转至该用户所发布的所有商品
  goUserGoods: function(e) {
    if (this.data.status == 1011) {
      var _userId = e.currentTarget.dataset.userid;
      var _userName = e.currentTarget.dataset.username;
      var _userCover = e.currentTarget.dataset.usercover;
      let mid = wx.getStorageSync('mid');
      if (_userId == mid) {
        //是自己发布的
        wx.switchTab({
          url: '../me/me'
        });
      } else {
        //不是自己发布的
        wx.navigateTo({
          url: '../userGoods/userGoods?userid=' + _userId + '&username=' + _userName + '&usercover=' + _userCover
        })
      }
    } else {
      wx.showToast({
        title: '账户未认证或者已冻结，无法查看',
        icon: 'none',
        duration: 2000
      })
    }
  },

  //获取商品列表数据
  getGoodList: function() {
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
    app.requestFun(
      app.globalData.apiConfig.getGoodTypeList,
      'GET', {
        userId: wx.getStorageSync('mid'),
        goodsType: that.data.cateId,
        curPage: that.data.curPage,
        pageNum: that.data.pageNum
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
          for (var i = 0; i < res.data.length; i++) {
            var imgArr = [];
            res.data[i].createTime = util.formatDate(res.data[i].createTime);
            for (var j = 0; j < res.data[i].goodsImgs.split(",").length; j++) {
              imgArr.push(res.data[i].goodsImgs.split(",")[j])
            }
            res.data[i].goodsImgs = imgArr;
          }
          if (that.data.curPage > 1) {
            that.setData({
              goodList: that.data.goodList.concat(res.data),
              isShowLoadMore: false
            })
          } else {
            that.setData({
              goodList: res.data
            })
          }
          if (res.data.length < 10) {
            //没有更多数据了
            that.setData({
              isShowLoadMore: true,
              loadText: '没有更多商品了'
            })
          } else {
            //还有更多数据
            that.setData({
              isShowLoadMore: false,
              loadText: '加载中'
            })
          }
        }
      }
    )
  },
  //下拉刷新
  onPullDownRefresh: function() {
    var that = this;
    that.setData({
      'isPullDownRefresh': true,
      'curPage': 1
    })
    that.getGoodList();
  },
  //上拉加载更多
  onReachBottom: function() {
    console.log('加载更多');
    var that = this;
    if (!that.data.isShowLoadMore) {
      that.setData({
        'isShowLoadMore': true,
        'curPage': ++that.data.curPage
      })
      that.getGoodList();
    }
  },
  onLoad: function(options) {
    var that = this;
    if (options.cateid) {
      that.setData({
        'cateId': options.cateid
      })
    }
    wx.setNavigationBarTitle({
      title: options.name
    })
    // app.checkLogin();
    that.setData({
      'imgHost': imgHost
    })
    that.getGoodList();
    that.getUserInfoById();
  },
  getUserInfoById() {
    var that = this;
    app.requestFun(
      app.globalData.apiConfig.getUserInfoById,
      'GET', {
        'id': wx.getStorageSync('mid')
      },
      function(res) {
        that.setData({
          status: res.data.data.status
        })
      }

    )
  },
  onShow: function() {

  },
  getUserInfo: function(e) {

  }
})