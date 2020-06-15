const users = {
    path: '/user',
    component: () => import("@/views/layout/index"),
    icon: "el-icon-user",
    meta: {
      title: "用户管理",
      nav: true
    },
    children: [{
      path: "",
      component: () => import("@/views/user/index"),
      meta: {
        title: "用户列表",
        keepAlive: true
      },
    }]
  }
  export default users
  