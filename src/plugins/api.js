import {
  post,
  ajaxSetup,
} from "jquery"
import * as interfaces from './Interfaces.json'

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

// 添加csrf 验证
ajaxSetup({
  beforeSend: function (xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      let arr = document.cookie.split(';')
      for (let v in arr) {
        let to = arr[v].split('=');
        if (to[0].replace(/\s+/g, "") === "csrfToken") {
          xhr.setRequestHeader('x-csrf-token', to[1].replace(/\s+/g, ""));
        }
      }
    }
  },
});
export const asynclogin = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.login, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

export const session = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.online).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

export const allUser = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.getAllUser).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

export const getallcourse = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.AllCourse).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}



export const packagekey = function () {
  return new Promise((resolve, reject) => {
    post(interfaces).then(response => {
      if (response.error == 0) {
        resolve(response.packagekey)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}


// 通过cid 获取course 和courseliseeion 的方法
export const asyncgetCourseAndLessionsByCourseID = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getCourseAndLessionsByCourseID, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 获取上传权限
export const asyncuploadAccess = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.uploadAccess).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 上传course
export const asyncuploadCourse = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.uploadCourse, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 上传course
export const asyncupdateCourse = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.updateCourse, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 删除course
export const asyncdeleteCourse = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteCourse, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 添加lession
export const asyncuploadLession = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.uploadLession, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 更新lession
export const asyncupdateLession = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.updateLession, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}
// 删除lession
export const asyncdeleteLession = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteLession, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 添加代理商
export const asyncnewAgent = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.newAgent, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}


// 添加package
export const asyncnewPackege = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.newPackege, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 添加AgentKey
export const asyncaddAgentKey = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addAgentKey, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 添加AgentKey
export const asyncaddPackegeKey = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addPackegeKey, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 添加addPackege
export const asyncaddPackege = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addPackege, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 获取package
export const asyncgetAllPackege = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getAllPackege, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 获取package
export const asyncgetCourseByPackegeID = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getCourseByPackegeID, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

export const asyncgetUserByUser = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getUserByUser, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

export const asyncgetUserCourseInfo = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getUserCourseInfo, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 获取代理商课程包
export const asyncgetAgentCoursePak = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getAgentCoursePak, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 删除代理商课程包
export const asyncdeleteAgebtKeyByID = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteAgebtKeyByID, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

//  删除课程包的课程
export const asyncdeletePackegeByID = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deletePackegeByID, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 删除课程包
export const asyncdeletePackegeKeyByID = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deletePackegeKeyByID, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 修改用户
export const asyncupdateUser = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.updateUser, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}


// 删除用户
export const asyncdeleteUserByID = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteUserByID, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 修改课程包
export const asyncupdatePackegeKey = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.updatePackegeKey, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}




export const asyncvideoQuestion = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.videoQuestion, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}


// 添加视频问题
export const asyncuploadQuestion = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.uploadQuestion, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}


// 修改视屏问题
export const asyncupdateQuestion = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.updateQuestion, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 删除视频问题

export const asyncdeleteQuestion = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteQuestion, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 管理员获取视频
export const asyncgetVideoPermissionByID = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getVideoPermissionByID, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 提交答案 
export const asynccheckQuestion = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.checkQuestion, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 创建学生

export const asyncnewstudent = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.newStudent, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 获取视频信息

export const asyncgetvideoInfo = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.videoInfo, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 通过course id 获取 lession
export const asyncgetLessionByCourseid = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getLessionByCourseid, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 获取用户课程

export const asyncgetktUser = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.getCourse).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 获取推荐课程

export const asyncgetTuijian = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.AllCourse).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 获取课堂信息
export const asyncgetktById = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.CourseInfo, data).then(response => {
      if (response.error == 0) {
        resolve(response.courses)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

export const asyncupdate = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.update, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 支付宝接口
export const asyncpay = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.pay, data, "text").then(response => {
      resolve(response.data)
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 重置密码

export const asyncchangePassword = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.changePassword, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

export const asyncUserCourseInfo = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.UserCourseInfo, data).then(response => {
      if (response.error == 0) {

        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log("11112121212",error);
      reject('服务器开小差了')
    })
  })
}

export const asyncgetLessionByCourseidAndNum = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getLessionByCourseidAndNum, data).then(response => {
      if (response.error == 0) {

        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 刷新用户学到第几节
export const asynclearn = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.learn, data).then(response => {
      if (response.error == 0) {

        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 获取支付宝支付接口
export const asynpay = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.pay, data).then(response => {

      resolve(response.data)
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 添加收藏
export const asynaddCollection = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addCollection, data).then(response => {
      if (response.error == 0) {

        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 用户注册
export const asyncregist = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.regist, data).then(response => {
      if (response.error == 0) {

        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 获取子用户
export const asyncgetChildren = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.getChildren).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 获取课程包
export const asyncgetInvite = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getInvite, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 审核子用户
export const asynccheckUser = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.checkUser, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

export const asyncgetCourseFile = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getCourseFile, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 获取yzm
export const asyncfind_getCode = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.find_getCode, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 检查yzm
export const asyncfind_checkCode = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.find_checkCode, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}


// 修改密码
export const asyncfind_findPassword = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.find_findPassword, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}


// 注册获取yzm
export const asyncregist_getCode = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.regist_getCode, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}




// 获取微信支付
export const asyncWXpay = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.WXpay, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 站内信
// 创建消息
export const asyncnewMessage = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.newMessage, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询收到消息
export const asyncreceivedMessage = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.receivedMessage).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询发送消息
export const asyncsentMessage = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.sentMessage).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 标记消息已读
export const asyncreadMessage = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.readMessage, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 获取视频列表
export const asyncGetVideoList = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.GetVideoList).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 修改视频
export const asyncupdateVideoInfo = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.updateVideoInfo, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 删除视频
export const asyncdeleteVideo = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteVideo, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 通过lid获取视频信息

export const asyncgetVideoIDByLessionID = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getVideoIDByLessionID, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// wx获取验证码
export const asyncgetLoginQRCode = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getLoginQRCode, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// wx绑定
export const asyncgetBindQRCode = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.getBindQRCode).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// // wxWXBindPhone
// export const asyncWXBindPhone = function () {
//   return new Promise((resolve, reject) => {
//     post(interfaces.WXBindPhone).then(response => {
//       if (response.error == 0) {
//         resolve(response.data)
//       } else {
//         reject(response.msg)
//       }
//     }).catch(function (error) {
//       console.log(error);
//       reject('服务器开小差了')
//     })
//   })
// }

// // wxbindWXBindUser
// export const asyncWXBindUser = function () {
//   return new Promise((resolve, reject) => {
//     post(interfaces.WXBindUser).then(response => {
//       if (response.error == 0) {
//         resolve(response.data)
//       } else {
//         reject(response.msg)
//       }
//     }).catch(function (error) {
//       console.log(error);
//       reject('服务器开小差了')
//     })
//   })
// }

// WXAuthorize
export const asyncWXAuthorize = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.WXAuthorize).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 免费课程
export const asyncForfeepay = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.Forfeepay, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询用户积分
export const asyncgetUserAllPoint = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.getUserAllPoint).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询某个用户的类别分
export const asyncgetuserTypePoint = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.getUserTypePoint).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 管理员增删改查 角色
export const asyncaddRole = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addRole, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 管理员增删改查 角色
export const asynccancelRole = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.cancelRole, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 管理员增删改查 角色
export const asyncupdateRole = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.updateRole, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 管理员增删改查 角色
export const asyncselectRole = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.selectRole).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 管理员增删改查 角色
export const asyncaddUserRole = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addUserRole, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 管理员增删改查 角色
export const asyncchangeUserRole = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.changeUserRole, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询某个用户的类别分
export const asyncdeleteUserRole = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteUserRole, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询某个用户的类别分
export const asyncgetUserRole = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getUserRole, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询某个用户的类别分
export const asyncaddRoleAuth = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addRoleAuth, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询某个用户的类别分
export const asyncdeleteRoleAuth = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteRoleAuth, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询某个用户的类别分
export const asyncgetRoleAuth = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.getRoleAuth, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询某个用户的类别分
export const asyncselectAuth = function () {
  return new Promise((resolve, reject) => {
    post(interfaces.selectAuth).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 用户添加课程
export const asyncaddUsercouser = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addUsercouser, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询学校
export const asyncselectSchool = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.selectSchool, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 添加学校
export const asyncaddSchool = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addSchool, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 修改学校
export const asyncupdateSchool = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.updateSchool, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 删除学校
export const asyncdeleteSchool = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteSchool, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询教师
export const asyncselectTeacher = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.selectTeacher, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 添加教师
export const asyncaddTeacher = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addTeacher, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 修改教师
export const asyncupdateTeacher = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.updateTeacher, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 删除教师
export const asyncdeleteTeacher = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteTeacher, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询学生
export const asyncselectStudent = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.selectStudent, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 添加学生
export const asyncaddStudent = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addStudent, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 修改学生
export const asyncupdateStudent = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.updateStudent, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 删除学生
export const asyncdeleteStudent = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteStudent, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询班级
export const asyncselectClazz = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.selectClazz, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 添加班级
export const asyncaddClazz = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addClazz, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 修改班级
export const asyncupdateClazz = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.updateClazz, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 删除班级
export const asyncdeleteClazz = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteClazz, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询代理商
export const asyncselectAgent = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.selectAgent, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 添加代理商
export const asyncaddAgent = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addAgent, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 修改代理商
export const asyncchangeAgent = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.changeAgent, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 删除代理商
export const asyncdeleteAgent = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteAgent, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询管理员
export const asyncselectAdmin = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addUsercouser, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 添加管理员
export const asyncaddAdmin = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addAdmin, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 修改管理员
export const asyncupdateAdmin = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.updateAdmin, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 删除管理员
export const asyncdeleteAdmin = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteAdmin, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 删除用户课程
export const asyncdeleteUsercourse = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteUsercourse, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询用户课程
export const asyncselectUsercourse = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.selectUsercourse, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 创建课程资料
export const asyncuploadCoursefile = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.uploadCoursefile, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 删除课程资料
export const asyncdeleteCoursefile = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteCoursefile, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 修改课程资料
export const asyncupdateCoursefile = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.updateCoursefile, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询课程资料
export const asyncselectCoursefile = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.selectCoursefile, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 创建视频跳转
export const asyncaddWhitepoint = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addWhitepoint, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 删除删除视频调整
export const asyncdeleteWhitepoint = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.deleteWhitepoint, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 修改视频调整
export const asyncupdateWhitepoint = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.updateWhitepoint, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

// 查询视频调整
export const asyncselectWhitepoint = function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.selectWhitepoint, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}
//查询用户注册的时间段
export const  userRegister= function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.selectuserbycrtime, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}
//根据学校名称查找注册的学生
export const  selectBuySchool= function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.selectstubyschool, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}
//课程打包
//显示所有的课程组
export const  showbag= function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.showbag, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}
//向课程组中添加课程
export const addcoursetobag= function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.addcoursetobag, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}
//向课程组中减少课程
export const minuscoursetobag= function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.minuscoursetobag, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}
//从课程封面点击进去查看内部课程
export const tryselectcoursebybid= function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.selectcoursebybid, data).then(response => {
      if (response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}

export const bindwechat= function (data) {
  return new Promise((resolve, reject) => {
    post(interfaces.bindwechat, data).then(response => {
      if(response.error == 0) {
        resolve(response.data)
      } else {
        reject(response.msg)
      }
    }).catch(function (error) {
      console.log(error);
      reject('服务器开小差了')
    })
  })
}
