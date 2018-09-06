//index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeCount: 10,
    realArr: [],
    num1: null,
    num2: null,
    num3: null,
    num4: null,
    numInput: "",
    recordList: [],
    success: false,
    failed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let realArr = this.data.realArr;
    for (; realArr.length < 4;) {
      let temp = parseInt(Math.random() * 10, 10);
      let count = 0;
      for (let i = 0; i < realArr.length; i++) {
        if (temp == realArr[i]) {
          count++;
          break;
        }
        if (i == realArr.length - 1) {
          count = 0;
        }
      }
      if (count == 0) {
        realArr = realArr.concat(temp);
      }
    }
    this.setData({
      realArr: realArr
    })
  },

  inputChange: function(e) {
    let input = e.detail.value;
    this.setData({
      num1: input[0] || "",
      num2: input[1] || "",
      num3: input[2] || "",
      num4: input[3] || ""
    })
    if (input.length == 4) {
      let resA = 0;
      let resB = 0;
      let realArr = this.data.realArr;
      for (let i = 0; i < 4; i++) {
        if (realArr[i] == input[i]) {
          resA++;
        }
      }
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (i == j) {
            continue;
          }
          if (input[j] == realArr[i]) {
            resB++;
            break;
          }
        }
      }
      if (resA == 4) {
        this.setData({
          recordList: recordList,
          numInput: "",
          success: true
        })
      }
      let result = "A" + resA + "B" + resB;
      let recordList = this.data.recordList;
      recordList = recordList.concat({
        input: input,
        result: result
      });
      let timeCount = this.data.timeCount - 1;
      let failed = timeCount == 0 ? true : false;
      this.setData({
        recordList: recordList,
        num1: "",
        num2: "",
        num3: "",
        num4: "",
        numInput: "",
        timeCount: timeCount,
        failed: failed
      })
      if (failed) {
        wx.showToast({
          title: '失败',
          icon: 'none'
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})