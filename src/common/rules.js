export const  register_phone= {
  num: [
    {
      // pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      required: true,
      message: "请输入手机号",
      trigger: "blur"
    },
    {
      pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      message: "请检查手机号格式",
      trigger: "blur"
    }
  ],
  code: [
    {
      required: true,
      message: "请输入验证码",
      trigger: "blur"
    }
  ]
}

export const register_user = {
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
      message: "请输入密码asd",
      trigger: "blur"
    },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: "用户名必须是6位以上的字母或者数字",
      trigger: "blur"
    }
  ],
  confirmPwd: [
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
  ],
  phone: [
    {
      required: true,
      pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
      message: "请输入手机号",
      trigger: "blur"
    }
  ],
  className: [
    {
      required: true,
      message: "请输入班级",
      trigger: "blur"
    }
  ]
}

