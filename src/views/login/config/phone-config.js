export const rules = {
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
