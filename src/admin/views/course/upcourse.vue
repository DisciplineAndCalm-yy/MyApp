<template>
    <el-form ref="form" :model="form" label-width="80px">
        <h2>添加课程</h2>
  <el-form-item label="课程名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="课程价格">
    <el-input-number v-model="form.coursePrize" :precision="2" :step="0.01" ></el-input-number>
  </el-form-item>
    <el-form-item label="课程简介">
    <el-input type="textarea" v-model="form.info"></el-input>
  </el-form-item>
    <el-form-item label="课程详细介绍">
    <el-input type="textarea" v-model="form.introduction"></el-input>
  </el-form-item>
  <el-form-item label="课程难度">
    <el-select v-model="form.level" placeholder="请选择课程难度">
      <el-option label="level 1" value="level 1"></el-option>
      <el-option label="level 2" value="level 2"></el-option>
      <el-option label="level 3" value="level 3"></el-option>
      <el-option label="level 4" value="level 4"></el-option>
      <el-option label="level 5" value="level 5"></el-option>
      <el-option label="level 6" value="level 6"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="课程类型">
    <el-select v-model="form.courseType" placeholder="请选择课程类型">
      <el-option label="Python" value="Python"></el-option>
      <el-option label="Blockly" value="Blockly"></el-option>
      <el-option label="Arduino" value="Arduino"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="课程星级">
    <el-rate v-model="form.difficulty"></el-rate>
  </el-form-item>
  <el-form-item label="课程标签">
      <el-tooltip class="item" effect="dark" content="用英文逗号分隔开" placement="top-start">
    <el-input  v-model="form.courseTag"></el-input>
    </el-tooltip>
  </el-form-item>
    <el-form-item label="课程排序">
        <el-tooltip class="item" effect="dark" content="小的在前" placement="top-start">
    <el-input-number v-model="form.paixu"  :step="1" ></el-input-number>
        </el-tooltip>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        ID: "",
        name: "",
        coursePrize: 0.01,
        introduction: "",
        level: "",
        courseType: "",
        delivery: false,
        courseTag: "",
        resource: "",
        info: "",
        difficulty: 1,
        paixu: 100
      }
    };
  },
  mounted() {
    this.form = this.$attrs.couserindex
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
</style>
