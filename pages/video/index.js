// pages/me/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      videoList:[],
      material:['气球','婴儿','背景','水','城市','蝴蝶','蛋糕','圆圈','猫咪','风景','狗','跳水','鲜花','航拍','房子','美女','海','车','爱','枫叶'],
      topvideoArr:[],
      play:1,
      playIndex:null,
      clickbool:true,
      currentText:"气球",
      tapindexBool:"",
      currentindex:"0",//列表下标
      top:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showLoading({
        title: '加载中',
      })
      this.videoContext = wx.createVideoContext('myVideo');
      console.log(this.videoContext)
      this.videoposter();//海报显示
      this.topvideolist("气球","42");//顶尖视频显示
      
  },
  // 海报显示接口
  videoposter:function(){
    let url = app.apiUrl+"/dp_media/recommend_album_list";
    let params = {
      layout:"8",
    }
    app.request.requestPostApi(url, params, this, this.successFun, this.failFun)
  },
 /**
   * 接口调用成功处理
   */
  successFun: function(res, that) {
      that.setData({
         videoList:res.data,
      })
  },
  // 点击跳转
  videodetailclick:function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'../videolist/index?id='+id,
    })
  },
// 顶尖视频素材在线播放(内容显示)
  topvideolist:function(keyword,limit){
      let url = "http://dpapi.dispatch.paixin.com/search_list";
      let params = {
          type:"8",
          keyword:keyword,
          color:"0",
          limit:limit,
      }
      app.request.requestPostApi(url, params, this, this.successRe, this.fail)
  },
  successRe:function(res,that){
    console.log(res)
    that.setData({
      topvideoArr:res.data,
    })
    wx.hideLoading();
  },
  // 点击导航事件
  materiallistclick:function(e){
        wx.pageScrollTo({
          scrollTop:290,
        })
        wx.showLoading({
          title: '加载中',
        })
        if(this.data.currentindex != e.currentTarget.dataset.index){
            let words = e.currentTarget.dataset.text;
            this.setData({
              currentText:words,
            })
            this.topvideolist(words,"42");//顶尖视频显示
            this.data.currentindex = e.currentTarget.dataset.index;
        }
       
      
  },
 // 点击cover播放，其它视频结束(真机有bug)
//  videoplay: function (e) {
//         var id = e.currentTarget.id  //点击的当前的视频的id
//         if (!this.data.playIndex) { // 没有播放时播放视频，那么现在点击的是第一个视频
//             this.setData({
//                 playIndex: id
//             })       
//             var videoContext = wx.createVideoContext(id);
//             videoContext.play()
//             console.log(e,id,this.data.playIndex,"第一次点击") //正在播放的id
//         } else {// 有播放时先将prev暂停，再播放当前点击的current
//               var videoContextPrev = wx.createVideoContext(this.data.playIndex)
//               videoContextPrev.seek(0)
//               videoContextPrev.pause();//上一个视频暂停
//               console.log(this.data.playIndex,"不是第一个视频")
//               this.setData({
//                   playIndex: id
//               })
//               var videoContextCurrent = wx.createVideoContext(this.data.playIndex)
//               videoContextCurrent.play()
//         }
  
//   },

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