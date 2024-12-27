

const nodemailer = require('nodemailer');
const path = require('path');
const account = require('./config')

// 创建可重用的传输器对象
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com', // QQ 邮箱 SMTP 服务器地址
  port: 465,          // QQ 邮箱推荐使用 SSL 加密，端口号为 465 或 587 (TLS)
  secure: true,       // 使用 SSL 加密
  auth: {
    user: account.user,
    // 这里密码不是qq密码，是你设置的smtp授权码
    pass: account.pass,
  }
});

// 发送邮件的选项
let mailOptions = {
  from: `"Jeffrey" <${account.user}>`, // sender address
  to: account.to, // list of receivers
  subject: 'Hello ✔',                      // 主题
  text: 'Hello world?',                    // 纯文本内容
//   html: '<b>Hello world?</b>',
//   attachments: [
//     {  // utf-8 string as an attachment
//       filename: 'text.txt',
//       content: 'hello world!'
//     },
//     {
//       filename: 'test.png',
//       path: path.resolve(__dirname, 'test.png'),
//     }
//   ]       
html: '<img src="cid:01">', // html body
attachments: [
  {
    filename: 'test.png',
    path: path.resolve(__dirname, 'test.png'),
    cid: '01',
  }
]
}

// 发送邮件
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
});