
Page({
    data:{
        inputValue:"",
        textareaValue:""
    },
    // 提交表单
    formSubmit: function(e) {
        this.setData({
            inputValue:e.detail.value.input,
            textareaValue:e.detail.value.textarea,
        })
        let a = this.data.inputValue,
            b = this.data.textareaValue;
        if(a){
            wx.showLoading({
                title: a+'-'+b,
            })
        }
        setTimeout(function(){
            wx.hideLoading();
            wx.navigateBack({
                url:'../../pages/collectwork/index'
            })
        },2000)
    },
})
