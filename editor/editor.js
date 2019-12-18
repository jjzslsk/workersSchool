const app = getApp()
var paramNotes
var numClick = 0
var itemSysParamsId
var itemsSysParentId
const { $Toast } = require('../dist/base/index')

Page({
  data: {
    userInfo:{},
    advanced:[],//一级数据
    searchKey:[],
    searchObj:[],
    spinShow: false,
    tags:[],
    goodsCollectList:null,
    isShow:true,
    isShowcolor1:'#41CC8E',
    isShowcolor2:'#777',
    formats: {},
    readOnly: false,
    placeholder: '开始输入内容...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    pageData:{
      content:'',//初始化内容
    },
    pickedImgs: [], //需要提交的图片
    compressImgs: [],
    compressImgsIndex: 0,
    uploadedImgs: [],
    uploadedImgIndex: 0,
    orderId:'',
    articleTitle:'',
    searchName:'',
    articleDescribe:'',
    articleNotes:{},//富文本内容
    current_scroll2:'1910251543017244',
    currentItem:'',
    activeTag1:'2',
    activeTagfont:{
      num1:'',
      num2:'',
      num3:''
    },
    activeTag2:'',
    SYS_PARAMS:'',
  },
  watch:{
    // 'articleNotes': function() {
      // var resPhone = checkPhone(this.regInfo.phone);
      // this.codeIsClick=resPhone;
      // },
  },


  articleTitle(e){
    var that = this;
    var str = app.filterEmoji(e.detail.detail.value)
    that.setData({
      articleTitle: app.filterSpace(str)
    });
  },
  articleDescribe(e){
    var that = this;
    var str = app.filterEmoji(e.detail.detail.value)
    that.setData({
      articleDescribe: app.filterSpace(str)
    });
  },

  tagOnChange (event){
    this.setData({
      'oneChecked' : event.detail.checked
  })
},

  onChange(event){ //二级的的父CLASS_PARENT_ID 是否等于 所有的父
    this.data.goodsCollectList.forEach((element,index) => { 
    if(itemsSysParentId != event.currentTarget.dataset.items.CLASS_PARENT_ID){ //不同组 执行

        if(event.currentTarget.dataset.items.SYS_PARAMS_CLASS_ID == element.SYS_PARAMS_CLASS_ID){ //点击自己ID 触发事件true ，
          let temp_str ='goodsCollectList['+index+'].checked';
          this.setData({
            [temp_str]:true
        })
        }
        else{ //非自己 事件
          let temp_str ='goodsCollectList['+index+'].checked';

        }
          
    }else { //同组 执行
      console.log ('itemsSysParentId')
        if(event.currentTarget.dataset.items.SYS_PARAMS_CLASS_ID == element.SYS_PARAMS_CLASS_ID){ //点击自己ID 触发事件true ，
          let temp_str ='goodsCollectList['+index+'].checked';
          this.setData({
            [temp_str]:true
        })
        }
        else{ //非自己 事件
          let temp_str ='goodsCollectList['+index+'].checked';
          this.setData({
            [temp_str]:false
        })
        }

    }
  });
    
    itemSysParamsId = event.currentTarget.dataset.item.SYS_PARAMS_CLASS_ID //子级Id
    itemsSysParentId = event.currentTarget.dataset.items.CLASS_PARENT_ID //所有对象的父ID
    if(itemSysParamsId == itemsSysParentId){
    }
},

  badgeClick(e){
    var that = this
    var searchKeyArr = that.data.searchObj
    console.log (JSON.stringify(e))
    searchKeyArr.splice(e.currentTarget.dataset.index, 1);
    that.setData({
      searchObj:searchKeyArr
    })
  },

  handleChangeScroll1 ({ detail } ) {
    if(this.data.searchKey.length > 3){
      console.log ('只允许选四个')
      this.data.searchKey.join(","); 
    }else {
      console.log (detail)
      this.data.searchKey.push(detail.key)
      this.setData({
        searchKey:this.data.searchKey
      })
    }
  },

  handleChangeScroll2 ({ detail }) {
    this.setData({
        current_scroll2: detail.key
    });
  },


  ListBtnclick(e){
    var that = this
    var searchObj = that.data.searchObj
    if(searchObj.length == 0){
      searchObj.push(e.currentTarget.dataset.items)
      that.setData({
        searchObj:searchObj
      })
    }else if(that.data.searchObj.length > 0){
      var condition = true //是否允许追加
      var conditionIndx

      that.data.searchObj.forEach((item,index)=>{
        if(item.CLASS_PARENT_ID == e.currentTarget.dataset.items.CLASS_PARENT_ID) {
          condition = false
          conditionIndx = index
        }else {

        }

      })

      if(condition == false){
        searchObj.splice(conditionIndx,1,e.currentTarget.dataset.items)
        that.setData({
          searchObj:searchObj
        })
      }

      if(condition == false)return
        searchObj.push(e.currentTarget.dataset.items)
        that.setData({
          searchObj:searchObj
        })

    }
  },

  isShowBut(){
    this.setData({
      isShow:!this.data.isShow
  })

  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
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

      });
      that.setData({
        advanced : advanced
      })
    },

  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() { //编辑器初始化完成时触发
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      wx.showLoading({
        title: '加载内容中...',
      })
      setTimeout(function(){
        let data = that.data;
        wx.hideLoading();
        that.editorCtx.setContents({
          html: data.pageData ? data.pageData.content:'',
          success: (res) => {
            console.log(res)
          },
          fail: (res) => {
            console.log(res)
          }
        })
      },1000)
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) { //使用 catchtouchend 绑定事件则不会使编辑器失去焦点
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) { //通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() { //下划线
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  // ======
  getEditorValue(e) { //编辑器内容改变时触发，detail = {html, text, delta}
    this.setData({
      ['formData.content']:e.detail.html
    })
  },

  getOrderId: function (options) {
    var that = this
    app.httpsDataGet('/utils/getPK', '',
      function (res) {
        console.log(JSON.stringify(res))
        if (res.status) {
          that.setData({
            orderId: res.data
          });
        }
        wx.hideLoading()
      },
      function (res) {
        //失败
        wx.hideLoading()

      }
    )
  },

    onSwitchChange (detail) {
        this.setData({
            spinShow: detail,
            isShow:!detail
        });
    },

  setStep: function (e) {
    var that = this
    if (!that.data.orderId){
      that.getOrderId()
      return;
    }
    else if(that.data.articleTitle == null || that.data.articleTitle == undefined || that.data.articleTitle == ''){
      $Toast({content:'请填写标题'});
      return
    }
    else if(that.data.searchObj == null || that.data.searchObj == undefined || that.data.searchObj == ''){
      $Toast({content:'请为文章选择分类'});
      return
    }
    else {
      that.editorCtx.getContents({ //读取编辑器内容
        success(res) {
            that.setData({
              articleNotes: res
              })

              if(that.data.articleNotes.html == null || that.data.articleNotes.html == undefined || that.data.articleNotes.html == ''){//此判断好像无效
                $Toast({content:'请填写文章内容'});
                return
              }
              else if(that.data.articleNotes.html != null || that.data.articleNotes.html != undefined || that.data.articleNotes.html != ''){
                      console.log (that.data.articleNotes.html)
                      wx.showModal({
                      title: '提示',
                      content: '是否提交?',
                      success(res) {
                        if (res.confirm) {
                          wx.showLoading({
                            title: '提交中',
                          })
                          that.commit()
                          } else if (res.cancel) {
                          //点击取消
                          }
                      }
                    })
              }

        }
      })
     

    }
  },

  insertImage: function (e) {
    if(this.data.pickedImgs.length >= 9) {
      wx.showModal({
        title: '提示',
        content: '最多只能添加9张图',
        showCancel: false,
      });
    }
    if(this.data.pickedImgs.length >= 9) return
    var pickedImgs = this.data.pickedImgs
    var that = this
    var count = 9 - pickedImgs.length
    console.log('count:' + count);

    //呼起相册、相机
    wx.chooseImage({ 
      // count: count,  //最多可以选择的图片张数
      count: 1,  //最多可以选择的图片张数
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {// tempFilePath可以作为img标签的src属性显示图片
        console.log('chooseImage:' + JSON.stringify(res))
        that.setData({
          compressImgs: res.tempFilePaths
        });
        that.compressImage() //压缩图片
      }
    })
  },
  
  //压缩图片
  compressImage: function () {
    var that = this
    that.onSwitchChange(true)
    var compressImgsIndex = this.data.compressImgsIndex
    var compressImgs = this.data.compressImgs
    var pickedImgs = this.data.pickedImgs
    if (compressImgsIndex < compressImgs.length) {
      console.log(compressImgs[compressImgsIndex])
      wx.compressImage({
        src: compressImgs[compressImgsIndex],
        quality: 50,
        success(res) {
          console.log('compressImage:' + JSON.stringify(res))
          pickedImgs.unshift(res.tempFilePath)
          compressImgsIndex = compressImgsIndex + 1
          that.setData({
            pickedImgs: pickedImgs,
            compressImgsIndex: compressImgsIndex
          })

          //循环压缩 图数组
          that.compressImage()
        }, fail(res) {
          console.log('compressImageFail:' + JSON.stringify(res))
        }
      })
    } else { //循环结束执行
      that. updateImg()
    // }
    // else{numClick = 0}
    // numClick = 1
      // if (this.data.pickedImgs.length>=9){
      //   wx.showToast({
      //     title: '您已选择9张图，若还有需求，请另发订单',
      //     icon: 'none',
      //     duration: 2000
      //   })
      // }
      that.setData({
        compressImgsIndex: 0,
        compressImgs: []
      });
    }

    
  },
  
  updateImg(){
    var that = this
     var uploadedImgIndex = that.data.uploadedImgIndex
     var pickedImgs = that.data.pickedImgs
    // console.log(pickedImgs[uploadedImgIndex])
    var uploadedImgs = that.data.uploadedImgs
    var uploadImgParam = {
      attUser: app.globalData.userId,
      attFkId: that.data.orderId,
      attFkName: "[Article_CLASS_XG]",
      attName: "[_" + uploadedImgIndex + "_Article_CLASS_XG.jpg]",
      clientId: app.globalData.userId,
      attNoWater: '1'
    }
          
    wx.uploadFile({
      url: app.globalData.url +'/upFile',
      filePath: pickedImgs[uploadedImgIndex],
      name: 'file',
      formData: uploadImgParam,
      success(res) {
        if (res.data) {
          var resData = JSON.parse(res.data)
          if (resData.pic && resData.pic.length > 0)
            uploadedImgs.push(resData.pic[0].pic)

              that.editorCtx.insertImage({
                src: resData.pic[0].pic,
                data: {
                  id: 'abcd',
                  role: 'god'
                },
                success: function () {
                  console.log('insert image success')
                }
              })

          that.setData({
            uploadedImgs: uploadedImgs
          })
        }

        uploadedImgIndex++
        that.setData({
          uploadedImgIndex: uploadedImgIndex
        })
        if (uploadedImgIndex < pickedImgs.length) { //循环上传图片
          that.updateImg()
        } else {
          that.setData({
            uploadedImgIndex:0,
            uploadedImgs:[],
            pickedImgs:[]
          })
            that.onSwitchChange(false)
        }
        }
      })

  },

  resetPage: function(){
    var that = this
    that.editorCtx.clear()
    that.setData({
      userInfo:{},
      advanced:[],//一级数据
      searchKey:[],
      searchObj:[],
      spinShow: false,
      tags:[],
      goodsCollectList:null,
      isShow:true,
      isShowcolor1:'#41CC8E',
      isShowcolor2:'#777',
      formats: {},
      readOnly: false,
      placeholder: '开始输入内容...',
      editorHeight: 300,
      keyboardHeight: 0,
      isIOS: false,
      pageData:{
        content:'',//初始化内容
      },
      pickedImgs: [], //需要提交的图片
      compressImgs: [],
      compressImgsIndex: 0,
      uploadedImgs: [],
      uploadedImgIndex: 0,
      orderId:'',
      articleTitle:'',
      searchName:'',
      articleDescribe:'',
      articleNotes:{
        html:''
      },//富文本内容
      current_scroll2:'',
      currentItem:'',
      activeTag1:'2',
      activeTagfont:{
        num1:'',
        num2:'',
        num3:''
      },
      activeTag2:'',
      SYS_PARAMS:'',
    })
    wx.switchTab({
      url: '/pages/index/index',
      })
      that.onLoad()
      that.onShow()
  },

  commit: function (e) {
    var that=this
    var searchArrName = []
    that.data.searchObj.forEach((item)=>{
      searchArrName.push(item.CLASS_NAME)
    })
    that.setData({
      searchName:String(searchArrName)
    })
    if(that.data.searchObj.length <= 0) return

    var param = {
      createName: app.globalData.userId,
      paramsClassNo: "Article_CLASS_1",//配送说明
      articleId: that.data.orderId,
      articleNotes: that.data.articleNotes.html,
      articleTitle: that.data.articleTitle,
      articleDescribe: that.data.articleDescribe,
      articleClassId: "1811201459000283",   //写死
      searchKey:that.data.searchName,   //用户发表图文时勾选的分类,英文逗号分隔
    }
    app.httpsDataPost('/shop/createArticle', param,
      function (ret) {
        //成功
        if (ret.status) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '已提交',
            success(res) {
              if (res.confirm) {
                param = {}
                that.resetPage()
                } else if (res.cancel) {
                //点击取消
                param = {}
                that.resetPage()
                }
            }
          });
          console.log (JSON.stringify(ret))
        } else {
          wx.showModal({
            title: '提示',
            content: '提交失败,请重新发布',
            success(res) {
              if (res.confirm) {
                param = {}
                that.resetPage()
                } else if (res.cancel) {
                //点击取消
                param = {}
                that.resetPage()
                }
            }
          });
        }
        wx.hideLoading();
      },
      function (ret) {
        //失败
        wx.hideLoading();
      });
  },

  getUserInfo: function () {
    var that = this
    _getUserInfo();
    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            userInfo: res.userInfo
          })
        },
        fail: res => {
          wx.hideLoading();
          wx.showModal({
            title: '获取用户信息失败',
            content: JSON.stringify(res),
            showCancel: false,
          })
          var calRes = {};
          calRes.code = false;
          typeof calFun == "function" && calFun(calRes)
        }
      })
    }
  },

  onLoad() {

  },

  /**
   * 生命周期函数--监听页面显示
  */
  onShow: function() {
    if (app.globalData.userInfo == undefined || app.globalData.userInfo == null || app.globalData.userInfo == '') {
      wx.showModal({
        title: '提示',
        content: '您未登录，请先登录再操作。是否前往登录？1',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/bindPhone/bindPhone'
            })
          }else if (res.cancel) {
            wx.switchTab({
              url: '/pages/index/index',
              })
          }
        }
      })
      return
    }else {
      this.getUserInfo()

      const platform = wx.getSystemInfoSync().platform
      const isIOS = platform === 'ios'
      this.setData({ isIOS})
      const that = this
      this.updatePosition(0)
      let keyboardHeight = 0
      wx.onKeyboardHeightChange(res => {
        if (res.height === keyboardHeight) return
        const duration = res.height > 0 ? res.duration * 1000 : 0
        keyboardHeight = res.height
        setTimeout(() => {
          wx.pageScrollTo({
            scrollTop: 0,
            success() {
              that.updatePosition(keyboardHeight)
              that.editorCtx.scrollIntoView()
            }
          })
        }, duration)
  
      })
  
      this.getOrderId()
      this.getGoodsCollectList()

    }
  }

})
