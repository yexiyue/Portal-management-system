<template>
    <el-page-header icon="" title="数据中心">
        <template #content>
            <span class="text-large font-600 mr-3">页面性能</span>
        </template>
    </el-page-header>
    <Suspense>
        <my-echarts :options="options4" height="300px"></my-echarts>
    </Suspense>
    <Suspense>
        <my-echarts :options="options5" height="300px"></my-echarts>
    </Suspense>
    <Suspense>
        <my-echarts :options="options6" height="300px"></my-echarts>
    </Suspense>
    <Suspense>
        <my-echarts :options="options7" height="300px"></my-echarts>
    </Suspense>
    <Suspense>
        <my-echarts :options="options8" height="300px"></my-echarts>
    </Suspense>
    <el-backtop :right="100" :bottom="100" />
</template>

<script setup lang="ts">
import { getOptions } from './echartsOptions/04-PerformanceTarget';
import MyEcharts from '@/components/echarts/MyEcharts.vue';

const { options4, options5, options6, options7, options8 } = await getOptions()

</script>

<style scoped></style>