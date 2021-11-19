// pages/index/settleList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    isDirect:'',//是否直接上欠收款
    list:[], //本次
    historyList:[],//上欠
    orderList:[],//本次+上欠
    num:0,//本次金额
    historyTotalNum:0,//上次金额
    totalNum:0,//本次+上次金额
    
    selectedList:[],//本次+上千 选中后
    selectedId:[],
    
  },
  // 抹零输入事件
  mlInput(e){
    var ml=e.detail.value
    var index=e.currentTarget.dataset.index
    var item='orderList['+index+'].ml'
      this.setData({
        [item]:ml
      })
  },
  mlblur(e){
    // console.log('抹零',e);
    var ml=e.detail.value
    var index=e.currentTarget.dataset.index
    var item='orderList['+index+'].ml'
    if(ml==''){
      this.setData({
        [item]:0
      })
    }else{
      this.setData({
        [item]:ml
      })
    }
  },
  // 实收输入事件
  ssInput(e){
    // console.log('实收',e);
    var ss=e.detail.value
    var index=e.currentTarget.dataset.index
    var item='orderList['+index+'].ssMoney'
    this.setData({
      [item]:ss
    })
  },
  ssblur(e){
    // console.log('实收',e);
    var ss=e.detail.value
    var index=e.currentTarget.dataset.index
    var item='orderList['+index+'].ssMoney'
    if(ss==''){
      this.setData({
        [item]:0
      })
    }else{
      this.setData({
        [item]:ss
      })
    }
  },
  // 确认修改
  confirmSS(e){
    console.log(this.data.orderList);
    var index=e.currentTarget.dataset.index
    var ss=this.data.orderList[index].ssMoney
    var ml=this.data.orderList[index].ml
    if(!isNaN(ml)&&!isNaN(ss)){
      var list=this.data.orderList
      var num=0
      for(var i=0;i<list.length;i++){
        if(list[i].checked==true){
          num=Number(num)+Number(list[i].ssMoney)
        }
      }
      console.log(num);
      this.setData({
        totalNum:num
      })
      getApp().globalData.totalNum=Number(num)
    }else{
      wx.showToast({
        title: '修改的金额不是数字！',
        icon:'none'
      })
      return false;
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
          totalNum=Number(totalNum)+Number(this.data.orderList[j].ssMoney)
          // 将选中项目加入选中的列表
          selectList.push(orderList[i])
        }
      }
    }
    console.log(selectList);
    this.setData({
      totalNum:totalNum,
      selectedList:selectList,
      selectedId:list
    })
  },
  // 全选按钮
  allSelectBtn(){
    var orderList=this.data.orderList
    var totalNum=this.data.totalNum
    var selectList=[]
    if(totalNum==0){
      for(var i=0;i<orderList.length;i++){
        orderList[i].checked=true
        totalNum=totalNum+orderList[i].ssMoney
        selectList=orderList
      }
      this.setData({
        orderList:orderList,
        totalNum:totalNum,
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
        totalNum:totalNum,
        selectedList:selectList
      })
    }
    // console.log(selectList);
    
  },
  // 放弃算结
  giveupBtn(){
    wx.removeStorage({
      key: 'selectList'
    })
    wx.removeStorage({
      key: 'totalNum'
    })
    wx.removeStorage({
      key: 'historySelectList'
    })
    wx.removeStorage({
      key: 'historyTotalNum'
    })
    getApp().globalData.selectList=[]
    getApp().globalData.totalNum=0
    getApp().globalData.historySelectList=[]
    getApp().globalData.historyTotalNum=0
    wx.navigateBack({
      delta: 1
    })
  },
  // 确认收款
  gotoPay(){
    var  _this=this
    // wx.setStorage({
    //   key:"confirmSelectList",
    //   data:_this.data.selectedList
    // })
    // wx.setStorage({
    //   key:"confirmSelectId",
    //   data:_this.data.selectedId
    // })
    // wx.setStorage({
    //   key:"confirmTotalNum",
    //   data:_this.data.totalNum
    // })
    getApp().globalData.confirmSelectList=this.data.selectedList
    getApp().globalData.confirmTotalNum=this.data.totalNum
    // console.log(this.data.selectedList,this.data.selectedId,this.data.totalNum);
    wx.navigateTo({
      url: './payMethods?totalNum='+_this.data.totalNum,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var _this=this
    var name=options.name
    var isDirect=options.isDirect
    this.setData({
      name:name,
      isDirect:isDirect
    })
    if(isDirect==1){
      var _this=this
      // 获取上欠
      // wx.getStorage({
      //   key: 'historySelectList',
      //   success (res) {
      //     var list=res.data
      //     _this.setData({
      //       historyList:list
      //     })
      //     console.log(_this.data.historyList);
      //   }
      // })
      // 获取本次
      // wx.getStorage({
      //   key: 'selectList',
      //   success (res) {
      //     var list2=res.data
      //     _this.setData({
      //       list:list2
      //     })
      //   }
      // })
      // wx.getStorage({
      //   key: 'historyTotalNum',
      //   success (res) {
      //     var totalNum=res.data
      //     _this.setData({
      //       historyTotalNum:totalNum
      //     })
      //   }
      // })
      // wx.getStorage({
      //   key: 'totalNum',
      //   success (res) {
      //     var totalNum=res.data
      //     _this.setData({
      //       num:totalNum
      //     })
      //   }
      // })
      var historyList2=getApp().globalData.historySelectList
      var selectList2=getApp().globalData.selectList
      var historyTotalNum2=getApp().globalData.historyTotalNum
      var totalNum2=getApp().globalData.totalNum
      this.setData({
        historyList:historyList2,
        list:selectList2,
        historyTotalNum:historyTotalNum2,
        num:totalNum2
      })
      console.log(historyList2,selectList2,historyTotalNum2,totalNum2);
        if(_this.data.list=='' && _this.data.historyList!=''){
          _this.setData({
            orderList:_this.data.historyList,
            totalNum:_this.data.historyTotalNum,
            selectedList:_this.data.historyList
          })
        }else if(_this.data.historyList=='' && _this.data.list!=''){
          _this.setData({
            orderList:_this.data.list,
            totalNum:_this.data.num,
            selectedList:_this.data.list
          })
          console.log(this.data.orderList);
        }else{
          var selectList=[]
          var selectId=[]
          var totalNum=0
          if(_this.data.historyList!='' && _this.data.list!=''){
            var list=_this.data.list
            var list2=_this.data.historyList
            console.log(list2);
            list2=list2.concat(list)
            selectList=list2
            for(var i=0;i<list2.length;i++){
              selectId.push(list2[i].orderid)
            }
            totalNum=_this.data.historyTotalNum+_this.data.num
          }
          _this.setData({
            orderList:list2,
            selectedList:selectList,
            selectedId:selectId,
            totalNum:totalNum
          })
        
        }
    }else if(isDirect==2){
      var _this=this
      var list=[]
      var num=0
      list=getApp().globalData.directSelectList
      num=getApp().globalData.directTotalNum
      // wx.getStorage({
      //   key: 'directSelectList',
      //   success (res) {
      //     list=res.data
      //   }
      // })
      // wx.getStorage({
      //   key: 'directTotalNum',
      //   success (res) {
      //     num=res.data
      //   }
      // })
      setTimeout(function(){
        _this.setData({
          selectedList:list,
          orderList:list,
          totalNum:num
        })
        console.log(_this.data.selectedList,_this.data.orderList,_this.data.totalNum);
      },0)
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