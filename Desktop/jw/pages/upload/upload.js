var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    sex_items: [
      { name: '1', value: '小王子' },
      { name: '0', value: '小公主' },
    ],
    logo: null,
    userInfo: {}
  },
  onLoad: function () {
   
  },

  bindSaveTap: function (e) {
    console.log(e)
    var formData = {
      name: e.detail.value.nick_name,
      sex: e.detail.value.baby_sex,
      age: e.detail.value.baby_age
    }
    console.log(formData)
    util.upload_file('http://www.sxjwty.com/wx/upload.php', this.data.logo, 'photo', formData,
      function (res) {
        if (res == 200) {
          wx.showModal({
            title: '上传成功',
            content: '管理员审核后方可参加评选',
            showCancel: false,
            success:function(res){
              if(res.confirm){
                wx.navigateBack({
                  delta: 1, // 回退前 delta(默认为1) 页面
                })
              }
            }
          })
        }
      },
      function () {
      })
  },

  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })

  },
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      count: 1,
      sourceType: type,
      sizeType: 'compressed',
      success: function (res) {
        console.log(res);
        _this.setData({
          logo: res.tempFilePaths[0],
        })
      }
    })
  }
})