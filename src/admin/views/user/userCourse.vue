<template>
  <div class="container-fluid">
    <div class="row">
      <el-button @click="dialogVisible = true">添加课程</el-button>
    </div>
    <div class="row" v-if="ktAll.length">
      <el-table :data="ktAll"  border style="width: 100%" max-height="550" :row-style="tableRowClassName">
        <el-table-column  prop="ID" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="name" label="名称" >
          <template slot-scope="scope">
            <router-link :to="{name:'coursebyid', params: { courseId: scope.row.ID }}"  v-text="scope.row.name" ></router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible"  width="700px">
      <el-transfer v-model="selectdata" :data="ktAll" :props="{ key: 'ID', label: 'name'}" v-loading='loading'  ></el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addcourse">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  asyncaddUsercouser,
  asyncselectUsercourse,
  asyncdeleteUsercourse
} from "../../../plugins/api.js";
import _ from "underscore";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      selectdata: [],
      volue: [],
      dialogVisible: false,
      addfrom: {
        cid: null
      },
      loading: false
    };
  },
  computed: mapGetters(["ktAll"]),
  props: ["user"],
  async mounted() {
    this.selectCourse();
    this.start();
  },
  methods: {
    ...mapActions(['selectCourse']),
    async start() {
      try {
        this.tableData = []
        this.selectdata = []
        let data = await asyncselectUsercourse({
          uid: this.user.userid
        });
        for (let v of data) {
          this.tableData.push(v.course_ID);
          this.selectdata.push(v.course_ID)
        }
        this.volue = JSON.parse(JSON.stringify(data))
      } catch (err) {
        console.log(err);
      }
    },
    tableRowClassName({ row }) {
      if (_.indexOf(this.tableData, row.ID) == -1) {
        return "display: none";
      } else {
        return "";
      }
    },
    show1(id) {
      if (_.indexOf(this.tableData, id) == -1) {
        return true;
      } else {
        return false;
      }
    },
    async addcourse() {
      try {
        this.loading = true
        let d = _.difference(this.tableData, this.selectdata);
        let a = _.difference(this.selectdata, this.tableData);
        console.log(this.volue)
        for(let v of this.volue) {
          if(_.indexOf(d, v.course_ID) != -1) {
            await asyncdeleteUsercourse({id:v.ID})
          }
        }
        for(let v of a) {
          await asyncaddUsercouser({
            uid: this.user.userid,
            cid: v
          })
        }
        this.start();
        this.dialogVisible = false
        this.loading = false
      } catch (err) {
        console.log(err);
        this.$alert(err)
        this.loading = false
      }
    },
    async deldata(id) {
      this.$confirm("取消此课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await asyncdeleteUsercourse(id);
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
    }
  }
};
</script>

<style scoped>
</style>