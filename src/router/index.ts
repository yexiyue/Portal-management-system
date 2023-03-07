import { useIndexStore } from "./../stores/store";
import { routesConfig } from "./config";
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import LoginVue from "../views/Login.vue";
import MainBoxVue from "../views/MainBox.vue";
import { pinia } from "@/stores";

export const MainBox = Symbol();

const router = createRouter({
  /* history: createWebHistory(import.meta.env.BASE_URL), */
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginVue,
    },
    {
      path: "/mainBox",
      name: MainBox,
      component: MainBoxVue,
    },
    //mainBox的嵌套路由后面根据权限动态添加
  ],
});

//在其他地方不是在vue文件中，得传入pinia参数
const store = useIndexStore(pinia);

//路由拦截
router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next();
  } else {
    //如果授权，就通过
    //没授权，重定向到login
    if (!localStorage.getItem("token")) {
      next({
        name: "login",
        replace: true,
      });
    } else {
      //只配置一遍就可以了
      if (!store.isGetterRouter) {
        //先删除所有的嵌套路由
        router.removeRoute(MainBox);
        //重新添加路由
        if (!router.hasRoute(MainBox)) {
          router.addRoute({
            path: "/mainBox",
            name: MainBox,
            component: MainBoxVue,
          });
        }
        configRouter();
        //不能直接使用next()，因为路径刚刚添加好，得重新再走一遍
        next({
          path: to.fullPath,
        });
      } else {
        next();
      }
    }
  }
});

function configRouter() {
  routesConfig.forEach((item) => {
    checkPermission(item) && router.addRoute(MainBox, item);
  });
  //改变第一次，让其只配置一遍
  store.isGetterRouter = true;
}

//判断元数据是否需要验证角色
function checkPermission(item: RouteRecordRaw) {
  if (item.meta?.requiredAuth) {
    //如果为管理员就添加，不是就不添加
    return store.user.role === 1;
  }
  return true;
}
export default router;
