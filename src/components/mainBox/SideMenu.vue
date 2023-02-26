<template>
    <el-aside width="200px">
        <el-menu default-active="1" class="el-menu-vertical-demo">
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

            <el-sub-menu index="/user-manage">
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

            <el-menu-item index="/center">
                <el-icon>
                    <DataCenter></DataCenter>
                </el-icon>
                <span>数据中心</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script setup lang="ts">

</script>

<style scoped>
.el-aside {
    height: 100vh;
}
</style>