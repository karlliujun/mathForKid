// pages/main/main.js
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
    result : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.examConfig = JSON.parse(options.examcfg);
    console.log(this.data.examConfig);
    this.generateExamItems();

    // init expression
    this.data.firstOperand = this.data.examItems[this.data.currentIndex].firstOperand;
    this.data.operator = this.data.examItems[this.data.currentIndex].operator;
    this.data.secondOperand = this.data.examItems[this.data.currentIndex].secondOperand;
    this.setData({
      firstOperand : this.data.firstOperand,
      operator : this.data.operator,
      secondOperand : this.data.secondOperand
    });

    console.log(this.data.firstOperand + " " + this.data.operator, + " " + this.data.secondOperand);
  },

  getFirstOperand: function (ceiling) {
    return Math.round(parseInt(Math.random() * ceiling + 1));
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

  button1 : function() {
    this.data.result += "1";
    this.setData({
      result : this.data.result
    });
    console.log(this.data.reuslt);
  },

  button2: function () {
    this.data.result += "2";
    this.setData({
      result: this.data.result
    });
  },

  button3: function () {
    this.data.result += "3";
    this.setData({
      result: this.data.result
    });
  },

  button4: function () {
    this.data.result += "4";
    this.setData({
      result: this.data.result
    });
  },

  button5: function () {
    this.data.result += "5";
    this.setData({
      result: this.data.result
    });
  },

  button6: function () {
    this.data.result += "6";
    this.setData({
      result: this.data.result
    });
  },

  button7: function () {
    this.data.result += "7";
    this.setData({
      result: this.data.result
    });
  },

  button8: function () {
    this.data.result += "8";
    this.setData({
      result: this.data.result
    });
  },

  button9: function () {
    this.data.result += "9";
    this.setData({
      result: this.data.result
    });
  },

  button0: function () {
    this.data.result += "0";
    this.setData({
      result: this.data.result
    });
  },

  buttonX: function () {

  },

  buttonOk: function () {

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