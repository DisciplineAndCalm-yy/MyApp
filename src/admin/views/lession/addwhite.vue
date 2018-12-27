<template>
  <el-form ref="form" :rules="rules2" :model="form" label-width="100px">
    <el-form-item label="介绍" prop="miaoshu">
      <el-input v-model="form.miaoshu"></el-input>
    </el-form-item>
    <el-form-item label="跳转时间" prop="starttime">
      <el-tooltip class="item" effect="dark" content="单位为秒" placement="top-start">
        <el-input-number v-model="form.starttime"  :min="1"  label="跳转时间"></el-input-number>
      </el-tooltip>
    </el-form-item>
    
    <el-form-item label="视频时长" prop="totaltime">
      <el-tooltip class="item" effect="dark" content="单位为秒" placement="top-start">
        <el-input-number v-model="form.totaltime"  :min="1"  label="视频时长"></el-input-number>
      </el-tooltip>
    </el-form-item>
    <el-form-item class="text-right">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="showdialo(name, false)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { asyncaddWhitepoint } from "../../../plugins/api.js";
export default {
  data() {
    return {
      innerVisible: false,
      form: {
        miaoshu: "",
        videoId: "",
        info: "1213",
        starttime: 10,
        totaltime: 10
      },
      rules2: {
        miaoshu: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 32,
            message: "长度在 1 到 32 个字符",
            trigger: "blur"
          }
        ],
        starttime: [
          {
            required: true,
            message: "必须为数字",
            type: "number"
          }
        ],
        totaltime: [
          {
            required: true,
            message: "必须为数字",
            type: "number"
          }
        ]
      }
    };
  },
  props: ["showdialo", "start", "lid", "name"],
  methods: {
    selected(v) {
      this.form.picture = v;
      this.innerVisible = false;
    },
    async onSubmit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          try {
            this.form.videoId = this.lid
            await asyncaddWhitepoint(this.form);
            this.start();
            this.$message({
              message: "恭喜你，添加成功",
              type: "success"
            });
            this.showdialo(this.name, false);
          } catch (err) {
            this.$message.error("错了哦，添加失败:" + err);
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>