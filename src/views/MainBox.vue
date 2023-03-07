<template>
    <div class="common-layout">
        <!-- 主侧可复用 -->
        <el-container>
            <Aside/>
            <el-container direction="vertical">
                <TopHeader></TopHeader>
                <el-main>
                    <Suspense>
                        <router-view></router-view>
                    </Suspense>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import TopHeader from '@/components/mainBox/TopHeader.vue';
import { onMounted, ref } from 'vue';
import Aside from '../components/mainBox/SideMenu.vue'
const height=ref('')
onMounted(()=>{
    height.value=window.innerHeight-60+'px'
    window.onresize=()=>{
        height.value=window.innerHeight-60+'px'
    }
})
</script>

<style scoped>
/* 使用v-bind绑定css变量动态设置高度 */
:deep(.el-main){
    height: v-bind(height);
}
</style>