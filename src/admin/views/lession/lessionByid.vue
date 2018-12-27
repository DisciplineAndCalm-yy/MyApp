<template>
  <div class="container-fluid" >
    <div class="row" >
      <div class="col" >
        <breadcrumb v-bind:paths="paths" v-bind:name="name" ></breadcrumb>
      </div>
    </div>
    <div class="row msg">
      <div class="col-lg-6">
            <videovue v-bind="{lid, question, whites}"></videovue>
      </div>
      <div class="col-lg-6">
          <h3>视频编辑</h3>
          <el-tabs v-model="activeName">
            <el-tab-pane  label="视频问题添加" name="first">
            <videoQuestionvue v-bind="{showdialo, question, deldata, updaleByid, name: 'dialogFormVisible'}"></videoQuestionvue>
            </el-tab-pane>
            <el-tab-pane  label="更换课程" name="second">
              <el-form :model="form">
                    <el-form-item label="选择视频">
                <el-select  v-model="form.videoId" filterable placeholder="请选择">
                  <el-option
                    v-for="item in tableData"
                    :key="item.value"
                    :label="item.Title"
                    :value="item.VideoId">
                  </el-option>
                </el-select>
                </el-form-item>
                </el-form>
                <el-button type="success" @click="uplesson()" >提交</el-button>
            </el-tab-pane>
            <el-tab-pane  label="视频知识点" name="three">
            <videowhite v-bind="{showdialo, question: whites, deldata, updaleByid,name: 'dialogFormVisible2'}"></videowhite>
            </el-tab-pane>
        <el-dialog title="添加视频问题" :visible.sync="dialogFormVisible">
            <addquestion  v-bind="{showdialo, start, lid ,name: 'dialogFormVisible' }"></addquestion>
        </el-dialog>
        <el-dialog title="修改视频问题" :visible.sync="dialogFormVisible1"> 
            <updatequestion  v-bind="{showdialo, start, form:updateData,name: 'dialogFormVisible1'}"></updatequestion>
        </el-dialog>
        <el-dialog title="添加知识点时间" :visible.sync="dialogFormVisible2">
            <addwhite  v-bind="{showdialo, start, lid ,name: 'dialogFormVisible2'}"></addwhite>
        </el-dialog>
        <el-dialog title="修改知识点时间" :visible.sync="dialogFormVisible3">
            <updatewhite  v-bind="{showdialo, start, form:updateData,name: 'dialogFormVisible3'}"></updatewhite>
        </el-dialog>
        </el-tabs>
      </div>
    </div>
  </div>

</template>

<script>
import {
  asyncvideoQuestion,
  asyncGetVideoList,
  asyncupdateLession,
  asyncgetVideoIDByLessionID,
  asyncselectWhitepoint,
} from "../../../plugins/api.js";
import videovue from "./video.vue";
import breadcrumb from "@/components/breadcrumb.vue";
import videoQuestionvue from "./videoQuestion.vue";
import addquestion from "./addquestion.vue";
import updatequestion from "./updatequestion.vue";
import videowhite from "./videowhite.vue";
import addwhite from "./addwhite.vue";
import updatewhite from "./updatewhite.vue";
export default {
  data() {
    return {
      activeName: "first",
      name: "",
      paths: [],
      num1: 0,
      dialogFormVisible: false,
      dialogupdata: false,
      formLabelWidth: "120px",
      imglist: [],
      innerVisible: false,
      question: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      updateData: null,
      tableData: [],
      form: {
        videoId: ""
      },
      whites: [],
    };
  },
  async mounted() {
    this.start();
  },
  props: ["lid"],
  methods: {
    async start() {
      let lid = this.lid;
      let { name, id } = this.$route.query;
      let path = `/coursebyid/${id}`;
      this.listvideo();
      this.paths = [
        {
          name: "查看课程",
          path: "/watchcourse"
        },
        {
          name,
          path
        }
      ];
      this.name = lid;
      this.question = await asyncvideoQuestion({ lid: lid });
      this.form.videoId = await asyncgetVideoIDByLessionID({ lid: lid });
      this.whites =  await asyncselectWhitepoint({lid: lid})
    },
    showdialo(name, is) {
      console.log(name,is)
      this[name] = is
    },
    async onSubmit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          try {
            this.$message({
              message: "恭喜你，修改成功",
              type: "success"
            });
            this.dialogupdata = false;
          } catch (err) {
            this.$message.error("错了哦，修改失败:" + err);
          }
        } else {
          return false;
        }
      });
    },
    async deldata(i, fun) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await fun(i);
            this.$message({
              message: "恭喜你，删除成功",
              type: "success"
            });
            this.start();
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
    async updaleByid(index, name, is) {
      this.updateData = this.question[index];
      this[name] = is;
    },
    async listvideo() {
      try {
        const { VideoList } = await asyncGetVideoList();
        this.tableData = VideoList;
      } catch (err) {
        this.$message.error(`${err}`);
      }
    },
    async uplesson() {
      try {
        await asyncupdateLession({ ID: this.lid, videoId: this.form.videoId });
        this.$message.success("修改成功");
      } catch (err) {
        this.$message.error("修改失败");
      }
    }
  },
  components: {
    breadcrumb,
    videovue,
    videoQuestionvue,
    addquestion,
    updatequestion,
    videowhite,
    addwhite,
    updatewhite
  }
};
</script>

<style scoped>
</style>