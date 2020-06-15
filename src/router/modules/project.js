const project = {
    path: '/project',
    component: () => import("@/views/layout/index"),
    icon: "el-icon-folder-opened",
    meta: {
      title: "项目管理",
      nav: true
    },
    children: [{
      path: "",
      component: () => import("@/views/projects/index"),
      icon: "el-icon-document",
      meta: {
        title: "项目列表",
        keepAlive: true
      },
    }]
  }
  export default project
  