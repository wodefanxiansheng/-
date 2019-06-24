//index.js
//获取应用实例
const app = getApp();

Page({
  data:{
    id:"",
    collectArr:[],
    detailTitle:""
  },
  onLoad:function(options){
    this.setData({
      id:options.id,
      detailTitle:options.title,
    })
    this.collectdetail();
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
  collectdetail:function(){
    let url = app.apiUrl+"/favor/in_favor_list";
    let params = {
      favor_id :this.data.id,
    }
    app.request.requestPostApi(url, params, this, this.successFun, this.failFun)
  },
  successFun:function(res){
    this.setData({
       collectArr:res.data,
    })
  },
  collectClick:function(e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'../videoplay/index?id=' + id,
    })
  }
  












})
