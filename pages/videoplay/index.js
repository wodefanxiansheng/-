// pages/me/index.js-------------箭头函数和promise，es6新语法
var app = getApp();
// ***************弹幕颜色
function getRandomColor () {
    const rgb = []
    for (let i = 0 ; i < 3; ++i){
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
}
// ****************************
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:'',
      videosrc:'',
      imagesrc:'',
      videotitle:'',
      videotext:'',
      wordlist:[],
      tag_list_arr_str:"",
      tuijianArr:[],
      ids:'',
      danmuList:[
      {
        text: '哈喽',
        color: '#ff0000',
        time: 1
      },
      {
        text: '我来喽',
        color: '#ff00ff',
        time: 3
      }],//弹幕
      inputValue:"",
  },
  bindInputBlur: function(e) {
    this.setData({
        inputValue: e.detail.value
    }) 
  },
  bindSendDanmu: function () {
      let that = this;
    this.videoContext.sendDanmu({
        text: that.data.inputValue,
        color: getRandomColor()
    })
    console.log(that.data.inputValue)
  },
    onReady: function () {
        this.videoContext = wx.createVideoContext('myVideo');
        this.videoContext.play();
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
      this.setData({
        id:options.id,
      })
      this.videoDetail();
      this.tuijians();
      
  },
   /**
   * 接口调用成功处理
   */
    successFun:(res, that) => {
        
        that.setData({
            videosrc:res.data.preview,
            videotitle:res.data.title,
            videotext:res.data.text,
            imagesrc:res.data.image,
        })
        // 赋值成功之后，才能给标题赋值
        wx.setNavigationBarTitle({
            title: that.data.videotitle,
        })
        // 
        let tag_list = res.data.tag_list;
        let listarr = [];
        for(let i in tag_list){
            listarr.push(tag_list[i].name)//把对象里面的属性值，刚到数组里面
        }
        let tag_list_str = listarr.join("|");//数组转为字符串
        that.setData({
            tag_list_arr_str:tag_list_str,
        })
        // 执行完视频详情，在执行列表
        that.imageskeyword();//回调函数
    },
    // 点击显示视频详情
    videoDetail:function(){
        let url = app.apiUrl+"/dp_media/detail";
        let params = {
            media_id:this.data.id,
        }
        app.request.requestPostApi(url, params, this, this.successFun, this.failFun)
    },
    // 列表
    imageskeyword:function(){
        let that = this;
        wx.request({
            url:'http://dict.dispatch.paixin.com',
            method: "POST",
            type:"json",
            data:{
                words:that.data.tag_list_arr_str,
            },
            header: {
              'content-type': 'application/json;charset=UTF-8'
            },
            success: res => { 
                let objlist = res.data.data;
                let objarr = [];
                for(let i in objlist){
                    objarr.push(objlist[i])
                }
                
                that.setData({
                    wordlist:objarr,
                })
            }  
              
        })
    },
    // 相关推荐
    tuijians:function(){
        let url = app.apiUrl+"/dp_media/related_list";
        let params = {
            media_id:this.data.id,
            mode:"similar"
        }
        app.request.requestPostApi(url, params, this, this.successRe, this.fail)
    },
    successRe:function(res,that){
        // console.log(res)
        that.setData({
            tuijianArr:res.data,
        })
    },
    // 点击相关推荐视频，在本页面打开
    videodetail:function(e){
        console.log(e)
        const id = e.currentTarget.dataset.ids;
        wx.navigateTo({
          url:'../videoplay/index?id=' + id,
        })
      },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        var that = this;
        if(res.from === 'button'){
             // 来自页面内转发按钮
            //  console.log(res.target)
        }
        return {
            title:that.data.videotitle,
            path:'/pages/videoplay/index?id='+that.data.id,
            success:function(res){
                // console.log(res)
            }
        }
    },
    // 下拉刷新
    onPullDownRefresh: function () {
            // 显示顶部刷新图标
            wx.showNavigationBarLoading();
            setTimeout(function(){
                wx.hideNavigationBarLoading() //完成停止加载
                wx.stopPullDownRefresh() //停止下拉刷新
            },1000)   
        },
})