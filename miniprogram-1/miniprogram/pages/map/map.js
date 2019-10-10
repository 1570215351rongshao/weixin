// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    controls:[{ //地图控件
      id:0,
      iconPath:"/images/di1.png",
      position:{
              left:0,
              top:50,
              width:50,
              height:50
      }
    }],
    polyline:[//地图上的多个线段
       {
         points:[
           { logitude: 116.300901, latitude: 39.916085},
           { logitude: 116.300906, latitude: 100.916089}
         ]
       }
    ],
    color:"#f0f",
    width:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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