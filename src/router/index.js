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
  {
    path: '/login',
    component: () => import("@/views/user/login"),
    meta: {
      title: "登录",
      noLogin: true
    },
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
router.beforeEach(async(to, from, next) => {
  console.log(to.name,"to")
  const hasToken = localStorage.getItem("token")
  console.log(hasToken)
  if(to.meta.noLogin){ //不需要登录
    next()
    return;
  }
  if(!hasToken){
    next("/login")
    return;
  }
  next()

  
})
export default router
