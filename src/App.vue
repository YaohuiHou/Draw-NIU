<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
    #app{
        height: 100%;
        position: relative;
        background: url("https://s.kcimg.cn/wap/images/game/20170601/bg.jpg") no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
    }
    @import "./assets/toast.less";
</style>
