<template>
    <el-page-header icon="" title="数据中心">
        <template #content>
            <span class="text-large font-600 mr-3">用户浏览</span>
        </template>
    </el-page-header>
    <Suspense>
        <my-echarts :options="options"></my-echarts>
    </Suspense>
    <Suspense>
        <my-echarts :options="options1" height="300px"></my-echarts>
    </Suspense>
    <Suspense>
        <my-echarts :options="options2" height="300px"></my-echarts>
    </Suspense>
    <Suspense>
        <my-echarts :options="options3" height="300px"></my-echarts>
    </Suspense>
    <el-backtop :right="100" :bottom="100" />
</template>

<script setup lang="ts">
import MyEcharts from '@/components/echarts/MyEcharts.vue';
import { getOptions } from './echartsOptions/01-PageView'
import { getOptions2 } from './echartsOptions/02-NewsCount'
import { getOptions3 } from './echartsOptions/03-EveryPageView'

const options = await getOptions()
const { options1, options2 } = await getOptions2()

const { options3 } = await getOptions3()


</script>

<style scoped></style>