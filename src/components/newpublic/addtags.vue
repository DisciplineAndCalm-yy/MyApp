<template>
    <el-select
    v-model="tags"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="请选择文章标签">
  </el-select>
</template>

<script>
export default {
  data() {},
  props: {
    tags: {
      type: Array,
      required: true
    }
  },
  watch: {
    tags(v) {
      if (v.length > 4) {
        this.tags.splice(4, 1);
        this.$message("最大4条");
      }
    }
  }
};
</script>

<style scoped>
</style>
