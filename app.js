//app.js

const robot = require('./utils/robot.js')

App({
  globalData: {
    appId: 'wx02b65a26d1cc09f5',
    appSecret: 'c5dc35ea82a80aeb84191ed96d8d0361',
    userInfo: null,
    userId: ''
  },
  robot: robot,
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var self = this;
    // 登录
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        // console.log('code:'+code);
        var appId = '...';
        var secret = '...';
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + self.globalData.appId + '&secret=' + self.globalData.appSecret+'&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json' 
          },
          success: function (res) {
            var openid = res.data.openid //返回openid
              // console.log('openid为' + openid);
              self.globalData.userId= openid
              // 所以此处加入 callback 以防止这种情况
              if (this.userIdReadyCallback) {
                this.userIdReadyCallback(res)
              }
          }
        })
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
  }
})