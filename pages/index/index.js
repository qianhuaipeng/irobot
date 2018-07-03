//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    userId:'',
    nickName:'',
    question:'',
    outputItems: [],
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('app.globalData.userInfo:' + app.globalData.userInfo)
    console.log('canIUse' + this.data.canIUse);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log("userInfoReadyCallback" + res.userInfo.nickName)
        this.setData({
          userInfo: res.userInfo,
          nickName: res.userInfo.nickName,
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

    console.log('userInfo:' + this.data.userInfo);
    console.log('nickName:' + this.data.userInfo.nickName);
    app.robot.ask('你好', 'test', 'weixin')
      .then(d => {
        var arr = new Array();
        arr = {"position":'left',"data":d}
        this.setData({
          outputItems: this.data.outputItems.concat(arr)
        })
      })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  questionInput: function(e){
    // console.log(e.detail.value)
    this.setData({
      question: e.detail.value
    })
  },
  sendMsg: function(){
    console.log(this.data.question)
    var question = this.data.question;
    var questionArr = new Array();
    questionArr = {"content":question,"nickName":this.data.userInfo.nickName}
    var arr = new Array();
    arr = { "position": 'right', "data": questionArr }
    this.setData({
      outputItems: this.data.outputItems.concat(arr)
    })
    
    app.robot.ask(question, app.globalData.userId, 'weixin')
      .then(d => {
        console.log(d)
        var arr = new Array();
        arr = { "position": 'left', "data": d }
        this.setData({
          outputItems: this.data.outputItems.concat(arr)
        })
      })
  }
})
