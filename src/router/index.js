import Vue from 'vue'
import VueRouter from 'vue-router'
import template from "./modules/template"
import component from "./modules/component"
import project from "./modules/project"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import("@/views/layout/index"),
    meta: {
      title: "首页"
    },
    icon: "el-icon-monitor",
    children: [{
      path: "",
      component: () => import("@/views/Home"),
      icon: "el-icon-document",
      meta: {
        title: "首页"
      },
    }]
  },
  project,
  component,
  template
]


const router = new VueRouter({
  routes
})

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
}
export default router
