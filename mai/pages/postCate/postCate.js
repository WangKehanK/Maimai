// pages/postCate/postCate.js

const app = getApp();
// const getTieziCateUrl = require('../../config').getTieziCateUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postCate:[],
    current_cate:0
  },
  changeCate:function(e){
    var _index=e.currentTarget.dataset.index;
    this.setData({
      'current_cate':_index
    })
  },
  cateSubmit:function(e){
    var pages = getCurrentPages();
    var prevPage=pages[pages.length-2];
    prevPage.setData({
      typeVal:this.data.postCate[this.data.current_cate]
    })
    wx.navigateBack(); //关闭当前页面，返回上一页面或多级页面。
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.checkLogin();
    var that=this;
    var cate_type=options.cate_type;
    wx.showLoading({
      title: '正在获取中...',
      icon: 'loading',
      mask: true
    })
    app.requestFun(
      app.globalData.apiConfig.goodsTypeList,
      'GET',
      {
      },
      function(res){
        wx.hideLoading();
        var res=res.data;
          that.setData({
            'postCate':res
          })
          if(cate_type!=null){
             that.data.postCate.forEach(function(v,i){
              if(v.id==cate_type){
                that.setData({
                  'current_cate':i
                })
                return;
              }
            });
          }
      }
    )
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