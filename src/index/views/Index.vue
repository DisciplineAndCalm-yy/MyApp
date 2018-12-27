<template>

    <el-container  style="height:100%">
        <el-header   id="headers" >
    <header1></header1>
  </el-header>
  <el-main id="el-main" style="height:100%" >
  <el-container style="height:100%">
        <lift1></lift1>
        <router-view></router-view>
  </el-container>
  </el-main>
    </el-container>
</template>

<script>
import lift1 from "@/components/left1.vue";
import header1 from "@/components/header1.vue"
import { mapActions } from "vuex";

export default {
  name: "myclass",
    async beforeMount() {
    let x;
    try {
      x = await this.session();
      if (!x) {
        this.$router.push("/login");
      }
    } catch (e) {
      console.log(e);
      this.$router.push("/login");
    }
  },
  methods: {
    ...mapActions(["session"])
  },
  components: {
    lift1,
    header1
  }
};
</script>
<style scoped>
#el-main {
  padding: 0;
}
</style>
