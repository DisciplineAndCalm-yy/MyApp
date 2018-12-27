<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <breadcrumb v-bind:paths="paths" :name="name"></breadcrumb>
      </div>
    </div>
    <div class="row" v-loading="loading">
      <div class="col" >
          <el-table class="text-center"  :data="tableData" border :height="500" style="width: 100%">
      <el-table-column  prop="id" sortable label="权限ID" width="150">
      </el-table-column>
      <el-table-column  prop="route" label="权限名称" width="200">
      </el-table-column>
      <el-table-column prop="info" label="权限方法" >
      </el-table-column>
    </el-table>
    </div>

    </div>
  </div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "gobalbuyer",
  data() {
    return {
      paths: [],
      name: "查看权限",
      loading: true,
      tableData: []
    };
  },
  watch: {
    $toute() {
      this.start();
    }
  },
  mounted() {
    this.start();
  },
  computed: mapGetters(['auth']),
  methods: {
    ...mapActions(["asyncauth"]),
    async start() {
      this.loading = true;
      try {
        if (!this.auth.lenght) {
          await this.asyncauth();
          this.loading = false;
        }
        this.tableData = this.auth;
      } catch (err) {
        this.$message({
          type: "error",
          message: `${err}`
        });
      }
    }
  },
  components: {
    breadcrumb
  }
};
</script>

<style scoped>
.bg-0 {
  background-color: rgba(0, 0, 0, 0.8);
  overflow-y: scroll;
}

.bg-x {
  background-color: rgba(221, 221, 221, 0.3);
}

.card-img-top {
  min-height: 500px;
}
</style>