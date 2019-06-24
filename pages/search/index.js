
//导入封装的接口
// var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyArr:['前端移动','java','人事','财务','行政'],
    caiArr:['景观设计','建筑设计','室内设计','别墅设计','学校','街道','学校','医院','插画'],
    searchContent:"",
    start:0,
    inputValue:"",
    historyBool:false,//历史记录和猜你要搜的显示和隐藏，默认显示false
    searchlistArr:[],
    errorBool:true,//默认隐藏
    closeBool:true,//关闭按钮隐藏
    hasMoreData: true,//用于上拉的时候是不是要继续请求数据，即是不是还有更多数据
    isHideLoadMore:true,//正在加载中...，true为隐藏，false为显示(hidden:true相当于display:none)
    loadingComplete:true,//没有数据了，true为隐藏，false为显示
    pageSize:24,//每一页显示的条数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  returnHome:function (e) {
      wx.navigateBack({ changed: true });
  },
  deleteHistory:function(){
      wx.showModal({
        title: '提示',
        content: '确定删除全部搜索历史?',
        confirmText:'全部删除',
        confirmColor:'#00b38a',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  },
  // 获取输入值
  bindKeyInput:function(e) {
    this.setData({
      inputValue: e.detail.value,
      closeBool:false,
    })
    // console.log(e.detail.value)
    if(e.detail.value == ""){
      this.setData({
        closeBool:true,
      })
    }
  },
  bindbtn:function(e){
    // var contentlistTem = [];
    this.setData({
      start:0,
      searchlistArr:[],
    })    
    this.searchlist();  
  },
  bindReplaceInput: function(e) {
      this.setData({
        inputValue:"",
      })
  },
  searchlist:function(){
    let that = this;
    wx.request({
      url:'https://www.duitang.com/napi/blog/list/by_search/?type=feed&include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Clike_id%2Csender%2Calbum%2Creply_count%2Cfavorite_blog_id&_type=&_=1531711839767',
      method: "GET",
      type:"json",
      data:{
        kw:that.data.inputValue,
        start:that.data.start,
      },
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {  
        var contentlistTem = that.data.searchlistArr;
        
        if(res.statusCode == '200'){
              // 判断是不是最后一页的数据，如果是显示“已显示全部”，如果不是最后一页，那么显示“正在加载中...”
              if(res.data.data.object_list.length < that.data.pageSize){
                console.log("最后一页")
                    that.setData({
                      searchlistArr:contentlistTem.concat(res.data.data.object_list),
                        hasMoreData:false,//如果请求数据的长度小于pageSize:20，那么就表示没有更多数据，将hasMoreData更改为false
                        isHideLoadMore:true,//true隐藏显示更多数据
                        loadingComplete:false, //false显示没有数据了
                        historyBool:true,
                        errorBool:true,
                    })
              }else{
                console.log("继续加载")
                    that.setData({
                      searchlistArr:contentlistTem.concat(res.data.data.object_list),
                      hasMoreData:true,//如果请求数据的长度等于==pageSize:20，那么就表示不是最后一页，将hasMoreData更改为true，继续加载
                      start:that.data.start+24,
                      isHideLoadMore:true,//正在加载中...，true为隐藏，false为显示(hidden:true相当于display:none)
                      loadingComplete:true,//没有数据了，true为隐藏，false为显示
                      historyBool:true,
                      errorBool:true,
                    })
              }
              // 数组为空时，显示提示
              if(res.data.data.object_list == ''){
                that.setData({
                  errorBool:false,
                })
                return;
              }
        }else{
          wx.showToast({
            title:res.errMsg,
          })
        }
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
  
  },
  // 滚动到底部加载更多数据
onReachBottom:function() {
  console.log("00000")
  if(this.data.hasMoreData){
    console.log("开始加载数据了")
    // 加载更多数据
    this.setData({
      isHideLoadMore:false,
    })
    this.searchlist();
  }else{
    // 最后一页，显示没有更多数据
    console.log("最后一页了")
    wx.showToast({
      title: '没有更多数据',
    })
  }
},
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    // this.data.start = 0;
    // this.data.contentlist = [];
    this.searchlist();
    setTimeout(function(){
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1000)   
},































})