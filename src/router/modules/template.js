const template = {
  path: '/template',
  component: () => import("@/views/layout/index"),
  icon: "el-icon-document",
  meta: {
    title: "模板管理",
    nav: true
  },
  children: [{
    path: "",
    component: () => import("@/views/templates/index"),
    icon: "el-icon-document",
    meta: {
      title: "模板列表"
    },
  }, {
    path: "add",
    component: () => import("@/views/templates/add"),
    icon: "el-icon-document",
    meta: {
      title: "新增模板"
    },
  },{
    path: "update",
    component: () => import("@/views/templates/update"),
    icon: "el-icon-document",
    meta: {
      title: "模板编辑"
    },
  }]
}
export default template
