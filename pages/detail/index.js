var app = getApp();
var util = require("../../utils/util.js");
Page({
    data:{
        id:"",
        uid:"",
        nickname:"",
        time_describe:"",
        datailList:[
            "https://img.zcool.cn/community/01c4985b593887a801215c8f7d973e.jpg@1280w_1l_2o_100sh.webp",
            "https://img.zcool.cn/community/01e3175b593887a801206a35d995e4.jpg@1280w_1l_2o_100sh.webp",
            "https://img.zcool.cn/community/01c7635b593886a801215c8f4c29d0.jpg@1280w_1l_2o_100sh.webp",
            "https://img.zcool.cn/community/01d1b55b593887a801206a350964b0.jpg@1280w_1l_2o_100sh.jpg",
            "https://img.zcool.cn/community/0171df5b593886a801206a35c61b15.jpg@1280w_1l_2o_100sh.jpg",
            "https://img.zcool.cn/community/0143fb5b593887a801215c8f0451b6.jpg@1280w_1l_2o_100sh.jpg",
            "https://img.zcool.cn/community/013f1f5b593887a801206a358d56a4.jpg@1280w_1l_2o_100sh.jpg",
            "https://img.zcool.cn/community/01aa2d5b593887a801215c8fe78f3a.jpg@1280w_1l_2o_100sh.jpg",
            "https://img.zcool.cn/community/01a8fa5b5939c9a801206a358fc237.jpg@1280w_1l_2o_100sh.jpg",
            "https://img.zcool.cn/community/01488d5b5939c9a801215c8f15f5fb.jpg@1280w_1l_2o_100sh.jpg"
        ],
        idArr:[],
        page:1,
        works_id:'',
        commentsarr:[],
        offsetlist:0,
        moreText:"查看更多评论",
        moreBool:true,//点击加载更多，默认为true,还有更多数据
        nowindex:[],
        list:[
            {text:'选修1',id:'1'},
            {text:'选修2',id:'2'},
            {text:'选修3',id:'3'},
            {text:'选修4',id:'4'},
            {text:'选修5',id:'5'}
        ],
    },
    onLoad: function (options) {
        let that = this;      
        that.setData({
          id: options.id || '',
          uid: options.uid || '',
          nickname: options.nickname || '',
          time_describe:options.time_describe||''
        })
         // 赋值成功之后，才能给标题赋值
         wx.setNavigationBarTitle({
            title: this.data.nickname,
        })
        this.comments();
    },
     // 预览图片
    previewImage: function (e) {
        var current = e.target.dataset.src;
        console.log(e)
        wx.previewImage({
        current: current, // 当前显示图片的http链接  
        urls: this.data.datailList // 需要预览的图片http链接列表  
        })
    }, 
    //评论
   // 点击显示视频详情
   comments:function(){
        let url = "https://www.zcool.com.cn/comment/getDetailComments.json";
        let params = {
            objId:7310586,
            objType:3,
            offset:this.data.offsetlist,
        }
        app.request.requestGetApi(url, params, this, this.successFun, this.failFun)
    },
    successFun:function(res,that){
        // console.log(res)
        let total = res.data.all.total;
        let list = that.data.offsetlist += 10;
        // console.log(total,list)
        // 点击加载更多数据
        if(list < total){
            this.setData({
                moreText:"查看更多评论",
                moreBool:true,//true证明还有更多数据
                commentsarr:that.data.commentsarr.concat(res.data.all.content)
            })
        // 如果当前条数 == total，那么加载完毕，显示没有更多数据
        }else{
            this.setData({
                moreText:"只有这么多了",
                moreBool:false,//false证明已经是最后一页数据了
                commentsarr:that.data.commentsarr.concat(res.data.all.content)
            })
        }
    },
    // 点击加载更多
    moreClick:function(){
        if(this.data.moreBool){
            this.setData({
                moreText:"加载中..."
            })
            this.comments()
        }
    },
    // 点击评论点赞
    zanclick:function(e){
        
        let nowindex = e.currentTarget.dataset.index;
        let commentsarrs = this.data.commentsarr;
        if(commentsarrs[nowindex].isMyPraise == 0){
            commentsarrs[nowindex].isMyPraise = 2;
        }else if(commentsarrs[nowindex].isMyPraise == 1){
            commentsarrs[nowindex].isMyPraise = 2;
        }else{
            commentsarrs[nowindex].isMyPraise = 0;
        }
        this.setData({
            commentsarr:this.data.commentsarr,
        })

    }
    
})