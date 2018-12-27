get session  // 获取session信息

get allKt //获取所有课程
get logout // 退出

get ktuser // 获取用户报名课程
get     //获取用户收藏课程 return (id, img)
get  (course=courseid) // 获取课程详细资料 return(id, 价格，is购买 ,is喜欢，lesson[{
    name ,简介，is学习
}])

get asyncgetTuijian  // 获取推荐课程 return (id, img)

get (course=courseid,[lesson:id]) //看是视频的 return(url, token)

post login(username, password) // 登录 return(is成功) 
post (key)  // 课程授权 return(is成功)
post (phonenum,password,[info]) // 用户信息 return(is成功)

