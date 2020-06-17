const Router = require('koa-router');
const User = require('./model');
const md5 = require('md5-node');
const router = new Router({
  prefix: '/users',
});

// Get all users
router.get('/', async (ctx) => { //用户列表
  try {
    const result = await User.find({},{"password":0})
    ctx.body = {
      code: 0,
      msg: "",
      data:result
    };
  } catch (error) {
    ctx.throw(400, error.message);
  }
});
// Get all users
router.post('/login', async (ctx) => { //登录
  const {
    password,
    phone
  } = ctx.request.body;
  var findUser = await User.findOne({
    phone
  });
  if (!findUser) {
    ctx.body = {
      code: -1,
      msg: "账号不存在",
      data: {}
    };
    return
  }
  if (findUser.password === md5(password)) {
    var date = new Date()
    findUser.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    await findUser.save();
    ctx.body = {
      code: 0,
      msg: "登录成功",
      data: {
        token: findUser.id
      }
    };
  } else {
    ctx.body = {
      code: -1,
      msg: "密码错误",
      data: {}
    };
  }

});




// Create a user
router.post('/create', async (ctx) => { //创建用户
  try {
    const {
      phone,
      name
    } = ctx.request.body;
    const result = await User.findOne({phone});
    if(result){
      ctx.body = {
        code: -1,
        msg: "已存在该用户",
        data: {}
      };
      return;
    }
    const user = new User({
      name,
      password: md5(phone),
      phone
    });
    await user.save();
    ctx.body = {
      code: 0,
      msg: "新增成功",
      data: {}
    };
  } catch (error) {
    ctx.throw(400, error.message);
  }
});
// 删除用户
router.post('/delete', async (ctx) => {
  const {
    id
  } = ctx.request.body;
  try {
    const userDoc = await User.findByIdAndRemove(id)
    if(userDoc){
      ctx.body = {
        code: 0,
        msg: "删除成功",
        data: {}
      };
    }
  } catch (error) {
    ctx.throw(400, error.message);
  }
});
// 停用账户
router.post('/stop', async (ctx) => { 
  const {
    id
  } = ctx.request.body;
  try {
    const userDoc = await User.findById(id)
    userDoc.status = 20
    await userDoc.save();
    ctx.body = {
      code: 0,
      msg: "停用成功",
      data: {}
    };
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// 启用账户
router.post('/start', async (ctx) => { 
  const {
    id
  } = ctx.request.body;
  try {
    const userDoc = await User.findById(id)
    userDoc.status = 10
    await userDoc.save();
    ctx.body = {
      code: 0,
      msg: "启用成功",
      data: {}
    };
  } catch (error) {
    ctx.throw(400, error.message);
  }
});
module.exports = router;
