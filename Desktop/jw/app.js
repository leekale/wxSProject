//app.js
const appId="wx56ba10e8d8299cd2"
const secret="5b65593560dfbe7da29bd4dee5eb1fe0"
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getOpenId:function(cb){
    var that = this
    if(this.globalData.openId){
      typeof cb == "function" && cb(this.globalData.openId)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          if(res.code){
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appId+'&secret='+secret+'&js_code='+res.code+'&grant_type=authorization_code',
              data: {
                code:res.code
              },
              success: function(res){
                that.globalData.openId = res.data.openid
                typeof cb == "function" && cb(that.globalData.openId)
              }
            })
          }
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    openId:null
  }
})