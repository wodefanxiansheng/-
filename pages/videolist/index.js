// pages/me/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      videomediapack:[],
      videoid:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        videoid:options.id,
      })
      this.videolistdetail();
  },
 
 /**
   * 接口调用成功处理
   */
  successFun: function(res, that) {
      // console.log(res)
      wx.hideLoading();
      that.setData({
         videomediapack:res.data
      })

  },
  // 点击显示详情
  videolistdetail:function(){
    let url = app.apiUrl+"/copyright/in_album_list";
    let params = {
      limit: 50,
      line:'',
      album_id:this.data.videoid,
    }
    app.request.requestPostApi(url, params, this, this.successFun, this.failFun)
  },
  videodetail:function(e){
    console.log(e)
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'../videoplay/index?id=' + id,
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