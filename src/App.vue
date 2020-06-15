<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}

</script>

<style>
/* 在style引用css,要用@ */
  @import url('./assets/css/base.css');
</style>
