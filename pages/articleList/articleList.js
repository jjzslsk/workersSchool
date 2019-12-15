const app = getApp()
Page({
  data: {
    startPage:1,
    recordSize:90,
    goodsCollectList:[],
    advanced:[],
    current_scroll:'',
    searchKey:[],
    isColor:false,
    searchName:[],//关键词
    recommendList:[],
    parentColor:true,
    unfold:false,
    topBox:'',
  },

  onPageScroll: function (res) {
    if (res.scrollTop > this.data.topBox) {
      this.setData({ unfold: true })
    } else {
      this.setData({ unfold: false })
  }
  },

  unfoldClick(){
    
  },

   //声明节点查询的方法
   queryMultipleNodes: function(resolve) {
    const query = wx.createSelectorQuery()                // 创建节点查询器 query
    query.select('.top-box').boundingClientRect()    // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求   // 这段代码的意思是选择Id=normalServe的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset()                 // 这段代码的意思是获取页面滑动位置的查询请求
    query.exec((res) => {
      this.setData({
        topBox:res[0].height
      })
    })
  },

   //获取列表
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
        that.queryMultipleNodes()
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
    });
    //所有‘全部’选中
    that.setData({
      advanced : advanced
    })
    that.data.advanced.forEach((item,index)=>{
      let temp_strs ='advanced['+ index +'].checked'; //加入默认checked
      this.setData({
          [temp_strs]:true
      })
    })
  },

  parentItem(e){
    var that = this
    //选中单个‘全部’样式
    let temp_strs ='advanced['+ e.currentTarget.dataset.parentitem.CLASS_SORT +'].checked'; //点击第一次时 的index,为 true
    that.setData({
        [temp_strs]:true
    })
    var searchKey = that.data.searchKey //选中的关键字数字
    if(searchKey.length == 0){ //点击第一次时
      //searchKey操作
      that.setData({
        searchKey:[
        {SYS_PARAMS_CLASS_ID: null,CLASS_NAME: "%",CLASS_NO: "",CLASS_SORT: 3,MEMO: null,CLASS_PARENT_ID: null,CLASS_ATTR4: null,CLASS_PRICE_UNIT: null,CLASS_PRICE: null,CLASS_ATTR1: null,CLASS_ATTR3: null,CLASS_ATTR2: null,ROWID: "",checked: false},
        {SYS_PARAMS_CLASS_ID: null,CLASS_NAME: "%",CLASS_NO: "",CLASS_SORT: 3,MEMO: null,CLASS_PARENT_ID: null,CLASS_ATTR4: null,CLASS_PRICE_UNIT: null,CLASS_PRICE: null,CLASS_ATTR1: null,CLASS_ATTR3: null,CLASS_ATTR2: null,ROWID: "",checked: false},
        {SYS_PARAMS_CLASS_ID: null,CLASS_NAME: "%",CLASS_NO: "",CLASS_SORT: 3,MEMO: null,CLASS_PARENT_ID: null,CLASS_ATTR4: null,CLASS_PRICE_UNIT: null,CLASS_PRICE: null,CLASS_ATTR1: null,CLASS_ATTR3: null,CLASS_ATTR2: null,ROWID: "",checked: false},
        {SYS_PARAMS_CLASS_ID: null,CLASS_NAME: "%",CLASS_NO: "",CLASS_SORT: 3,MEMO: null,CLASS_PARENT_ID: null,CLASS_ATTR4: null,CLASS_PRICE_UNIT: null,CLASS_PRICE: null,CLASS_ATTR1: null,CLASS_ATTR3: null,CLASS_ATTR2: null,ROWID: "",checked: false},
      ],
      })
      // ----关键词数组提取文字--------
      if(that.data.searchKey){
        var searchArrName = []
        that.data.searchKey.forEach((item)=>{
          searchArrName.push(item.CLASS_NAME)
        })
        that.setData({
          searchName:String(searchArrName)
        })
        that.handleChange(that.data.searchName)//查询
        }
      }else {
          //同行操作checked
          that.data.goodsCollectList.forEach((item,index)=>{
            if(item.CLASS_PARENT_ID == e.currentTarget.dataset.parentitem.SYS_PARAMS_CLASS_ID){
              let temp_strArr ='goodsCollectList['+ index +'].checked'; ////2.再同一行，选中的为false
              that.setData({
                  [temp_strArr]:false //goodsCollectList相同父ID 选中的为false
              })

              let searchKeyArr ='searchKey['+ e.currentTarget.dataset.parentitem.CLASS_SORT +'].CLASS_NAME'; ////2.再同一行，选中的为false
              that.setData({
                  [searchKeyArr]:"%" //searchKey相同父ID 选中的为true
              })
            }
          })
          // ----关键词数组提取文字--------
          if(that.data.searchKey){
            var searchArrName = []
            that.data.searchKey.forEach((item)=>{
              searchArrName.push(item.CLASS_NAME)
            })
            that.setData({
              searchName:String(searchArrName)
            })
            that.handleChange(that.data.searchName)//查询
            }
    }
  },



  tabItem(detail){
    var that = this
    //取消‘全部’样式
    let temp_strs ='advanced['+ detail.currentTarget.dataset.itemindex +'].checked'; //点击第一次时 的index,为 true
        that.setData({
            [temp_strs]:false
        })
    var searchKey = that.data.searchKey //选中的关键字数字
    if(searchKey.length == 0){ //点击第一次时
      that.setData({
        searchKey:[
        {SYS_PARAMS_CLASS_ID: null,CLASS_NAME: "%",CLASS_NO: "",CLASS_SORT: 3,MEMO: null,CLASS_PARENT_ID: null,CLASS_ATTR4: null,CLASS_PRICE_UNIT: null,CLASS_PRICE: null,CLASS_ATTR1: null,CLASS_ATTR3: null,CLASS_ATTR2: null,ROWID: "",checked: false},
        {SYS_PARAMS_CLASS_ID: null,CLASS_NAME: "%",CLASS_NO: "",CLASS_SORT: 3,MEMO: null,CLASS_PARENT_ID: null,CLASS_ATTR4: null,CLASS_PRICE_UNIT: null,CLASS_PRICE: null,CLASS_ATTR1: null,CLASS_ATTR3: null,CLASS_ATTR2: null,ROWID: "",checked: false},
        {SYS_PARAMS_CLASS_ID: null,CLASS_NAME: "%",CLASS_NO: "",CLASS_SORT: 3,MEMO: null,CLASS_PARENT_ID: null,CLASS_ATTR4: null,CLASS_PRICE_UNIT: null,CLASS_PRICE: null,CLASS_ATTR1: null,CLASS_ATTR3: null,CLASS_ATTR2: null,ROWID: "",checked: false},
        {SYS_PARAMS_CLASS_ID: null,CLASS_NAME: "%",CLASS_NO: "",CLASS_SORT: 3,MEMO: null,CLASS_PARENT_ID: null,CLASS_ATTR4: null,CLASS_PRICE_UNIT: null,CLASS_PRICE: null,CLASS_ATTR1: null,CLASS_ATTR3: null,CLASS_ATTR2: null,ROWID: "",checked: false},
      ],
      })
      var arrs = that.data.searchKey
      arrs.splice(detail.currentTarget.dataset.itemindex, 1, detail.currentTarget.dataset.items);
      that.setData({
        searchKey:arrs,
      })
      let temp_strs ='goodsCollectList['+ detail.currentTarget.dataset.itemsindex +'].checked'; //点击第一次时 的index,为 true
        that.setData({
            [temp_strs]:true
        })
    }else if(that.data.searchKey.length > 0){
      var condition = true //默认允许追加，关键字
      var conditionIndx //关键字数组的下标
      let temp_strArr ='goodsCollectList['+ detail.currentTarget.dataset.itemsindex +'].checked'; //加入默认checked
          that.setData({
              [temp_strArr]:true
          })
        searchKey.forEach((searchKeyItems,index)=>{ //遍历已选中的关键字数组
        if(searchKeyItems.CLASS_PARENT_ID == detail.currentTarget.dataset.items.CLASS_PARENT_ID){ //如果 点击事件的ID == 已有关键字数组，父级相同 则执行替换 
        condition = false //关键字不追加
        conditionIndx = index //锁定 已有关键字数组的下标
        //同行操作checked
        that.data.goodsCollectList.forEach((item,_index)=>{ 
          if(item.CLASS_PARENT_ID == detail.currentTarget.dataset.items.CLASS_PARENT_ID){ //1.先把同一行全部为false  （父级ID 相同，表示同一行）
            let temp_strArr ='goodsCollectList['+ _index +'].checked';
            that.setData({
                [temp_strArr]:false //相同父ID的 所有为false
            })
          }
        })
          let temp_strArr ='goodsCollectList['+ detail.currentTarget.dataset.itemsindex +'].checked'; ////2.再同一行，选中的为false
          that.setData({
              [temp_strArr]:true //相同父ID 选中的为true
          })
      }
      })
      //searchKey操作
      if(condition == false){ //不追加时替换，
        searchKey.splice(conditionIndx,1,detail.currentTarget.dataset.items) //替换
        that.setData({
          searchKey:searchKey,
        })
      }
  
       //searchKey操作
      if(condition == true) {//追加执行
            // searchKey.push(detail.currentTarget.dataset.items)
            searchKey.splice(detail.currentTarget.dataset.itemindex,1,detail.currentTarget.dataset.items) //替换
            that.setData({
              searchKey:searchKey,
            })
        }
      } 

    // ----关键词数组提取文字--------
    if(that.data.searchKey){
    var searchArrName = []
    that.data.searchKey.forEach((item)=>{
      searchArrName.push(item.CLASS_NAME)
    })
    that.setData({
      searchName:String(searchArrName)
    })
    }
    that.handleChange(that.data.searchName)//查询

  },

  //详情页
  listClick: function (e){
    wx.navigateTo({
      url: '../detail/detail?articleId=' 
        + e.currentTarget.dataset.item.articleId
        + '&createName=' + e.currentTarget.dataset.item.createName 
        + '&picListUrl=' + e.currentTarget.dataset.item.picListUrl
    })
  },

  handleChange(detail) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    if(detail) {
      var Param = 'createName=' + detail + '&type=Article_CLASS_1' + '&startPage=' + that.data.startPage + '&recordSize=' + that.data.recordSize;
      app.httpsDataGet('/school/getArticleListForSchool', Param,
      function (res) {
        if (res.status) {
          if (res.data.length > 0) {
            var recommendList = res.data.map((item)=>{
              var funGetFirstPic = that.getFirstPic(item.articleNotes)
              return {...item,itemImg:funGetFirstPic}
            })
            that.setData({
              recommendList: recommendList,
            });
          }else{
            that.setData({
              recommendList: [],
            });
          }
        }
      },
      function (res) {
        //失败
        wx.hideLoading()
      }
    )
    }
  },

    //获取第一张图片
    getFirstPic(str) {
      let data = ''
      str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function(match, capture) {
        data = capture
      })
      return data
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getGoodsCollectList()
    this.handleChange(options.userid)
    console.log (JSON.stringify(options))
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