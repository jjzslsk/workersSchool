//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    startPage:1,
    recordSize:90,
    bannerList: [
      {W_ACT_ID:1912020846005770,
        TITLE:"空调深度保养",
        CONTENT:"<p><br></p>",
        CREATE_DATE:null,
        END_ACT_DATE:null,
        FLAG:1,
        ACT_PRICE:100.00,
        CLIENT_CLASS_ID:1908221100043420,
        POSITION_NO:"轮播1",
        CLIENT_ID:1907101446022561,
        AMOUNT_UNIT:"元/台",
        COMPANY_NAME:"绿城空调清洗联盟",
        ADDRESS:"广西壮族自治区南宁市兴宁区",
        LNG:"108.341855",
        LAT:"22.860353",
        BAIDU_MAP_NO:"261",
        CLIENT_CLASS_NAME:"活动推广",
        IMG_URL:"/images/course/recommend01.jpg",
        IMG_URL2:"http://zxjphoto.oss-cn-shenzhen.aliyuncs.com/photo/2019/12/02/activity/1575247594352activity_pic_optimal.jpg",
        START_ACT_DATE:"2019-12-02",ROWID:"1912060922019971"},
      {W_ACT_ID:1911261825003294,TITLE:"灯具安装10元起",CONTENT:"<p><br></p>",CREATE_DATE:null,END_ACT_DATE:null,FLAG:1,ACT_PRICE:12.80,CLIENT_CLASS_ID:1908221100043420,POSITION_NO:"轮播2",CLIENT_ID:1907101446022562,AMOUNT_UNIT:"元/个",COMPANY_NAME:"绿城安装公司",ADDRESS:"广西壮族自治区南宁市西乡塘区",LNG:"108.330503",LAT:"22.86357",BAIDU_MAP_NO:"261",CLIENT_CLASS_NAME:"活动推广",IMG_URL:"/images/course/recommend02.jpg",IMG_URL2:"http://zxjphoto.oss-cn-shenzhen.aliyuncs.com/photo/2019/11/26/activity/1574763941322activity_pic_optimal.jpg",START_ACT_DATE:"2019-11-26",ROWID:"1912060922019972"},
      {W_ACT_ID:1911261825003295,TITLE:"灯具安装10元起",CONTENT:"<p><br></p>",CREATE_DATE:null,END_ACT_DATE:null,FLAG:1,ACT_PRICE:12.80,CLIENT_CLASS_ID:1908221100043420,POSITION_NO:"轮播3",CLIENT_ID:1907101446022563,AMOUNT_UNIT:"元/个",COMPANY_NAME:"绿城安装公司",ADDRESS:"广西壮族自治区南宁市西乡塘区",LNG:"108.330503",LAT:"22.86357",BAIDU_MAP_NO:"261",CLIENT_CLASS_NAME:"活动推广",IMG_URL:"/images/course/recommend03.jpg",IMG_URL2:"http://zxjphoto.oss-cn-shenzhen.aliyuncs.com/photo/2019/11/26/activity/1574763941322activity_pic_optimal.jpg",START_ACT_DATE:"2019-11-26",ROWID:"1912060922019973"},
      {W_ACT_ID:1911261825003296,TITLE:"灯具安装10元起",CONTENT:"<p><br></p>",CREATE_DATE:null,END_ACT_DATE:null,FLAG:1,ACT_PRICE:12.80,CLIENT_CLASS_ID:1908221100043420,POSITION_NO:"轮播4",CLIENT_ID:1907101446022564,AMOUNT_UNIT:"元/个",COMPANY_NAME:"绿城安装公司",ADDRESS:"广西壮族自治区南宁市西乡塘区",LNG:"108.330503",LAT:"22.86357",BAIDU_MAP_NO:"261",CLIENT_CLASS_NAME:"活动推广",IMG_URL:"/images/course/recommend04.jpg",IMG_URL2:"http://zxjphoto.oss-cn-shenzhen.aliyuncs.com/photo/2019/11/26/activity/1574763941322activity_pic_optimal.jpg",START_ACT_DATE:"2019-11-26",ROWID:"1912060922019974"},
       ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,

    goodsCollectList:null,
    advanced:null,
    listData:[],
    current: '1910251543017244',
    dataList:[
      { id:'1',title:'装修公司',src:'/images/course/zxgs.png',isClick:false},
      { id: '2', title: '监理工匠', src:'/images/course/jlgj.png'},
      { id: '3', title: '全屋定制', src:'/images/course/qwdz.png'},
      { id: '4', title: '装修信用', src:'/images/course/zxxy.png'},
      { id: '5', title: '材料知识', src:'/images/course/clzs.png'},
      { id:'6',title:'装修攻略',src:'/images/course/zxgl.png'},
      { id:'7',title:'业主社区',src:'/images/course/yzsq.png'},
      { id:'8',title:'小区活动',src:'/images/course/xqhd.png'},
      { id:'9',title:'新闻热点',src:'/images/course/xwrd.png'},
      { id:'10',title:'更多',src:'/images/course/gd.png'},
    ],

    activityList:[//活动
      {id:'ws_activity01',imgurl:'/images/course/ws_activity01.png'},
      {id:'ws_activity02',imgurl:'/images/course/ws_activity02.png'},
      {id:'ws_activity03',imgurl:'/images/course/ws_activity03.png'},
      {id:'ws_activity04',imgurl:'/images/course/ws_activity04.png'}
    ],

    designerList:[//设计师
      {id:'designerave01',aveUrl:'/images/course/designerave01.png'},
      {id:'designerave02',aveUrl:'/images/course/designerave02.png'},
      {id:'designerave03',aveUrl:'/images/course/designerave03.png'},
      { id: 'designerave04', aveUrl: '/images/course/designerave04.png' },
      {id:'designerave05',aveUrl:'/images/course/designerave05.png'},
      {id:'designerave06',aveUrl:'/images/course/designerave06.png'},
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
    var Param = 'shopId=' + app.globalData.userId + '&type=Article_CLASS_1' + '&classParentId=' + detail.key + '&startPage=' + that.data.startPage + '&recordSize=' + that.data.recordSize;
    wx.showLoading({
      title: '加载中',
    })
    var that = this

    app.httpsDataGet('/shop/getArticleListForSchool', Param,
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

  openActivity: function (e) {
    wx.navigateTo({
      url: '/pages/activity/activity?id=' + e.currentTarget.dataset.id
    })
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

  getFirstPic(str) {
    let data = ''
    str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function(match, capture) {
      data = capture
    })
    return data
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
   var Param = 'shopId=' + app.globalData.userId + '&type=Article_CLASS_1' + '&startPage=' + that.data.startPage + '&recordSize=' + that.data.recordSize;
  app.httpsDataGet('/shop/getArticleListForSchool', Param,
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
