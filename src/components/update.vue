<template>
  <div class="form-group" v-loading="loading">
    <label for="exampleFormControlFile1">给视频添加标题
      <el-popover
        placement="top-start"
        title="提示"
        width="200"
        trigger="hover"
        content="此标题只用在阿里云后台的标题，其他位置不显示"
      >
        <i slot="reference" class="el-icon-question"></i>
      </el-popover>
    </label>
    <input placeholder="必须填写" type="text" v-model="Title" class="form-control">
    <br>
    <label for="exampleFormControlFile1">描述</label>
    <input v-model="Description" type="text" class="form-control">
    <br>
    <label for="exampleFormControlFile1">标签</label>
    <el-tooltip class="item" effect="dark" content="按回车键完成单个标签输入" placement="top">
      <el-select
        style="display:block;"
        v-model="Tags"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="请选择文章标签"
      ></el-select>
    </el-tooltip>
    <br>
    <label for="exampleFormControlFile1">选择视频</label>
    <input
      type="file"
      class="form-control"
      accept=".3GP, .ASF, .AVI, .DAT, .DV, .FLV, .F4V, .GIF, .M2T, .M4V, .MJ2, .MJPEG, .MKV, .MOV, .MP4, .MPE, .MPG, .MPEG, .MTS, .OGG, .QT, .RM, .RMVB, .SWF, .TS, .VOB, .WMV, .WEBM"
      id="exampleFormControlFile1"
    >
    <button type="button" class="btn btn-info" @click="uploads()">上传</button>
    <br>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="exc"></el-progress>
  </div>
</template>

<script>
const AliyunUpload = window.AliyunUpload;
import { asyncuploadAccess } from "../plugins/api.js";

export default {
  name: "update",
  data() {
    return {
      exc: 0,
      Tags: [],
      Description: "",
      Title: "",
      loading: false
    };
  },
  props: {
    updatedvideoId: {
      type: Function,
      required: false
    },
    disabled: {
      type: Function,
      required: false
    }
  },
  watch: {
    Tags(v) {
      if (v.length > 4) {
        this.Tags.splice(4, 1);
        this.$message("最大4条");
      }
    }
  },
  methods: {
    async uploads() {
      let userData = {
        Vod: {
          StorageLocation: "",
          Title: this.Title,
          Description: this.Description,
          CateId: "19",
          Tags: this.Tags.join(",")
        }
      };

      let files1 = document.getElementById("exampleFormControlFile1").files[0];
      if (!this.Title) {
        this.$message.error("错了哦，请填写title");
        return;
      }
      if (!files1) {
        this.$message.error("错了哦，没有选择文件");
        return;
      }

      var uploader = new AliyunUpload.Vod({
        onUploadstarted: async function(uploadInfo) {
          let {
            accessKeyId,
            accessKeySecret,
            securityToken
          } = await asyncuploadAccess();
          uploader.setSTSToken(
            uploadInfo,
            accessKeyId,
            accessKeySecret,
            securityToken
          );
        },
        onUploadSucceed: uploadInfo => {
          this.updatedvideoId
            ? this.updatedvideoId(uploadInfo.videoId)
            : console.log("上传成功");
        },
        onUploadProgress: (uploadInfo, totalSize, loadedPercent) => {
          this.exc = Number((loadedPercent * 100.0).toFixed(2));
        },
        onUploadEnd: () => {
          this.$message({
            message: "恭喜你，上传成功",
            type: "success"
          });
          this.loading = false;
          this.disabled ? this.disabled() : console.log("上传完成");
        }
      });
      userData = JSON.stringify(userData);
      uploader.addFile(files1, null, null, null, userData);
      uploader.startUpload();
      this.loading = true;
    }
  },
  components: {}
};
</script>

<style scoped>
</style>