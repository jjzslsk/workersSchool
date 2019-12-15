// pages/workerCmt/workerCmt.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id
    var that=this
    var param = 'clientId=' + id
    app.httpsDataGet('/worker/getWorkerDetail', param,
      function (res) {        
        for (var i = 0; i < res.data.comments.length;i++){
          var name = res.data.comments[i].CLIENT_ACCOUNT.substr(0,1)+'**'
          res.data.comments[i].clientName=name
        }
        that.setData({
          detail: res.data
        });

      },
      function (returnFrom, res) {
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