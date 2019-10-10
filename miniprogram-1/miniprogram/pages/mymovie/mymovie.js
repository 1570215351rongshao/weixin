// pages/mymovie/mymovie.js
const db=wx.cloud.database({
  env:"web-rong-01-9mows"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",  //用户留言输入框
    fileID:0,   //一次上传一张图片 当前的图片的id
    image:""
  },

  onContentChange:function(event){
   this.setData({
     content:event.detail //获取文字保存到content
   })
  },
  upload:function(){
    //功能1 选择图片到data中
    //（1）显示加载提示框
    wx.showLoading({
      title: '图片上传中',
    })
    //（2）选择一张图片 图片类型 来源 成功
    wx.chooseImage({
      count:1,
      sizeType:["original","compressed"],
      sourceType:["album","camera"],
      success:(res)=>{
        var file=res.tempFilePaths[0];
         //（3）将选中图片保存到data中image
        this.setData({
          image:file
        })
        wx.hideLoading()
      },
    })
   

  },
  submit:function(){
    //功能2 上传一张图片 将图片的fileID 评论 添加到云数据库
    //(0)创建一个集合 mymovie 
      //在程序的开始创建db对象
    //（1）显示加载框
    wx.showLoading({
      title: '上传中',
    })
    //（2）上传图片 将图片faileID保存到data中
    var item=this.data.image;
    var suffix=/\.\w+$/.exec(item)[0];
    console.log(suffix)
    var newFile=new Date().getTime()+suffix;
    wx.cloud.uploadFile({
      cloudPath:newFile,
      filePath:item,
      success:(res)=>{
        var fileId=res.fileID;
        //console.log(fileId)
        var content=this.data.content;
        db.collection("mymovie1904").add({
          data:{
            content:this.data.content,
            fileId:fileId
          }
        }).then(res=>{
          console.log("添加成功")
        }).catch(err=>{
          console.log("添加失败")
        })
        wx.hideLoading()
      }
    })
    //（3）获取用户评论内容
    //（4）将评论内容和fileID添加到云数据库中
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