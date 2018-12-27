<template>
  <el-container id="main" >
      <leftVue :mode="mode"></leftVue>
    <el-container>
    <el-main class="admin-main" >
        <router-view></router-view>
    </el-main>
  </el-container>
  </el-container>
</template>

<script>
import leftVue from "@/components/admin/left.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "admin",
  computed: mapGetters(["user", "auth", "role", "userauth", "ktAll"]),
  data() {
    return {
      mode: false
    };
  },
  async mounted() {
    this.start();
  },
  methods: {
    async start() {
      let sess = await this.session();
      if (!sess) {
        this.$router.push("/login");
      }
      // if (!this.auth.length) {
      //   await this.asyncauth();
      // }
      // if (!this.role.length) {
      //   await this.asyncrole();
      // }
      // if (!this.userauth.length) {
      //   await this.asyncuserauth({ uid: this.user.userid });
      // }
      if(!this.ktAll.length) {
        await this.selectCourse()
      }
    },
    ...mapActions(["session", "asyncauth", "asyncrole", "asyncuserauth", "selectCourse"])
  },
  components: {
    leftVue
  }
};
</script>

<style scoped>
#main {
  height: 100%;
}
.admin-main {
  -moz-box-shadow: 5px 5px 5px #eee inset; /* For Firefox3.6+ */
  -webkit-box-shadow: 5px 5px 5px #eee inset; /* For Chrome5+, Safari5+ */
  box-shadow: 5px 5px 5px #eee inset; /* For Latest Opera */
}
.el-header {
  background-color: RGB(71, 120, 199);
  color: #333;
  line-height: 60px;
}
</style>
