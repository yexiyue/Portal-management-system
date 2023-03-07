<template>
    <el-card>
        <div ref="dom" :style="{
            width,height
        }"></div>
    </el-card>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import * as  ECharts from 'echarts'
import theme from './theme.json'
const dom = ref()
const props=withDefaults(defineProps<{
    options:ECharts.EChartsOption,
    width:string,
    height:string
}>(),{
    width:'100%',
    height:'300px'
})

onMounted(async () => {
    const myECharts = ECharts.init(dom.value,theme)
    myECharts.setOption(props.options)
    window.addEventListener('resize', () => {
        myECharts.resize()
    })
})
</script>

<style scoped>
.el-card{
    margin: 20px 0;
}
</style>