var util = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        member: []
    },
    onLoad: function () {
        var that = this
        wx.request({
            url: 'http://www.sxjwty.com/wx/index.php',
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                that.setData({
                    member: res.data
                })
            },
            fail: function () {
                that.setData({
                    member: false
                })
            },
        })
    },
    vote: function (event) {
        var that = this
        app.getOpenId(function (openId) {
            wx.request({
                url: 'http://www.sxjwty.com/wx/vote.php',
                data: {
                    number: event.target.dataset.number,
                    openId: openId
                },
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {
                // 'Content-Type':'application/x-www-from-urlencoded'
                // }, 
                // 设置请求的 header
                success: function (res) {
                    if (res.data == 200) {
                        wx.showToast({
                            title: '成功',
                            icon: 'success',
                            duration: 2000
                        })
                        that.onLoad()

                    } else if (res.data == 300) {
                        wx.showModal({
                            title: '投票失败',
                            content: '每个微信每天只能投一票',
                            showCancel: false
                        })
                    }
                },
                fail: function () {
                    console.log('fail')
                    // fail
                }
            })
            // openId=openId
        })

    },
    onPullDownRefresh: function (e) {
        this.onLoad()
    },
    // join: function () {
    //     var that = this
    //     wx.chooseImage({
    //         count: 1, // 最多可以选择的图片张数，默认9
    //         sizeType: 'compressed', // original 原图，compressed 压缩图，默认二者都有
    //         success: function (res) {
    //             // success
    //             var tempFilePaths = res.tempFilePaths
    //             wx.uploadFile({
    //                 url: 'http://www.sxjwty.com/wx/upload.php',
    //                 filePath: tempFilePaths[0],
    //                 name: 'photo',
    //                 // header: {}, // 设置请求的 header
    //                 // formData: {}, // HTTP 请求中其他额外的 form data
    //                 success: function (res) {
    //                     console.log(res)
    //                     if (res.data == 200) {
    //                         wx.showModal({
    //                             title: '上传成功',
    //                             content: '管理员审核后方可参加评选',
    //                             showCancel: false
    //                         })
    //                     }
    //                 },
    //                 fail: function () {
    //                     // fail
    //                 },
    //                 complete: function () {
    //                     // complete
    //                 }
    //             })
    //         }
    //     })
    // }
    onShareAppMessage:function(){
        return{
            title:'梦之星少儿明星选举',
            dese:'梦之星少儿明星选举开始啦，快来投你喜欢的小朋友一票吧吧！',
            path:'/pages/vote/vote'
        }
    }
})
