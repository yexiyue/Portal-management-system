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
  display: none;
}

</style>