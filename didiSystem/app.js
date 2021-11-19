// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    historySelectList:[],
    selectList:[],
    historyTotalNum:0,
    totalNum:0,
    directSelectList:[],
    directTotalNum:0,
    confirmSelectList:[],
    confirmTotalNum:0
  }
})
