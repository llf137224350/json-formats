# json-formats
  格式化json字符串，以便于阅读

**使用方式：**
````
const format = require('json-formats');
const res = format(json对象||json字符串, {})
````
**参数配置：**
````
方法第二个参数接收一个对象，对象内容如下：

{
  linkBreak: '\n',          // 换行符
  indentStr: '  '           // 缩进 默认两个空格
}
````
**示例：**
```

json字符串

{"rewardable":true,"setting":{"description":"小礼物走一走，来简书关注我","default_amount":200},"total_rewards_count":2,"reward_buyers":[{"avatar":"https://upload.jianshu.io/users/upload_avatars/24980734/6a3c4ca0-a49b-4c04-bd0e-873680f9d299","slug":"7e41f9591579"},{"avatar":"https://cdn2.jianshu.io/assets/default_avatar/2-9636b13945b9ccf345bc98d0d81074eb.jpg","slug":"2b934bfdf859"}]}
```

**结果：**
````

{
    rewardable: true,
    setting: {
        description: "小礼物走一走，来简书关注我",
        default_amount: 200
    },
    total_rewards_count: 2,
    reward_buyers: [
        {
            avatar: "https://upload.jianshu.io/users/upload_avatars/24980734/6a3c4ca0-a49b-4c04-bd0e-873680f9d299",
            slug: "7e41f9591579"
        },
        {
            avatar: "https://cdn2.jianshu.io/assets/default_avatar/2-9636b13945b9ccf345bc98d0d81074eb.jpg",
            slug: "2b934bfdf859"
        }
    ]
}
````


点击下面的连接将跳转到[在线体验地址](https://etctest.cyzl.com/hello_json 'HelloJSON')，由于是网页版所以做了语法着色处理

点击下面的连接查看完整版源码[完整版源码地址](https://github.com/llf137224350/hello_json 'HelloJSON')
