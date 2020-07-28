// pages/me/me.js
const app = getApp()
const imgHost = require('../../config').imgHost;
var util = require('../../util.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgHost: '',
    goodList:[],
    userName:null,
    userCover:null
  },
  //获取该用户发布的商品列表
  getUserGood(userid){
    const that=this;
    if(userid){
      wx.showLoading({
        title: '拼命加载中...',
        icon: 'loading',
        mask: true
      })
      app.requestFun(
        app.globalData.apiConfig.getGoodsListByUserId,
        'GET',
        {
          'userId':userid
        },
        function (res) {
          if(res.statusCode==200){
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
                goodList: res.data
              })
            }
          }  
      )
    }else{
    }
  },
  //跳转至商品详情页面
  goGoodCon:function(e){
    var _id=e.currentTarget.dataset.id;
    var _userId = e.currentTarget.dataset.mid;
    wx.navigateTo({
      url: '../goodDetail/goodDetail?id=' + _id + '&userId=' + _userId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId=options.userid;
    var userName=options.username;
    var userCover=options.usercover;
    wx.setNavigationBarTitle({
      title:userName+"的发布"
    })
    this.setData({
      'imgHost': imgHost,
      'userName':userName,
      'userCover':userCover
    })
    this.getUserGood(userId);
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