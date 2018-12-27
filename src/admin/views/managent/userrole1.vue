<template>
<div class="container-fluid">
  <div class="row" >
     <breadcrumb v-bind:paths="paths" v-bind:name="name" ></breadcrumb>
  </div>
  <div class="row msg" >
    <div class="col-md-6" v-loading="auth.length == 0" >
      <h3>已经拥有权限</h3>
      <el-button-group>
  <el-button type="primary" @click="rmauth">移除<i class="el-icon-arrow-right el-icon--right"></i></el-button>
</el-button-group>
      <el-table class="text-center" @selection-change="handleSelectionChange1"  :data="tableData" border :height="500" >
        <el-table-column type="selection" @click="rmauth" width="55">
        </el-table-column>
        <el-table-column prop="id" sortable label="权限ID" width="150">
        </el-table-column>
        <el-table-column  prop="route" label="权限名称" width="200">
        </el-table-column>
        <el-table-column prop="info" label="权限方法" >
        </el-table-column>
      </el-table>
    </div>
        <div class="col-md-6" v-loading="auth.length == 0" >
          <h3>未拥有权限</h3>
          <el-button-group>
  <el-button type="primary" icon="el-icon-arrow-left" @click="addauth">添加</el-button>
</el-button-group>
      <el-table class="text-center" @selection-change="handleSelectionChange"  :data="nodata" border :height="500" >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" sortable label="权限ID" width="150">
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
import { mapGetters } from "vuex";
import {
  asyncgetRoleAuth,
  asyncaddRoleAuth,
  asyncdeleteRoleAuth
} from "../../../plugins/api.js";
import _ from "underscore";
export default {
  name: "userrole1",
  data() {
    return {
      paths: [
        {
          name: "角色管理",
          path: "/adminrole"
        }
      ],
      name: this.id,
      dialogFormVisible: false,
      user: null,
      activeName: "second",
      forms: null,
      tableData: [],
      nodata: [],
      addauthvalue: [],
      rmauthvaue: []
    };
  },
  props: ["id"],
  computed: mapGetters(["auth"]),
  watch: {
    auth() {
      this.start();
    }
  },
  async mounted() {
    this.start();
  },
  methods: {
    async start() {
      try {
        let arr = await asyncgetRoleAuth({ rid: this.id });
        for (let v of this.auth) {
          if (_.indexOf(arr, v.route) == -1) {
            this.tableData.push(v);
          } else {
            this.nodata.push(v);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async addauth() {
      if (this.addauthvalue.length) {
        for (let v of this.addauthvalue) {
         // await asyncaddRoleAuth({ rid: this.id, aid: v.id });
        }
        this.start();
      }
    },
    async rmauth() {
      if (this.rmauthvaue.length) {
        for (let v of this.rmauthvaue) {
         // await asyncdeleteRoleAuth({ rid: this.id, aid: v.id });
        }
        this.start();
      }
    },
    handleSelectionChange(v) {
      this.addauthvalue = v;
    },
    handleSelectionChange1(v) {
      this.rmauthvalue = v;
    }
  },
  components: {
    breadcrumb
  }
};
</script>

<style scoped>
</style>
