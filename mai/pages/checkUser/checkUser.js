// pages/checkUser/checkUser.js
const app = getApp()
const uploadUrl = require('../../config').uploadUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photos: [],
    photoStr: '',
    idCardImg: [],
    majorIndex: [0, 0, 0],
    majorArray: [
      [],
      [],
      []
    ],
    pickerArry: [],
    sName: '',
    dName: '',
    mName: '',
    closeStyle: 'display:block'
  },
  // 选择上传图片
  chooseImage: function() {
    var that = this;
    wx.chooseImage({
      count: 2,
      success: function(res) {
        var photosArr = that.data.photos;
        if (that.data.photos.length >= 2) {
          //超过2张图片
          wx.showToast({
            title: '最多可选2张',
            icon: 'none',
            duration: 1000,
            mask: true
          })
        } else { //没超过2张图片
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            wx.uploadFile({
              url: uploadUrl,
              filePath: res.tempFilePaths[i],
              name: 'file',
              success: function(res) {
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
  delImg: function(e) {
    var that = this;
    var _index = e.currentTarget.dataset.index;
    var theimg = that.data.photos;
    theimg.splice(_index, 1);
    that.setData({
      photos: theimg
    })
  },
  bindMultiPickerChange: function(e) {
    this.setData({
      majorIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function(e) {
    var that = this;
    that.setData({
      sName: '',
      dName: '',
      mName: ''
    })
    var data = {
      majorArray: that.data.majorArray,
      majorIndex: that.data.majorIndex,

    };
    data.majorIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        var school_id = data.majorArray[0][e.detail.value].id;
        //查找colum2/3数据
        data.majorArray[1] = that.data.pickerArry[1].deptList.filter(e => e.schoolId == school_id);
        data.majorArray[2] = that.data.pickerArry[2].majorList.filter(e => e.deptId == data.majorArray[1][0].id);
        data.majorIndex[1] = 0;
        data.majorIndex[2] = 0;
        break
      case 1:
        var dept_id = data.majorArray[1][e.detail.value].id;
        //查找colum3数据
        data.majorArray[2] = that.data.pickerArry[2].majorList.filter(e => e.deptId == dept_id);
        data.majorIndex[2] = 0
        break
    }
    this.setData(data)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserInfoById();
    this.getMajorData();
    this.setData({
      'imgHost': app.globalData.apiConfig.imgHost
    })
  },
  getUserInfoById() {
    const that = this;
    let token = wx.getStorageSync('token');
    let userInfo = {
      'mid': wx.getStorageSync('mid')
    };
    that.setData({
      userInfo: userInfo
    })
    if (token) {
      if (!that.data.isPullDownRefresh) {
        wx.showLoading({
          title: '拼命加载中...',
          icon: 'loading',
          mask: true
        })
      } else {
        wx.showNavigationBarLoading(); //在标题栏中显示加载
      }

      //获取用户信息
      app.requestFun(
        app.globalData.apiConfig.getUserInfoById,
        'GET', {
          'id': userInfo.mid
        },
        function(res) {
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
          if (res.statusCode == 200) {
            wx.hideLoading();
            if (res.data.code == 1) {
              res.data.data.avatarUrl = res.data.data.headimg;
              var imgArr = [];
              if (res.data.data.idCardImg != "") {
                for (var i = 0; i < res.data.data.idCardImg.split(",").length; i++) {
                  imgArr.push(
                    res.data.data.idCardImg.split(",")[i]
                  )
                }
              }
              if (res.data.data.status == '1011') { //已认证
                that.setData({
                  closeStyle: 'display:none'
                })
              }
              that.setData({
                userInfo: res.data.data,
                photos: imgArr
              })
            }
          }
        }
      )
      
    } else {
      wx.reLaunch({
        url: "/pages/login/login"
      })
    }
  },
  getMajorData() {
    const that = this;
    let token = wx.getStorageSync('token');
    if (token) {
      if (!that.data.isPullDownRefresh) {
        wx.showLoading({
          title: '拼命加载中...',
          icon: 'loading',
          mask: true
        })
      } else {
        wx.showNavigationBarLoading(); //在标题栏中显示加载
      }
      //获取所有学校院系专业
      app.requestFun(
        app.globalData.apiConfig.getMajorData,
        'GET', {},
        function(res) {
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
          if (res.statusCode == 200) {
            wx.hideLoading();
            var data = {
              majorArray: that.data.majorArray,
            }
            var schoolArr = res.data[0].schoolList.filter(e => e.id == that.data.userInfo.schoolId);
            var deptArr = res.data[1].deptList.filter(e => e.id == that.data.userInfo.deptId);
            var majorArr = res.data[2].majorList.filter(e => e.id == that.data.userInfo.majorId);
            that.setData({
              pickerArry: res.data,
              sName: schoolArr[0].name,
              dName: deptArr[0].name,
              mName: majorArr[0].name,
            });
            data.majorArray[0] = res.data[0].schoolList;
            data.majorArray[1] = res.data[1].deptList.filter(e => e.schoolId == res.data[0].schoolList[0].id);
            data.majorArray[2] = res.data[2].majorList.filter(e => e.deptId == res.data[1].deptList[0].id);
            that.setData({
              majorArray: data.majorArray
            })
          }
        }
      )
    } else {
      wx.reLaunch({
        url: "/pages/login/login"
      })
    }
  },
  formSubmit: function(e) {
    var that = this;
    let {
      userName,
      idNum
    } = e.detail.value;
    if (!userName || !idNum) {
      wx.showToast({
        title: '必填项不得为空',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    if (that.data.photos.length != 2) {
      wx.showToast({
        title: '请上传两张图片',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    var tempStr = '';
    for (var i = 0; i < that.data.photos.length; i++) {
      if (i == 0) {
        tempStr += that.data.photos[i]
      } else {
        tempStr = tempStr + ',' + that.data.photos[i]
      }
    }
    that.data.photoStr = tempStr;
    var user = {};
    user.id = that.data.userInfo.id;
    user.userName = userName;
    user.idNum = idNum;
    user.idCardImg = that.data.photoStr;
    user.schoolId = that.data.majorArray[0][that.data.majorIndex[0]].id;
    user.deptId = that.data.majorArray[1][that.data.majorIndex[1]].id;
    user.majorId = that.data.majorArray[2][that.data.majorIndex[2]].id;
    app.requestFun(
      app.globalData.apiConfig.authCenter,
      'GET',
      user,
      function(res) {
        if (res.data.code = 1) {
          res.data.userInfo.avatarUrl = res.data.userInfo.headimg;
          that.setData({
            userInfo: res.data.userInfo
          })
          wx.showToast({
            title: '信息提交成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function() {
            wx.switchTab({
              url: '../../pages/me/me',
            })
          }, 1500)
        }
      }
    )
  },
  formReset() {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})