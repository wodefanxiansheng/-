//index.js
//获取应用实例
const app = getApp()

Page({
    data:{
        tempFilePathsArr:[],
        addbool:false,
        inputValue:"",
        textareaValue:""
    },
    imageload:function () {
        let _this = this;
        wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                // console.log(tempFilePaths)
                _this.setData({
                    tempFilePathsArr:tempFilePaths
                })
                if(res.tempFilePaths.length >= 9){
                    _this.setData({
                        addbool:true
                    })
                }else{
                    _this.setData({
                        addbool:false
                    })
                }
                const uploadTask = wx.uploadFile({
                    url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData:{
                        'user': 'test'
                    },
                    success: function(res){
                        var data = res.data
                        console.log(res)
                    }
                })
                
                uploadTask.onProgressUpdate((res) => {
                    console.log(res)
                    // console.log('上传进度', res.progress)
                    // console.log('已经上传的数据长度', res.totalBytesSent)
                    // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
                })
            }
          })
    },
    previewImage:function(e){
        var current = e.target.dataset.src;
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls:this.data.tempFilePathsArr// 需要预览的图片http链接列表
        })
    },
    formSubmit:function(e){
        console.log(e.detail.value.input,e.detail.value.textarea)
        this.setData({
            inputValue:e.detail.value.input,
            textareaValue:e.detail.value.textarea
        })
    },
    submitclick:function(){
        console.log(this.data.inputValue,this.data.textareaValue,this.data.tempFilePathsArr)
       
    }
    
})
