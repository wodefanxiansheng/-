//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    //页面数据初始化
    collectList:[
      {
        id:"3937",
        image:"http://d301.paixin.com/thumbs/6018920/114744982/staff_1024.jpg?imageView2/2/w/320/h/320",
        name:"美女如云",
        media_num:"24"
      },
      {
        id:"3909",
        image:"http://d302.paixin.com/thumbs/2249091/166771048/staff_1024.jpg",
        name:"潮流家居",
        media_num:"21"
      },
      {
        id:"3908",
        image:"http://d301.paixin.com/thumbs/2959013/112443182/staff_1024.jpg",
        name:"夏时阳光",
        media_num:"11"
      },
    ],
  },
  onLoad:function(options){
    //监听页面加载，页面初始化，options为页面跳转所带来的参数
  },
  onReady:function(){
    //监听页面渲染完成
  },
  onShow:function(){
    //监听页面显示
  },
  onHide:function(){
    //监听页面隐藏
  },
  onUnload:function(){
    //监听页面卸载
  },
  // 新建分类，跳转页面
  classification:function () {
    wx.navigateTo({
      url:'../../template/new-classification/index'
    })
  },
  collectdetail:function (e) {
    let id = e.currentTarget.dataset.id,
        title = e.currentTarget.dataset.title;
        console.log(title)
    wx.navigateTo({
      url:'../collectdetail/index?id='+id+'&title='+title
    })
  },

  












})
