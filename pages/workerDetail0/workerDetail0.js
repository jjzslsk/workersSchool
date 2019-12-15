// pages/findWorker/findWorker.js
const app = getApp()
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workerId:'',
    classId:'',
    className:'',
    detail:'',
    workerTypeName:[],
    workerTypeId: [],
    qualification:[],
    workPics:[],
    bbsList:[],
    isConcern:'0'
  },

  userImg(){
    wx.previewImage({
      current: this.data.detail.AVATAR, // 当前显示图片的http链接
      urls: [this.data.detail.AVATAR] // 需要预览的图片http链接列表
    })
  },

  postRequire: function (e) {
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
    // wx.navigateTo({
    //   url: '/pages/postStep/postStep?id=' + this.data.classId + '&name=' + this.data.className + '&type=book' + '&workerId=' + this.data.detail.CLIENT_ID + '&workerName=' + this.data.detail.CLIENT_ACCOUNT
    // })

    if (!this.data.detail.CLIENT_ID)
      return

    var workerClass = JSON.stringify(this.data.detail.workerType)
    wx.navigateTo({
      url: '/pages/postNote/postNote?id=' + this.data.classId + '&name=' + this.data.className + '&type=book' + '&workerId=' + this.data.detail.CLIENT_ID + '&workerName=' + this.data.detail.CLIENT_ACCOUNT + '&workerClass=' + workerClass
    })


    // var that=this
    // wx.showActionSheet({
    //   itemList: this.data.workerTypeName,
    //   success(res) {
    //     wx.navigateTo({
    //       url: '/pages/postStep/postStep?id=' + that.data.workerTypeId[res.tapIndex] + '&name=' + that.data.workerTypeName[res.tapIndex] + '&type=book' + '&workerId=' + that.data.detail.CLIENT_ID + '&workerName=' + that.data.detail.CLIENT_ACCOUNT
    //     })
    //   },
    //   fail(res) {
    //     console.log(res.errMsg)
    //   }
    // })
  },

  markertap: function (e) {

  },

  focusWorker: function (e) {
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

    if (!this.data.detail.CLIENT_ID)
      return

    var isConcern=this.data.isConcern
    if (isConcern == '1' || isConcern == 1)
      isConcern = '0'
    else
      isConcern = '1'
    var that=this
    var param = 'userId=' + app.globalData.userId + '&beConcernId=' + this.data.detail.CLIENT_ID
    app.httpsDataGet('/worker/concern', param,
      function (res) {
        that.setData({
          isConcern: isConcern
        })
      },
      function (returnFrom, res) {
        //失败
        wx.hideLoading()
      }
    )
  },

  openWorkerLog: function (e) {
    wx.navigateTo({
      url: '/pages/workerLog/workerLog?id='+this.data.detail.CLIENT_ID + '&name=' + this.data.detail.CLIENT_ACCOUNT
    })
  },

  moreCmt: function (e) {
    wx.navigateTo({
      url: '/pages/workerCmt/workerCmt?id=' + this.data.detail.CLIENT_ID + '&name=' + this.data.detail.CLIENT_ACCOUNT
    })
  },

  openWorkerLogDetail: function (e) {
    var lid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/workerLogDetail/workerLogDetail?id=' + this.data.detail.CLIENT_ID + '&name=' + this.data.detail.CLIENT_ACCOUNT + '&lid=' + lid
    })
  },

  previewImage: function (e) {
    var type = e.currentTarget.dataset.type
    var i = e.currentTarget.dataset.i
    var pickedImgs = this.data.qualification
    if (type == 'workPics')
      pickedImgs = this.data.workPics
    wx.previewImage({
      current: pickedImgs[i], // 当前显示图片的http链接
      urls: pickedImgs // 需要预览的图片http链接列表
    })
  },

  /**聊一聊 */
  chatTap: function (e) {
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
    if (app.globalData.userId == this.data.detail.CLIENT_ID){
      wx.showModal({
        title: '提示',
        content: '不能与自己聊天',
        showCancel:false,
        success(res) {
          if (res.confirm) {

          }
        }
      })
      return
    }
    if (!this.data.detail.CLIENT_ID)
      return
      
    var param = 'orderId=&otherPayId=' + this.data.detail.CLIENT_ID + '&otherPayName=' + this.data.detail.CLIENT_ACCOUNT + '&otherPayAva=' + this.data.detail.AVATAR;
    wx.navigateTo({
      url: '/pages/chat/chat?' + param
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id//'1903141141000740'//
    var classId = ''
    if (options.classId)
      classId = options.classId

    var className = ''
    if (options.className)
      className = options.className

    this.setData({
      workerId: id,
      classId: classId,
      className: className
    });

    var that = this;

    wx.showLoading({
      title: '加载中',
    })

    
    var param = 'clientId=' + id + '&userId=' + app.globalData.userId;
    // app.httpsDataGet('/worker/getWorkerDetail', param,
    //   function (res) {
    //     var workerTypeName = []
    //     var workerTypeId = []
    //     if (res.data.workerType && res.data.workerType.length>0){
    //       for (var i = 0; i < res.data.workerType.length;i++){
    //         workerTypeName.push(res.data.workerType[i].class_name)
    //         workerTypeId.push(res.data.workerType[i].CLIENT_CLASS_ID)
    //       }
          
    //     }

    //     var qualification = []
    //     for (var i = 0; i < res.data.qualification.length; i++) {
    //       qualification[i] = res.data.qualification[i].url
    //     }

    //     var workPics = []
    //     for (var i = 0; i < res.data.workPics.length; i++) {
    //       workPics[i] = res.data.workPics[i].url
    //     }

    //     var cmts = []
    //     var cmts_i=0
    //     for (var i = 0; i < res.data.comments.length; i++) {
    //       if (res.data.comments[i].content){
    //         var name = res.data.comments[i].CLIENT_ACCOUNT.substr(0, 1) + '**'
    //         res.data.comments[i].clientName = name
            
    //         cmts[cmts_i] = res.data.comments[i]
    //         cmts_i++
    //       }
    //     }

    //     res.data.mainComments = cmts

    //     res.data.shortName = res.data.CLIENT_ACCOUNT.substr(0, 1) + '师傅'

    //     that.setData({
    //       detail: res.data,
    //       workerTypeName: workerTypeName,
    //       workerTypeId: workerTypeId,
    //       qualification: qualification,
    //       workPics: workPics,
    //       isConcern: res.data.isConcern
    //     });

    //   },
    //   function (returnFrom, res) {
    //     //失败
    //     wx.hideLoading()
    //   }
    // )

    var p = 'CLIENT_ID=' + id + '&START_POSITION=0' + '&END_POSITION=30' + '&MY_CLIENT_ID=' + app.globalData.userId
    app.httpsGetDatByPlatform('bbs_my_page', 'list', p,
      function (res) {
        //console.log('bbs_my_page1:' + JSON.stringify(res));
        for (var i = 0; i < res.msg.length;i++){
          var imgs=''
          if (res.msg[i].IMG_LIST){
            imgs = JSON.parse(res.msg[i].IMG_LIST)
            for (var j = 0; j < imgs.length; j++) {
              var url = imgs[j].URL.split('mp4')
              //console.log(res.msg[i].SUBJECT_TITLE+'url.length:'+url.length)
              if(url.length>1){
                res.msg[i].videoPath = imgs[j].URL
              } 
            }
          }

          res.msg[i].IMG_LIST=imgs          
        }
        //console.log('bbs_my_page2:' + JSON.stringify(res));
        that.setData({
          bbsList: res.msg
        });

      },
      function (returnFrom, res) {
        //失败
        wx.hideLoading();
      }
    );
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
    var that=this
    var p = 'CLIENT_ID=' + this.data.workerId + '&START_POSITION=0' + '&END_POSITION=30' + '&MY_CLIENT_ID=' + app.globalData.userId
    app.httpsGetDatByPlatform('bbs_my_page', 'list', p,
      function (res) {
        //console.log('bbs_my_page1:' + JSON.stringify(res));
        for (var i = 0; i < res.msg.length; i++) {
          var imgs = ''
          if (res.msg[i].IMG_LIST) {
            imgs = JSON.parse(res.msg[i].IMG_LIST)
            for (var j = 0; j < imgs.length; j++) {
              var url = imgs[j].URL.split('mp4')
              //console.log(res.msg[i].SUBJECT_TITLE+'url.length:'+url.length)
              if (url.length > 1) {
                res.msg[i].videoPath = imgs[j].URL
              }
            }
          }

          res.msg[i].IMG_LIST = imgs
        }
        //console.log('bbs_my_page2:' + JSON.stringify(res));
        that.setData({
          bbsList: res.msg
        });

      },
      function (returnFrom, res) {
        //失败
        wx.hideLoading();
      }
    );
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