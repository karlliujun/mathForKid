// pages/main/main.js
function timing(that) {
  var seconds = that.data.seconds
  if (seconds > 21599) {
    that.setData({
      time: 'too long, just stop now'
    });
    return;
  }
  setTimeout(function () {
    that.setData({
      seconds: seconds + 1
    });
    timing(that);
  }
    , 1000)
  formatSeconds(that)
}
function formatSeconds(that) {
  var mins = 0, hours = 0, seconds = that.data.seconds, time = ''
  if (seconds < 60) {

  } else if (seconds < 3600) {
    mins = parseInt(seconds / 60)
    seconds = seconds % 60
  } else {
    mins = parseInt(seconds / 60)
    seconds = seconds % 60
    hours = parseInt(mins / 60)
    mins = mins % 60
  }
  that.setData({
    time: formatTime(hours) + ':' + formatTime(mins) + ':' + formatTime(seconds)
  });
}
function formatTime(num) {
  if (num < 10)
    return '0' + num
  else
    return num + ''
}
function charging(that) {
  if (that.data.seconds < 600) {
    //cost = 1
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    examConfig : null,
    examItems : [],
    currentIndex : 0,
    firstOperand : null,
    operator : null,
    secondOperand : null,
    result : '',
    displayedItemCount : 0,
    progress : 0,
    correctResultCount : 0,
    seconds: 0,
    time: '00:00:00',
    userInputCss : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // timer
    timing(this);
    charging(this);

    this.data.examConfig = JSON.parse(options.examcfg);
    this.setData({
      examConfig : this.data.examConfig
    });

    this.generateExamItems();

    // init expression
    this.data.firstOperand = this.data.examItems[this.data.currentIndex].firstOperand;
    this.data.operator = this.data.examItems[this.data.currentIndex].operator;
    this.data.secondOperand = this.data.examItems[this.data.currentIndex].secondOperand;
    this.data.displayedItemCount = 1;
    this.data.progress = parseInt((this.data.displayedItemCount / this.data.examConfig.examCount) * 100);
    this.setData({
      firstOperand : this.data.firstOperand,
      operator : this.data.operator,
      secondOperand : this.data.secondOperand,
      displayedItemCount: this.data.displayedItemCount,
      progress : this.data.progress
    });

    console.log(this.data.firstOperand + " " + this.data.operator, + " " + this.data.secondOperand);
  },

  getFirstOperand: function (ceiling) {
    return Math.round(parseInt(Math.random() * ceiling));
  },

  getRandomOperator: function () {
    var operatorVal = Math.round(parseInt(Math.random() * 2 + 1));
    if(operatorVal != 2) {
      return "+";
    }
    return "-";
  },

  getSecondOperand: function(firstOperand, ceiling, operator) {
    var secondOperand = 0;
    if (operator == "+") {
      var tempCeiling = ceiling - firstOperand;
      secondOperand = Math.round(parseInt(Math.random() * tempCeiling + 1));
    } else if (operator == "-") {
      secondOperand = Math.round(parseInt(Math.random() * firstOperand + 1));
    }

    return secondOperand;
  },

  generateExamItems : function() {
    var numberOfItem = this.data.examConfig.examCount;
    var operator = this.data.examConfig.examType;
    var ceiling = this.data.examConfig.examScope;
    var firstOperand, secondOperand;
    var expressions = [];
    var isOperatorRandom = operator == "random";
    for (var i = 0; i < numberOfItem; i++) {
      firstOperand = this.getFirstOperand(ceiling);
      if (isOperatorRandom) {
        operator = this.getRandomOperator();
      }
      secondOperand = this.getSecondOperand(firstOperand, ceiling, operator);
      this.data.examItems.push({
        firstOperand : firstOperand,
        operator : operator,
        secondOperand : secondOperand,
        result: operator == "+" ? firstOperand + secondOperand : firstOperand - secondOperand
      });
    }

    //reset current index each time the exam is re-generated
    this.data.currentIndex = 0;
    console.log(this.data.examItems);
  },

  numberButtonTap : function(e) {
    console.log(e.currentTarget.dataset);
    if (this.data.result.length >= 2) {
      return;
    }
    this.data.result += e.currentTarget.dataset.numval;
    this.setData({
      result: this.data.result
    });
  }, 

  buttonX: function () {
    this.data.result = this.data.result.length > 0 ? this.data.result.substring(0, this.data.result.length - 1) : "";
    this.setData({
      result : this.data.result
    });
  },

  buttonOk: function () {
    if(this.data.result == null || this.data.result == '') {
      this.data.userInputCss = "border-bottom : 2rpx solid red";
      this.setData({
        userInputCss: this.data.userInputCss
      });
      return;
    }
    // set default input box style
    this.data.userInputCss = "border-bottom : 2rpx solid gray";
    this.setData({
      userInputCss: this.data.userInputCss
    });

    if (parseInt(this.data.result) == this.data.examItems[this.data.currentIndex].result) {
      this.data.correctResultCount += 1;
    }

    if (this.data.displayedItemCount == this.data.examConfig.examCount) {
      wx.redirectTo({
        url: '../report/report?result=' + JSON.stringify({
          correct: this.data.correctResultCount,
          total: this.data.examConfig.examCount,
          time: this.data.time
        })
      });
      return;
    }
    
    this.data.currentIndex += 1;
    this.data.result = '';
    this.data.firstOperand = this.data.examItems[this.data.currentIndex].firstOperand;
    this.data.operator = this.data.examItems[this.data.currentIndex].operator;
    this.data.secondOperand = this.data.examItems[this.data.currentIndex].secondOperand;
    this.data.displayedItemCount += 1;
    this.data.progress = parseInt((this.data.displayedItemCount / this.data.examConfig.examCount) * 100);
    
    this.setData({
      firstOperand: this.data.firstOperand,
      operator: this.data.operator,
      secondOperand: this.data.secondOperand,
      displayedItemCount: this.data.displayedItemCount,
      result : this.data.result,
      progress: this.data.progress
    });

    console.log(this.data.firstOperand + " " + this.data.operator, + " " + this.data.secondOperand);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})