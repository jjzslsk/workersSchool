const app = getApp()
var paramNotes
var numClick = 0
var itemSysParamsId
var itemsSysParentId

Page({
  data: {
    advanced:[],//一级数据
    searchKey:[],

    goodsCollectList:null,
    isShow:true,
    isShowcolor1:'#41CC8E',
    isShowcolor2:'#777',
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    pageData:{
      content:'初始化内容',//初始化内容
    },
    pickedImgs: [],
    compressImgs: [],
    compressImgsIndex: 0,
    uploadedImgs: [],
    uploadedImgIndex: 0,
    orderId:'',
    articleTitle:'',
    articleDescribe:'',
    articleNotes:{},//富文本内容

    current_scroll:'',
    current_scroll2:'tab2',
    current_scroll3:'tab3',
    current_scroll4:'tab4',
    current_scroll5:'tab5',
    current_scroll6:'tab6',

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
    this.setData({
      articleTitle: e.detail.detail.value
    });
  },
  articleDescribe(e){
    this.setData({
      articleDescribe: e.detail.detail.value
    });
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

    console.log (this.data.activeTag2)
    console.log ('33',event.currentTarget.dataset.items)
    console.log ('44',event.currentTarget.dataset.item)

},

  handleChangeScroll1 ({ detail } ) {
    // this.setData({
    //     current_scroll: detail.key
    // });
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
  handleChangeScroll3 ({ detail }) {
    this.setData({
        current_scroll3: detail.key
    });
  },
  handleChangeScroll4 ({ detail }) {
    this.setData({
        current_scroll4: detail.key
    });
  },
  handleChangeScroll5 ({ detail }) {
    this.setData({
        current_scroll5: detail.key
    });
  },
  handleChangeScroll6 ({ detail }) {
    this.setData({
        current_scroll6: detail.key
    });
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
  onLoad() {
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

  // //上传图片
  // insertImage() { //  使用 catchtouchend 绑定事件则不会使编辑器失去焦点
  //   const that = this
  //   wx.chooseImage({
  //     count: 1,
  //     success: function (res) {
  //       that.editorCtx.insertImage({
  //         src: res.tempFilePaths[0],
  //         data: {
  //           id: 'abcd',
  //           role: 'god'
  //         },
  //         width: '80%',
  //         success: function () {
  //           console.log('insert image success')
  //         }
  //       })
  //     }
  //   })
  // },
  // ======
  getEditorValue(e) { //编辑器内容改变时触发，detail = {html, text, delta}
    this.setData({
      ['formData.content']:e.detail.html
    })
  },

  //上传图片
  // insertImage() { //  使用 catchtouchend 绑定事件则不会使编辑器失去焦点
  //   const that = this
  //   wx.chooseImage({
  //     count: 1,
  //     success: function (res) {
  //       that.editorCtx.insertImage({
  //         src: res.tempFilePaths[0],
  //         data: {
  //           id: 'abcd',
  //           role: 'god'
  //         },
  //         width: '80%',
  //         success: function () {
  //           console.log('insert image success')
  //         }
  //       })
  //     }
  //   })
  // },

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

  setStep: function (e) {
    // var step = e.currentTarget.dataset.step;		
    // if(step=='1'){
    //   this.setData({
    //     step: '2'
    //   });
    // }else{
      this.uploadImg()
    // }
  },

  insertImage: function (e) {
    // var clickIndex = e.currentTarget.dataset.index
    var pickedImgs = this.data.pickedImgs
    var that = this
    var count = 12 - pickedImgs.length
    console.log('count:' + count);
    wx.chooseImage({
      count: count,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log('chooseImage:' + JSON.stringify(res))
        that.setData({
          compressImgs: res.tempFilePaths
        });
        // res.tempFilePaths.forEach(element => {
        //   that.data.compressImgs.push(element)
        // });
        that.compressImage()

        // that.data.compressImgs.forEach(element => {
        //   that.editorCtx.insertImage({
        //     src: element,
        //     data: {
        //       id: 'abcd',
        //       role: 'god'
        //     },
        //     success: function () {
        //       console.log('insert image success')
        //     }
        //   })
        // });
      }
    })
  },
  
  compressImage: function () {
    var compressImgsIndex = this.data.compressImgsIndex
    var compressImgs = this.data.compressImgs
    var pickedImgs = this.data.pickedImgs

    var that = this
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

          that.compressImage()
        }, fail(res) {
          console.log('compressImageFail:' + JSON.stringify(res))
        }
      })
    } else {
      if (this.data.pickedImgs.length>=12){
        wx.showToast({
          title: '您已选择12张图，若还有需求，请另发订单',
          icon: 'none',
          duration: 2000
        })
      }
      that.setData({
        compressImgsIndex: 0,
        compressImgs: []
      });
    }

    if(numClick==0){ //只执行一次
      that.data.compressImgs.forEach(element => {
        that.editorCtx.insertImage({
          src: element,
          data: {
            id: 'abcd',
            role: 'god'
          },
          success: function () {
            console.log('insert image success')
          }
        })
      });
    }else{numClick = 0}
    numClick = 1
  },

  uploadImg: function (e) {
    // wx.showModal({
    //   title: '提示',
    //   content: '是否提交?',
    //   success(res) {
    //     if (res.confirm) {
          
    //     } else if (res.cancel) {}
    //   }
    // })
    var that = this
    var uploadedImgIndex = that.data.uploadedImgIndex
    var pickedImgs = that.data.pickedImgs
    console.log(pickedImgs[uploadedImgIndex])

    if (pickedImgs.length==0){
      wx.showModal({
        title: '提示',
        content: '请选择图片',
        showCancel: false,
      });
      return
    } else 
    // if (!that.data.addressInfo.id) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请选择收货地址',
    //     showCancel: false,
    //   });
    //   return
    // }
    if (!that.data.orderId){
      that.getOrderId()
      return;
    }      
    wx.showLoading({
      title: '提交中',
    })
    that.editorCtx.getContents({
      success(res) {
        var articleNotesData

        articleNotesData= res

          that.setData({
            articleNotes: res
            })
          that.updateImg(uploadedImgIndex,pickedImgs)
      }
    })
  },
  updateImg(uploadedImgIndex,pickedImgs){
    var that = this
     var uploadedImgIndex = uploadedImgIndex
     var pickedImgs = pickedImgs
    var uploadedImgs = that.data.uploadedImgs
    var param = {
      paramsClassNo: "Article_CLASS_1",//配送说明
      articleId: that.data.orderId,
      articleNotes: that.data.articleNotes.html,
      articleTitle: that.data.articleTitle,
      articleDescribe: that.data.articleDescribe,
      articleClassId: "1811201459000283",   //写死
      searchKey:that.data.searchKey,   //用户发表图文时勾选的分类,英文逗号分隔
    }
    var uploadImgParam = {
      attUser: app.globalData.userId,
      attFkId: that.data.orderId,
      attFkName: "[Article_CLASS_XG]",
      attName: "[_" + uploadedImgIndex + "_Article_CLASS_XG.jpg]",
      clientId: app.globalData.userId,
      attNoWater: '1'
    }
    console.log ('1',param)
    console.log ('2',uploadImgParam)
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

          that.setData({
            uploadedImgs: uploadedImgs
          })
        }

        uploadedImgIndex++
        that.setData({
          uploadedImgIndex: uploadedImgIndex
        })
        if (uploadedImgIndex < pickedImgs.length) {
          that.uploadImg()
        } else {
          that.commit(param)
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '已提交',
            showCancel: false,
          });
        }
      }
    })
  },

  commit: function (e) {
    var that=this
    // var param={
    //   photoOrderId: this.data.orderId,
    //   clientId: app.globalData.userId,
    //   shopId: this.data.shopId,
    //   clientAddress: this.data.addressInfo.id
    // }
    app.httpsDataPost('/shop/createArticle', e,
      function (ret) {
        //成功
        if (ret.status) {
          // that.setData({
          //   step: '3'
          // });
          console.log (JSON.stringify(ret))
        } else {
          wx.showModal({
            title: '提示',
            content: '提交失败',
            showCancel: false,
          });
        }
        wx.hideLoading();
      },
      function (ret) {
        //失败
        wx.hideLoading();
      });
  },

  insertImage1() {
    // if(!app.globalData.userId){
    //   wx.showModal({
    //     title: '提示',
    //     content:'尚未登录',
    //     showCancel: false,
    //   })
    //   return
    // }
    

    // var _this = this;
    // wx.showLoading({
    //   title: '上传中...',
    // })
    // wx.chooseImage({
    //   success(res) {
    //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //     var pickedImgs = res.tempFilePaths
    //     //执行上传文件操作
    //     var uploadedImgIndex = _this.data.uploadedImgIndex
    //     var uploadedImgs = _this.data.uploadedImgs


    //     var uploadImgParam = {
    //       attUser: app.globalData.userId,
    //       attFkId: _this.data.orderId,
    //       attFkName: "[Article_CLASS_XG]",
    //       attName: "[_" + uploadedImgIndex + "_Article_CLASS_XG.jpg]",
    //       clientId: app.globalData.userId,
    //       attNoWater: '1'
    //     }
    //     console.log (uploadImgParam)
    //     var that = this
    //     wx.uploadFile({
    //       url: app.globalData.url +'/upFile',
    //       filePath: pickedImgs[uploadedImgIndex],
    //       name: 'file',
    //       formData: uploadImgParam,
    //       success(res) {
    //         if (res.data) {
    //           var resData = JSON.parse(res.data)
    //           if (resData.pic && resData.pic.length > 0)
    //             uploadedImgs.push(resData.pic[0].pic)
    
    //           that.setData({
    //             uploadedImgs: uploadedImgs
    //           })
    //         }
    
    //         uploadedImgIndex++
    //         that.setData({
    //           uploadedImgIndex: uploadedImgIndex
    //         })
    //         console.log (that.data.uploadedImgs)
    //         if (uploadedImgIndex < pickedImgs.length) {//提交
    //           // that.uploadImg()
    //         } else {
    //           // that.commit()
    //         }
    //       }
    //     })

        // wx.uploadFile({
        //   url: config.HOME + config.url.uploadFile, //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {},
        //   success(res) {
        //     wx.hideLoading();
        //     app.myToast('上传成功！');
        //     const data = JSON.parse(res.data);//获取到的json 转成数组格式 进行赋值 和渲染图片
        //     console.log(data.data.src);
            
        //     _this.editorCtx.insertImage({
        //       src: config.HOME + data.data.src,
        //       data: {
        //         id: 'abcd',
        //         role: 'god'
        //       },
        //       success: function () {
        //         console.log('insert image success')
        //       }
        //     })
        //   },
        //   fail(e) {
        //     wx.hideLoading();
        //     console.log(e);
        //   },
        //   complete(e) {
        //     wx.hideLoading();
        //     console.log(e);
        //   }
        // })

  //     }
  //   })
  },




})
