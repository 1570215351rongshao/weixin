// pages/comment/comment.js
//创建数据库的实例对象
const db =wx.cloud.database({
  env:"web-rong-01-9mows"  //环境id
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"", //输入框中显示的内容
    score:0,
    movieid: 26794435,    //当前电影的id
    detail:{          //当前电影的详细信息

    },
    images:[],        //保存用户选中的图片 预览
    fileIds:[]        //保存上传图片的fileID
  },
//####################################
  submit:function(){
    //功能1 将选中图片上传云存储
      //(1)显示数据加载提示框
      wx.showLoading({
        title: '评论中',
      })
      //(2)创建数组（添加promise对象）
      var rows=[];
      //(3) 创建循环遍历选中图片数组中的
      for(var i=0;i<this.data.images.length;i++){
      //(4)为每张图片创建一个promise对象
      rows.push(new Promise((resolve,reject)=>{
      //(5)获取数组中当前图片的名称
      var item=this.data.images[i];
      //console.log(item)
      //(6)创建正则表达式来解析图片名称后缀
      var suffix=/\.\w+$/.exec(item)[0];
       // console.log(suffix)
          //6.1创建新文件名称
          //var newFile=new Date().getTime()+suffix;
          //console.log(newFile)
          var newFile=new Date().getTime()+Math.floor(Math.random()*999)+suffix;
          console.log(newFile)
      //(7)上传图片
      wx.cloud.uploadFile({ //上传函数
        cloudPath:newFile,   //新文件名
        filePath:item,       //原先文件
        success:(res)=>{     //上传成功
       //(8)上传成功获取当前图片的fileID
       var fid=res.fileID;
       //(9)添加当前的fileID在data中
       this.data.fileIds.push(fid);
       //(10)执行成功 解析
       resolve();
        } //success end
      })  //wx.cloud  end
     
     
      }))  //promise end
      } //for end
    //功能2 将留言/打分/fileID添加到数据库
    //(11)等待所有的Promise对象执行完成
             //在回调函数完成
     Promise.all(rows).then(res=>{
    //(12)在云开发的数据库中创建集合 comment1904
    //(13)程序开始的位置创建实例对象
    //(14)向comment中个添加一条记录
          //content 留言
          //score  分数
          //movieid  那个电影评分
          //fileIds  上传图片的id
          db.collection("comment1904").add({
            data:{
              content: this.data.content,//content 留言
              score: this.data.score,  //score  分数
              movieid: this.data.movieid, //movieid  那个电影评分
              fileIds: this.data.fileIds  //fileIds  上传图片的id
            }
     //(15)成功回调函数  隐藏加载提示框  提示文字
          }).then(res=>{
            wx.hideLoading(); // 隐藏加载提示框
            wx.showToast({
              title: '评论成功',//提示文字
            })
     //(16)失败回调函数   隐藏加载提示框 提示文字
          }).catch(err=>{
            wx.hideLoading()
            wx.showToast({
              title: '评论失败',
            })
          })
     }) //promise all end
  }, //submit end
//###################################
/**选中多张图片 预览*/
  uploadImg:function(){
    //1.选中多张图片
    wx.chooseImage({
      count: 9,//2.数量
      sizeType:["original,compressed"],//3.图片的类型   原图 压缩图
      sourceType:["album","camera"], //4.图片的来源 相册 相机
      success: (res => { //5.选中成功
                 //6.选中图片的列表 res.temFilePaths[]
        var list = res.tempFilePaths;
        this.setData({ //7.保存data.images
        images: list  //将选中的图片保存到list
      })
       //8.在wxml循环显示images图片
      })
    })   
  },
/*调用云函数findDetail1904*/
  /*评论*/ 
  onContentChange:function(event){
    /*模拟双向绑定*/
    this.setData({
      content:event.detail
    })
    console.log(this.data.content)
  },
  /*评分*/ 
  onScoreChange3:function(event){
   /*模拟双向绑定*/ 
    this.setData({
      score:event.detail
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取home组件id并报存
    var id=options.id
    //保存
    //console.log(id)
    this.setData({
      movieid:id
    })
    //加载电影的详情信息
    this.loadMore();
  },
  loadMore: function (options) {
//组件创建成功后调用云函数显示当前电影的列表
   //1.获取当前电影的id
    var id=this.data.movieid;
   //2.显示数据加载提示框
   wx.showLoading({
     title: '加载中',
   })
   //3.调用云函数 findDetail1904
  
   wx.cloud.callFunction({
     name:"findDetail1904",
      //4.调用云函数传 参数 id
     data:{id:id}
   }).then(res=>{
      //5.接受云函数返回的结果
    //console.log(res.result)
     //console.log(res)
     var obj=JSON.parse(res.result);//将字符串解析成对象保存起来
      //6.将返回的结果保存到 detail
      this.setData({
        detail:obj     //将查到的obj保存到detail
      })
        //7.隐藏加载提示框
        wx.hideLoading();
   }).catch(err=>{
     console.log(err)
   })
  
 
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