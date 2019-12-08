const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_scroll1:'tab1',
    current_scroll2:'tab2',
    current_scroll3:'tab3',
    goodsCollectList:[],
    advanced:[],
    current_scroll:'',
    searchKey:[],
    isColor:false
  },

   //获取商品收藏列表
   getGoodsCollectList: function() {
    var that = this;
    var param
    app.httpsGetDatByPlatform('params_class_xg_tree', 'list',param,
      function(res) {
        //成功
        that.setData({
          goodsCollectList: res.msg,
        });
        that.classifyInfo()
      },
      function(returnFrom, res) {
        //失败
        wx.hideLoading();
      });
  },

  classifyInfo(id){ //分组 拿子级的父ID遍历得到，父对象数组advanced
    var that = this;
    var CLASS_PARENT_ID = that.data.goodsCollectList[0].CLASS_PARENT_ID
    var advanced = []
    that.data.goodsCollectList.forEach((element,index) => {
      if(CLASS_PARENT_ID == element.CLASS_PARENT_ID){
        advanced.push (element)
      }

      let temp_str ='goodsCollectList['+index+'].checked'; //加入默认checked
      this.setData({
          [temp_str]:false
      })

      // let temp_strs ='goodsCollectList['+ 0 +'].checked'; //加入默认checked
      // this.setData({
      //     [temp_strs]:true
      // })

    });

    that.setData({
      advanced : advanced
    })
  },

  handleChangeScroll1 ({ detail }) {
    var searchKey = []
    // if(this.data.searchKey.length > 3){
      // this.data.searchKey.join(","); 

    // }
    // else {
      // console.log (detail)
      searchKey.push(detail.key)
      this.setData({
        searchKey:searchKey,
        current_scroll: detail.key
      })
    // }
    console.log (this.data.searchKey)

  },

  tabItem(detail){
    console.log (this.data.searchKey.lenght)
    console.log (detail)
    var searchKey = this.data.searchKey
    console.log (detail.currentTarget.dataset.items)

    if(searchKey.lenght == 0){
      console.log ('4')
      searchKey.push(detail.currentTarget.dataset.items)
      this.setData({
        searchKey:searchKey,
        current_scroll : detail.currentTarget.dataset.items.SYS_PARAMS_CLASS_ID
      })
      console.log (this.data.searchKey)
    }else{
      // searchKey.forEach((searchKeyItems)=>{
      //   if(searchKeyItems.SYS_PARAMS_CLASS_ID != detail.currentTarget.dataset.items.SYS_PARAMS_CLASS_ID){}
      //     searchKey.push(detail.currentTarget.dataset.items)
      //     this.setData({
      //       searchKey:searchKey,
      //       current_scroll : detail.currentTarget.dataset.items.SYS_PARAMS_CLASS_ID
      //     })
      // })
    }

    let temp_strs ='goodsCollectList['+ detail.currentTarget.dataset.itemsindex +'].checked'; //加入默认checked
    this.setData({
        [temp_strs]:true
    })
    

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
    this.getGoodsCollectList()
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