//地图功能单独拿出来 -xzz1023
var village_LBS = function(that){
  //var that = this;
  // ------------ 腾讯LBS地图  --------------------
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          // 调用接口, 坐标转具体位置 -xxz0717
                // demo.reverseGeocoder({
                //   location: {
                //     latitude: Number(res.latitude),
                //     longitude: Number(res.longitude)
                //   },
                //   success: function (res) {
                //     console.log(res);
                //     that.setData({
                //       start_address: res.result.address,   //起点地址
                //       city: res.result.address_component.city,  //起点城市
                //       district: res.result.address_component.district   //区
                //     })
                //   }
                // })
        }
      })
}
const utils = require("../../utils/util.js");
Page({
  data: {
    imgUrls: [
      'http://rushiwork.oss-cn-beijing.aliyuncs.com/works/238/73259.jpeg',
      'http://rushiwork.oss-cn-beijing.aliyuncs.com/works/238/73271.jpeg',
      'http://rushiwork.oss-cn-beijing.aliyuncs.com/works/238/73274.jpeg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    page:1,//当前页
    pageSize:20,//每页的数量
    contentlist: [],//放置返回的数组(数组存储的数组)
    hasMoreData: true,//用于上拉的时候是不是要继续请求数据，即是不是还有更多数据
    isHideLoadMore:true,//正在加载中...，true为隐藏，false为显示(hidden:true相当于display:none)
    loadingComplete:true,//没有数据了，true为隐藏，false为显示
  },
  /*page即为当前请求数据时第几页，pageSize是每页的数据的大小，hasMoreData用于上拉的时候是不是要继续请求数据，即是不是还有更多数据。
  当我们网络请求数据成功后，如果请求数据的长度小于pageSize: 30，那么就表示没有更多数据，将hasMoreData更改为false，如果请求的数据长度是30，
  表示还有更多数据那么hasMoreData久更改为true,并将页数page加1.当下拉的时候讲page先更改为1，然后去查询数据，当查询数据成功时，如果page为1，
  就将获取的数据直接赋值给contentlist，如果页数大于1的话，就将请求的数据追加在contentlist后面。这样就可以实现分页加载的功能了。*/
  onLoad:function(){
    var that = this;
    village_LBS(that);
      this.setData({
        hasMoreData: true,//用于上拉的时候是不是要继续请求数据，即是不是还有更多数据
        isHideLoadMore:false,//正在加载中...，true为隐藏，false为显示(hidden:true相当于display:none)
        loadingComplete:true,//没有数据了，true为隐藏，false为显示
      })
      this.getlistInfo();
  },
  onReady: function () {
    var that = this;
    wx.getSetting({
    success: (res) => {
      console.log(res);
      console.log(res.authSetting['scope.userLocation']);
      if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
        wx.showModal({
          title: '是否授权当前位置',
          content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
          success: function (res) {
            console.log(res)
            if (res.cancel) {
              console.info("1授权失败返回数据");

            } else if (res.confirm) {
              //village_LBS(that);
              wx.openSetting({
                success: function (data) {
                  console.log(data);
                  if (data.authSetting["scope.userLocation"] == true) {
                    wx.showToast({
                      title: '授权成功',
                      icon: 'success',
                      duration: 5000
                    })
                    //再次授权，调用getLocationt的API
                    village_LBS(that);
                  }else{
                    wx.showToast({
                      title: '授权失败',
                      icon: 'success',
                      duration: 5000
                    })
                  }
                }
              })
            }
          }
        })
      } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
        village_LBS(that);
      }
    }
    })
  },
  getlistInfo:function(){
              var that = this;
              wx.request({
                  url:'http://new.rushi.net/Home/Api/index_list.html',
                  method: "GET",
                  type:"json",
                  data:{
                    page:that.data.page,
                  },
                  header: {
                    'content-type': 'application/text'
                  },
                  success: function (res) {  
                      var contentlistTem = that.data.contentlist;
                      if(res.statusCode == 200){
                          // 判断是不是最后一页的数据，如果是显示“已显示全部”，如果不是最后一页，那么显示“正在加载中...”
                          if(res.data.data.index_list.length < that.data.pageSize){
                              that.setData({
                                  contentlist:contentlistTem.concat(res.data.data.index_list),
                                  hasMoreData:false,//如果请求数据的长度小于pageSize:20，那么就表示没有更多数据，将hasMoreData更改为false
                                  isHideLoadMore:true,//true隐藏显示更多数据
                                  loadingComplete:false //false显示没有数据了
                              })
                          }else{
                              that.setData({
                                contentlist:contentlistTem.concat(res.data.data.index_list),
                                hasMoreData:true,//如果请求数据的长度等于==pageSize:20，那么就表示不是最后一页，将hasMoreData更改为true，继续加载
                                page:that.data.page+1,
                                isHideLoadMore:true,//正在加载中...，true为隐藏，false为显示(hidden:true相当于display:none)
                                loadingComplete:true,//没有数据了，true为隐藏，false为显示
                              })
                          }
                      }else{
                          wx.showToast({
                            title:res.errMsg,
                          })
                      }
                    
              }
        
      })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
      // 显示顶部刷新图标
      console.log("8444")
      wx.showNavigationBarLoading();
      this.data.page = 1;
      this.data.contentlist = [];
      this.getlistInfo();
      setTimeout(function(){
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },1000)   
  },
  // 滚动到底部加载更多数据
  onReachBottom(){
    console.log("开始加载了")
    if(this.data.hasMoreData){
      // 加载更多数据
      this.setData({
        isHideLoadMore:false,
      })
      this.getlistInfo();
    }else{
      // 最后一页，显示没有更多数据
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  // 预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    console.log(e)
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  } ,  
  listdetail:function (e) {
    const id = e.currentTarget.dataset.id,
          uid = e.currentTarget.dataset.uid,
          nickname = e.currentTarget.dataset.nickname,
          time_describe = e.currentTarget.dataset.time;
    wx.navigateTo({
      url:'../detail/index?id=' + id +"&uid="+ uid +"&nickname=" +nickname +"&time_describe=" +time_describe
    })
  },
  searchPage:function(e){
    wx.navigateTo({
      url: '../search/index',
    })
  }
  
































})
