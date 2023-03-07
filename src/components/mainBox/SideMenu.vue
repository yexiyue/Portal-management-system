<template>
    <el-aside style="transition: 0.5s;" :width="store.isCollapse ? '64px' : '205px'">
        <el-menu :default-active="route.fullPath" router :collapse="store.isCollapse" class="el-menu-vertical-demo">
            <el-menu-item index="/index">
                <el-icon>
                    <Home></Home>
                </el-icon>
                <span>首页</span>
            </el-menu-item>

            <el-menu-item index="/center">
                <el-icon>
                    <Center></Center>
                </el-icon>
                <span>个人中心</span>
            </el-menu-item>

            <el-sub-menu index="/user-manage" v-admin >
                <template #title>
                    <el-icon>
                        <UserManage></UserManage>
                    </el-icon>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/user-manage/addUser">添加用户</el-menu-item>
                <el-menu-item index="/user-manage/userList">用户列表</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="/news-manage/">
                <template #title>
                    <el-icon>
                        <NewsManage></NewsManage>
                    </el-icon>
                    <span>新闻管理</span>
                </template>
                <el-menu-item index="/news-manage/addNews">添加新闻</el-menu-item>
                <el-menu-item index="/news-manage/newsList">新闻列表</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="/product-manage">
                <template #title>
                    <el-icon>
                        <ProductManage></ProductManage>
                    </el-icon>
                    <span>产品管理</span>
                </template>
                <el-menu-item index="/product-manage/addProduct">添加产品</el-menu-item>
                <el-menu-item index="/product-manage/productList">产品列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/performance">
                <template #title>
                    <el-icon>
                        <DataCenter></DataCenter>
                    </el-icon>
                    <span>数据中心</span>
                </template>
                <el-menu-item index="/performance/pageView">用户浏览</el-menu-item>
                <el-menu-item index="/performance/jsError">页面性能</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script setup lang="ts">

/**
 * 1.折叠功能
 * 2.菜单跳转
 *   - 设置菜单router为true 把菜单的index当作path跳转
 * 3.默认高亮
 * 4.优化滚动条
 *    - App.vue 中设置滚动条样式
 */
import type {Directive, ObjectDirective} from 'vue'
import { useRoute } from 'vue-router';
import { useIndexStore } from '../../stores/store'
const store = useIndexStore()
const route = useRoute()
//不需要这么麻烦
/* const currentIndex=ref(localStorage.getItem('currentIndex') ?? '/index')
const onSelect=(e:string)=>{
    currentIndex.value=e
    localStorage.setItem('currentIndex',currentIndex.value)
} */

//直接通过route拿到当前的fullPath

const vAdmin:ObjectDirective={
    mounted(el:HTMLElement){
        if(store.user.role!==1){
            el.parentNode?.removeChild(el)
        }
    }
}
</script>

<style scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}

.el-aside{
    height: 100vh;
    overflow: auto;
}
</style>