// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,//微信用户信息
    statusCount: {},
    unreadCountTotal: 0,
    procedureImg: app.globalData.url + '/photo/zxj_shop_icon/advertisingImg/procedure.png',
    myBalance: '0.00'
  },

  editorCilck(){
    wx.switchTab({
      url: '/editor/editor',
      })
  },

  articleList(e){
    wx.navigateTo({
      url: '/pages/articleList/articleList?userid=' + e.currentTarget.dataset.userid
    }) 
  },

  /**验证码登录状态 */
  checkLogin: function () {
    var resule = true;
    if (this.data.userInfo == null || this.data.userInfo == '') {
      resule = false;
      wx.showModal({
        title: '尚未登录',
        content: '请先登录在操作',
        showCancel: false,
        success: res => { }
      })
    }
    return resule;
  },

  /**去登录 */
  loginTap: function (e) {
    var userInfo = this.data.userInfo;
    if (userInfo == null || userInfo == '') {
      wx.navigateTo({
        url: '/pages/bindPhone/bindPhone'
      })
    }
  },

  openMyOrders: function (e) {
    if (app.globalData.userInfo == undefined || app.globalData.userInfo == null || app.globalData.userInfo == '') {
      wx.showModal({
        title: '提示',
        content: '您未登录，请先登录再操作。是否前往登录？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/bindPhone/bindPhone'
            })
          }
        }
      })
      return
    }
    var status = e.currentTarget.dataset.status;
    wx.navigateTo({
      url: '/pages/myOrders/myOrders?status=' + status
    })
  },

  openMyProject: function (e) {
    if (app.globalData.userInfo == undefined || app.globalData.userInfo == null || app.globalData.userInfo == '') {
      wx.showModal({
        title: '提示',
        content: '您未登录，请先登录再操作。是否前往登录？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/bindPhone/bindPhone'
            })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: '/pages/project/project'
    })
  },

  openOwnerBBS: function (e) {
    if (app.globalData.userInfo == undefined || app.globalData.userInfo == null || app.globalData.userInfo == '') {
      wx.showModal({
        title: '提示',
        content: '您未登录，请先登录再操作。是否前往登录？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/bindPhone/bindPhone'
            })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: '/pages/ownerBBS/ownerBBS'
    })
  },

  onMessageTap: function (e) {
    if (app.globalData.userInfo == undefined || app.globalData.userInfo == null || app.globalData.userInfo == '') {
      wx.showModal({
        title: '提示',
        content: '您未登录，请先登录再操作。是否前往登录？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/bindPhone/bindPhone'
            })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: '/pages/chatMessage/chatMessage'
    })
  },

  openWXSubscription: function (e) {
    if (app.globalData.userInfo == undefined || app.globalData.userInfo == null || app.globalData.userInfo == '') {
      wx.showModal({
        title: '提示',
        content: '您未登录，请先登录再操作。是否前往登录？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/bindPhone/bindPhone'
            })
          }
        }
      })
      return
    }
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/wxSubscription/wxSubscription?type=' + type
    })
  },
  /**投诉建议 */
  complaintAdviceTap: function (e) {
    if (app.globalData.userInfo == undefined || app.globalData.userInfo == null || app.globalData.userInfo == '') {
      wx.showModal({
        title: '提示',
        content: '您未登录，请先登录再操作。是否前往登录？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/bindPhone/bindPhone'
            })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: '/pages/complaintAdvice/complaintAdvice'
    })
  },
  openTobedone: function (e) {
    wx.showToast({
      title: '功能内测期，敬请期待！',
      icon: 'none',
      duration: 2000
    })
  },

  //打开页面
  openPage: function (e) {
    if (app.globalData.userInfo == undefined || app.globalData.userInfo == null || app.globalData.userInfo == '') {
      wx.showModal({
        title: '提示',
        content: '您未登录，请先登录再操作。是否前往登录？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/bindPhone/bindPhone'
            })
          }
        }
      })
      return
    }
    var type = e.currentTarget.dataset.type;
    var url = ''
    if (type == 'wzworker')
      url = '/pages/myWorker/myWorker'
    else if (type == 'bbs')
      url = '/pages/ownerBBS/ownerBBS'
    else if (type == 'shoplc')
      url = '/pages/myShop/myShop'
    if (url) {
      wx.navigateTo({
        url: url
      })
    }
    wx.setNavigationBarTitle({
      title: ''
    })
  },



  /**地址管理 */
  addressMagTap: function (e) {
    if (app.globalData.userInfo == undefined || app.globalData.userInfo == null || app.globalData.userInfo == '') {
      wx.showModal({
        title: '提示',
        content: '未登录,请登录或注册',
        showCancel: false,
      })
    } else {
      // if (!this.checkLogin()) return;
      wx.navigateTo({
        url: '/pages/addressMg/addressMg?action=0'
      })
    }
  },

  /**客服中心 */
  openHelp: function (e) {
    if (app.globalData.userInfo == undefined || app.globalData.userInfo == null || app.globalData.userInfo == '') {
      wx.showModal({
        title: '提示',
        content: '您未登录，请先登录再操作。是否前往登录？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/bindPhone/bindPhone'
            })
          }
        }
      })
      return
    }

    var param = 'orderId=&otherPayId=' + app.customerService.id + '&otherPayName=' + app.customerService.name + '&otherPayAva=' + app.customerService.avatar
    wx.navigateTo({
      url: '/pages/chat/chat?' + param
    })
  },

  /**常见问题 */
  openQuestions: function (e) {
    // if (!this.checkLogin()) return;
    wx.navigateTo({
      url: '/pages/usualQuestion/usualQuestion'
    })
  },

  /**投诉建议 */
  openSuggest: function (e) {
    if (app.globalData.userInfo == undefined || app.globalData.userInfo == null || app.globalData.userInfo == '') {
      wx.showModal({
        title: '提示',
        content: '您未登录，请先登录再操作。是否前往登录？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/bindPhone/bindPhone'
            })
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: '/pages/suggest/suggest'
    })
  },

  openMall: function (e) {
    var page = e.currentTarget.dataset.page;
    console.log(page);
    wx.navigateToMiniProgram({
      appId: 'wx4ae069d1473a78ce',//要打开的小程序 appId
      path: page,//打开的页面路径，如果为空则打开首页
      extraData: {},//需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
      envVersion: 'develop',//要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。(开发版:develop,体验版:trial,正式版:release)
      success(res) {
        // 打开成功
        console.log('打开成功:' + JSON.stringify(res))
      },
      fail(res) {
        // 打开失败
        console.log('打开失败:' + JSON.stringify(res))
      }
    })
  },

  refreshData: function () {
    var that = this
    this.setData({
      userInfo: app.globalData.userInfo
    });

    // var param = 'userId=' + app.globalData.userId;
    // app.httpsDataGet('/worker/userOrderCount', param,
    //   function (res) {
    //     console.log('userOrderCount:' + JSON.stringify(res));

    //     that.setData({
    //       statusCount: res.data
    //     });
    //   },
    //   function (returnFrom, res) {
    //     //失败
    //     wx.hideLoading()
    //   }
    // )

    // app.getAccountBalance(function (res) {
    //   console.log('getAccountBalance:' + JSON.stringify(res));
    //   that.setData({
    //     myBalance: res
    //   });
    // });

    // this.upChatUnreadCount()
  },

  upChatUnreadCount: function () {
    var chatMsgList = app.readChatMsgList();
    var unreadCountTotal = 0;
    for (var index in chatMsgList) {
      var unreadCount = chatMsgList[index].otherPayInfo.unreadCount == undefined ? 0 : chatMsgList[index].otherPayInfo.unreadCount;
      unreadCountTotal = app.accAdd(Number(unreadCountTotal), Number(unreadCount));
    }

    if (unreadCountTotal == undefined || unreadCountTotal == null || unreadCountTotal == '' || unreadCountTotal == 0) {
      unreadCountTotal = 0
    } else {
      if (Number(unreadCountTotal) > 99) {
        unreadCountTotal = '99..'
      }
    }

    this.setData({
      unreadCountTotal: unreadCountTotal
    });

    console.log('unreadCountTotal::' + unreadCountTotal)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this
    // var param = 'userId=' + app.globalData.userId;
    // app.httpsDataGet('/worker/userOrderCount', param,
    //   function (res) {
    //     console.log('userOrderCount:' + JSON.stringify(res));

    //     that.setData({
    //       statusCount: res.data
    //     });

    //   },
    //   function (returnFrom, res) {
    //     //失败
    //     wx.hideLoading()
    //   }
    // )

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
    var that = this;
    if (app.globalData.userInfo == undefined || app.globalData.userInfo == null || app.globalData.userInfo == '') {
      app.wxLogin().then(function (res) {
        that.refreshData();
      })
    } else {
      that.refreshData();
    }
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