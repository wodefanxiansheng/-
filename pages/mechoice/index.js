var util = require("../../utils/util.js");
Page({
    data:{
       choicelist:[
         {text:'动漫',id:'45645'},
         {text:'景观设计',id:'45646'},
         {text:'室内设计',id:'45647'},
         {text:'插画',id:'45648'},
         {text:'网页',id:'45649'},
         {text:'平面设计',id:'45650'},
         {text:'UI',id:'45651'},
         {text:'学习',id:'45652'},
         {text:'服装',id:'45653'},
         {text:'影视',id:'45654'},
         {text:'手工艺',id:'45655'},
        ],
        choiceidArr:[],
        chiceBool:false,
    },
    onload:function(){
     
    },
    choiceClick:function(e){
      let choicelist = this.data.choicelist;
      let index = e.currentTarget.dataset.index;
      if(choicelist[index].bool == true){
          this.data.choiceidArr.remove(e.currentTarget.dataset.id);//删除id
          this.setData({
            choiceidArr:this.data.choiceidArr,
          })
      }else{
        this.setData({
          choiceidArr:this.data.choiceidArr.concat(e.currentTarget.dataset.id)
        })
      }

      choicelist[index].bool = !choicelist[index].bool;//点击添加class，再次点击移除class
      this.setData({
        choicelist:this.data.choicelist,
      })
      // console.log(this.data.choiceidArr)
    },
    submitClick:function(){
      wx.showLoading({
        title: "正在提交...",
      })
      console.log(this.data.choiceidArr)
      setTimeout(function(){
        wx.hideLoading();
        wx.switchTab({
          url:'../find/index',
        })
      },2000)
     
    }
})
