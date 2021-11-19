// pages/index/historyList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    startdate:'请选择起始时间',
    enddate:'请选择终止时间',
    orderList:[],
    totalMoney:0,
    selectedList:[],
    list1:[
      {
        orderid:'000121',
        orderdate:'2021-04-23',
        ysMoney:70,
        ml:0,
        ssMoney:70,
        checked:false
      },
      {
        orderid:'000144',
        orderdate:'2021-05-08',
        ysMoney:188.5,
        ml:0.5,
        ssMoney:188,
        checked:false
      },
    ],
    list2:[
      {
        orderid:'0000043',
        orderdate:'2021-01-08',
        ysMoney:395,
        ml:0,
        ssMoney:395,
        checked:false
      }
    ]
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
    // console.log(list);
    var totalNum=0
    var selectList=[]
    for(var i=0;i<list.length;i++){
      for(var j=0;j<this.data.orderList.length;j++){
        if(this.data.orderList[j].orderid==list[i]){
          // 计算带算结的金额
          orderList[i].checked=true
          totalNum=totalNum+this.data.orderList[j].ssMoney
          // 将选中项目加入选中的列表
          selectList.push(orderList[i])
        }
      }
    }
    // console.log(selectList);
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
      wx.setStorage({
        key:"historySelectList",
        data:this.data.selectedList
      })
      wx.setStorage({
        key:"historyTotalNum",
        data:this.data.totalMoney
      })
      getApp().globalData.historySelectList=this.data.selectedList
      getApp().globalData.historyTotalNum=this.data.totalMoney
      wx.navigateTo({
        url: './settleList?isDirect=1&name='+this.data.name,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name=options.name
    this.setData({
      name:name
    })
    console.log(name);
    if(name=="广东启泰药业有限公司"){
      this.setData({
        orderList:this.data.list1
      })
    }else if(name=="广东海王医药集团有限公司"){
      this.setData({
        orderList:this.data.list2
      })
    }else{
      this.setData({
        orderList:[]
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