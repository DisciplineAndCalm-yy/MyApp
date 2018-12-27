<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <breadcrumb v-bind:paths="paths" :name="name" ></breadcrumb>
            </div>
        </div>
        <div class="row msg" >
          <div class="col" >
                    <el-button-group>
            <el-button type="primary" @click="showdialo()" icon="el-icon-edit">添加课程包</el-button>
        </el-button-group>
          </div>
        </div>
    <div class="row" >
      <div class="col" >
                <el-table :data="tableData" border style="width: 100%" max-height="550">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column fixed prop="ID" sortable label="ID" width="50">
            </el-table-column>
            <el-table-column fixed prop="packegeName" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="prize" label="价格" width="50">
            </el-table-column>
            <el-table-column prop="packegeInfo" label="简介" >
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <router-link :to="{ name:'packageCourse', params: { packageId: scope.row.ID },query: scope.row }" class=" btn btn-sm btn-info"  type="text" size="small">查看</router-link>
                    &nbsp;
                    <el-button @click="upcourseshow(scope.$index)" type="warning" class="el-icon-edit-outline" title="编辑" size="small"></el-button>
                    <el-button @click="deldata({ID:scope.row.ID})" icon="el-icon-delete" type="danger" title="删除" size="small"></el-button>
                </template>
            </el-table-column>
        </el-table>
      </div>
    </div>

        <el-dialog title="修改课程包" :visible.sync="dialogupdata">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="课程包名称">
                    <el-input v-model="form.packegeName"></el-input>
                </el-form-item>
                <el-form-item label="课程包价格">
                    <el-input-number v-model="form.prize" :precision="2" :step="0.01"></el-input-number>
                </el-form-item>
                <el-form-item label="课程简介">
                    <el-input type="textarea" v-model="form.packegeInfo"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogupdata = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加课程" :visible.sync="dialogFormVisible">
            <addpackage v-bind:dialog="dialog" v-bind:start="start"></addpackage>
        </el-dialog>

    </div>

</template>

<script>
import {
  asyncgetAllPackege,
  asyncupdatePackegeKey,
  asyncdeletePackegeKeyByID
} from "../../../plugins/api.js";
import addpackage from "./addpackage.vue";
import breadcrumb from "@/components/breadcrumb.vue"
export default {
  name: "watchpackage",
  data() {
    return {
      paths: [],
      name: '查看课程包',
      num1: 0,
      dialogFormVisible: false,
      dialogupdata: false,
      formLabelWidth: "120px",
      tableData: [
        {
          ID: 3,
          packegeInfo: "所有课程",
          packegeName: "课程包",
          prize: 0.1
        }
      ],
      upc: 0,
      form: {
        ID: "",
        packegeInfo: "",
        packegeName: "",
        prize: 0.1
      }
    };
  },
  async mounted() {
    this.start();
  },
  methods: {
    async start() {
      this.tableData = await asyncgetAllPackege();
    },
    showdialo() {
      this.dialogFormVisible = true;
    },
    couserindex() {
      return this.tableData[this.upc];
    },
    dialog() {
      this.dialogFormVisible = false;
    },
    async onSubmit() {
      try {
        await asyncupdatePackegeKey(this.form);
        this.start();
        this.$message({
          message: "恭喜你，添加成功",
          type: "success"
        });
        this.dialogupdata = false;
      } catch (err) {
        this.$message.error("错了哦，添加失败:" + err);
      }
    },
    async deldata(i) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await asyncdeletePackegeKeyByID(i);
            this.start();
            this.$message({
              message: "恭喜你，删除成功",
              type: "success"
            });
          } catch (err) {
            this.$message.error("错了哦，删除失败:" + err);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addpackage() {
      this.form.packegeid.push({
        packegeid: "",
        packege_count: 1
      });
    },
    delpackage(i) {
      this.form.packegeid.splice(i, 1);
    },
    upcourseshow(i) {
      this.form = this.tableData[i];
      this.dialogupdata = true;
    }
  },
  components: {
    addpackage,
    breadcrumb
  }
};
</script>

<style scoped>
</style>