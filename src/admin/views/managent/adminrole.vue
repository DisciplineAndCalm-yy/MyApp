<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <breadcrumb v-bind:paths="paths" :name="name"></breadcrumb>
      </div>
    </div>
    <div class="row msg">
      <div class="col">
        <h5>添加角色</h5>
        <el-button-group>
          <el-button type="primary" @click="showdialo()"> 添加角色</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="row" v-loading="loading">
      <div class="col" >
          <el-table class="text-center"  :data="tableData" border :height="500" style="width: 100%">
      <el-table-column fixed prop="id" sortable label="角色ID" width="150">
      </el-table-column>
      <el-table-column fixed prop="name" label="角色名称" width="120">
      </el-table-column>
      <el-table-column prop="info" label="角色介绍" >
      </el-table-column>
      <el-table-column fixed="right"  label="操作" width="180">
        <template slot-scope="scope">
          <router-link :to="{ name:'userrole1', params: { id: scope.row.id } }" class=" btn btn-sm btn-info" size="small">查看</router-link>
          &nbsp;
          <el-button @click="updateuser(scope.$index)" type="warning" class="el-icon-edit-outline" size="small"></el-button>
          <el-button type="danger" @click="deldata({rid:scope.row.id})" icon="el-icon-delete" title="删除" size="small"></el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
      <el-dialog title="添加角色" width="600px" :visible.sync="dialogFormVisible">
            <el-form :model="form">
        <el-form-item label="名称" >
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="介绍" >
          <el-input v-model="form.info" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
      </el-dialog>
      <el-dialog title="修改角色" width="600px" :visible.sync="dialogFormVisible2">
            <el-form :model="form2">
        <el-form-item label="名称" >
          <el-input v-model="form2.name" ></el-input>
        </el-form-item>
        <el-form-item label="介绍" >
          <el-input v-model="form2.info" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="updaterole">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  asyncselectRole,
  asynccancelRole,
  asyncaddRole,
  asyncupdateRole
} from "../../../plugins/api.js";
import breadcrumb from "@/components/breadcrumb.vue";
export default {
  name: "adminrole",
  data() {
    return {
      paths: [
        {
          name: "角色管理",
          path: "/adminrole"
        }
      ],
      name: "角色管理",

      loading: true,
      tableData: [],
      form: {
        name: "",
        info: ""
      },
      form2: {},
      dialogFormVisible: false,
      dialogFormVisible2: false
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
  methods: {
    async start() {
      this.loading = true;
      try {
        this.tableData = await asyncselectRole();
        this.loading = false;
      } catch (err) {
        this.$message({
          type: "error",
          message: `${err}`
        });
      }
    },
    async addRole() {
      if (!this.form.name) {
        this.$notify.error({
          title: "错误",
          message: "请输入名称,名称不能为空!"
        });
        return;
      }
      try {
        await asyncaddRole(this.form);
        this.$notify({
          title: "成功",
          message: "添加成功！"
        });
        this.start();
        this.form.name = "";
        this.form.info = "";
      } catch (err) {
        this.$notify({
          title: "失败",
          message: "添加失败！"
        });
      }
      this.dialogFormVisible = false;
    },
    updateuser(i) {
      this.form2 = this.tableData[i]
      this.dialogFormVisible2 = true;
    },
    async updaterole() {
      if (!this.form2.name) {
        this.$notify.error({
          title: "错误",
          message: "请输入名称,名称不能为空!"
        });
        return;
      }
      try {
        await asyncupdateRole(this.form2);
        this.$notify({
          title: "成功",
          message: "添加成功！"
        });
        this.start();
      } catch (err) {
        this.$notify({
          title: "失败",
          message: "添加失败！"
        });
      }
      this.dialogFormVisible2 = false;
    },
    async deldata(data) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        try {
          await asynccancelRole(data);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.start();
        } catch (err) {
          this.$message({
            type: "error",
            message: `${err}`
          });
        }
      });
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