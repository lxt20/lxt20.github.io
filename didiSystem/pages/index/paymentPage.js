// pages/index/paymentPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeValue:'001',
    wx:false,
    zfb:false,
    xj:true
  },
  gobackDetail(){
    // wx.removeStorage({
    //   key: 'selecList',
    // })
    // wx.removeStorage({
    //   key: 'totalNum',
    // })
    // wx.removeStorage({
    //   key: 'historySelectList',
    // })
    // wx.removeStorage({
    //   key: 'historyTotalNum',
    // })
    // wx.removeStorage({
    //   key: 'directSelectList',
    // })
    // wx.removeStorage({
    //   key: 'directTotalNum',
    // })
    // wx.removeStorage({
    //   key: 'confirmSelectList',
    // }),
    // wx.removeStorage({
    //   key: 'confirmTotalNum',
    // })
    getApp().globalData.selectList=[]
    getApp().globalData.totalNum=0
    getApp().globalData.historySelectList=[]
    getApp().globalData.historyTotalNum=0
    getApp().globalData.directSelectList=[]
    getApp().globalData.directTotalNum=0
    getApp().globalData.confirmSelectList=[]
    getApp().globalData.confirmTotalNum=0
    wx.reLaunch({
      url: './personal',
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type=options.type
    this.setData({
      typeValue:type
    })
    if(type=='001'){
      this.setData({
        wx:true
      })
    }
    if(type=='002'){
      this.setData({
        zfb:true
      })
    }
    if(type=='002'){
      this.setData({
        xj:true
      })
    }
    // console.log(this.data.typeValue);
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