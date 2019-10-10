// pages/home_1/home_1.js

//1.功能 当阿组件创建成功后调用云函数
  //获取第一页的数据爆粗list

//2.功能 当用户向上滑动加载下一页的数据
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[] //电影列表
  },
  //跳转到评论组件
  jumpComment:function(e){
    //comment组件不能添加到tabbar中
    //获取自定义属性id
    var id=e.target.dataset.id
    //跳转到comment组件，并传递参数id
    var url="/pages/comment/comment?id="+id;
    wx.navigateTo({
      url:url,
    })
  },

  loadMore:function(){
  //功能：调用云函数 并且传递参数
    //1.调云函数 movielist3
    wx.cloud.callFunction({
      name:"movielist3", //云函数名称
      data:{  // 向云函数传递的参数
        start:this.data.list.length,//起始行 数组的长度
        count:4, //当前页共几行
      }
    }).then(res=>{  //回调云函数 获取返回数据保存在list
       // console.log(res)  //result里面才是我们需要的数据
      //console.log(res.result); 
      var rows = JSON.parse(res.result); //将字符串解析成对象保存起来
      var list2=this.data.list.concat(rows.subjects);
      this.setData({//保存到list中
        list:list2 //result里面的subjects是电影列表
      })
    }).catch(err=>{
      console.log(err)
    })
    //2.参数 start count
    //3.获取云函数返回的数据保存到list中
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore()
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
    /*加载下一页的程序*/ 
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})