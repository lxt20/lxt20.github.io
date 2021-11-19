// pages/index/salesOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    orderid:'',
    orderList:[
      {
        orderid:'13202111090004',
        orderdate:'2021-11-09',
        ysMoney:2000,
        ml:0,
        ssMoney:2000,
        checked:false
      },
      {
        orderid:'13202111090005',
        orderdate:'2021-11-09',
        ysMoney:2000.5,
        ml:0.5,
        ssMoney:2000,
        checked:false
      }
    ],
    allList:[],
    totalMoney:0,
    selectedList:[],
    keyword:'',
    orderid:'',
    list1:[
      {
        orderid:'000152',
        checked:false,
        orderdate:'2021-05-16',
        ysMoney:66,
        ml:0,
        ssMoney:66
      }
    ],
    list2:[
      {
        orderid:'000213',
        checked:false,
        orderdate:'2021-07-03',
        ysMoney:410,
        ml:0,
        ssMoney:410
      },
      {
        orderid:'000214',
        checked:false,
        orderdate:'2021-07-04',
        ysMoney:370,
        ml:0,
        ssMoney:370
      }
    ],
    list3:[
      {
        orderid:'000325',
        checked:false,
        orderdate:'2021-06-15',
        ysMoney:280,
        ml:0,
        ssMoney:280
      },
      {
        orderid:'000327',
        checked:false,
        orderdate:'2021-06-17',
        ysMoney:280,
        ml:0,
        ssMoney:280
      }
    ],
    list4:[
      {
        orderid:'000341',
        checked:false,
        orderdate:'2021-06-24',
        ysMoney:80,
        ml:0,
        ssMoney:80
      }
    ],
    list5:[
      {
        orderid:'001041',
        checked:false,
        orderdate:'2021-09-11',
        ysMoney:565.5,
        ml:0.5,
        ssMoney:565
      },
      {
        orderid:'001042',
        checked:false,
        orderdate:'2021-09-12',
        ysMoney:665.5,
        ml:0.5,
        ssMoney:665
      },
      {
        orderid:'001049',
        checked:false,
        orderdate:'2021-09-14',
        ysMoney:570,
        ml:0,
        ssMoney:570
      }
    ]
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
      orderid:value
    })
  }, 
  // 查询按钮
  searchClick(){
    var orderid=this.data.keyword
    this.setData({
      orderid:orderid
    })
    var list=this.data.allList
    var searchList=[]
    console.log(this.data.orderid);
    for(var i=0;i<list.length;i++){
      if(list[i].orderid.indexOf(orderid) != -1){
        searchList.push(list[i])
      }
    }
    this.setData({
      orderList:searchList
    })
  },
  // checkbox-group控制
  getCheck(e){
    var list=e.detail.value
    var orderList=this.data.orderList
    console.log(list);
    var totalNum=0
    var selectList=[]
    for(var i=0;i<list.length;i++){
      for(var j=0;j<this.data.orderList.length;j++){
        if(this.data.orderList[j].orderid==list[i]){
          // 计算带算结的金额
          orderList[i].checked=true
          totalNum=Number(totalNum)+Number(this.data.orderList[j].ssMoney)
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
  // 全选按钮
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
  // 等待算结按钮
  waitBtn(){
    if(this.data.totalMoney==0){
      wx.showToast({
        title: '暂无算结单号',
        icon:'none'
      })
    }else{
      wx.setStorage({
        key:"selectList",
        data:this.data.selectedList
      })
      wx.setStorage({
        key:"totalNum",
        data:this.data.totalMoney
      })
      getApp().globalData.selectList=this.data.selectedList
      getApp().globalData.totalNum=this.data.totalMoney
      wx.navigateTo({
        url: './settleList?isDirect=1&name='+this.data.name,
      })
    }
  },
  gotoHistory(){
    wx.navigateTo({
      url: './historyList?name='+this.data.name,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var name=options.name
    var orderid=options.index
    if(orderid=='1'){
      this.setData({
        orderList:this.data.list1
      })
    }
    if(orderid=='2'){
      this.setData({
        orderList:this.data.list2
      })
    }
    if(orderid=='3'){
      this.setData({
        orderList:this.data.list3
      })
    }
    if(orderid=='4'){
      this.setData({
        orderList:this.data.list4
      })
    }
    if(orderid=='5'){
      this.setData({
        orderList:this.data.list5
      })
    }
    var _this=this
    setTimeout(function(){
      _this.setData({
        name:name,
        orderid:orderid,
        allList:_this.data.orderList
      })
    },0)
    
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