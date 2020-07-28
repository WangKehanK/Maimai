// pages/report/report.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    violatorid:0,
    content:''
  },
  //投诉信息录入
  contentVal:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  //提交投诉
  reportFun:function(){
    const that=this;
    if(that.data.content==""){
      wx.showToast({
        title: '请输入投诉的原因',
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
      var report={
        'goodsId': that.data.id,
        'reportId': mid,
        'reportContent': that.data.content,
        'violatorId': that.data.violatorid   //违规者id
      }
      app.requestFun(
        app.globalData.apiConfig.addReport,
        'GET',
        report,
        function(res){
          wx.hideLoading();
          if(res.data.code>0){
            wx.showToast({
              title: "提交投诉成功",
              icon: 'none',
              duration: 2000,
              success:function(){
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1
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
      console.log("您还未登录请先登录");
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
    console.log(options)
    that.setData({
      'id':options.id,
      'violatorid': options.violatorid
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