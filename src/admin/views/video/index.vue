<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <breadcrumb v-bind:paths="paths" v-bind:name="name"></breadcrumb>
      </div>
    </div>
    <el-row>
      <el-button type="primary" @click="dialogVisible = true" plain>上传视频</el-button>
    </el-row>
    <div class="row msg">
      <div class="card" v-for="(v, i) in tableData" :key="i"  style="width: 320px;">
       <div class="card-img-top">
        <!-- <el-carousel trigger="click" indicator-position="none" height="180px">
            <el-carousel-item>v-for="(item,key) in v.snapshots" :key="key"-->
              <img :src="v.CoverURL" class="img-responsive" alt="123" style="height:180px;">
            <!-- </el-carousel-item>
          </el-carousel> -->
        </div>
        <div class="card-body">
          <h6>Title:{{v.Title}}</h6>
          <p class="card-text">描述：{{v.Description}}</p>
          <p class="card-text">标签：{{v.Tags}}</p>
          <p class="card-text">创建时间： {{v.CreateTime}}</p>
          <el-button type="primary" icon="el-icon-edit" @click="upvideo(v)" circle></el-button>
          <el-button type="danger" @click="delvideo({VideoId:v.VideoId})" icon="el-icon-delete" circle></el-button>
        </div>
      </div>
    </div>
    <el-dialog title="上传视频" :visible.sync="dialogVisible" width="30%">
  <updatevideo  v-bind="{closedialog,start}" ></updatevideo>
</el-dialog>

<el-dialog title="提示" :visible.sync="dialogVisibleup" width="80%">
  <updateVideoinfo v-bind="{form, start,closedialog }"></updateVideoinfo>
</el-dialog>
  </div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import updateVideoinfo from "@/components/newpublic/updateVideoinfo.vue";
import updatevideo from "@/components/update.vue";
import { asyncGetVideoList, asyncdeleteVideo } from "../../../plugins/api.js";
export default {
  name: "videos1",
  data() {
    return {
      name: "视频库",
      paths: [],
      dialogVisible: false,
      dialogVisibleup: false,
      tableData: [],
      rows: [],
      form: {}
    };
  },
  async mounted() {
    this.start();
  },
  watch: {
    $route() {
      this.start();
    },
    dialogVisible(v) {
      if(v == false) {
        this.start();
      }
    }
  },
  methods: {
    async start() {
      try {
        const { VideoList } = await asyncGetVideoList();
        this.tableData = VideoList;
      } catch (err) {
        this.$message.error(`${err}`);
      }
    },
    userid(d) {
      return d.row[0].fromId;
    },
    watchMessage(d) {
      this.rows = d.Row;
      this.dialogVisible = true;
    },
    async delvideo(i) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        try {
          await asyncdeleteVideo(i);
          this.$message({
            message: "删除成功!",
            type: "success"
          });
          this.start();
        } catch (err) {
          this.$message.error(`${err}`);
        }
      });
    },
    closedialog() {
      this.dialogVisibleup = false;
      this.dialogVisible = false;
    },
    upvideo(v) {
      this.form = v;
      this.dialogVisibleup = true;
      this.start()
    }
  },
  components: {
    breadcrumb,
    updateVideoinfo,
    updatevideo
  }
};
</script>

<style scoped>
.aspan {
  cursor: pointer;
  color: blueviolet;
}
.card {
  margin: 15px;
}
.img-responsive {
  width: 100%;
}
</style>