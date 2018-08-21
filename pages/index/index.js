//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    items: [
      { name: '10', value: '10' },
      { name: '20', value: '20', checked: 'true' },
      { name: '50', value: '50' },
      { name: '100', value: '100' }
    ],
    examScope: 20,
    examCount: 20,
    examType: "+"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
  examScopeChange: function(e) {
    this.data.examScope = e.detail.value;
  }, 
  examCountChange: function (e) {
    this.data.examCount = e.detail.value;
  },
  examTypeChange: function(e) {
    this.data.examType = e.detail.value
  },
  start: function() {
    wx.navigateTo({
      url: '../main/main?examcfg=' + JSON.stringify({
        examScope:this.data.examScope, 
        examCount:this.data.examCount,
        examType:this.data.examType
        })
    })
  }
})
