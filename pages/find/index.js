
//获取应用实例
const app = getApp()
Page({
    data: {
        navData:[],
        currentindex: 0,
        navScrollLeft: 0,
        popularContent_list:[],
        limit:24,
        nowid:""||174,
        hasMoreData: true,//用于上拉的时候是不是要继续请求数据，即是不是还有更多数据
    },
    //事件处理函数
    onLoad: function () {
        wx.showLoading({
            title: '加载中',
        })
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            },
        }),
        this.popularTitleList(); //导航栏显示
        this.popularContent(this.data.nowid);//内容显示 
    },
    // 点击导航栏，数据变化
    switchNav(e){
        if (this.data.currentindex == e.currentTarget.dataset.current) {
            return false;
        } else {
            wx.showLoading({
                title: '加载中',
            })
            let ids = e.currentTarget.dataset.id;
            this.setData({
                currentindex: e.currentTarget.dataset.current,
            })
            this.popularContent(ids,this.data.limit)
        }

    },
    // 滑动内容页面
    switchTab(e){
        wx.showLoading({
            title: '加载中',
        })
        var singleNavWidth = this.data.windowWidth / 5;
        for(let i in this.data.navData){
            this.setData({
                nowid:this.data.navData[e.detail.current].id,
            })
        }
        this.setData({
            currentindex:e.detail.current,
            navScrollLeft: (e.detail.current - 2) * singleNavWidth
        });
        this.popularContent(this.data.nowid)//调用内容接口
    },
  // 导航栏
  popularTitleList:function(){
      let url = app.apiUrl+"/common/hot_album_list";
      let params = {
        id:"recommend_index_list"
      }
      app.request.requestPostApi(url, params, this, this.successTitle, this.failFun)
  },
  successTitle: function(res, that) {
      that.setData({
        navData:res.data,
      })
  },
  // 内容显示
   popularContent:function(id){
    let url = app.apiUrl+"/copyright/in_album_list";
    let params = {
      album_id:id,
      limit:this.data.limit,
      line:"",
    }
    app.request.requestPostApi(url, params, this, this.successContent, this.failFun)
  },
  successContent: function(res, that) {
    console.log(res)
    // that.setData({
    //   popularContent_list:res.data
    // })
    if(res.code == "0000"){
        wx.hideLoading();
        // 判断是不是最后一页的数据，如果是显示“已显示全部”，如果不是最后一页，那么显示“正在加载中...”
        if(res.data.length < that.data.limit){
            that.setData({
                popularContent_list:res.data,
                hasMoreData:false,//如果请求数据的长度小于pageSize:20，那么就表示没有更多数据，将hasMoreData更改为false
            })
        }else{
            that.setData({
                popularContent_list:res.data,
                hasMoreData:true,//如果请求数据的长度等于==pageSize:24，那么就表示不是最后一页，将hasMoreData更改为true，继续加载
                page:that.data.limit += 24,
            })
        }
    }
    
  },
    // 滚动到底部加载更多数据
    onReachBottom(){
        if(this.data.hasMoreData){
            // 加载更多数据
            wx.showLoading({
                title: '加载中',
            })
            this.popularContent(this.data.nowid);
        }else{
            // 最后一页，显示没有更多数据
            wx.showToast({
                title: '没有更多数据',
            })
        }
    },
    findImageClick:function(e){
        const id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../videoplay/index?id='+id,
        })
    }
})