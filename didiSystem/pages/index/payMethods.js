// pages/index/payMethods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalNum:0,
    payList:[
      {
        payImg:'../icon/wx.png',
        payText:'微信',
        payValue:'001'
      },
      {
        payImg:'../icon/zfb.png',
        payText:"支付宝",
        payValue:'002'
      },
      {
        payImg:'../icon/xj.png',
        payText:'现金',
        payValue:'003'
      }
    ],
    payIndex:0,
    paySelect:''
  },
  payClick(e){
    var index=e.currentTarget.dataset.index
    console.log(index);
    var paySelect=this.data.payList[index].payValue
    this.setData({
      payIndex:index,
      paySelect:paySelect
    })
  },
  // 确认收款按钮
  gotoPay(){
    var _this=this
    console.log(this.data.paySelect);
    wx.navigateTo({
      url: './paymentPage?type='+_this.data.paySelect,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list=this.data.payList
    var totalNum=options.totalNum
    var payindex=list[0].payValue
    this.setData({
      totalNum:totalNum,
      paySelect:payindex
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