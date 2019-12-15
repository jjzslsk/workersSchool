
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startPage: 1,
    recordSize: 90,
    detailData:{},
    article:null,
    cmtPlaceholder: '请输入评论内容',
    openCmt: false,
    detail: '',
    isLike:'0',
    content:'',
    lid:'',
    cmtList: [],
    picListUrl:'',
  },

  openCmt: function (e) {
    this.setData({
      openCmt: true
    })
  },

  hideCmt: function (e) {
    this.setData({
      openCmt: false
    })
  },

  setViewCount: function (options) {
    var that = this
    var p = 'SUBJECT_ID=' + that.data.lid + '&CLIENT_ID=' + app.globalData.userId + '&BROWSE_NUMBER=1'
    app.httpsPlatformClass('upBbsBrowseNum', p,
      function (res) {

      },
      function (returnFrom, res) {
        //失败
        wx.hideLoading();
      }
    );
  },

  getCmtList: function () {
    var that = this
    var p = 'PARENT_SUBJECT_ID=' + this.data.lid + '&START_POSITION=0' + '&END_POSITION=30'
    app.httpsGetDatByPlatform('bbs_subject_reply_list', 'list', p,
      function (res) {
        for (var i = 0; i < res.msg.length; i++) {
          var name = res.msg[i].CLIENT_NAME.substr(0, 1) + '**'
          res.msg[i].showName = name
          res.msg[i].CRETAE_DATE = res.msg[i].CRETAE_DATE.substring(0, 16)
          res.msg[i].CRETAE_DATE = res.msg[i].CRETAE_DATE.replace(/-/g, "/");
        }

        that.setData({
          cmtList: res.msg
        });

      },
      function (returnFrom, res) {
        //失败
        wx.hideLoading();
      }
    );
  },

  onInputChange: function (e) {
    var val = e.detail.value
    this.setData({
      content: val
    })
  },

  comment: function (e) {
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

    var content = this.data.content
    if (content == '' || content.match(/^\s+$/g)) {//判空
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none',
        duration: 2000
      })
      return
    }

    wx.showLoading({
      title: '提交中',
    })

    var that = this
    var p = 'FLAG=1&BBS_ID=2' + '&PARENT_SUBJECT_ID=' + this.data.lid + '&SUBJECT_MEMO=' + content + '&CLIENT_ID=' + app.globalData.userId

    app.httpsPlatformClass('saveSubject', p,
      function (res) {
        wx.hideLoading();
        var msg = JSON.parse(res.msg)
        if (msg.code == '0') {
          that.getCmtList()
          that.hideCmt()
        }

      },
      function (returnFrom, res) {
        //失败
        wx.hideLoading();
      }
    );
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setViewCount(options)
    that.setData({
      lid:options.articleId,
      picListUrl:options.picListUrl
    })
    var p = 'SUBJECT_ID=' + that.data.lid;
    app.httpsGetDatByPlatform('bbs_subject_info', 'map', p,
      function (res) {
        var imgs = []
        if (res.msg.IMG_LIST) {
          var IMG_LIST = JSON.parse(res.msg.IMG_LIST)
          for (var i = 0; i < IMG_LIST.length; i++) {
            imgs[i] = IMG_LIST[i].ATT_DOMAIN + IMG_LIST[i].ATT_WEB_URL

            var url = IMG_LIST[i].ATT_WEB_URL.split('mp4')
            if (url.length > 1) {
              res.msg.videoPath = IMG_LIST[i].ATT_DOMAIN + IMG_LIST[i].ATT_WEB_URL
            }
          }
        }
        res.msg.imgs = imgs

        that.setData({
          detail: res.msg,
          isLike: res.msg.ZAN_FLAG
        });

      },
      function (returnFrom, res) {
        //失败
        wx.hideLoading()
      }
    );


    
    var aParam1 = 'shopId=' + app.globalData.userId + '&type=Article_CLASS_1&articleId=' + that.data.lid + '&startPage=' + that.data.startPage + '&recordSize=' + that.data.recordSize;;
    wx.showLoading({
      title: '加载中',
    })
    app.httpsDataGet('/school/getArticleListForSchool', aParam1,
      function (res) {
        if (res.status) {
          if (res.data.length > 0) {
            let detailData = res.data[0]
            detailData.createDate = res.data[0].createDate.substring(0, 16)
            let createDate = detailData.createDate
            detailData.createDate = createDate.replace(/-/g, "/");
            that.setData({
              detailData
            });
            that.setData({
              ['detailData.articleNotes']: res.data[0].articleNotes.replace(/\<img/gi, '<img style="width:100%;height:100%" '),
            });
            console.log(JSON.stringify(that.data.detailData))
          }
        }
      },
      function (res) {
        //失败
        wx.hideLoading()

      }
    )

    this.getCmtList()


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