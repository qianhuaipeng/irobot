//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    inputTxt:'',
    userId:'',
    nickName:'',
    question:'',
    outputItems: [],
    hasUserInfo: false,
    scrollTop: 0,
    srollHeight: 400
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function(){
    console.log('onShowed')
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var height = res.windowHeight ;   //footerpannelheight为底部组件的高度
        console.log("height:"+height)
        that.setData({
          srollHeight: height - 40
        });
      }
    })

  },
  onLoad: function () {
    console.log('onLoaded')
    // console.log('app.globalData.userInfo:' + app.globalData.userInfo)
    // console.log('canIUse' + this.data.canIUse);
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

    // console.log('userInfo:' + this.data.userInfo);
    // console.log('userId:' + app.globalData.userId);
    this.welcome();
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
  welcome: function(){
    var arr = new Array();
    arr = {"content":"你好，很高兴认识你！"}
    this.showMessage("left",arr);
  },
  sendMsg: function(){
    var question = this.data.question;
    if(question == null || question == '') {
      return;
    }
    var questionArr = new Array();
    questionArr = {"content":question,"nickName":this.data.userInfo.nickName}
    this.showMessage('right',questionArr);
    this.clearInputTxt()
     
    app.robot.ask(question, app.globalData.userId, 'app')
      .then(d => {
        // console.log(d)
        this.showMessage('left', d);
      })

  },
  showMessage: function(postion,data){
    var arr = new Array();
    arr = { "position": postion, "data": data }
    this.setData({
      outputItems: this.data.outputItems.concat(arr),
      scrollTop: this.data.scrollTop + 500
    }) 
  },
  toOtherPage: function (event) {
    var type_ = event.currentTarget.dataset.type;
    var title = event.currentTarget.dataset.title;
    if(type_ == 'toH5'){
      var url = event.currentTarget.dataset.url;
      wx.navigateTo({
        url: '../../pages/out/out?url=' + url,
      })
    } else {
      wx.navigateTo({
        url: '../../pages/comment/index?title=' + title,
      })
    }
    
  },
  clearInputTxt: function(){
    this.setData({
      inputTxt: ''
    })
  }
})
