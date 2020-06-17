const Router = require('koa-router');
const User = require('./model');
const md5 = require('md5-node');
const router = new Router({
  prefix: '/users',
});

// Get all users
router.get('/', async (ctx) => { //用户列表
  try {
    const result = await (await User.find({},{"password":0})).filter(item=>{
      return item.status == "10"
    });
    
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
        token: findUser.id,
        name: findUser.name,
        phone: findUser.phone,
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
      password,
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
      password: md5(password),
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

// Update a user
router.post('/delete', async (ctx) => { //删除用户 修改status为20 逻辑删除
  const {
    id
  } = ctx.request.body;
  try {
    const userDoc = await User.findOne({
      '_id': id
    })
    userDoc.status = 20
    console.log(userDoc, "userDoc")
    await userDoc.save();

    ctx.body = {
      code: 0,
      msg: "删除成功",
      data: {}
    };
  } catch (error) {
    ctx.throw(400, error.message);
  }
});


module.exports = router;
