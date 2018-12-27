<template>
  <el-form ref="form" :model="form" label-width="80px">
    <!-- <el-form-item label="小节名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="课程简介">
    <el-input type="textarea" v-model="form.lessionInfo"></el-input>
  </el-form-item>
      <el-form-item label="videoId">
    <el-input disabled  v-model="form.videoId"></el-input>
  </el-form-item>
    <el-form-item label="课程时长">
    <el-input  v-model="form.lengthTime"></el-input>
  </el-form-item> -->
    <el-form-item label="第几小节">
      <el-input-number disabled="" v-model="form.num" :min="1" :step="1"></el-input-number>
      &nbsp;
    </el-form-item>
    <el-form-item label="选择添加方式">
      <el-switch v-model="dialogFormVisible2" inactive-text="通过上传视频选择" active-text="通过视频列表选择">
      </el-switch>

    </el-form-item>
    <el-collapse-transition>
      <updatevideo v-show='!dialogFormVisible2' v-bind:updatedvideoId="updatedvideoId" v-bind="{disabled:disabled1}"></updatevideo>
    </el-collapse-transition>
    
    <el-collapse-transition>
      <el-form-item label="选择视频">
      <el-select v-show="dialogFormVisible2" v-model="form.videoId" filterable placeholder="请选择">
        <el-option
          v-for="item in tableData"
          :key="item.value"
          :label="item.Title"
          :value="item.VideoId">
        </el-option>
      </el-select>
      </el-form-item>
    </el-collapse-transition>
    <el-form-item>
      <el-button type="primary" :disabled="disabled" @click="onSubmit">立即创建</el-button>
      <el-button @click="$attrs.dialog()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { asyncuploadLession, asyncGetVideoList } from "../../../plugins/api.js";
import updatevideo from "@/components/update.vue";
export default {
  data() {
    return {
      form: {
        name: "",
        num: 1,
        course_ID: "",
        lessionInfo: "",
        videoId: "",
        lengthTime: ""
      },
      disabled: true,
      tableData: [],
      dialogFormVisible2: false
    };
  },
  mounted() {
    this.start();
  },
  watch: {
    "form.videoId"(v) {
      if (v) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        await asyncuploadLession(this.form);
        this.$attrs.start();
        this.$message({
          message: "恭喜你，添加成功",
          type: "success"
        });
        this.$attrs.dialog();
      } catch (err) {
        this.$message.error("错了哦，添加失败:" + err);
      }
    },
    start() {
      if (this.$attrs.course) {
        this.form.course_ID = this.$attrs.course.Course.ID;
        this.form.num = this.$attrs.course.Lession.length + 1;
      }
      this.listvideo();
    },
    updatedvideoId(data) {
      this.form.videoId = data;
    },
    disabled1() {
      this.disabled = !this.disabled;
    },
    async listvideo() {
      try {
        const { VideoList } = await asyncGetVideoList();
        this.tableData = VideoList;
      } catch (err) {
        this.$message.error(`${err}`);
      }
    },
    uploadlession() {}
  },
  components: {
    updatevideo
  }
};
</script>

<style scoped>
</style>