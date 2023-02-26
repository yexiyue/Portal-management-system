<template>
    <div class="common-layout">
        <!-- 主侧可复用 -->
        <el-container>
            <Aside/>
            <el-container direction="vertical">
                <TopHeader></TopHeader>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import TopHeader from '@/components/mainBox/TopHeader.vue';
import Aside from '../components/mainBox/SideMenu.vue'

</script>

<style scoped></style>