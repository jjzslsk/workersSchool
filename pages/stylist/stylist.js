const app = getApp()
Page({
  data: {
    startPage: 0,
    recordSize: 90,
    userList:[],
    pickedClass: 'ALL',
    pickedClassName: '全部',
  },

  diaryDetail: function (e){
    wx.navigateTo({
      url: '../detail/detail?articleId=' 
        + e.currentTarget.dataset.item.article.articleId
        + '&createName='
        + '&picListUrl='
    })
  },

  articleList(e){
    wx.navigateTo({
      url: '/pages/articleList/articleList?userid=' + e.currentTarget.dataset.userid
    }) 
  },


  openWorkerDetail: function (e) {
    var id = e.currentTarget.dataset.id.CLIENT_ID;
    wx.navigateTo({
      url: '/pages/workerDetail/workerDetail?id=' + id + '&classId=' + this.data.pickedClass + '&className=' + this.data.pickedClassName
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log (JSON.stringify(options.typeId))
    var that = this
    var Param = 'typeId=' + options.typeId + '&pageIndex=' + that.data.startPage + '&pageSize=' + that.data.recordSize;
    app.httpsDataGet('/school/getWorkerByType', Param,
      function (res) {
        if (res.status) {
          if (res.data.length > 0) {
            that.setData({
              userList: res.data,
            });

          } else {
            that.setData({
              userList: [],
            });
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