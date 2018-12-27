<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "app",
  data() {
    // 全局ajax拦截 去除空值 防止java报错。。。
    $(document).ajaxSend((e, x, o) => {
      if (o.data) {
        let data = o.data.split("&");
        let str = "";
        data.forEach(element => {
          let v = element.split("=");
          if (v[1]) {
            str += `${v[0]}=${v[1]}&`;
          }
        });
        str = str.substring(0, str.length - 1);
        o.data = str;
      }
    });
    return {
      xx: "screen-xxl"
    };
  }
};
</script>


<style>
html,
body,
#app {
  height: 100%;
}
.screen-xxl,
.screen-xx {
  position: relative;
}
.msg {
  margin-bottom: 25px;
}
.pull-left {
  float: left !important;
}
.pull-right {
  float: right !important;
}
.clearfix {
  clear: both;
}

</style>

