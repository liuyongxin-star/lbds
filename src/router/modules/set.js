const set = {
    path: '/set',
    component: () => import("@/views/layout/index"),
    icon: "el-icon-setting",
    meta: {
      title: "通用设置",
      nav: true
    },
    name: "通用设置",
    children: [{
      path: "",
      component: () => import("@/views/set/index"),
      meta: {
        title: "设置"
      },
    }]
  }
  export default set
  