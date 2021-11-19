// pages/index/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startdate:'请选择起始时间',
    enddate:'请选择终止时间',
    list:[
      {
        orderid:'001040',
        shopName:'广州采芝林药业有限公司',
        address:'广州市荔湾区塞坝路36号；佛山市南海区里水大道中路60号自编4栋、5栋、6栋、7栋2-5层',
        date:'2021-09-10',
        money:'0',
        skje:'600'
      },
      {
        orderid:'001039',
        shopName:'广东百优连锁医药物流有限公司',
        address:'潮州市饶平县迎宾大道西1号一楼之二、之三，二楼，三楼西侧',
        date:'2021-09-10',
        money:'0',
        skje:'600'
      },
      {
        orderid:'001038',
        shopName:'广东百优连锁医药物流有限公司',
        address:'潮州市饶平县迎宾大道西1号一楼之二、之三，二楼，三楼西侧',
        date:'2021-09-09',
        money:'0',
        skje:'730'
      },
      {
        orderid:'001037',
        shopName:'广东百优连锁医药物流有限公司',
        address:'潮州市饶平县迎宾大道西1号一楼之二、之三，二楼，三楼西侧',
        date:'2021-09-07',
        money:'0',
        skje:'1200'
      },
      {
        orderid:'001036',
        shopName:'广东本草药业连锁有限公司',
        address:'广东省广州市白云区三元里大道1146号自编1号1楼',
        date:'2021-08-31',
        money:'0',
        skje:'980'
      }
    ],
    keyword:'',
    shopName:''
  },
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
  bindstartDateChange(e){
    var startdate=e.detail.value
    if(this.data.enddate!='请选择终止时间'){
      var date = new Date(startdate);
      var date2= new Date(this.data.enddate)
      var timp=date2-date
      if(timp<=0){
        wx.showToast({
          title: '时间选择不正确！',
          icon:'error'
        })
      }else{
        this.setData({
          startdate:startdate
        })
      }
    }else{
      this.setData({
        startdate:startdate
      })
    }
    
  },
  bindendDateChange(e){
    var enddate=e.detail.value
    if(this.data.startdate!='请选择起始时间'){
      var date = new Date(this.data.startdate);
      var date2= new Date(enddate)
      var timp=date2-date
      console.log(date,date2,timp);
      if(timp<=0){
        wx.showToast({
          title: '时间选择不正确！',
          icon:'error'
        })
      }else{
        this.setData({
          enddate:enddate
        })
      }
    }else{
      this.setData({
        enddate:enddate
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    this.setData({
      allList:_this.data.list
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
    console.log('下拉刷新');
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(function(){
      wx.hideLoading()
    },1000)
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