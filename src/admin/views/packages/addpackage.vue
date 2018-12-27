<template>
    <el-form ref="form" :model="form" label-width="80px">
                <h2>添加课程</h2>
                <el-form-item label="课程包名称">
                    <el-input v-model="form.packegeName"></el-input>
                </el-form-item>
                <el-form-item label="课程包价格">
                    <el-input-number v-model="form.prize" :precision="2" :step="0.01"></el-input-number>
                </el-form-item>
                <el-form-item label="课程简介">
                    <el-input type="textarea" v-model="form.packegeInfo"></el-input>
                </el-form-item>

  <el-form-item class="text-right" >
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button  @click="$attrs.dialog()">取消</el-button>
</el-form-item>
</el-form>
</template>

<script>
import {asyncaddPackegeKey} from "../../../plugins/api.js"
export default {
  data() {
    return {
      innerVisible: false,
      form: {
        packegeInfo: "",
        packegeName: "",
        prize: 0.1
      }
    };
  },
  methods: {
    async onSubmit() {
      try {
        await asyncaddPackegeKey(this.form);
        this.$attrs.start()
        this.$message({
          message: "恭喜你，添加成功",
          type: "success"
        });
        this.$attrs.dialog()
      } catch (err) {
        this.$message.error("错了哦，添加失败:" + err);
      }
    },
    
  },
  components: {
    // oosImglist
  }
};
</script>

<style scoped>
</style>
