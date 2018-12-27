
const state = {
    user:null,
    username: null, // 用户名称
    usertype: null,
    headimg: "",
    ktAll:[],   // 所有课程
    ktUser:[],  // 用户已报名课程
    ktTuijian:[],   // 用户推荐课程
    difficulty : ["初级", "中级", "高级"],
    fenzus: ["移动小车", "来看撒娇"],
    labels: ["自然语言","视觉处理","自然运动","深度学习"],
    barrage: [],
    lession: [],
    video: null,
    LessionByCourseidAndNum:[],
    ossImglist: null,
    auth: [], // 所有权限
    userauth: [], // 用户角色
    role: [], // 所以角色
}

export default state
