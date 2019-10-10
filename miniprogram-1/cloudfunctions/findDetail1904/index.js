// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//1.引入request-promise
const rp = require("request-promise");
//2.发送请求
exports.main = async (event, context) => {
  //http://api.douban.com/v2/movie/subject/${event.id}?apikey=0df993c66c0c636e29ecbb5344252a4a
  var url = `http://api.douban.com/v2/movie/subject/${event.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  return rp(url).then(res => {    //云函数返回：想豆瓣发送请求
    return res;              //云函数返回结果
  }).catch(err => {           //出错输出问题信息
    console.log(err)
  })
}

// 云函数入口函数
/*exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}*/