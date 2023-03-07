<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
:root,.main{
  width: 100vw;
  height: 100vh;
  user-select: none;
}

::-webkit-scrollbar{
  width: 5px;
  height: 5px;
}
//指示器颜色
::-webkit-scrollbar-thumb{
  background-color: #1296db;
}
//轨迹颜色
::-webkit-scrollbar-track{
  background-color: #ddd;
}
</style>