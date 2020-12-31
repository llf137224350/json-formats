test('空json对象', () => {
  const format = require('../');
  expect(format({})).toBe(`{}`)
});

test('json字符串', () => {
  const format = require('../');
  expect(format('{}')).toBe(`{}`)
});

test('简单json', () => {
  const format = require('../');
  expect(format('{"name":"zhangsan","age":18}')).toBe(`{
  name: "zhangsan",
  age: 18
}`)
});

test('嵌套json', () => {
  const format = require('../');
  expect(format('{"name":"zhangsan","age":18, "obj":{"name":"zhangsan","age":18}}')).toBe(`{
  name: "zhangsan",
  age: 18,
  obj: {
    name: "zhangsan",
    age: 18
  }
}`)
});

test('复杂json', () => {
  const format = require('../');
  const jsonStr = `{"rewardable":true,"setting":{"description":"小礼物走一走，来简书关注我","default_amount":200},"total_rewards_count":2,"reward_buyers":[{"avatar":"https://upload.jianshu.io/users/upload_avatars/24980734/6a3c4ca0-a49b-4c04-bd0e-873680f9d299","slug":"7e41f9591579"},{"avatar":"https://cdn2.jianshu.io/assets/default_avatar/2-9636b13945b9ccf345bc98d0d81074eb.jpg","slug":"2b934bfdf859"}]}`;
  expect(format(jsonStr)).toBe(`{
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
}`)
});
