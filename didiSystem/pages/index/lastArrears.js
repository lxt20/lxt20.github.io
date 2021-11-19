// pages/index/lastArrears.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startdate:'请选择起始时间',
    enddate:'请选择终止时间',
    orderList:[
      {
        orderid:'000119',
        orderdate:'2021-03-08',
        shopName:'广东本草药业连锁有限公司',
        address:'广东省广州市白云区三元里大道1146号自编1号1楼',
        ysMoney:988,
        ml:0,
        ssMoney:988,
        checked:false
      },
      {
        orderid:'000127',
        orderdate:'2021-03-13',
        shopName:'广东广弘医药有限公司',
        address:'广州市荔湾区南岸路栅外街14号自编1栋一层101、102、108、109、110',
        ysMoney:2000.5,
        ml:0.5,
        ssMoney:2000,
        checked:false
      },
    ],
    allList:[],
    totalMoney:0,
    selectedList:[],
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
      orderList:searchList
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
  // checkbox-group控制
  getCheck(e){
    var list=e.detail.value
    var orderList=this.data.orderList
    console.log(list);
    var totalNum=0
    var selectList=[]
    for(var i=0;i<this.data.orderList.length;i++){
      for(var j=0;j<list.length;j++){
        if(list[j]==this.data.orderList[i].orderid){
          // 计算带算结的金额
          orderList[i].checked=true
          totalNum=totalNum+this.data.orderList[i].ssMoney
          // 将选中项目加入选中的列表
          selectList.push(orderList[i])
        }
      }
    }
    console.log(selectList);
    this.setData({
      totalMoney:totalNum,
      selectedList:selectList,
      // orderList:orderList
    })
  },
  allSelectBtn(){
    var orderList=this.data.orderList
    var totalNum=this.data.totalMoney
    var selectList=[]
    if(totalNum==0){
      for(var i=0;i<orderList.length;i++){
        orderList[i].checked=true
        totalNum=totalNum+orderList[i].ssMoney
        selectList=orderList
      }
      this.setData({
        orderList:orderList,
        totalMoney:totalNum,
        selectedList:selectList
      })
    }else if(totalNum!=0){
      for(var i=0;i<orderList.length;i++){
        orderList[i].checked=false
        totalNum=0
        selectList=[]
      }
      this.setData({
        orderList:orderList,
        totalMoney:totalNum,
        selectedList:selectList
      })
    }
    // console.log(selectList);
    
  },
  waitBtn(){
    if(this.data.totalMoney==0){
      wx.showToast({
        title: '暂无算结单号',
        icon:'none'
      })
    }else{
      // wx.setStorage({
      //   key:"directSelectList",
      //   data:this.data.selectedList
      // })
      // wx.setStorage({
      //   key:"directTotalNum",
      //   data:this.data.totalMoney
      // })
      getApp().globalData.directSelectList=this.data.selectedList
      getApp().globalData.directTotalNum=this.data.totalMoney
      wx.navigateTo({
        url: './settleList?isDirect=2',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    this.setData({
      allList:_this.data.orderList
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