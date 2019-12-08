// pages/suggestProRes/suggestProRes.js
const app = getApp();
var userId = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },

  httpsDataList:function(){
    var that = this;
    var param = 'CLIENT_ID=' + userId;
    app.httpsGetDatByPlatform('advice_list', 'list', param,
      function (res) {
        //成功
        that.setData({
          dataList: res.msg
        });
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
    userId = app.globalData.userId;
    wx.showLoading();
    this.httpsDataList();
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