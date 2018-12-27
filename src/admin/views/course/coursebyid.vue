<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <breadcrumb v-bind:paths="paths" :name="name"></breadcrumb>
      </div>
    </div>
    <div class="row msg">
      <div class="col">
        <h5>添加小节</h5>
        <el-button-group>
          <el-button type="primary" @click="showdialo()">添加小节</el-button>
          <el-button type="primary" @click="dialog2 = true">添加教师资料</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="row" v-loading="loading">
      <div class="col" style="min-height:400px;" v-if="datas">
        <div class="card mb-3 text-white">
          <img class="card-img-top" :src="datas.Course.banner" alt="Card image cap">
          <div class="card-img-overlay bg-0">
            <div class="card-header">
              <h3 class="text-center" v-text="datas.Course.name"></h3>
            </div>
            <div class="card-body">
              <table class="table table-bordered">
                <thead class>
                  <tr class="bg-x">
                    <th colspan="2" scope="col">基本信息</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <span>ID:</span>
                      <span v-text="datas.Course.ID"></span>
                    </th>
                    <td>
                      <span>名称:</span>
                      <span v-text="datas.Course.name"></span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span>价格:</span>
                      <span v-text="datas.Course.coursePrize"></span>
                    </th>
                    <td>
                      <span>类型:</span>
                      <span v-text="datas.Course.courseType"></span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span>硬件环境:</span>
                      <span v-text="datas.Course.environment"></span>
                    </th>
                    <td>
                      <span>难度:</span>
                      <span v-text="datas.Course.difficulty"></span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span>介绍:</span>
                      <span v-text="datas.Course.info"></span>
                    </th>
                    <td>
                      <span>简介:</span>
                      <span v-text="datas.Course.introduction"></span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span>level:</span>
                      <span v-text="datas.Course.level"></span>
                    </th>
                    <td>
                      <span>排序:</span>
                      <span v-text="datas.Course.paixu"></span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span>createTime:</span>
                      <span v-text="datas.Course.createTime"></span>
                    </th>
                    <td>
                      <span>updateTime:</span>
                      <span v-text="datas.Course.updateTime"></span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="table-responsive-sm">
                <table class="table table-bordered">
                  <thead class>
                    <tr class="bg-x">
                      <th colspan="8" scope="col">课程小节</th>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th scope="row">ID</th>
                      <td>名称</td>
                      <th scope="row">videoId</th>
                      <td>CreateTime</td>
                      <th scope="row">UpdateTime</th>
                      <td>查看</td>
                      <td>删除</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v,i) in datas.Lession" :key="i">
                      <th scope="row" v-text="v.num"></th>
                      <td v-text="v.ID"></td>
                      <th scope="row" v-text="v.name"></th>
                      <th scope="row" v-text="v.videoId"></th>
                      <td v-text="v.lessionCreateTime"></td>
                      <th scope="row" v-text="v.lessionUpdateTime"></th>
                      <td>
                        <router-link
                          :to="{ name: 'lessionByid', params:{lid: v.ID}, query:{name: datas.Course.name, id: datas.Course.ID} }"
                        >查看</router-link>
                      </td>
                      <td>
                        <el-button
                          type="danger"
                          @click="delvideo({lid: v.ID})"
                          icon="el-icon-delete"
                          circle
                        ></el-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <table class="table table-bordered">
                <thead>
                  <tr class="bg-x">
                    <th colspan="5" scope="col">老师资料</th>
                  </tr>
                  <tr>
                    <th scope="row">ID</th>
                    <td>名称</td>
                    <td>CreateTime</td>
                    <th scope="row">UpdateTime</th>
                    <td>删除</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, i) in tracherfiles" :key="i">
                    <td v-text="v.id"></td>
                    <th scope="row">
                      <a
                        :href="v.fileurl"
                        v-text="v.info?v.info.name: 0"
                        target="view_window"
                      ></a>
                    </th>
                    <td v-text="v.createtime"></td>
                    <th scope="row" v-text="v.updatetime"></th>
                    <td>
                      <el-button
                        type="danger"
                        @click="delteacherfile({fid: v.id})"
                        icon="el-icon-delete"
                        circle
                      ></el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="添加小节" :visible.sync="dialogFormVisible">
        <addlession v-bind="{course: datas,dialog:dialog, start: start}"></addlession>
      </el-dialog>
      <el-dialog title="添加老师课件" :visible.sync="dialog2" width="480px">
        <el-form :model="tracherfilesfrom">
          <el-form-item label="课件名称">
            <el-input v-model="tracherfilesfrom.info.name"></el-input>
          </el-form-item>
          <el-form-item label="课件类型">
            <el-select v-model="tracherfilesfrom.info.type" placeholder="请选择">
            <el-option
              v-for="item in tracherfilesfromtype"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="选取课件">
            <button
              type="button"
              @click="innerVisible = true"
              class="btn btn-info el-form-item__label text-white"
              style="width:80px"
            >选取课件</button>
            <el-input :value="tracherfilesfrom.fileurl" disabled></el-input>
          </el-form-item>
          <el-dialog width="80%" title="选取图片" :visible.sync="innerVisible" append-to-body>
            <ossImglist v-bind:selected="selected"></ossImglist>
          </el-dialog>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog2 = false">取 消</el-button>
          <el-button type="primary" @click="addfile1">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  asyncgetCourseAndLessionsByCourseID,
  asyncdeleteLession,
  asyncselectCoursefile,
  asyncdeleteCoursefile,
  asyncuploadCoursefile
} from "../../../plugins/api.js";
import breadcrumb from "@/components/breadcrumb.vue";
import addlession from "./addlession.vue";
import ossImglist from "@/components/newpublic/oss.vue";
export default {
  name: "coursebyid",
  data() {
    return {
      tracherfilesfromtype: [
        {
          value: 0,
          label: 'ppt',
        },
        {
          value: 1,
          label: '程序'
        }
      ],
      i: "/addcourseware/" + this.$attrs.courseId,
      paths: [
        {
          name: "查看课程",
          path: "/watchcourse"
        }
      ],
      name: "",
      dialog2: false,
      datas: {
        Course: {},
        Lession: []
      },
      loading: true,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      innerVisible: false,
      tracherfiles: [],
      tracherfilesfrom: {
        info: {
          name: "",
          type: 0
        },
        fileurl: "",
        courseid: this.$attrs.courseId,
        uploaduserid: ""
      }
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
      let id = this.$attrs.courseId;
      try {
        this.datas = await asyncgetCourseAndLessionsByCourseID({
          cid: id
        });
        this.tracherfiles = await asyncselectCoursefile({
          cid: id
        });

        this.name = this.datas.Course.name;
        this.loading = false;
      } catch (err) {
        this.$message({
          type: "error",
          message: `${err}`
        });
        this.$router.push("/watchcourse");
      }
    },
    dialog() {
      this.dialogFormVisible = false;
    },
    showdialo() {
      this.dialogFormVisible = true;
    },
    showdialo2() {},
    async delvideo(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        try {
          await asyncdeleteLession(data);
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
    },
    async delteacherfile(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        try {
          await asyncdeleteCoursefile(data);
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
    },
    async addfile1() {
      if (!this.tracherfilesfrom.info.name) {
        this.$alert("请填写名称");
        return;
      }
      if (!this.tracherfilesfrom.fileurl) {
        this.$alert("请选择文件");
        return;
      }
      try {
        let id = this.$attrs.courseId;
        let data = JSON.parse(JSON.stringify(this.tracherfilesfrom));
        data.uploaduserid = this.$store.state.user.userid;
        await asyncuploadCoursefile(data);
        this.$message("添加成功");
        this.tracherfilesfrom = {
          info: {
            name: "",
            type: 0,
          },
          fileurl: "",
          courseid: this.$attrs.courseId,
          uploaduserid: ""
        };
        this.tracherfiles = await asyncselectCoursefile({
          cid: id
        });
      } catch (err) {
        this.$alert(err);
      }
      this.dialog2 = false;
    },
    selected(url) {
      this.tracherfilesfrom.fileurl = url;
      this.innerVisible = false;
    }
  },
  components: {
    breadcrumb,
    addlession,
    ossImglist
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