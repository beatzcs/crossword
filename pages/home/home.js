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
    recordList: [],
    showBoard: true,
    success: false,
    failed: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.randomNumber();
  },

  randomNumber: function() {
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

  /**
   * 选择数字
   */
  pickNum: function(e) {
    if (this.data.success || this.data.failed) {
      console.log("请重新开始...");
      return;
    }
    let inputList = this.data.inputList || [];
    let input = e.currentTarget.dataset.num;
    if (inputList.length < 4) {
      inputList = inputList.concat(input);
      this.setData({
        inputList: inputList
      })

      if (inputList.length == 4) {
        setTimeout(function() {
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
            if (this.data.showBoard) {
              this.dismiss();
            }
            this.setData({
              success: true
            })
            setTimeout(function() {
              this.successAnim();
            }.bind(this), 200)
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
            if (this.data.showBoard) {
              this.dismiss();
            }
            setTimeout(function() {
              this.failedAnim();
            }.bind(this), 200)
          }
        }.bind(this), 400)

      }
    }
  },

  /**
   * 删除数字 
   */
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
   * 重玩
   */
  replay: function() {
    if (this.data.timeCount == 10) {
      return;
    }
    this.setData({
      timeCount: 10,
      realArr: [],
      inputList: [],
      recordList: [],
      showBoard: true,
      success: false,
      failed: false,
      watchAns: false,
      showCover: false
    })
    this.randomNumber();
  },

  playAgain: function() {
    //console.log('dismiss: function');
    let anim = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
      delay: 0,
    });
    anim.translateY(-350).step();
    this.setData({
      animationSuccess: anim.export(),
    });
    setTimeout(function() {
      anim.translateY(0).step();
      this.setData({
        animationSuccess: anim.export()
      })
      this.replay();
    }.bind(this), 300);
  },

  watchAnswer: function() {
    this.dismissFailed();
    this.setData({
      watchAns: true
    })
  },

  /**
   * 显示输入板动画
   */
  showBoardAnim: function() {
    if (this.data.showBoard) {
      console.log("输入板已打开...");
      return;
    }
    if (this.data.failed) {
      this.failedAnim();
      return;
    }
    if (this.data.success) {
      console.log("请重新开始...");
      return;
    }
    let anim = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      delay: 0,
    });
    anim.translateY(400).step();
    this.setData({
      animationData: anim.export(),
      showBoard: true
    });
    setTimeout(function() {
      anim.translateY(0).step();
      this.setData({
        animationData: anim.export()
      });
    }.bind(this), 200);
  },

  /**
   * 失败动画
   */
  failedAnim: function() {
    let anim = wx.createAnimation({
      duration: 300,
      delay: 0,
      timingFunction: 'ease-in-out'
    })
    anim.translateY(0).step();
    this.setData({
      showCover: true,
      animationFailed: anim.export()
    })
    setTimeout(function() {
      anim.translateY(-400).step();
      this.setData({
        animationFailed: anim.export()
      })
    }.bind(this), 300)
  },

  /**
   * 成功动画
   */
  successAnim: function() {
    let anim = wx.createAnimation({
      duration: 300,
      delay: 0,
      timingFunction: 'ease-in-out'
    })
    anim.translateY(0).step();
    this.setData({
      showCover: true,
      animationSuccess: anim.export()
    })
    setTimeout(function() {
      anim.translateY(350).step();
      this.setData({
        animationSuccess: anim.export()
      })
    }.bind(this), 300)
  },

  /**
   * 隐藏输入板动画
   */
  dismiss: function() {
    //console.log('dismiss: function');
    let anim = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      delay: 0,
    });
    anim.translateY(400).step();
    this.setData({
      animationData: anim.export(),
    });
    setTimeout(function() {
      anim.translateY(0).step();
      this.setData({
        animationData: anim.export(),
        showBoard: false
      })
    }.bind(this), 200);
  },

  /**
   * 隐藏失败动画
   */
  dismissFailed: function() {
    //console.log('dismiss: function');
    let anim = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      delay: 0,
    });
    anim.translateY(400).step();
    this.setData({
      animationFailed: anim.export(),
    });
    setTimeout(function() {
      anim.translateY(0).step();
      this.setData({
        animationFailed: anim.export(),
        showBoard: false,
        showCover: false
      })
    }.bind(this), 200);
  },

  preventMove: function() {

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