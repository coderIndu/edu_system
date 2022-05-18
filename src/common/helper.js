const previewHost = 'http://114.132.229.173:8012/onlinePreview' 
export default {
  // 用户相关
  login: "/users/login",        // 用户登录
  getInfo: "/user",             // 获取用户信息
  register: '/users/register',  // 用户注册
  updateUser: '/user/update',   // 用户更新
  getUserList: '/user/getlist', // 获取用户列表
  delUser: '/user/delUser',     // 删除用户
  // 文件相关
  uploadFile: '/file/upload',   // 上传文件
  downFile: '/file/download',   // 下载文件
  removeFiles: '/file/delete',  // 删除文件
  getfiles: '/file/getfiles',   // 获取文件列表

  // 课程列表相关
  addCourse: '/course/add',               // 增加课程
  getCourseDetails: '/course/getDetails', // 获取详情
  getCourseList: '/course/getlist',       // 获取课程列表
  removeCourse: 'course/delete',          // 删除课程
  dropManyCourse: '/course/dropmany',     // 删除多个课程
  // 专业班级相关   
  getClassList: '/class/getlist',         // 获取班级列表
  // 文件预览  
  previewHost,                            // 文件预览地址
  // 公告相关   
  addNotice: '/notice/addOne',            // 添加公告
  getNoticeList: '/notice/getlist',       // 获取公告列表
  editNotice: '/notice/editOne',          // 编辑公告
  delNotice: '/notice/delOne',            // 删除公告
  
  // 课程打卡相关 
  addClock: '/course/addClock',           // 课程打卡
}

