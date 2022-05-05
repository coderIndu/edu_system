export const rules = {
  userid: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    },
    {
      pattern: /^[a-z0-9]{3,10}$/,
      message: "用户名必须是5-10个字母或者数字",
      trigger: "blur"
    }
  ],
  username: [
    {
      required: true,
      message: "请输入姓名",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: "用户名必须是6位以上的字母或者数字",
      trigger: "blur"
    }
  ],
  password_confirm: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: "用户名必须是6位以上的字母或者数字",
      trigger: "blur"
    }
  ],
  class: [{
    required: true,
    message: "请输入班级",
    trigger: "blur"
  }],
  profession: [{
    required: true,
    message: "请输入专业",
    trigger: "blur"
  }],
  role: [
    {
      required: true,
      message: "请选择身份",
      trigger: "blur"
    }
  ]
}

export const form = {
  role: '',     // 身份
  userid: '',   // id
  username: '',     // 名字
  password: '',     // 密码
  password_confirm: '',
  profession: '',   // 专业
  class: ''         // 班级
}