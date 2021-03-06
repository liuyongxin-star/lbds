const component = {
  path: '/component',
  component: () => import("@/views/layout/index"),
  icon: "el-icon-brush",
  meta: {
    title: "组件管理",
    nav: true
  },
  name: "模板管理",
  children: [{
    path: "",
    component: () => import("@/views/components/index"),
    icon: "el-icon-document",
    meta: {
      title: "模板列表"
    },
  }]
}
export default component
