<template>
    <div class="container-fluid" >
        <div class="row" >
            <breadcrumb v-bind:paths="paths" :name="name" ></breadcrumb>
        </div>
        <div class="row" >
            <div class="col" v-if="packages" >
                <table class="table table-bordered">
                <tbody>
                    <tr class="thead-light" >
                    <th colspan="2">基本信息</th>
                    </tr>
                    <tr>
                    <td >
                        <span>ID:</span> &nbsp; <span v-text="packages.ID" ></span>
                    </td>
                    <td>
                        <span>名称:</span> &nbsp; <span v-text="packages.packegeName" ></span>
                    </td>
                    </tr>
                    <tr>
                    <td >
                        <span>介绍:</span> &nbsp; <span v-text="packages.packegeInfo" ></span>
                    </td>
                    <td>
                        <span>价格:</span> &nbsp; <span v-text="packages.prize" ></span>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        <div class="row msg" >
            <div class="col" >
                <el-button type="primary" @click="dialogFormVisible = true" plain>添加/移除课程</el-button>
            </div>
        </div>
        <el-dialog title="添加课程" center :visible.sync="dialogFormVisible">
            <el-row class="msg" >
            <el-transfer filterable :render-content="renderFunc"    v-model="value1" :data="allcourse" :button-texts="['移除', '添加']" :titles="['未选择的', '已选择的']"   >
                <span slot-scope="{ option }">{{ option.label }}</span>
            </el-transfer>
            </el-row>
            <el-row>
            </el-row>
        <div slot="footer" class="dialog-footer text-right">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
        </el-dialog>

        <div class="row" >
            <div class="col" v-if="course" >
            <el-table :data="course" border style="width: 100%" max-height="500">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column fixed prop="ID" label="ID" width="150">
            </el-table-column>
            <el-table-column fixed prop="name" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="coursePrize" label="价格" width="120">
            </el-table-column>
            <el-table-column prop="introduction" label="简介" width="120">
            </el-table-column>
            <el-table-column prop="courseType" label="类型" width="150">
            </el-table-column>
            <el-table-column prop="level" label="level" width="120">
            </el-table-column>
            <el-table-column prop="info" label="介绍" width="400">
            </el-table-column>
            <el-table-column prop="difficulty" label="星级" width="120"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="150">
                <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px" v-text="scope.row.createTime"></span>
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间" width="150">
                <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px" v-text="scope.row.updateTime"></span>
                </template>
            </el-table-column>
            </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import {
  asyncgetCourseByPackegeID,
  asyncaddPackege,
  getallcourse,
  asyncdeletePackegeByID
} from "../../../plugins/api.js";
import breadcrumb from "@/components/breadcrumb.vue";
import _ from "underscore";
export default {
  data() {
    return {
      paths:[
        {
          name: '查看课程包',
          path: '/watchpackage'
        }
      ],
      name: "",
      packages: null,
      course: null,
      dialogFormVisible: false,
      allcourse: [],
      value1: [],
      renderFunc(h, option) {
        return <span>{option.label}</span>;
      },
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
    };
  },
  watch: {
    $route() {
      this.start();
    }
  },
  mounted() {
    this.start();
  },
  methods: {
    async start() {
      let id = this.$attrs.packageId;
      this.packages = this.$route.query;
      if (this.packages.ID) {
        this.name = this.packages.packegeName
        try {
          this.course = await asyncgetCourseByPackegeID({ pid: id });
          
          for (let v of this.course) {
            this.value1.push(v.ID);
          }
        } catch (err) {
          console.log(err)
        }
        let data = await getallcourse();
        this.allcourse = []
        for (let v of data) {
          this.allcourse.push({
            key: v.ID,
            label: v.name
          });
        }
      } else {
        this.$route.push("/watchpackage");
      }
    },
    async onSubmit() {
      let a = [];
      let id = this.$attrs.packageId;
      
      for (let v in this.course) {
        a.push(this.course[v].ID);
      }

      let d = _.difference(a, this.value1);
      let t = _.difference(this.value1, a);
      let allP = [];

      if (d.length) {
        for (let v in d) {
          allP.push(asyncdeletePackegeByID({ course_ID: d[v], key_ID: id }));
        }
      }
      if (t.length) {
        for (let v in t) {
          allP.push(asyncaddPackege({ course_ID: t[v], key_ID: id }));
        }
      }
      if (allP.length) {
        Promise.race(allP)
          .then(() => {
            this.$message({
              message: "恭喜你，修改成功",
              type: "success"
            });
            this.dialogFormVisible = false;
            this.start();
          })
          .catch(() => {
            this.start();
            this.$message.error("错了哦，修改失败");
          });
      } else {
        this.dialogFormVisible = false;
      }
    }
  },
  components: {
    breadcrumb
  }
};
</script>

<style scoped>
</style>
