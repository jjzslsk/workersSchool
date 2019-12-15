const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.loginUser) {
      var type = options.type
      var url = app.globalData.gzhurl +'/zxj_company/weixin_gzh/MerberCenter.jsp?json=' + JSON.stringify(app.globalData.loginUser)

      if (type =='distribution'){
        url = app.globalData.gzhurl +'/zxj_company/weixin_gzh/my_team.jsp?clientId=' + app.globalData.userId
        wx.setNavigationBarTitle({
          title: '我的团队'
        })
      } else if (type == 'commission') {
        url = app.globalData.gzhurl + '/zxj_company/weixin_gzh/my_money.jsp?clientId=' + JSON.stringify(app.globalData.loginUser)
        wx.setNavigationBarTitle({
          title: '我的佣金'
        })
      } else if (type == 'wzworker') {
        url = app.globalData.gzhurl +'/zxj_company/weixin_gzh/worker.jsp?json=' + JSON.stringify(app.globalData.loginUser)
        wx.setNavigationBarTitle({
          title: '我做工匠'
        })  
      } else if (type == 'shoplc') {
        url = app.globalData.gzhurl +'/zxj_company/weixin_gzh/open_shop?json=' + JSON.stringify(app.globalData.loginUser)
        wx.setNavigationBarTitle({
          title: '我要开店'
        })
      } else if (type == 'myWallet') {
        url = app.globalData.gzhurl +'/zxj_company/weixin_gzh/my_details.jsp?json=' + JSON.stringify(app.globalData.loginUser)
        wx.setNavigationBarTitle({
          title: '我的明细'
        })
      }

      url = encodeURI(url)
      this.setData({
        url: url
      })
    }
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