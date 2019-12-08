//app.js
App({
  onLaunch: function () {
    var that = this;
    //检查网络
    wx.getNetworkType({
      success: (result) => {
        if (result.networkType == "none") {
          wx.showModal({
            title: '温馨提示',
            content: '请检查您的网络连接',
            showCancel: false,
          })
        } else { }
      },
      fail: () => { },
      complete: () => { }
    });

    //检查网络
    wx.onNetworkStatusChange((result) => {
      if (result.networkType == "none") {
        wx.showModal({
          title: '温馨提示',
          content: '请检查您的网络连接',
          showCancel: false,
        })
      } else { }
    });

    //检查网络
    wx.onNetworkStatusChange((result) => {
      if (result.networkType == "none") {
        wx.showModal({
          title: '温馨提示',
          content: '请检查您的网络连接',
          showCancel: false,
        })
      } else { }
    });

    //检测新版本
    var updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      wx.showModal({
        title: '温馨提示',
        content: '新版本下载成功！',
        showCancel: false,
        confirmText: '重启更新',
        success: function (res) {
          updateManager.applyUpdate()
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '温馨提示',
        content: '新版本更新失败',
        showCancel: false,
      })
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.globalData.js_code = res.code
        that.getOpenIdHttps(res.code, 1, function(result) {});
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },

  /**
  * 如果页面执行得比onLaunch快，则在页面中使用此方法登录
  */
  wxLogin: function () {
    console.log ('22')
    var that = this;
    return new Promise(function (resolve, reject) {
      var js_code = that.globalData.js_codel;
      if (js_code == undefined || js_code == null || js_code == '') {
        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            that.globalData.js_code = res.code
            that.getOpenIdHttps(res.code, 1, function (result) {
              resolve(result);

            });
          }
        })
      } else {
        that.getOpenIdHttps(js_code, 1, function (result) {
          resolve(result);
        });
      }

    });
  },

  /**
 * 通过openId登录
 * calFun(res) 回调 res.code:true成功，res.code:false失败
 */
  loginByOpenId: function (openId, unionid, calFun) {
    var that = this;
    if(unionid == undefined){
      unionid = null
    }
    var param = 'openId=' + openId + '&from=4&unionId=' + unionid;
    this.httpsDataGet('/user/loginByOpenId', param,
      function (loginRet) {
        //成功
        // wx.showLoading();
        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  that.globalData.userInfoData = loginRet
                  that.globalData.userInfo = res.userInfo
                  that.globalData.userId = loginRet.data.clientId;
                  that.globalData.userAvatar = res.userInfo.avatarUrl;
                  that.globalData.starLevel = loginRet.data.starLevel;
                  that.globalData.sex = loginRet.data.sex;
                  that.globalData.level = loginRet.data.clientLevel;
                  that.globalData.phone = loginRet.data.clientPhone;
                  that.globalData.userName = loginRet.data.clientAccount;
                  that.globalData.loginUser = loginRet.data
                  that.setZxjToken(loginRet.data.token);
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
                  wx.hideLoading();
                  var calRes = {};
                  calRes.code = true;
                  typeof calFun == "function" && calFun(calRes)
                  // that.startConnectSocket();
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
          }
        })
      },
      function (returnFrom, res) {
        //失败
        wx.hideLoading();
        that.clearUserInfo();
      }
    )
  },



  /**
 * 保存token
 */
  setZxjToken: function (token) {
    try {
      wx.setStorageSync('zxj_token', token)
    } catch (e) { }
  },

  /**
   * 获取token
   */
  getZxjToken: function () {
    try {
      return wx.getStorageSync('zxj_token')
    } catch (e) {
      return null;
    }
  },

  /**
   * 请求获取用户唯一标识openid
   * action 1登录，0其他
   */
  getOpenIdHttps: function (code, action, funCal) {
    // wx.showLoading();
    var that = this
    var zxjToken = this.getZxjToken();
    var url = that.globalData.url + '/getWeiXinUserInfo?code=' + code + '&appletType=3';
    url = encodeURI(url);
    wx.request({
      url: url,
      method: 'post',
      header: {
        'content-type': 'text/plain;charset=utf-8',
        'token': zxjToken
      },
      success: res => {
        if (res.statusCode == 200) {
          var resultData = res.data;
          if (typeof resultData == 'object' && resultData) {
            //如果是json对象,不用做处理
          } else {
            //如果是json字符串，则需要处理成json对象
            resultData = JSON.parse(resultData);
          }
          that.globalData.openId = resultData.openid;
          that.globalData.unionid = resultData.unionid;
          that.globalData.sessionKey = resultData.session_key;
          if (action == 1) {

            that.loginByOpenId(that.globalData.openId, that.globalData.unionid, funCal);
          } else {
            wx.hideLoading();
            funCal(true, resultData);
          }
          // funCal(true, resultData);
        } else {
          wx.hideLoading();
          that.clearUserInfo();
          // wx.showModal({
          //   title: '提示',
          //   content: '请求失败(' + res.statusCode + ')',
          //   showCancel: false,
          // })
          funCal(false, null);
        }
      },
      fail: res => {
        //请求接口失败
        that.clearUserInfo();
        wx.hideLoading()
        wx.showModal({
          title: '获取OpenId失败',
          content: res.errMsg,
          showCancel: false,
        })
        funCal(false, null);
      },
    })
  },

  /**
 * get请求
 * actionUrl :请求接口入口
 * param 请求参数
 * call_success 请求成功回调
 * call_fail 请求失败回调
 */
  httpsDataGet: function (actionUrl, param, call_success, call_fail) {
    var url = this.globalData.url + '/jaxrs' + actionUrl + '?' + param;
    url = encodeURI(url);
    var zxjToken = this.getZxjToken();
    wx.request({
      url: url,
      method: 'get',
      dataType: 'json',
      header: {
        'content-type': 'text/plain;charset=utf-8',
        'token': zxjToken
      },
      success: res => {
        wx.hideLoading()
        if (res.statusCode == 200) {
          var resultData = res.data;
          //判断返回来的数据resultData是json对象还是json字符串
          if (typeof resultData == 'object' && resultData) {
            //如果是json对象,不用做处理
          } else {
            //如果是json字符串，则需要处理成json对象
            try {
              resultData = JSON.parse(resultData);
            } catch (e) {
              wx.showToast({
                title: '服务端出错(01)',
                icon: 'none',
                duration: 2000
              })
              typeof call_fail == "function" && call_fail(2, res)
              return;
            }
          }
          if (resultData.status) {
            typeof call_success == "function" && call_success(resultData)
          } else {
            if (this.globalData.isLogin && resultData.code == '0004') {
              wx.showModal({
                title: '提示',
                content: '未注册,请注册绑定',
                showCancel: false,
              })
            } else {
              wx.showModal({
                title: '提示(' + resultData.code + ')',
                content: resultData.msg,
                showCancel: false,
              })
            }
            typeof call_fail == "function" && call_fail(0, resultData)
          }
        } else if (res.statusCode == '0009'){
          
        } 
        else {
          wx.showModal({
            title: '提示',
            content: '请求失败(' + res.statusCode + ')',
            showCancel: false,
          })
        }

      },
      fail: res => {
        //请求接口失败
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '网络异常(' + res.errMsg + ')',
          showCancel: false,
        })
        typeof call_fail == "function" && call_fail(1, res)
      },
    })
  },

  /**
 * Post请求
 * actionUrl :请求接口入口
 * param 请求参数
 * call_success 请求成功回调
 * call_fail 请求失败回调
 */
  httpsDataPost: function (actionUrl, param, call_success, call_fail) {
    var url = this.globalData.url + '/jaxrs' + actionUrl;
    url = encodeURI(url);
    var zxjToken = this.getZxjToken();
    wx.request({
      url: url,
      data: JSON.stringify(param),
      method: 'post',
      dataType: 'json',
      header: {
        'content-type': 'application/json; charset=UTF-8',
        'token': zxjToken
      },
      success: res => {
        wx.hideLoading()
        if (res.statusCode == 200) {
          var resultData = res.data;
          if (typeof resultData == 'object' && resultData) {
            //如果是json对象,不用做处理
          } else {
            //如果是json字符串，则需要处理成json对象
            try {
              resultData = JSON.parse(resultData);
            } catch (e) {
              wx.showToast({
                title: '服务端出错(01)',
                icon: 'none',
                duration: 2000
              })
              typeof call_fail == "function" && call_fail(2, res)
              return;
            }
          }
          if (resultData.status) {
            typeof call_success == "function" && call_success(resultData)
          } else {
            wx.showModal({
              title: '提示',
              content: resultData.msg + '(' + resultData.code + ')',
              showCancel: false,
            })
            typeof call_fail == "function" && call_fail(0, resultData)
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '请求失败(' + res.statusCode + ')',
            showCancel: false,
          })
        }

      },
      fail: res => {
        //请求接口失败
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '请求失败(' + res.errMsg + ')',
          showCancel: false,
        })
        typeof call_fail == "function" && call_fail(1, res)
      },
    })
  },

    /**
   * 通过平台接口获取数据（sql）
   * dataSet 查询调用的名称
   * queryMode map或list
   * param 请求参数
   * call_success 请求成功回调
   * call_fail 请求失败回调
   */
  httpsGetDatByPlatform: function(dataSet, queryMode, param, call_success, call_fail) {
    //key = 'zxj_repertory';//数据源名称
    //AJAX_MODE = 'AJAX_MODE_QUERY';//固定
    //DATASET = 'client_rec_addres_default';//查询调用的名称
    //QUERY_MODE = 'map';//’map或list’
    var paramStr = "key=zxj_repertory&AJAX_MODE=AJAX_MODE_QUERY&DATASET=" + dataSet + "&QUERY_MODE=" + queryMode + "&" + param
    var url = this.globalData.url + '/ajax?' + paramStr;
    url = encodeURI(url);
    var zxjToken = this.getZxjToken();
    wx.request({
      url: url,
      method: 'post',
      dataType: 'json',
      header: {
        'content-type': 'application/json;charset=UTF-8',
        'token': zxjToken
      },
      success: res => {
        wx.hideLoading();
        if (res.statusCode == 200) {
          var resultData = res.data;
          if (resultData.code == 0 || resultData.code == '0') {
            //获取到数据成功
            var resultMsg = resultData.msg;
            //判断返回来的数据resultData是json对象还是json字符串
            if (typeof resultMsg == 'object' && resultMsg) {
              //如果是json对象,不用做处理
            } else {
              //如果是json字符串，则需要处理成json对象
              if (resultMsg == '' || resultMsg == null) {
                resultData.msg = queryMode == 'list' ? [] : {};
              } else {
                resultMsg = JSON.parse(resultMsg);
                resultData.msg = resultMsg;
              }
            }
            typeof call_success == "function" && call_success(resultData)
          } else {
            //获取数据失败
            wx.showModal({
              title: '提示',
              content: resultData.msg + '(' + resultData.code + ')',
              showCancel: false,
            })
            typeof call_fail == "function" && call_fail(0, resultData)
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '请求失败(' + res.statusCode + ')',
            showCancel: false,
          })
        }
      },
      fail: res => {
        wx.hideLoading();
        //请求接口失败
        wx.showModal({
          title: '提示',
          content: '网络异常(' + res.errMsg + ')',
          showCancel: false,
        })
        typeof call_fail == "function" && call_fail(1, res)
      },
    })
  },

  /**
   * 通过平台请求接口(class)
   * dataSet 查询调用的名称
   * queryMode map或list
   * param 请求参数
   * call_success 请求成功回调
   * call_fail 请求失败回调
   */
  httpsPlatformClass: function (dataSet, param, call_success, call_fail) {
    //key = 'zxj_repertory';//数据源名称
    //AJAX_MODE = 'AJAX_MODE_QUERY';//固定
    //DATASET = 'client_rec_addres_default';//查询调用的名称
    //QUERY_MODE = 'map';//’map或list’
    // var paramStr = "AJAX_MODE_OPERATE=" + dataSet + "&" + param
    var paramStr = "AJAX_MODE=AJAX_MODE_OPERATE&operate=" + dataSet + "&" + param;
    var url = this.globalData.url + '/ajax?' + paramStr;
    url = encodeURI(url);
    var zxjToken = this.getZxjToken();
    wx.request({
      url: url,
      method: 'post',
      dataType: 'json',
      header: {
        'content-type': 'application/json;charset=UTF-8',
        'token': zxjToken
      },
      success: res => {
        wx.hideLoading();
        if (res.statusCode == 200) {
          var resultData = res.data;
          if (resultData.code == 0 || resultData.code == '0') {
            //获取到数据成功
            var resultMsg = resultData.msg;
            //判断返回来的数据resultData是json对象还是json字符串
            if (typeof resultMsg == 'object' && resultMsg) {
              //如果是json对象,不用做处理
            } else {
              //如果是json字符串，则需要处理成json对象
              if (resultMsg == '' || resultMsg == null) {
              } else {
                // resultMsg = JSON.parse(resultMsg);
                // resultData.msg = resultMsg;
              }
            }
            typeof call_success == "function" && call_success(resultData)
          } else {
            //获取数据失败
            wx.showModal({
              title: '提示',
              content: resultData.msg + '(' + resultData.code + ')',
              showCancel: false,
            })
            typeof call_fail == "function" && call_fail(0, resultData)
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '请求失败(' + res.statusCode + ')',
            showCancel: false,
          })
        }
      },
      fail: res => {
        wx.hideLoading();
        //请求接口失败
        wx.showModal({
          title: '提示',
          content: '请求失败(' + res.errMsg + ')',
          showCancel: false,
        })
        typeof call_fail == "function" && call_fail(1, res)
      },
    })
  },

  /**上传文件 */
  uploadFileHttps: function (attUser, attFkId, attFkNameStr, attName, imgPath, calFun) {
    var url = this.globalData.url;
    var that = this
    var uploadImgParam = {
      attUser: attUser,
      attFkId: attFkId,
      attFkName: "[" + attFkNameStr + "]",
      attName: "[" + attName + "]",
      attNoWater: '1'
    };
    wx.uploadFile({
      url: url + '/upFile',
      filePath: imgPath,
      name: 'file',
      formData: uploadImgParam,
      success(res) {
        if (res.statusCode == 200) {
          var resultData = res.data;
          if (typeof resultData == 'object' && resultData) {
            //如果是json对象,不用做处理
          } else {
            //如果是json字符串，则需要处理成json对象
            try {
              resultData = JSON.parse(resultData);
            } catch (e) {
              wx.showToast({
                title: '服务端出错(01)',
                icon: 'none',
                duration: 2000
              })
              typeof calFun == "function" && calFun(false, null)
              return;
            }
          }
          if (resultData.status) {
            var imgListRes = resultData.pic;
            var imgListTemp = [];
            for (var index in imgListRes) {
              imgListTemp.push(imgListRes[index].pic)
            }
            typeof calFun == "function" && calFun(true, imgListTemp)
          } else {
            wx.showToast({
              title: resultData.msg + '(' + resultData.code + ')',
              icon: 'none',
              duration: 2000
            })
            typeof calFun == "function" && calFun(false, null)
          }
        } else {
          typeof calFun == "function" && calFun(false, null)
          wx.showToast({
            title: '请求失败(' + res.statusCode + ')',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  /**使用正则验证输入的是否是手机号 */
  checkPhone: function (str) {
    var phoneReg = /^[1][1-9][0-9]{9}$/; //以1为开头;第二位可为1-9,中的任意一位；最后以0-9的9个整数结尾
    if (!phoneReg.test(str)) {
      return false;
    } else {
      return true;
    }
  },

  /**
 * 检查是否用户登录状态
 */
  checkLoginState: function (calFun) {
    if (this.globalData.userInfo == null || this.globalData.userInfo == '' || this.globalData.userInfo == undefined) {
      wx.showModal({
        title: '尚未登录',
        content: '请先登录在操作',
        showCancel: false,
        success: res => {
          if (calFun != undefined && calFun != null && calFun != '') {
            typeof calFun == "function" && calFun(true)
          }
          wx.navigateTo({
            url: '/pages/bindPhone/bindPhone'
          })
        }
      })
      return false;
    } else {
      return true;
    }
  },

  /**判断字符是不是纯数据类型 */
  isNumber: function (val) {
    var regPos = /^\d+(\.\d+)?$/;  //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;  //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
      return true;
    }
    else {
      return false;
    }
  },

  /**退出登录，清空小程序用户信息数据*/
  clearUserInfo: function () {
    this.globalData.userInfo = null;
    this.globalData.openId = '';
    this.globalData.sessionKey = '';
  },

  globalData: {
    // url: 'https://www.zxj888.cn:8443', //正式环境接口域名
    // urlFs: 'https://www.zxj888.cn:9443', //正式环境接口域名
    // websocketUrl: 'wss://zxj888.cn:9443/zxj/websocket', //正式环境websocket

    url: 'https://www.zxjtest.xyz', //开发环境接口域名
    urlFs: 'https://www.zxjtest.xyz:9443', //开发环境接口域名
    websocketUrl: 'wss://zxjtest.xyz:9443/zxj/websocket',//开发环境websocket

    baiduUrl: 'https://api.map.baidu.com', //百度ip
    realTimeCustomer: '60E246CB7star_red.pngdddddddddB645273DCF2DC4E18B4AEF9',//customer(快递100实时查询接口)
    realTimeKey: 'ImODrCSn9734',//key(快递100实时查询接口)
    curCityId: '', //当前城市id
    curCity: '', //当前城市名称
    userInfo: null, //微信用户信息
    openId: '', //用户唯一标识
    unionid: '',//微信开放平台管理的应用唯一标识
    userId: '', //用户id
    sessionKey: '',
    starLevel: 0,
    level: 0,
    phone: '', //手机号
    userName: '', //用户名称
    userAvatar: '', //用户头像
    accountBalance: 0,//账户余额
    gzhurl: 'https://www.zxj888.cn:8443', //所有涉及公众号的都调到正式环境
  },
  
  /**退出登录，清空小程序用户信息数据*/
  clearUserInfo: function () {
    this.globalData.userInfo = null;
    this.globalData.openId = '';
    this.globalData.sessionKey = '';
  },

  //装小匠客服
  customerService: {
    id: 'zxj_service',
    name: '装小匠客服',
    avatar: '/images/orderTypeIcon/kefu.png'
  },
})