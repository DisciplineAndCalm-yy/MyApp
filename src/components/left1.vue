<template>
    <el-aside id="sidebar" :width="sidwidth">
        <el-container>
            <el-header class="kt-footer" height="168px">
                    <h6  id="sq"  @click="mode = !mode">
          <i :class="title" ></i>
      </h6>
        <el-menu id="el-menu"  :collapse="mode"  :default-active="key"  class="el-menu-vertical-demo"  :router=true  >

      <el-menu-item  route="/myclass" class="bg-panda" :class="textColor('myclass')" index="myclass">
        <i class="icon iconfont icon-homepage"></i>
        <span  slot="title">我的课堂</span>
      </el-menu-item>
      <el-menu-item  route="/allclass" class="bg-panda" :class="textColor('allclass')" index="allclass">
        <i class="icon iconfont icon-read"></i>
        <span  slot="title">全部课程</span>
      </el-menu-item>
      <el-menu-item  route="/forum" class="bg-panda" :class="textColor('forum')" index="forum">
        <i class="icon iconfont icon-icon_luntan-xian"></i>
        <span  slot="title">论坛</span>
      </el-menu-item>
      <el-menu-item  route="/feedback" class="bg-panda" :class="textColor('feedback')" index="feedback">
        <i class="icon iconfont icon-yijianfankui"></i>
        <span  slot="title">用户反馈</span>
      </el-menu-item>

    </el-menu>
    </el-header>
        </el-container>
    </el-aside>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "left1",
  data() {
    return {
      mode: false,
      sidwidth: "258px",
      title: "iconfont icon-menu",
      key: "myclass"
    };
  },
  watch: {
    mode(v) {
      if (v) {
        this.sidwidth = "64px";
        this.title = "iconfont icon-pause";
      } else {
        this.sidwidth = "258px";
        this.title = "iconfont icon-menu";
      }
    }
  },
  mounted() {
    if (window.innerWidth < 700) {
      this.mode = true;
    }
  },
  methods: {
    colors() {
      if (this.$route.params.leavl == 0) {
        return "color: RGB(2,101,172)";
      } else {
        return "color: #b2b4c4";
      }
    },
    textColor(val) {
      if (this.$route.name == val) {
        return "text-color";
      } else {
        return "text-color2";
      }
    },
    ...mapActions(["logout"])
  }
};
</script>

<style scoped>
#el-menu {
  /* border-color: #343a40; */
  background-color: #1c262f;
}
.icon {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
  display: inline-block;
}
._nav--bottom-link-container--BoYhW {
  position: relative;
  top: -4px;
}
.el-container {
  height: 100%;
}
#el-menu2 {
  /* border-color: #343a40; */
  background-color: #1c262f;
}

.kt-footer {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding-left: 0;
  padding-right: 0;
  /* background-color: #191b2e; */
  background-color: #1c262f;
  color: #b2b4c4;
}
.bg-panda {
  /* background-color: #191b2e; */
  background-color: #1c262f;
}
.kt-main {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 0;
}
#sidebar {
  overflow: hidden;
  background-color: #1c262f;
}
#sq {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
#sq i {
  display: block;
  text-align: center;
}

#sidebar .el-menu-item:hover {
  background-color: #1c262f;
  color: #ffffff;
}
#sidebar .el-menu-item:focus {
  background-color: #1c262f;
}
#sidebar .text-color2 {
  color: #b2b4c4;
}
.el-menu {
  border: none;
  margin-left: 50px;
}
.text-color {
  color: RGB(2, 101, 172);
}
</style>
