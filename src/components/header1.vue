<template>
<b-navbar toggleable="md" type="info">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand class="brand">
    <router-link :to="{name:'myclass'}"><img width="115" src="/public/guanwang/home/home_icon_logo.png" alt="BV"></router-link>
  </b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav>
      <img src="/public/guanwang/home/line.png" alt="FG" class="rule">
      <span class="nav-link" v-text="title()"></span>
    </b-navbar-nav>
    <!-- Right aligned nav items -->
    <b-navbar-nav v-if="user" class="ml-auto gauge">
          <router-link class="chead" :to="{name:'secure'}"><img :src="user.headimg" width="30" height="30" class="rounded-circle" alt="BV"></router-link> 
          <div slot="content">
            <router-link class="chead same" :to="{name:'secure'}" v-text="user.username"></router-link> &nbsp; &nbsp; 
            <router-link class="chead same" :to="{name:'messages'}">
              消息
              <!-- <el-badge :value="12" class="item">
                <el-button size="small">消息</el-button>
              </el-badge> -->
            </router-link> &nbsp; &nbsp; 
            <router-link :to="{name:'logout'}"  class="chead same">退出</router-link>
          </div>
          <!-- <el-tooltip id="a6"    placement="bottom" effect="light">
            <div slot="content">账号：<span v-text="username()"></span> &nbsp; &nbsp; &nbsp; &nbsp; <span @click="logout()" class="chead" >退出</span> </div>
          <router-link class="chead" :to="{name:'secure'}" v-text="username()" ></router-link>
        </el-tooltip> -->
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
    
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: mapState(["user"]),
  methods: {
    ...mapGetters(["ktAll"]),
    title() {
      let name = this.$route.name;
      let title1;
      if (name === "allclass") {
        title1 = "全部课程";
      } else if (name === "secure") {
        title1 = "用户";
      } else if (name === "myclass") {
        title1 = "我的课堂";
      } else if (name === "forum") {
        title1 = "论坛";
      } else if (name === "course") {
        let id = this.$route.params.ktId;
        for (let v of this.ktAll()) {
          if (v.ID === id) {
            title1 = v.name;
          }
        }
      } else if (name === "sections") {
        let id = this.$route.params.cid;
        for (let v of this.ktAll()) {
          if (v.ID === id) {
            title1 = v.name;
          }
        }
      }

      return title1;
    },
    logout() {
      this.$router.push("/logout");
    }
  }
};
</script>

<style scoped>
.brand {
  padding-left: 3em;
  text-align: center;
  border-color: -webkit-linear-gradient(
    #ffffff,
    #000000,
    #ffffff
  ); 
  border-color: -o-linear-gradient(
    #ffffff,
    #000000,
    #ffffff
  ); 
  border-color: -moz-linear-gradient(#ffffff, #000000, #ffffff);
  border-color: linear-gradient(#ffffff, #000000, #ffffff); /* 标准的语法 */
}
.rounded-circle {
  margin-right: 15px;
}
.title1 {
  font-size: 24px;
  color: #1c262f;
  font-family: MicrosoftYaHei;
  letter-spacing: 2px;
  font-weight: normal;
  font-stretch: normal;
}
/*以下改动*/
.nav-link {
  height: 40px;
  text-align: right;
  line-height: 22px;
  margin-left: 45px;
  color: #1c262f;
  font-size:18px;
  font-family: MicrosoftYaHei;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 2px;
}
.gauge{
  margin-right:39px;
}
.same{
 line-height:29px;
}
.rule{
  margin-left:50px;
}
</style>
