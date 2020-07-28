// pages/add/add.js
const uploadUrl = require('../../config').uploadUrl;
const postUrl = require('../../config').postUrl;
const delImgurl = require('../../config').delImgurl;
const imgHost = require('../../config').imgHost;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    content: '',
    photos: [],
    price:'',
    phone:'',
    typeVal:'',
    cw:0, //画布宽
    ch:0   //画布高
  },
  titleVal: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  contentVal:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  priceVal: function (e) {
    this.setData({
      price: e.detail.value
    })
  },
  phoneVal:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  // 选择上传图片
  chooseImage: function () {
    var that = this;
    let photos = that.data.photos; //这个是用来承载页面循环展示图片的
    //拍照、从相册选择上传
    wx.chooseImage({
        count: 4,  //这个是上传的最大数量，默认为9
        sizeType: ['compressed'],  //这个可以理解为上传的图片质量类型（官方给的），虽然没什么卵用，要不然还要我们自己写压缩做什么
        sourceType: ['album', 'camera'],  //这个是图片来源，相册或者相机
        success: function (res) {
        var tempFilePaths = res.tempFilePaths  //这个是选择后返回的图片列表
        that.getCanvasImg(0, 0, tempFilePaths);  //进行压缩
        } 
    });
  },
  //压缩并获取图片，这里用了递归的方法来解决canvas的draw方法延时的问题
 getCanvasImg: function (index,failNum, tempFilePaths){
    var that = this;
    if (index < tempFilePaths.length){
     const ctx = wx.createCanvasContext('attendCanvasId');
     ctx.drawImage(tempFilePaths[index], 0, 0, 300, 150);
     ctx.draw(true, function () {
      index = index + 1;//上传成功的数量，上传成功则加1
      wx.canvasToTempFilePath({
       canvasId: 'attendCanvasId',
       success: function success(res) {
        that.uploadCanvasImg(res.tempFilePath);
        that.getCanvasImg(index,failNum,tempFilePaths);
       }, fail: function (e) {
        failNum += 1;//失败数量，可以用来提示用户
        that.getCanvasImg(inedx,failNum,tempFilePaths);
       }                                                                                                                                 
      });
     });
    }
   },
   //上传图片
   uploadCanvasImg: function (canvasImg){
    var that = this;
    let photos = that.data.photos;
    var tempImg = canvasImg;
    console.log(tempImg);
    return false;
    wx.uploadFile({
     url: uploadUrl,//文件服务器的地址
     filePath: tempImg,
     name: 'file',
     success: function (res) {
    //   var data = JSON.parse(res.data);
      console.log(res);
    //   if(data.code>0){
    //     photos.push(data.data);
    //     that.setData({
    //     photos: photos,
    //     })
    //   }else{
    //     wx.showToast({
    //       title: '上传图片异常',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //     return false;
    //   }
     }
    })
   },
  //删除图片
  delImg:function(e){
    var that=this;
    var _index=e.currentTarget.dataset.index;
    wx.request({
      url:delImgurl,
      data:{
        imgurl:that.data.photos[_index]
      },
      method: 'POST',
      success:function(res){
        if(res.data.code>0){
          //删除成功
          var theimg=that.data.photos;
          theimg.splice(_index,1);
          that.setData({
            photos:theimg
          })
        }else{
          //删除失败或者图片不存在
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //图片预览
  previewImage:function(e){
    console.log(e);
    var that=this;
    var _currentImg=e.currentTarget.dataset.url;
    console.log(_currentImg);
    wx.previewImage({
      current:'_currentImg',
      urls:that.data.photos
    })
  },
  //选择类型
  chooseClassify:function(){
    console.log('选择分类');
    var typeVal=this.data.typeVal==null?null:this.data.typeVal.id;
    wx.navigateTo({
      url: '../postCate/postCate?cate_type='+typeVal
    })
  },
  postFun:function(){
    const that=this;
    if(that.data.title==""){
      wx.showToast({
        title: '请输入商品名称',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if(that.data.content==""){
      wx.showToast({
        title: '请输入商品简介',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (that.data.photos.length== 0) {
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
    if(that.data.phone==""){
      wx.showToast({
        title: '请输入联系号码',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if(that.data.typeVal==""){
      wx.showToast({
        title: '请选择类型',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let mid = wx.getStorageSync('mid');
    if(mid){
      var postData={
        'title':that.data.title,
        'content':that.data.content,
        'imgs':that.data.photos,
        'price':that.data.price,
        'phone':that.data.phone,
        'typeVal':that.data.typeVal.id,
        'authorId':mid
      };
      wx.showLoading({
        title: '正在发布中...',
        icon: 'loading',
        mask: true
      })
      wx.request({
        url:postUrl,
        data:postData,
        method: 'POST',
        success:function(res){
         wx.hideLoading();
         if(res.data.code>0){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000,
            success:function(){
              setTimeout(function(){
                app.globalData.isIndexRefresh=true;
                app.globalData.isMeRefresh=true;
                wx.switchTab({
                  url: '../index/index'
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
      })
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
    wx.setNavigationBarTitle({
      title: '发布商品'
    })
    app.checkLogin();
    var that=this;
    var _cateType=options.cateType;
    if(_cateType){
      that.setData({
        'typeVal':_cateType
      })
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