// pages/index/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'',
    pwd:''
  },
  getAccountInput(e){
    var value=e.detail.value
    this.setData({
      account:value
    })
  },
  getPwdInput(e){
    var value=e.detail.value
    this.setData({
      pwd:value
    })
  },
  gotoIndex(){
    var _this=this
    var account=this.data.account
    var pwd=this.data.pwd
    if(account=='admin' && pwd=='123456'){
      wx.setStorage({
        key:'userInfo',
        data:{
          account:account,
          pwd:pwd
        }
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    }else{
      wx.showToast({
        title: '登录账号或密码错误！',
        icon:'none'
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    wx.getStorage({
      key: 'userInfo',
      success (res) {
        console.log(res.data)
        _this.setData({
          account:res.data.account,
          pwd:res.data.pwd
        })
        setTimeout(function(){
          if(_this.data.account=='admin' && _this.data.pwd=='pwd'){
            wx.navigateTo({
              url: './index',
            })
          }
        },0)
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})