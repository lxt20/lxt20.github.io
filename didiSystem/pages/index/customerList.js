// pages/index/customerList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list2:[
      {
        orderid:'3',
        shopName:'广东通用医药有限公司',
        address:'广州市花都区花东镇金港中路1号J7栋;广州市花都区富力金港新城金港北一路4号J10栋',
        num:2,
        money:'560'
      },
      {
        orderid:'4',
        shopName:'广东海王医药集团有限公司',
        address:'广州市番禺区化龙镇龙强街1号1楼、2楼、3楼、4楼',
        num:1,
        money:'80'
      },
      {
        orderid:'5',
        shopName:'广州采芝林药业有限公司',
        address:'广州市荔湾区塞坝路36号；佛山市南海区里水大道中路60号自编4栋、5栋、6栋、7栋2-5层',
        num:3,
        money:'1800'
      }
    ],
    list:[
      {
        orderid:'1',
        shopName:'广东启泰药业有限公司',
        address:'普宁市池尾街道新寮村新南里南湖第6幢第一、二层',
        num:1,
        money:'66'
      },
      {
        orderid:'2',
        shopName:'广东深华药业有限公司',
        address:'丰顺县经济开发区工业园二区2-1号B栋一、二楼',
        num:2,
        money:'780'
      }
    ],
    allList:[],
    keyword:'',
    shopName:''
  },
  // 搜索输入事件
  getInput(e){
    // console.log(e.detail.value);
    var value=e.detail.value
    this.setData({
      keyword:value
    })
  },
  //搜索确认事件
  getConfirm(e){
    var value=e.detail.value
    this.setData({
      shopName:value
    })
  }, 
  // 查询按钮
  searchClick(){
    var shopName=this.data.keyword
    this.setData({
      shopName:shopName
    })
    var list=this.data.allList
    var searchList=[]
    console.log(this.data.shopName);
    for(var i=0;i<list.length;i++){
      if(list[i].shopName.indexOf(shopName) != -1){
        searchList.push(list[i])
      }
    }
    this.setData({
      list:searchList
    })
  },
  gotoSales(e){
    console.log(e);
    var index=e.currentTarget.dataset.index
    var name=e.currentTarget.dataset.name
    wx.navigateTo({
      url: './salesOrder?index='+index+'&name='+name,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    console.log(options.index);
    if(options.index==0){
       this.setData({
        allList:_this.data.list
      })
    }else if(options.index==1){
      this.setData({
        list:_this.data.list2,
        allList:_this.data.list2
      })
    }
   
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
    wx.removeStorage({
      key: 'selectList',
    })
    wx.removeStorage({
      key: 'totalNum',
    })
    wx.removeStorage({
      key: 'historySelectList',
    })
    wx.removeStorage({
      key: 'historyTotalNum',
    })
    getApp().globalData.selectList=[]
    getApp().globalData.totalNum=0
    getApp().globalData.historySelectList=[]
    getApp().globalData.historyTotalNum=0
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
    console.log('下拉刷新');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉加载');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})