import type { RouteRecordRaw } from "vue-router";
import HomeVue from "@/views/home/Home.vue";
import CenterVue from "@/views/center/Center.vue"
import UserAddVue from "../views/user-manage/UserAdd.vue"
import UserListVue from "../views/user-manage/UserList.vue"
import NewsAddVue from "../views/news-manage/NewsAdd.vue"
import NewsListVue from "../views/news-manage/NewsList.vue"
import ProductAddVue from "../views/product-manage/ProductAdd.vue"
import ProductListVue from "../views/product-manage/ProductList.vue"
import PerformanceVue from "@/views/performance/Data.vue"
import NotFoundVue from "@/views/notfound/NotFound.vue";
//做一个列表，方便动态添加路由
export const routesConfig:RouteRecordRaw[]=[
    {
        path:'/index',
        component:HomeVue
    },
    {
        path:'/center',
        component:CenterVue
    },
    {
        path:'/user-manage/addUser',
        component:UserAddVue
    },
    {
        path:'/user-manage/userList',
        component:UserListVue
    },
    {
        path:'/news-manage/addNews',
        component:NewsAddVue
    },
    {
        path:'/news-manage/newsList',
        component:NewsListVue
    },
    {
        path:'/product-manage/addProduct',
        component:ProductAddVue
    },
    {
        path:'/product-manage/productList',
        component:ProductListVue
    },
    {
        path:'/performance',
        component:PerformanceVue
    },
    {
        path:'/',
        redirect:'/index'
    },
    //匹配错误页面
    {
        // /:表示自定义匹配
        path:'/:errorPath+',
        component:NotFoundVue
    }   
]