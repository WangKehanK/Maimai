// pages/report/report.js
// const addReport = require('../../config').addReport;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,    
    content:'',
    flag:0,
    startext: '',
    stardata: [1, 2, 3, 4, 5],
  },
  // 五星评价事件
  changeColor: function (e) {
    var num = e.currentTarget.dataset.no;    
    var that = this;
    if (num == 1) {
      that.setData({
        flag: 1,
        startext: '非常不满意'
      });
    } else if (num == 2) {
      that.setData({
        flag: 2,
        startext: '不满意'
      });
    } else if (num == 3) {
      that.setData({
        flag: 3,
        startext: '一般'
      });
    } else if (num == 4) {
      that.setData({
        flag: 4,
        startext: '满意'
      });
    } else if (num == 5) {
      that.setData({
        flag: 5,
        startext: '非常满意'
      });
    }
  },
  //评价信息
  contentVal:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  //提交评价
  reportFun:function(){
    const that=this;
    if(that.data.content==""){
      wx.showToast({
        title: '请输入评价的原因',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let mid = wx.getStorageSync('mid');
    if(mid){
      wx.showLoading({
        title: '正在提交中...',
        icon: 'loading',
        mask: true
      })
      app.requestFun(
        app.globalData.apiConfig.addComment,
        'GET',
        {
          'ordersId':that.data.id,
          'commentContent':that.data.content,
          'userId': mid,
          'starNum': that.data.flag
        },
        function(res){
          wx.hideLoading();
          if(res.data.code>0){
            wx.showToast({
              title: "评价成功",
              icon: 'none',
              duration: 2000,
              success:function(){
                setTimeout(function(){
                  wx.navigateTo({
                    url: "../buy/buy"
                  })
                },2000)
              }
            })
            
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
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
    app.checkLogin();
    var that=this;
    if(options.id){
      that.setData({
        'id':options.id,
        'saleUserId':options.saleUserId
      })
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