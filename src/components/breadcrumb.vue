<template>
<nav  aria-label="breadcrumb">
  <ol class="breadcrumb bg-white">
    <li class="breadcrumb-item"><router-link :to="{ path: '/admin' }">首页</router-link ></li>
    <li v-for="(v,i) in paths" :key="i"  class="breadcrumb-item"><router-link  :to="{path: v.path}" v-text="v.name" ></router-link ></li>
    <li class="breadcrumb-item active" aria-current="page" v-text="name" ></li>
  </ol>
</nav>
</template>

<script>
export default {
  props: ["name", "paths"]
};
</script>

<style scoped>
</style>
