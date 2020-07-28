//app.js
const apiConfig = require('./config');
App({
  onLaunch: function () {
  },
  //验证登录
  // checkLogin:function(){
  //   let token = wx.getStorageSync('token');
  //   if (token) {
  //     //检查session_key是否过期
  //     wx.checkSession({
  //       //session_key 未过期
  //       success: function () {
  //         console.log('未过期');

  //       },
  //       //session_key 已过期
  //       fail: function () {
  //         // console.log('已过期');
  //         wx.reLaunch({
  //           url: "/pages/login/login"
  //         })
  //       }
  //     });
  //   } else {
  //     //无skey,作为首次登录
  //     console.log("首次登录");
  //     wx.reLaunch({
  //       url: "/pages/login/login"
  //     })
  //   }
  // }, 
  //多张图片上传
  uploadimg: function (data) {
    var that = this;
    var arr = [];
    let promise = new Promise(function (resolve, reject) {
      var i = data.i ? data.i : 0,//当前上传的哪张图片
        success = data.success ? data.success : 0,//上传成功的个数
        fail = data.fail ? data.fail : 0;//上传失败的个数
      wx.uploadFile({
        url: data.url,
        filePath: data.path[i],
        name: 'file',//这里根据自己的实际情况改
        formData: null,//这里是上传图片时一起上传的数据
        success: (resp) => {
          var data = JSON.parse(resp.data)
          resolve(data);
          if (data.code == 1) {
            success++;//图片上传成功，图片上传成功的变量+1
          }
          wx.showToast({
            title: '图片上传成功',
            icon: 'none',
            duration: 1500
          })
          // console.log(i);
          //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
        },
        fail: (res) => {
          reject(res);
          fail++;//图片上传失败，图片上传失败的变量+1
          console.log('fail:' + i + "fail:" + fail);
        },
        complete: () => {
          // console.log(i);
          i++;//这个图片执行完上传后，开始上传下一张
          if (i == data.path.length) {   //当图片传完时，停止调用          
            console.log('执行完毕');
            console.log('成功：' + success + " 失败：" + fail);
          } else {//若图片还没有传完，则继续调用函数
            // console.log(i);
            data.i = i;
            data.success = success;
            data.fail = fail;
            that.uploadimg(data);
          }
        }
      })
    })
    return promise;
  },
  //请求封装
  /*
    URL：请求接口
    methodType：请求方法
    Data：请求数据
    doSuccess：成功回调
    doFail：失败回调
  */
  requestFun:function(URL, methodType, Data, doSuccess, doFail) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
        url:URL,
        header: {
          "content-type": "application/json;charset=UTF-8",
          "token":wx.getStorageSync('token')
        },
        method:methodType,
        data:Data,
        success:function(res){
          wx.hideLoading();
          if(res.data.code==-2){
            wx.showToast({
              title: '请先去登录',
              icon: 'none',
              duration: 2000
            })
            wx.reLaunch({
              url: "/pages/login/login"
            })
          }else{
            doSuccess(res);
          }
        },
        faill:function(res){
          doFail(res);
        }     
    })
  },
  globalData: {
    apiConfig:apiConfig,
    userInfo: null,
    isIndexRefresh:false,
    isMeRefresh:false
  }
})