// pages/mall/mall.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mallImg: app.globalData.url +'/photo/zxj_shop_icon/advertisingImg/shop_main1.jpg'
  },

  openMall: function (e) {
    wx.navigateToMiniProgram({
      appId: 'wxc6c07271d6c38f13',//要打开的小程序 appId
      path: '',//打开的页面路径，如果为空则打开首页
      extraData: {},//需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
      envVersion: 'release',//要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。(开发版:develop,体验版:trial,正式版:release)
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
    // this.openMall()
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