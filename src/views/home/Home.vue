<template>
    <el-page-header icon="" title="企业门户管理系统">
        <template #content>
            <span class="text-large font-600 mr-3">首页</span>
        </template>
    </el-page-header>

    <el-card class="box-card">
        <el-row>
            <el-col :span="4">
                <!-- 头像组件 -->
                <el-avatar :size="100" :src="store.user.avatar ?? 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'" >
                </el-avatar>
            </el-col>
            <el-col :span="20" class="right-content">
                <h3>欢迎{{ store.user.username }}回来</h3>
                <p>{{ welcomeText }}</p>
            </el-col>
        </el-row>
    </el-card>

    <!-- 公司产品轮播图 -->
    <el-card class="box-card">
        <template #header>
            公司产品
        </template>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in data" :key="item.id">
                <div :style="{backgroundImage:`url(${item.cover})`,backgroundSize:'cover'}">
                    <h3 text="2xl" justify="center">{{ item.title }}</h3>
                </div>
            </el-carousel-item>
        </el-carousel>
    </el-card>
</template>

<script setup lang="ts">
import { type Product, getProduct } from '@/api';
import { useIndexStore } from '@/stores/store';
import { computed, onMounted, ref } from 'vue';


const store=useIndexStore()

const welcomeText=computed(()=>{
    const data=new Date()
    return data.getHours()<12?'要开心每一天哟~':'工作幸苦了,喝杯咖啡提提神吧！'
})

const data = ref<Product[]>([])

onMounted(async () => {
    data.value = (await getProduct()).data
    console.log(data.value)
})
</script>

<style scoped>
.box-card {
    margin-top: 50px;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}
/* 
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
} */

.right-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
</style>