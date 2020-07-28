// pages/goodDetail/goodDetail.js
var util = require('../../util.js');  
const imgHost = require('../../config').imgHost;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodDetail:null,
    imgHost:'',
    goodId:0,
    mid:0,
    collectId:0,
    isMine:false
  },
  //去投诉
  goReport:function(e){
    var _id=e.currentTarget.dataset.id;
    var _violatorid=e.currentTarget.dataset.violatorid;
    wx.navigateTo({
      url: '../report/report?id='+_id+'&violatorid='+_violatorid
    })
  },
  //拨打电话
  callPhone:function(e){
    var _phone=e.currentTarget.dataset.phone;
    wx.showModal({
      title: '拨打电话',
      content: '是否拨打'+_phone,
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
  // //跳转至该用户所发布的所有商品
  // goUserGoods:function(e){
  //   var _userId=e.currentTarget.dataset.userid;
  //   var _userName=e.currentTarget.dataset.username;
  //   var _userCover=e.currentTarget.dataset.usercover;
  //   let mid = wx.getStorageSync('mid');
  //   if(_userId==mid){
  //     //是自己发布的
  //     wx.switchTab({
  //       url: '../me/me'
  //     });
  //   }else{
  //     //不是自己发布的
  //     wx.navigateTo({
  //       url: '../userGoods/userGoods?userid='+_userId+'&username='+_userName+'&usercover='+_userCover
  //     })
  //   }
  // },
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
        'invitationType': 'goods'
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
  getData:function(_id,mid){
    var that=this;
    app.requestFun(
      app.globalData.apiConfig.getGoodDetail,
      'GET',
      {
        id:_id,
        userId: mid,
        goodsType:'goods'
      },
      function (res) {
        if(res.statusCode==200){
          wx.hideLoading();
          if(res.data.code==1){
              var imgArr = [];
              res.data.data.createTime = util.formatDate(res.data.data.createTime);
              for (var j = 0; j < res.data.data.goodsImgs.split(",").length; j++) {
                imgArr.push(res.data.data.goodsImgs.split(",")[j])
              }
              res.data.data.goodsImgs = imgArr;
            that.setData({
              goodDetail: res.data.data,
              collectId: res.data.collectId
            })
            if(mid==that.data.saleUserId){//是本人发布的
              that.setData({
                isMine:true
              })
            }
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
              success:function(){
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
  //图片预览
  previewImage:function(e){
    var that=this;
    var _currentImg=e.currentTarget.dataset.url;
    var imgArr=[];
    for(var i=0;i<that.data.goodDetail.goodsImgs.length;i++){
      imgArr.push(
        that.data.imgHost + that.data.goodDetail.goodsImgs[i]
      )
    }
    wx.previewImage({
      current:_currentImg,
      urls:imgArr
    })
  },
  manageGood: function (e) {
    let mid = wx.getStorageSync('mid');
    if (mid) {
      wx.navigateTo({
        url: '../mypublish/mypublish'
      })
    } else {
      wx.reLaunch({
        url: "/pages/login/login"
      })
    }
  },
  confirmOrder: function (e) {
    wx.showModal({
      title: '确认下单',
      success(res) {
        if (res.confirm) {
          let token = wx.getStorageSync('token');
          if (token) {
          var that = this;
          var orders = {
            'userId': wx.getStorageSync('mid'),
            'goodsId': e.currentTarget.dataset.id
          };
          wx.showLoading({
            title: '正在发布中...',
            icon: 'loading',
            mask: true
          })
          //下单
          app.requestFun(
            app.globalData.apiConfig.saveOrders,
            'GET',
            orders,
            function (res) {
              wx.hideLoading();
              if (res.data.code > 0) {
                wx.showToast({
                  title: "下单成功",
                  icon: 'none',
                  duration: 2000,
                  success: function () {
                    setTimeout(function () {
                      app.globalData.isIndexRefresh = true;
                      app.globalData.isMeRefresh = true;
                      wx.switchTab({
                        url: '../index/index'
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情'
    })
    wx.showLoading({
      title: '拼命加载中...',
      icon: 'loading',
      mask: true
    })
    var that=this;
    that.setData({
      'imgHost':imgHost
    })
    var _id=options.id;
    var _saleUserId = options.userId == undefined ? 0 : options.userId;
    that.setData({
      goodId:_id,
      saleUserId:_saleUserId
    })
    let mid = wx.getStorageSync('mid');
    if(mid){
      that.setData({
          mid:mid
      })
    }else{
      // console.log("您还未登录请先登录");
      wx.reLaunch({
        url: "/pages/login/login"
      })
    }
    that.getData(that.data.goodId,that.data.mid);
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
    return {
      title: this.data.goodDetail.title,   
      path: '/pages/index/index?goodId='+this.data.goodId,//这里填写首页的地址,一般为/pages/xxxx/xxx
      imageUrl: this.data.imgHost + this.data.goodDetail.goodsImgs[0],
      success: function(res) {
        wx.showToast({
          title: '转发成功',
          icon: 'none',
          duration: 2000
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '转发失败',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
})