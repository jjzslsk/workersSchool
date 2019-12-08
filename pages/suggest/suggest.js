// pages/suggest/suggest.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    call:'400-8798-980',
    placeHolder:'请留下您的宝贵意见或建议，我们将努力改进。并留下您的联系方式，方便我们联系您(最多500字)'
  },

  onFocus: function (e) {
    this.setData({
      placeHolder: ''
    })
  },

  onBlur: function (e) {
    this.setData({
      placeHolder: '请留下您的宝贵意见或建议，我们将努力改进。并留下您的联系方式，方便我们联系您(最多500字)'
    })
  },

  onInputChange: function (e) {
    var val = e.detail.value
    val = val.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/g, "");
    this.setData({
      content: val
    })
  },

  call: function (e){
    wx.makePhoneCall({
      phoneNumber: this.data.call
    })
  },

  /**查看处理结果 */
  selProRes:function(e){
    wx.navigateTo({
      url: '/pages/suggestProRes/suggestProRes'
    })
  },

  commitSuggest: function (e) {
    var content = this.data.content;
    if (content == undefined || content == null || content=='') {//判空
      wx.showToast({
        title: '请输入投诉建议内容',
        icon: 'none',
        duration: 2000
      })
      return
    }

    var param = 'CLIENT_ID=' + app.globalData.userId + '&CONTENT=' + content + '&SOURCE_TYPE=找工人用户';
    wx.showLoading({
      title: '提交中',
    })
    app.httpsPlatformClass('adviceSave', param,
      function (res) {
        //成功
        wx.hideLoading();
        var resultMsg = res.msg;
        var msgStr='';
        if (typeof resultMsg == 'object' && resultMsg) {
          //如果是json对象,不用做处理
          msgStr=resultMsg.msg;
        } else {
          //如果是json字符串，则需要处理成json对象
          if (resultMsg == '' || resultMsg == null) { } else {
            var objMsg = JSON.parse(resultMsg);
            msgStr=objMsg.msg;
          }
        }

        wx.showModal({
          title: '提示',
          content: msgStr,
          showCancel: false,
          success: res => {
            wx.navigateBack({delta: 1});
          }
        })
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