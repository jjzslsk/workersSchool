// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_scroll1:'tab1',
    current_scroll2:'tab2',
    current_scroll3:'tab3',
  },

  handleChangeScroll1 ({ detail }) {
    this.setData({
        current_scroll1: detail.key
    });
  },
  handleChangeScroll2 ({ detail }) {
    this.setData({
        current_scroll2: detail.key
    });
  },
  handleChangeScroll3 ({ detail }) {
    this.setData({
        current_scroll3: detail.key
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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