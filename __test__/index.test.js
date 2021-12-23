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

test('复杂json - 存在值为null', () => {
  const format = require('../');
  const jsonStr = `{"rewardable":true,"setting":{"description":"小礼物走一走，来简书关注我","default_amount":200},"total_rewards_count":2,"reward_buyers":[{"avatar":"https://upload.jianshu.io/users/upload_avatars/24980734/6a3c4ca0-a49b-4c04-bd0e-873680f9d299","slug":"7e41f9591579"},{"avatar":"https://cdn2.jianshu.io/assets/default_avatar/2-9636b13945b9ccf345bc98d0d81074eb.jpg","slug":null}]}`;
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
      slug: null
    }
  ]
}`)
});

test('测试数组', () => {
  const format = require('../');
  const datas = [{
    "id": "792085712309854208",
    "imgUrl": "../../images/icon.png",
    "title": "迅雷白金会员月卡 - 1"
  }, {
    "id": "766410261029724160",
    "imgUrl": "../../images/icon.png",
    "title": "迅雷白金会员月卡 - 2"
  }, {
    "id": "770719340921364480",
    "imgUrl": "../../images/icon.png",
    "title": "迅雷白金会员月卡 - 3"
  }, {
    "id": "770946438416048128",
    "imgUrl": "../../images/icon.png",
    "title": "迅雷白金会员月卡 - 4"
  }, {
    "id": "781950121802735616",
    "imgUrl": "../../images/icon.png",
    "title": "迅雷白金会员月卡 - 5"
  }, {
    "id": "766411654436233216",
    "imgUrl": "../../images/icon.png",
    "title": "迅雷白金会员月卡 - 6"
  }, {
    "id": "770716883860332544",
    "imgUrl": "../../images/icon.png",
    "title": "迅雷白金会员月卡 - 7"
  }, {
    "id": "796879308510732288",
    "imgUrl": "../../images/icon.png",
    "title": "迅雷白金会员月卡 - 8"
  }];
  expect(format(datas)).toBe(`[
  {
    id: "792085712309854208",
    imgUrl: "../../images/icon.png",
    title: "迅雷白金会员月卡 - 1"
  },
  {
    id: "766410261029724160",
    imgUrl: "../../images/icon.png",
    title: "迅雷白金会员月卡 - 2"
  },
  {
    id: "770719340921364480",
    imgUrl: "../../images/icon.png",
    title: "迅雷白金会员月卡 - 3"
  },
  {
    id: "770946438416048128",
    imgUrl: "../../images/icon.png",
    title: "迅雷白金会员月卡 - 4"
  },
  {
    id: "781950121802735616",
    imgUrl: "../../images/icon.png",
    title: "迅雷白金会员月卡 - 5"
  },
  {
    id: "766411654436233216",
    imgUrl: "../../images/icon.png",
    title: "迅雷白金会员月卡 - 6"
  },
  {
    id: "770716883860332544",
    imgUrl: "../../images/icon.png",
    title: "迅雷白金会员月卡 - 7"
  },
  {
    id: "796879308510732288",
    imgUrl: "../../images/icon.png",
    title: "迅雷白金会员月卡 - 8"
  }
]`)
});
