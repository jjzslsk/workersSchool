// pages/smsLogin/smsLogin.js

const app = getApp();
var countdownSmsCode;
var totalTime = 30;
var isCaling = false; //是否在计时中
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    phone: '', //手机号
    smsCode: '', //验证码
    disabledSmsCode: true, //是否屏幕获取验证码点击事件
    smsCodeHint: '获取验证码', //按键提示
  },

  /**
   * 监听输入当前手机号码
   */
  bindPhoneInput: function(e) {
    var disabledSmsCode = true;
    var valid=true
    if (e.detail.value == '' || !e.detail.value.match(/^1[34578]\d{9}$/)) {
      valid = false
    }

    if (valid) {
      //检测到数据的号码是手机号格式，并且当前获取短信按钮已经不在计时，允许开放点击获取短信验证码
      disabledSmsCode = false;
    } else {
      //否则不允许点击
      disabledSmsCode = true;
    }
    this.setData({
      phone: e.detail.value,
      disabledSmsCode: disabledSmsCode
    })
  },

  /**
   * 监听输入验证码
   */
  bindSmsCodeInput: function(e) {
    var val = e.detail.value;
    if (val.length == 1) {
      val = val.replace(/[^1-9]/g, '')
    } else {
      val = val.replace(/\D/g, '')
    }
    this.setData({
      smsCode: val
    })
  },

  /**
   * 开始计时
   */
  startCountDown: function() {
    var than = this;
    countdownSmsCode = setTimeout(function() {
      totalTime--;
      if (totalTime < 1) {
        isCaling = false; //计时结束
        than.setData({
          disabledSmsCode: false,
          smsCodeHint: '重新获取',
        });
        clearTimeout(countdownSmsCode)
      } else {
        isCaling = true; //正在计时
        than.setData({
          smsCodeHint: totalTime + '秒后重发'
        });
        than.startCountDown();
      }
    }, 1000);
  },

  /**
   * 获取短信验证码
   */
  getSmsCodeTap: function(e) {
    var that = this;
    if (this.data.disabledSmsCode) return;
    if (this.data.phone == '') {
      wx.showModal({
        title: '提示',
        content: '请输入手机号码',
        showCancel: false,
        success: res => {}
      })
      return;
    }
    var param = 'phone=' + this.data.phone + '&type=1' + '&openId=' + app.globalData.openId + '&from=6'; //type:1注册，2登录，3修改密码，4信息变更
    app.httpsDataGet('/user/getSmsVerify', param,
      function(res) {
        //成功
        totalTime = 30;
        that.setData({
          disabledSmsCode: true,
          smsCodeHint: totalTime + '秒后重发'
        });
        that.startCountDown();
      },
      function(returnFrom, res) {
        //失败
      }
    )
  },

  /**
   * 注册绑定
   */
  bindRedTap: function(param, userInfo) {
    app.httpsDataPost('/user/reg', param,
      function(ret) {
        //成功
        wx.showModal({
          title: '提示',
          content: '注册成功',
          showCancel: false,
          success: res => {
            wx.showLoading();
            app.loginByOpenId(app.globalData.openId, app.globalData.unionid, function(loginRes) { 
              wx.hideLoading();
              if (loginRes.code) {
                wx.navigateBack({
                  delta: 1
                })
              }
            });
          }
        });
      },
      function(returnFrom, ret) {
        //失败
      });
  },

  /**把微信授权的用户信息放到全局当中 */
  getUserInfo: function(e) {
    var action = e.currentTarget.dataset.action;
    var that = this;
    var userInfo = e.detail.userInfo;
    if (userInfo == null || userInfo == undefined || userInfo == '') return;
    if (action == 'reg') {
      //注册
      var phone = this.data.phone; //手机号
      var smsCode = this.data.smsCode; //验证码
      if (!app.checkPhone(phone)) {
        wx.showModal({
          title: '提示',
          content: '手机号码格式错误',
          showCancel: false,
          success: res => {}
        })
      } else if (smsCode == '' || smsCode.length < 4) {
        wx.showModal({
          title: '提示',
          content: '请输入4位数验证码',
          showCancel: false,
          success: res => {}
        })
      } else {
        // 重新登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            //微信登录获取code
            app.globalData.js_code = res.code
            //请求获取openid
            app.getOpenIdHttps(res.code, 0, function(isSuccess, resultData) {
              if (isSuccess) {
                var param = {};
                param.account = userInfo.nickName; //昵称
                param.CLIENT_ACCOUNT = userInfo.nickName; //昵称
                param.avatar = userInfo.avatarUrl;//头像
                param.openId3 = resultData.openid; //openid
                param.unionId = resultData.unionid; //unionid
                param.phone = phone; //手机号
                param.verifyCode = smsCode; //短信验证码
                param.from = 6;
                param.type = 0; //"type":0正常注册"type": 1 扫码注册
                that.bindRedTap(param, userInfo);
              }
            });
          },
          fail: res => {
            wx.hideLoading()
          }
        });
      }
    } else if (action == 'login') {
      //登录
      app.globalData.isLogin = true;
      wx.showLoading();
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          //微信登录获取code
          app.globalData.js_code = res.code
          //请求获取openid
          app.getOpenIdHttps(res.code, 0, function (isSuccess, resultData) {
            if (isSuccess) {
              app.loginByOpenId(resultData.openid, resultData.unionid, function (loginRes) {
                wx.hideLoading();
                if (loginRes.code) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              });
            }
          });
        },
        fail: res => {
          wx.hideLoading()
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    app.globalData.isLogin = false;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    app.globalData.isLogin = false;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})