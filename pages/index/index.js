//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    listData:[],
    current: '0',
    dataList:[
      {title:'装修攻略',src:'/images/course/xgt_icon.png',isClick:false},
      {title:'装修攻略',src:'/images/course/zxgl_icon.png'},
      {title:'服务保障',src:'/images/course/fwbz_icon.png'},
      {title:'计算器',src:'/images/course/jsj_icon.png'},
      {title:'找设计师',src:'/images/course/zsjs_icon.png'},
      {title:'监理工匠',src:'/images/course/jlgj_icon.png'},
      {title:'装修分期',src:'/images/course/zxfq_icon.png'},
      {title:'一站服务',src:'/images/course/yzfw_icon.png'},
      {title:'全屋定制',src:'/images/course/qwdz_icon.png'},
      {title:'一站服务',src:'/images/course/yzfw_icon.png'},
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
    this.setData({
      current: detail.key,
      recommendList: this.data.recommendListData01[detail.key]
    });
  },

  itemClick: function(){
    // wx.navigateTo({
    //   url: '../classify/classify'
    // })
  },

  listClick: function (e){
    var articleTitle = e.currentTarget.dataset.articleid;
    var articleTitleData = articleTitle.toString()
    wx.navigateTo({
      url: '../detail/detail?id=' + articleTitleData
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

  onShow:function(){
        var aParam1 = 'shopId=' + app.globalData.userId + '&type=Article_CLASS_1';
    wx.showLoading({
      title: '加载中',
    })
    var that = this

    app.httpsDataGet('/shop/getArticleListForSchool', aParam1,
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
  }
})
