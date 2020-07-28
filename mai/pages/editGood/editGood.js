// pages/add/add.js
const uploadUrl = require('../../config').uploadUrl;
const postUrl = require('../../config').postUrl;
const delImgurl = require('../../config').delImgurl;
const imgHost = require('../../config').imgHost;
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
    price: '',
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
  priceVal: function (e) {
    this.setData({
      price: e.detail.value
    })
  },
  // 选择上传图片
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 9,
      success: function (res) {
        var photosArr = that.data.photos;
        if (that.data.photos.length >= 9) {
          //超过9张图片
          wx.showToast({
            title: '最多可选9张',
            icon: 'none',
            duration: 1000,
            mask: true
          })
        } else {
          //没超过9张图片
          var imgs = that.data.photos;
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            wx.uploadFile({
              url: uploadUrl,
              filePath: res.tempFilePaths[i],
              name: 'file',
              success: function (res) {
                var data = JSON.parse(res.data);
                if (data.code > 0) {
                  photosArr.push(data.data);
                  that.setData({
                    photos: photosArr
                  })
                } else {
                  wx.showToast({
                    title: '上传图片异常',
                    icon: 'none',
                    duration: 2000
                  })
                  return false;
                }
              }
            })
          }
        }
      }
    })
  },
  //删除图片
  delImg: function (e) {
    var that = this;
    var _index = e.currentTarget.dataset.index;
    var theimg = that.data.photos;
    theimg.splice(_index, 1);
    that.setData({
      photos: theimg
    })
  },
  //图片预览
  previewImage: function (e) {
    var that = this;
    var _currentImg = e.currentTarget.dataset.url;
    var imgArr = [];
    for (var i = 0; i < that.data.photos.length; i++) {
      imgArr.push(
        that.data.imgHost + that.data.photos[i]
      )
    }
    wx.previewImage({
      current: _currentImg,
      urls: imgArr
    })
  },
  //选择类型
  chooseClassify: function () {
    console.log('选择分类');
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
    if (that.data.photos.length == 0) {
      wx.showToast({
        title: '请上传商品相关图片',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (that.data.price == "") {
      wx.showToast({
        title: '请输入出售价格',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (that.data.typeVal == "") {
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
            var tempStr = '';
            for (var i = 0; i < that.data.photos.length; i++) {
              if (i == 0) { tempStr += that.data.photos[i] }
              else { tempStr = tempStr + ',' + that.data.photos[i] }
            }
            that.data.photoStr = tempStr;
            var goods = {
              'id': e.currentTarget.dataset.id,
              'goodsTitle': that.data.title,
              'goodsDesc': that.data.content,
              'goodsImgs': that.data.photoStr,
              'goodsPrice': that.data.price,
              'goodsType': that.data.typeVal.id
            };
            wx.showLoading({
              title: '正在发布中...',
              icon: 'loading',
              mask: true
            })
            //商品修改
            app.requestFun(
              app.globalData.apiConfig.editGood,
              'GET',
              goods,
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
            // console.log("您还未登录请先登录");
            wx.reLaunch({
              url: "/pages/login/login"
            })
          }
        } else {

        }
      }
    })

  },
  //获取商品数据
  getGoodDate(){
    var that=this;
    app.requestFun(
      app.globalData.apiConfig.getGoodDetail,
      'GET',
      {
        id: that.data.id, 
        userId: wx.getStorageSync('mid'),
        goodsType: 'goods'
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
            var myData={};
            myData.id = res.data.data.goodsType;
            myData.typeName = res.data.data.goodsTypeName;
            that.setData({
              id: res.data.data.id,
              title: res.data.data.goodsTitle,
              content: res.data.data.goodsDesc,
              photos: res.data.data.goodsImgs,
              price: res.data.data.goodsPrice,
              typeVal: myData
            })
          }else{
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
    var that=this;
    var _cateType=options.cateType;
    var _id=options.id;
    if(_cateType){
      that.setData({
        'typeVal':_cateType
      })
    }
    if(_id){
      that.setData({
        'id':_id
      })
      wx.showLoading({
        title: '拼命加载中...',
        icon: 'loading',
        mask: true
      })
      that.getGoodDate();
    }
    that.setData({
      'imgHost':imgHost
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