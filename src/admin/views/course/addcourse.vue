<template>
    <el-form ref="form" :rules="rules2" :model="form" label-width="100px">
        <h2>添加课程</h2>
  <el-form-item label="课程名称" prop="name" >
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="课程价格">
    <el-input-number v-model="form.coursePrize" :precision="2" :step="0.01" ></el-input-number>
  </el-form-item>
  <el-form-item label="选取图片" prop="banner">
       <button type="button" @click="innerVisible = true" class="btn btn-info el-form-item__label text-white" style="width:80px">选取图片</button>
    <el-input  :value="form.banner"  disabled></el-input>
  </el-form-item>
    <el-form-item label="课程简介">
    <el-input type="textarea" v-model="form.info"></el-input>
  </el-form-item>
    <el-form-item label="课程详细介绍">
    <el-input type="textarea" v-model="form.introduction"></el-input>
  </el-form-item>
  <el-form-item label="课程难度" prop="level">
    <el-select v-model="form.level" placeholder="请选择课程难度">
      <el-option label="level 1" value="level 1"></el-option>
      <el-option label="level 2" value="level 2"></el-option>
      <el-option label="level 3" value="level 3"></el-option>
      <el-option label="level 4" value="level 4"></el-option>
      <el-option label="level 5" value="level 5"></el-option>
      <el-option label="level 6" value="level 6"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="课程类型" prop="courseType" >
    <el-select v-model="form.courseType" placeholder="请选择课程类型">
      <el-option label="Python" value="Python"></el-option>
      <el-option label="Blockly" value="Blockly"></el-option>
      <el-option label="Arduino" value="Arduino"></el-option>
      <el-option label="DouBaoBit" value="DouBaoBit"></el-option>
      <el-option label="灵巧手" value="灵巧手"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="课程星级">
    <el-rate v-model="form.difficulty"></el-rate>
  </el-form-item>
  <el-form-item label="课程标签">
        <el-tooltip class="item" effect="dark" content="按回车键完成单个标签输入" placement="top">
          <el-select
          style="display:block;"
          v-model="Tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签">
          </el-select>
        </el-tooltip>
  </el-form-item>
    <el-form-item label="课程排序">
        <el-tooltip class="item" effect="dark" content="小的在前" placement="top-start">
    <el-input-number v-model="form.paixu"  :step="1" ></el-input-number>
        </el-tooltip>
  </el-form-item>

  <el-form-item class="text-right" >
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button  @click="$attrs.dialog()">取消</el-button>
</el-form-item>
   <el-dialog
      width="80%"
      title="选取图片"
      :visible.sync="innerVisible"
      append-to-body>
      <ossImglist v-bind:selected="selected" ></ossImglist>
    </el-dialog>
</el-form>
</template>

<script>
import { asyncuploadCourse } from "../../../plugins/api.js";
import ossImglist from "@/components/newpublic/oss.vue";
export default {
  data() {
    return {
      innerVisible: false,
      Tags: [],
      form: {
        name: "",
        coursePrize: 0.01,
        introduction: "",
        banner: "",
        level: "",
        courseType: "",
        delivery: false,
        courseTag: "",
        resource: "",
        info: "",
        difficulty: 1,
        paixu: 100
      },
      rules2: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "blur" }
        ],
        banner: [{ required: true, message: "请选择一张图片", trigger: "blur" }],
        level: [{ required: true, message: "请选择leavl等级", trigger: "blur" }],
        courseType: [{ required: true, message: "请选择课程类型", trigger: "blur" }]
      }
    };
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
    selected(v) {
      this.form.banner = v;
      this.innerVisible = false;
    },
    async onSubmit() {
      this.$refs['form'].validate(async (valid) => {
        if(valid){
          try {
            this.form.courseTag = this.Tags.join(',');
            await asyncuploadCourse(this.form);
            this.$attrs.start();
            this.$message({
              message: "恭喜你，添加成功",
              type: "success"
            });
            this.$attrs.dialog();
          } catch (err) {
            this.$message.error("错了哦，添加失败:" + err);
          }
        }else{
          return false
        }
      })

    }
  },
  components: {
    ossImglist
  }
};
</script>

<style scoped>
</style>
