//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    goodsCollectList:null,
    advanced:null,
    listData:[],
    current: '0',
    dataList:[
      { id:'1',title:'装修攻略',src:'/images/course/xgt_icon.png',isClick:false},
      { id:'2',title:'装修攻略',src:'/images/course/zxgl_icon.png'},
      { id:'3',title:'服务保障',src:'/images/course/fwbz_icon.png'},
      { id:'4',title:'计算器',src:'/images/course/jsj_icon.png'},
      { id:'5',title:'找设计师',src:'/images/course/zsjs_icon.png'},
      { id:'6',title:'监理工匠',src:'/images/course/jlgj_icon.png'},
      { id:'7',title:'装修分期',src:'/images/course/zxfq_icon.png'},
      { id:'8',title:'一站服务',src:'/images/course/yzfw_icon.png'},
      { id:'9',title:'全屋定制',src:'/images/course/qwdz_icon.png'},
      { id:'10',title:'一站服务',src:'/images/course/yzfw_icon.png'},
      // {title:'新闻热点',src:'/images/course/xwrd_icon.png'},
    ],

    activityList:[//活动
      {id:'ws_activity01',imgurl:'/images/course/ws_activity01.jpg'},
      {id:'ws_activity02',imgurl:'/images/course/ws_activity02.jpg'},
      {id:'ws_activity03',imgurl:'/images/course/ws_activity03.jpg'},
      {id:'ws_activity04',imgurl:'/images/course/ws_activity04.jpg'}
    ],

    designerList:[//设计师
      {id:'designerave01',aveUrl:'/images/course/designerave01.jpg'},
      {id:'designerave02',aveUrl:'/images/course/designerave02.jpg'},
      {id:'designerave03',aveUrl:'/images/course/designerave03.jpg'},
      {id:'designerave04',aveUrl:'/images/course/designerave04.jpg'}
    ],

    recommendList:[],

    recommendListData01:[[
			{id:'recommend01',imgUrl:'/images/course/ws_activity01.jpg',info:'现代新中式1，简约大气，经典风！',logo:'/images/course/ws_shop_logo01.jpg',companyName:'广义装饰',isCollection:false},
			{id:'recommend02',imgUrl:'/images/course/ws_activity03.jpg',info:'北欧风，为您增添活跃气氛',logo:'/images/course/ws_shop_logo02.jpg',companyName:'一文装饰',isCollection:false},
			{id:'recommend03',imgUrl:'/images/course/ws_activity02.jpg',info:'中式家具，古典韵味，中式独特风格！',logo:'/images/course/ws_shop_logo03.jpg',companyName:'华文装饰',isCollection:false}
		],[
			{id:'recommend01',imgUrl:'/images/course/ws_activity01.jpg',info:'现代新中式2，简约大气，经典风！',logo:'/images/course/ws_shop_logo03.jpg',companyName:'二文装饰',isCollection:false},
			{id:'recommend02',imgUrl:'/images/course/ws_activity03.jpg',info:'北欧风，为您增添活跃气氛',logo:'/images/course/ws_shop_logo02.jpg',companyName:'华文装饰',isCollection:false},
			{id:'recommend03',imgUrl:'/images/course/ws_activity02.jpg',info:'中式家具，古典韵味，中式独特风格！',logo:'/images/course/ws_shop_logo01.jpg',companyName:'一文装饰',isCollection:false}
		],[
			{id:'recommend01',imgUrl:'/images/course/ws_activity02.jpg',info:'现代新中式3，简约大气，经典风！',logo:'/images/course/ws_shop_logo02.jpg',companyName:'华文装饰',isCollection:false},
			{id:'recommend02',imgUrl:'/images/course/ws_activity03.jpg',info:'北欧风，为您增添活跃气氛',logo:'/images/course/ws_shop_logo03.jpg',companyName:'中鼎装饰',isCollection:false},
			{id:'recommend03',imgUrl:'/images/course/ws_activity01.jpg',info:'中式家具，古典韵味，中式独特风格！',logo:'/images/course/ws_shop_logo01.jpg',companyName:'一文装饰',isCollection:false}
		],[
			{id:'recommend01',imgUrl:'/images/course/ws_activity03.jpg',info:'现代新中式，简约大气，经典风！',logo:'/images/course/ws_shop_logo01.jpg',companyName:'光明装饰',isCollection:false},
			{id:'recommend02',imgUrl:'/images/course/ws_activity01.jpg',info:'北欧风，为您增添活跃气氛',logo:'/images/course/ws_shop_logo03.jpg',companyName:'帝豪装饰',isCollection:false},
			{id:'recommend03',imgUrl:'/images/course/ws_activity02.jpg',info:'中式家具，古典韵味，中式独特风格！',logo:'/images/course/ws_shop_logo02.jpg',companyName:'一文装饰',isCollection:false}
		],[
			{id:'recommend01',imgUrl:'/images/course/ws_activity02.jpg',info:'现代新中式，简约大气，经典风！',logo:'/images/course/ws_shop_logo01.jpg',companyName:'爱龙装饰',isCollection:false},
			{id:'recommend02',imgUrl:'/images/course/ws_activity03.jpg',info:'北欧风，为您增添活跃气氛',logo:'/images/course/ws_shop_logo02.jpg',companyName:'华文装饰',isCollection:false},
			{id:'recommend03',imgUrl:'/images/course/ws_activity01.jpg',info:'中式家具，古典韵味，中式独特风格！',logo:'/images/course/ws_shop_logo03.jpg',companyName:'一文装饰',isCollection:false}
		]],

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  handleChange({ detail }) {
    var that = this
    this.setData({
      current: detail.key,
      // recommendList: this.data.recommendListData01[detail.key]
    });
    if(!detail.key) return
    var Param = 'shopId=' + app.globalData.userId + '&type=Article_CLASS_1' + '&classParentId='+ detail.key;
    wx.showLoading({
      title: '加载中',
    })
    var that = this

    app.httpsDataGet('/shop/getArticleListForSchool', Param,
      function (res) {
        if (res.status) {
          if (res.data.length > 0) {
            that.setData({
              recommendList: res.data,
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

  itemClick: function(){
    // wx.navigateTo({
    //   url: '../classify/classify'
    // })
  },

  listClick: function (e){
    console.log (JSON.stringify(e))

    // var articleTitleData = articleTitle.toString()
    wx.navigateTo({
      url: '../detail/detail?articleId=' 
        + e.currentTarget.dataset.item.articleId
        + '&createName=' + e.currentTarget.dataset.item.createName 
        + '&picListUrl=' + e.currentTarget.dataset.item.picListUrl
    })
  },

  classifyCilck: function(){
    wx.navigateTo({
      url: '../classify/classify'
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },



      //获取商品收藏列表
      getGoodsCollectList: function() {
        var that = this;
        app.httpsGetDatByPlatform('params_class_xg_tree', 'list','',
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
  
        });
        that.setData({
          advanced : advanced
        })
        console.log (that.data.advanced)
      },

  onLoad: function () {

    // this.setData({//初始化显示推荐
    //   recommendList: this.data.recommendListData01[0]
    // });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    


  },


  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

   /**
   * 生命周期函数--监听页面显示
  */
 onShow:function(){
  var that = this
  that.getGoodsCollectList() //获取大类

  //获取所有List
  wx.showLoading({
    title: '加载中',
  })
  var Param = 'shopId=' + app.globalData.userId + '&type=Article_CLASS_1';
  app.httpsDataGet('/shop/getArticleListForSchool', Param,
    function (res) {
      if (res.status) {
        if (res.data.length > 0) {
          that.setData({
            recommendList: res.data,
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

})
