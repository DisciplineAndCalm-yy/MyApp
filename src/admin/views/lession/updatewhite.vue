<template>
  <el-form ref="form" :rules="rules2" :model="form" label-width="100px">
    <el-form-item label="介绍" prop="desc">
      <el-input v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item label="跳转时间" prop="starttime">
      <el-tooltip class="item" effect="dark" content="单位为秒" placement="top-start">
        <el-input v-model="form.starttime"></el-input>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="问题重新观看时间" prop="totaltime">
      <el-tooltip class="item" effect="dark" content="单位为秒" placement="top-start">
        <el-input v-model="form.totaltime"></el-input>
      </el-tooltip>
    </el-form-item>
    <el-form-item class="text-right">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="showdialo(name, false)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { asyncupdateWhitepoint } from "../../../plugins/api.js";
export default {
  data() {
    return {
      innerVisible: false,
      rules2: {
        desc: [
          {
            required: true,
            message: "请输入跳转时间",
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
  props: ["showdialo", "start", "lid", "name", "form"],
  methods: {
    selected(v) {
      this.form.picture = v;
      this.innerVisible = false;
    },
    async onSubmit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          try {
            await asyncupdateWhitepoint(this.form);
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