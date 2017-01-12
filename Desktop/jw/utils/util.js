function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/* 写openId */
function setOpenId(value) {
  wx.setStorage({
    key: 'openId',
    data: value
  })
}
/* 读openId */
function getOpenId() {
  try {
    var openId = wx.getStorageSync('openId')
    if (openId) {
      return openId
    }
  } catch (e) {
    var code = getCode();
    wx.request({
      url: 'https://URL',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
}

function upload_file(url, filePath, name, formData, success, fail) {
  console.log('a=' + filePath)
  wx.uploadFile({
    url: url,
    filePath: filePath,
    name: name,
    header: {
      'content-type': 'multipart/form-data'
    }, // 设置请求的 header
    formData: formData, // HTTP 请求中其他额外的 form data
    success: function (res) {
      console.log(res);
      if (res.statusCode == 200 && !res.data.result_code) {
        typeof success == "function" && success(res.data);
      } else {
        typeof fail == "function" && fail(res);
      }
    },
    fail: function (res) {
      console.log(res);
      typeof fail == "function" && fail(res);
    }
  })
}
module.exports = {
  formatTime: formatTime,
  getOpenId: getOpenId,
  upload_file:upload_file
}
