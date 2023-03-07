import type { RouteRecordRaw } from "vue-router";
import HomeVue from "@/views/home/Home.vue";
import CenterVue from "@/views/center/Center.vue"
import UserAddVue from "../views/user-manage/UserAdd.vue"
import UserListVue from "../views/user-manage/UserList.vue"
import NewsAddVue from "../views/news-manage/NewsAdd.vue"
import NewsListVue from "../views/news-manage/NewsList.vue"
import NewsEditorVue from "../views/news-manage/NewsEditor.vue"
import ProductAddVue from "../views/product-manage/ProductAdd.vue"
import ProductListVue from "../views/product-manage/ProductList.vue"
import ProductEditorVue from "../views/product-manage/ProductEditor.vue"
import JSErrorVue from '@/views/performance/PagePerformance.vue'
import PageViewVue from '@/views/performance/PageView.vue'
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
        component:UserAddVue,
        meta:{
            requiredAuth:true
        }
    },
    {
        path:'/user-manage/userList',
        component:UserListVue,
        meta:{
            requiredAuth:true
        }
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
        path:'/news-manage/newsEditor/:id',
        component:NewsEditorVue
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
        path:'/product-manage/productEditor/:id',
        component:ProductEditorVue
    },
    {
        path:'/performance/pageView',
        component:PageViewVue
    },
    {
        path:'/performance/jsError',
        component:JSErrorVue
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