// //index.js
// //获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,//隐藏
    canIUse: wx.canIUse('button.open-type.getUserInfo'),//判断小程序的API，回调，参数，组件等是否在当前版本可用。
    logobool:false,
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      // logobool:true,
    })
    // console.log(e)
  },
  collectclick:function (e) {
    // console.log(e)
    wx.navigateTo({
      url:'../collectwork/index'
    })
  },
  choiceclick:function (e) {
    // console.log(e)
    wx.navigateTo({
      url:'../mechoice/index'
    })
  },
  workupload:function (e) {
    // console.log(e)
    wx.navigateTo({
      url:'../imageload/index'
    })
  },
})
// Page({
//   data: {
//     latitude: 23.099994,
//     longitude: 113.324520,
//     markers: [{
//       id: 1,
//       latitude: 23.099994,
//       longitude: 113.324520,
//       name: 'T.I.T 创意园'
//     }],
//     covers: [{
//       latitude: 23.099994,
//       longitude: 113.344520,
//       iconPath: '/image/location.png'
//     }, {
//       latitude: 23.099994,
//       longitude: 113.304520,
//       iconPath: '/image/location.png'
//     }]
//   },
//   onReady: function (e) {
//     this.mapCtx = wx.createMapContext('myMap')
//   },
//   getCenterLocation: function () {
//     this.mapCtx.getCenterLocation({
//       success: function(res){
//         console.log(res.longitude)
//         console.log(res.latitude)
//       }
//     })
//   },
//   moveToLocation: function () {
//     this.mapCtx.moveToLocation()
//   },
//   translateMarker: function() {
//     this.mapCtx.translateMarker({
//       markerId: 1,
//       autoRotate: true,
//       duration: 1000,
//       destination: {
//         latitude:23.10229,
//         longitude:113.3345211,
//       },
//       animationEnd() {
//         console.log('animation end')
//       }
//     })
//   },
//   includePoints: function() {
//     this.mapCtx.includePoints({
//       padding: [10],
//       points: [{
//         latitude:23.10229,
//         longitude:113.3345211,
//       }, {
//         latitude:23.00229,
//         longitude:113.3345211,
//       }]
//     })
//   }
// })
