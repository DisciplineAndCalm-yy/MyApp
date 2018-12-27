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
    this.data1 = true;
    $(document).ajaxComplete((e, h) => {
      let msg;
      if (h.responseJSON) {
        msg = h.responseJSON.msg;
      } else {
        msg = JSON.parse(h.responseText).msg;
      }
      try {
        if (msg == "offline") {
          this.data1 = false;
          this.$message.error("登录已失效重新登录");
          this.$router.push("/login");
        }
      } catch (err) {
        console.log(err);
      }
    });
    return {
      data1: true
    };
  },
  mounted() {
    console.log(this);
  }
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
}
a:hover {
  text-decoration: none;
}

#headers {
  padding-left: 0;
  padding-right: 0;
}
html,
body,
#app {
  height: 100%;
}
.tk-main {
  -moz-box-shadow: 5px 5px 5px #eee inset; /* For Firefox3.6+ */
  -webkit-box-shadow: 5px 5px 5px #eee inset; /* For Chrome5+, Safari5+ */
  box-shadow: 5px 5px 5px #eee inset; /* For Latest Opera */
}
@font-face {
  font-family: "iconfont"; /* project id 785409 */
  src: url("//at.alicdn.com/t/font_785409_pfdyv82swo.eot");
  src: url("//at.alicdn.com/t/font_785409_pfdyv82swo.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_785409_pfdyv82swo.woff") format("woff"),
    url("//at.alicdn.com/t/font_785409_pfdyv82swo.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_785409_pfdyv82swo.svg#iconfont") format("svg");
}

.el-tabs__nav-wrap {
  width: 345px;
  margin: 0 auto;
}
.el-tabs__header {
  box-shadow: 0 8px 16px 0 rgba(28, 31, 33, 0.1);
}
.mga {
  margin-bottom: 25px;
}
#sidebar .el-submenu__title span {
  color: #ffffff;
}
#sidebar .el-submenu__title:hover {
  background-color: rgba(25, 27, 47, 0.7);
  color: #ffffff;
}
#sidebar .el-submenu__title:focus {
  background-color: rgba(25, 27, 47, 0.7);
  color: #ffffff;
}
#sectionPosition {
  z-index: 2490;
  position: absolute;
  height: 100%;
  display: none;
  width: 100%;
}
#sectionPosition main {
  height: 100%;
}
#sectionPosition footer {
  height: 65px;
}
/*视频播放按钮*/
#player-con {
  position: relative;
}
#player-con .prism-big-play-btn{
  width:172px;
  height:53.5%;
  margin-left: 42%;
  filter:alpha(opacity=80);-moz-opacity:0.8;opacity:0.80;
  background:url(../../public/public/guanwang/home/video.png) no-repeat;
}
.prism-player .prism-big-play-btn .outter{
  width: 180px;
  height: 50%;
  display: none;
}
.prism-cover,
.prism-auto-stream-selector{
  width: 0;
  height: 0;
  margin-top: -50px;
} 
.prism-controlbar{
  display:none;
}
</style>