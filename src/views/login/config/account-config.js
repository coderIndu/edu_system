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
  ]
}

export const form = {
  role: 'student',     // 身份(默认学生)
  userid: '',   // id
  username: '',     // 名字
  password: '',     // 密码
  confirmPwd: '',
  profession: '',   // 专业
  className: '',         // 班级
  phone: ''     // 手机号码
}

// 两次确认密码验证
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  }
};
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};