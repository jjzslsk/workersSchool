
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData:{},
    article:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var aParam1 = 'shopId=' + app.globalData.userId + '&type=Article_CLASS_1&articleId=' + options.id;
    wx.showLoading({
      title: '加载中',
    })
    app.httpsDataGet('/shop/getArticleListForSchool', aParam1,
      function (res) {
        if (res.status) {
          if (res.data.length > 0) {
            
            that.setData({
              detailData: res.data[0],
              // article:res.data.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
            });
            that.setData({
              ['detailData.articleNotes']: res.data[0].articleNotes.replace(/\<img/gi, '<img style="width:100%;height:100%" '),
              // article:res.data.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
            });
            console.log ('11'+that.data.detailData.articleNotes)
          }
        }
      },
      function (res) {
        //失败
        wx.hideLoading()

      }
    )

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