var util = require('../../util.js');
//获取应用实例
const app = getApp()
Page({
  data: {
    postCateBook:[],
    postCateEle:[],
    postCateLife:[],
    postCate:[],
    schoolArray: [],
    schoolIdArray: [],
    index: 0,
    schoolId: 0,
    userInfo: null,
    currentTab: 0,
    inputShowed: false,
    inputVal: "",
    curPage1: 1, //二手物品当前第几页
    pageNum1: 10, //每页几条数据
    curPage2: 1,//求购物品当前第几页
    pageNum2: 10,//每页几条数据
    isShowLoadMore1: false, //是否正在上拉加载更多
    isShowLoadMore2: false, //是否正在上拉加载更多
    loadText1: '加载中', //加载容器的文本内容
    loadText2: '加载中', //加载容器的文本内容
    isPullDownRefresh: false, //判断是否正在下拉刷新
    imgHost: '', //用于存放图片的主机名前缀
    goodList: [], //商品列表
    wantList: [], //求购列表
    status: 1010 ,//用户认证状态，如果非认证状态不让查看商品
    upTob:false
  },
  goList: function (e){
    var _id=e.currentTarget.dataset.id;
    var _name=e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../cateGoodList/cateGoodList?cateid='+_id+'&name='+_name
    })
  },
  goClass: function(e){
    wx.navigateTo({
      url: '../classify/classify'
    })
  },
  goTob(){
    app.globalData.isIndexRefresh = true;
    this.setData({ 
      goodList: [], wantList: [], upTob: false,
      curPage1: 1,  
      curPage2: 1,});
    this.onShow();
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

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
  onLoad: function(options) {
    let token = wx.getStorageSync('token');
    if (token) {
      if (options.goodId) {
        wx.navigateTo({
          url: '../goodDetail/goodDetail?id=' + options.goodId
        })
      }
      var that = this;
      that.getAllSchool();
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            clientHeight: res.windowHeight
          });
        }
      })
      that.setData({
        'imgHost': app.globalData.apiConfig.imgHost
      })
      that.getGoodList(that.data.schoolId);
      that.getWantList(that.data.schoolId);
      that.getUserInfoById();
    } else {
      wx.reLaunch({
        url: "/pages/login/login"
      })
    }
    var that=this;
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
        if (res.statusCode==200){
          that.setData({
            'postCate': res.data,
            'postCateBook':res.data[0],
            'postCateEle':res.data[10],
            'postCateLife':res.data[9],
          })
        }else{
          wx.showToast({
            title: '获取帖子分类失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    )
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
    this.setData({
      schoolId: this.data.schoolIdArray[e.detail.value],
      curPage1: 1,
      pageNum1: 10,
    })
    this.getGoodList(this.data.schoolId);
    this.getWantList(this.data.schoolId);
  },
  //跳转至发布二手商品
  goAddGood: function() {
    if (this.data.status == 1011) {
      //跳转至新增发布页面
      wx.navigateTo({
        url: '../add/add'
      })
    } else {
      wx.showToast({
        title: '账户未认证或者已冻结，无法发布',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //跳转至发布求购商品
  goWantGood: function() {
    if (this.data.status == 1011) {
      //跳转至新增发布页面
      wx.navigateTo({
        url: '../want/want'
      })
    } else {
      wx.showToast({
        title: '账户未认证或者已冻结，无法发布',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //跳转至商品详情页面
  goGoodCon: function(e) {
    var _id = e.currentTarget.dataset.id;
    var _userId = e.currentTarget.dataset.userid;
    var _goodno = e.currentTarget.dataset.goodno;
    var that = this;
    if (that.data.status == 1011) {
      if (_goodno.indexOf("SP") != -1) {
        wx.navigateTo({
          url: '../goodDetail/goodDetail?id=' + _id + '&userId=' + _userId
        })
      } else {
        wx.navigateTo({
          url: '../wantDetail/wantDetail?id=' + _id + '&userId=' + _userId
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
  getGoodList: function(schoolId) {
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
      //发送请求获取相关商品列表
      app.requestFun(
        app.globalData.apiConfig.getAllGoodsUrl,
        'GET', {
          userId: wx.getStorageSync('mid'),
          curPage: that.data.curPage1,
          pageNum: that.data.pageNum1,
          schoolId: schoolId
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
            if (res.data.length > 0) {
              for (var i = 0; i < res.data.length; i++) {
                var imgArr = [];
                res.data[i].createTime = util.formatDate(res.data[i].createTime);
                for (var j = 0; j < res.data[i].goodsImgs.split(",").length; j++) {
                  imgArr.push(res.data[i].goodsImgs.split(",")[j])
                }
                res.data[i].goodsImgs = imgArr;
              }
              if (that.data.curPage1 > 1) {
                that.setData({
                  goodList: that.data.goodList.concat(res.data),
                  isShowLoadMore1: false
                })
              } else {
                that.setData({
                  goodList: res.data
                })
              }
            } else {
              that.setData({
                goodList: res.data
              })
            }
            if (res.data.length < 10) {
              //没有更多数据了
              that.setData({
                isShowLoadMore1: true,
                loadText1: '没有更多商品了'
              })
            } else {
              //还有更多数据
              that.setData({
                isShowLoadMore1: false,
                loadText1: '加载中'
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
  //获取商品列表数据
  getWantList: function(schoolId) {
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
      //发送请求获取求购商品列表
      app.requestFun(
        app.globalData.apiConfig.getAllWantUrl,
        'GET', {
          userId: wx.getStorageSync('mid'),
          curPage: that.data.curPage2,
          pageNum: that.data.pageNum2,
          schoolId: schoolId,
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
            if (res.data.length > 0) {
              for (var i = 0; i < res.data.length; i++) {
                res.data[i].createTime = util.formatDate(res.data[i].createTime);
              }
              if (that.data.curPage2 > 1) {
                that.setData({
                  wantList: that.data.wantList.concat(res.data),
                  isShowLoadMore2: false
                })
              } else {
                that.setData({
                  wantList: res.data
                })
              }
            }
            if (res.data.length < 10) {
              //没有更多数据了
              that.setData({
                isShowLoadMore2: true,
                loadText2: '没有更多商品了'
              })
            } else {
              //还有更多数据
              that.setData({
                isShowLoadMore2: false,
                loadText2: '加载中'
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
  //获取学校列表数据
  getAllSchool: function() {
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
      app.globalData.apiConfig.getAllSchool,
      'GET', {},
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
          var schoolArr = ['全部'];
          var schoolIdArr = [0];
          for (var i = 0; i < res.data.length; i++) {
            schoolArr.push(res.data[i].name);
            schoolIdArr.push(res.data[i].id);
          }
          that.setData({
            schoolArray: schoolArr,
            schoolIdArray: schoolIdArr
          })
        }
      }
    )
  },
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
  //下拉刷新
  onPullDownRefresh: function() {
    var that = this;
    that.setData({
      'isPullDownRefresh': true,
      'curPage1': 1,
      'curPage2': 1
    })
    that.getGoodList(that.data.schoolId);
    that.getWantList(that.data.schoolId);
    that.getUserInfoById();
  },
  //上拉加载更多
  onReachBottom: function() {
    console.log("上拉刷新")
    this.setData({"upTob": true})
    var that = this;
    if (!that.data.isShowLoadMore1) {
      that.setData({
        'isShowLoadMore1': true,
        'curPage1': ++that.data.curPage1,
      })
      that.getGoodList(that.data.schoolId);
    }
    if (!that.data.isShowLoadMore2) {
      that.setData({
        'isShowLoadMore2': true,
        'curPage2': ++that.data.curPage2,
        "upTob":true
      })
      that.getWantList(that.data.schoolId);
    }
  },
  swiperChange: function(e) {
    var that = this
    that.setData({
      'currentTab': e.detail.current
    })
  },
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },

  onShow: function() {
    if (app.globalData.isIndexRefresh) {
      var that = this;
      that.getGoodList(that.data.schoolId);
      that.getWantList(that.data.schoolId);
      app.globalData.isIndexRefresh = false;
    }
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false,
      index: 0,
      curPage1: 1,
      curPage2: 1,
    });
    this.getGoodList(0);
    this.getWantList(0);
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  searchConfirm: function(e) {
    if (e != null && e != undefined) {
      if (e.detail.value == '') {
        wx.showToast({
          title: '请输入搜索内容',
          icon: 'none',
          duration: 2000
        })
      } else {
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
        var url, _curPage, _pageNum;
        if (that.data.currentTab == 0) { //二手商品
          url = app.globalData.apiConfig.selectGoodsByGoodsTitle;
          _pageNum = that.data.pageNum1;
        } else { //求购商品
          url = app.globalData.apiConfig.selectWantByWantTitle
          _pageNum = that.data.pageNum2;
        }
        app.requestFun(
          url,
          'GET', {
            userId: wx.getStorageSync('mid'),
            curPage: 1,
            pageNum: _pageNum,
            goodsTitle: e.detail.value
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
              that.setData({
                goodList: []
              })
              for (var i = 0; i < res.data.length; i++) {
                var imgArr = [];
                res.data[i].createTime = util.formatDate(res.data[i].createTime);
                if (that.data.currentTab == 0) {
                  for (var j = 0; j < res.data[i].goodsImgs.split(",").length; j++) {
                    imgArr.push(res.data[i].goodsImgs.split(",")[j])
                  }
                }
                res.data[i].goodsImgs = imgArr;
              }
              if (that.data.currentTab == 0) { //二手商品
                if (that.data.curPage1 > 1) {
                  that.setData({
                    goodList: that.data.goodList.concat(res.data),
                    isShowLoadMore1: false
                  })
                } else {
                  that.setData({
                    goodList: res.data
                  })
                }
                if (res.data.length < 10) {
                  //没有更多数据了
                  that.setData({
                    isShowLoadMore1: true,
                    loadText1: '没有更多商品了'
                  })
                } else {
                  //还有更多数据
                  that.setData({
                    isShowLoadMore1: false,
                    loadText1: '加载中'
                  })
                }
              } else {
                if (that.data.curPage2 > 1) {
                  that.setData({
                    wantList: that.data.wantList.concat(res.data),
                    isShowLoadMore2: false
                  })
                } else {
                  that.setData({
                    wantList: res.data
                  })
                }
                if (res.data.length < 10) {
                  //没有更多数据了
                  that.setData({
                    isShowLoadMore2: true,
                    loadText2: '没有更多商品了'
                  })
                } else {
                  //还有更多数据
                  that.setData({
                    isShowLoadMore2: false,
                    loadText2: '加载中'
                  })
                }
              }
            }
          }
        )
      }
    }

  }

});