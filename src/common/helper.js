export default {
  // 用户相关
  login: "/users/login",  // 用户登录
  getInfo: "/user",        // 获取用户信息
  register: '/users/register', // 用户注册

  // 文件相关
  uploadFile: '/file/upload',   // 上传文件
  downFile: '/file/download',   // 下载文件
  removeFiles: '/file/delete',     // 删除文件
  getfiles: '/file/getfiles',   // 获取文件列表

  // 课程列表相关
  addCourse: '/course/add',            // 增加课程
  getCourseList: '/course/getlist',    // 获取课程列表
  removeCourse: 'course/delete',       // 删除课程
  dropManyCourse: '/course/dropmany', // 删除多个课程
  // 专业班级相关
  getClassList: '/class/getlist',    // 获取班级列表
}