<template>
    <nav id="headerCourse" class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
  <b class="navbar-brand" v-text="$attrs.courses.name" ></b>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ">
      <li class="nav-item" :class="active('first')" >
        <b class="nav-link" @click="$attrs.changeAction('first')" > 课程概述<span class="sr-only">(current)</span></b>
      </li>
      <li class="nav-item" :class="active('second')">
        <b class="nav-link" @click="$attrs.changeAction('second')">课程目录</b>
      </li>
      <li class="nav-item" :class="active('third')">
        <b class="nav-link" @click="$attrs.changeAction('third')">观看指南</b>
      </li>
      <li class="nav-item" :class="active('fourth')">
        <b class="nav-link" @click="$attrs.changeAction('fourth')">环境指数</b>
      </li>
    </ul>
    <form class="form-inline">
    <h4 class="text-success nav-link" >￥<b v-text="$attrs.courses.price"> </b></h4>
    &nbsp;
    <span class="btn btn-outline-success my-2 my-sm-0" type="button">立即购买</span>
  </form>
  </div>
</nav>
</template>

<script>
export default {
  methods: {
    active(name) {
      if (name == this.$attrs.activeName) {
        return "active";
      }
    }
  }
};
</script>

<style scoped>
.navbar-nav {
  margin: 0 auto;
}
#headerCourse {
  padding-top: 4px;
  padding-bottom: 4px;
  -webkit-transition: margin 0.3s ease-in-out;
  -moz-transition: margin 0.3s ease-in-out;
  transition: margin 0.3s ease-in-out;
}
.nav-link {
  cursor: pointer;
}
</style>
