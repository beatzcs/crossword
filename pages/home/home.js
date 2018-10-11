// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    window_width: wx.getSystemInfoSync().windowWidth,
    timeCount: 10,
    realArr: [],
    inputList: [],
    recordList: []
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
    console.log(this.data.realArr);
  },

  pickNum: function(e) {
    let inputList = this.data.inputList || [];
    let input = e.currentTarget.dataset.num;
    if (inputList.length < 4) {
      inputList = inputList.concat(input);
      this.setData({
        inputList: inputList
      })

      if (inputList.length == 4) {
        let resA = 0;
        let resB = 0;
        let realArr = this.data.realArr;
        for (let i = 0; i < 4; i++) {
          if (realArr[i] == inputList[i]) {
            resA++;
          }
        }
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (i == j) {
              continue;
            }
            if (inputList[j] == realArr[i]) {
              resB++;
              break;
            }
          }
        }
        if (resA == 4) {
          
          this.setData({
            success: true
          })
        }
        let result = "A" + resA + "B" + resB;
        let recordList = this.data.recordList || [];
        recordList.unshift({
          input: inputList,
          result: result
        })
        // recordList = recordList.concat({
        //   input: inputList,
        //   result: result
        // });
        let timeCount = this.data.timeCount - 1;
        let failed = timeCount == 0 ? true : false;
        this.setData({
          inputList: [],
          recordList: recordList,
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
    }
  },

  deleteNum: function() {
    let inputList = this.data.inputList || [];
    if (inputList.length > 0) {
      inputList.pop();
      this.setData({
        inputList: inputList
      })
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