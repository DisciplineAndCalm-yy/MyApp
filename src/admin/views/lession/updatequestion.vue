<template>
    <el-form v-if="form" ref="form" :rules="rules2" :model="form" label-width="100px">
  <el-form-item label="问题暂停时间" prop="time" >
    <el-tooltip class="item" effect="dark" content="单位为秒" placement="top-start">
    <el-input v-model="form.time"></el-input>
    </el-tooltip>
  </el-form-item>
      <el-form-item label="问题重新观看时间" prop="questionStartTime" >
      <el-tooltip class="item" effect="dark" content="单位为秒" placement="top-start">
    <el-input v-model="form.questionStartTime"></el-input>
      </el-tooltip>
  </el-form-item>
    <el-form-item label="问题的分数">
    <el-input-number v-model="form.mark" :precision="2" :step="0.01" ></el-input-number>
  </el-form-item>
  <el-form-item label="选取图片" prop="picture">
       <button type="button" @click="innerVisible = true" class="btn btn-info el-form-item__label text-white" style="width:80px" >选取图片</button>
    <el-input  :value="form.picture"  disabled></el-input>
  </el-form-item>
  <el-form-item label="问题类型" prop="questionType">
    <el-select v-model="form.questionType" placeholder="选择问题类型">
      <el-option label="单选" value="singleChoice"></el-option>
      <el-option label="多选" value="multipleChoice"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="问题答案" prop="answer" >
    <el-input v-model="form.answer" disabled ></el-input>
  </el-form-item>
  <el-form-item label="添加选项"  >
     <button type="button" @click="addform2" class="btn btn-info el-form-item__label text-white" style="width:80px" >添加选项</button>
     <el-button @click="deletea()" type="danger" icon="el-icon-delete" circle></el-button>
  </el-form-item>
         <table class="table">
             <tr>
                <td v-if="form.questionType == 'singleChoice'" >
                  单选答案
                </td>
                <td v-else-if="form.questionType == 'multipleChoice'" >
                  多选答案
                </td>
                 <td>问题选项</td>
                 <td>选项的高度</td>
                 <td>选项左侧的距离</td>
             </tr>
             <tr v-for="(v,i) in form.questionData" :key="i">
                <td v-if="form.questionType == 'singleChoice'" >
                  <input type="radio" v-model="form.answer" name="singleChoice" :value="v.value" >
                </td>
                <td v-else-if="form.questionType == 'multipleChoice'" >
                  <input type="checkbox" v-model="checkbox" name="multipleChoice" :value="v.value">
                </td>
                 <td v-text="v.value" ></td>
                 <td><el-input-number v-model="v.style.top" :precision="3"  :step="0.001" ></el-input-number></td>
                 <td><el-input-number v-model="v.style.left" :precision="3" :step="0.001" ></el-input-number></td>
            </tr>
         </table>
  <el-form-item class="text-right" >
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button  @click="showdialo(name, false)">取消</el-button>
</el-form-item>
   <el-dialog
      width="80%"
      title="选取图片"
      :visible.sync="innerVisible"
      append-to-body>
      <ossImglist v-bind="{selected}" ></ossImglist>
    </el-dialog>
</el-form>
</template>

<script>
import { asyncupdateQuestion } from "../../../plugins/api.js";
import ossImglist from "@/components/newpublic/oss.vue";
import uuidv1 from "uuid/v1";
import { binaryInsertionSort } from "../../../plugins/utils.js";
export default {
  data() {
    return {
      innerVisible: false,
      rules2: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "blur" }
        ],
        banner: [
          { required: true, message: "请选择一张图片", trigger: "blur" }
        ],
        level: [
          { required: true, message: "请选择leavl等级", trigger: "blur" }
        ],
        courseType: [
          { required: true, message: "请选择课程类型", trigger: "blur" }
        ]
      },
      prefix: "videoImg/",
      checkbox: []
    };
  },
  watch: {
    checkbox(v) {
      let arr = binaryInsertionSort(v);
      this.form.answer = arr.join("!@#$%^&");
    },
    "form.questionType"() {
      this.form.answer = null;
      this.checkbox = [];
    }
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
            //let form = JSON.parse(JSON.stringify(this.form))
            //form.questionData = JSON.stringify(this.form.questionData);
            await asyncupdateQuestion(this.form);
            this.start();
            this.$message({
              message: "恭喜你，添加成功",
              type: "success"
            });
            this.showdialo(this.name ,false);
          } catch (err) {
            this.$message.error("错了哦，添加失败:" + err);
          }
        } else {
          return false;
        }
      });
    },
    addform2() {
      let uuid = uuidv1();
      let len = this.form.questionData.length;
      let arr = new Array({
        id: uuid,
        value: len,
        name: "value142536",
        style: {
          top: "",
          left: ""
        }
      });
      this.form.questionData.push(arr[0]);
    },
    deletea() {
      this.form.questionData.pop();
      this.checkbox = [];
    }
  },
  components: {
    ossImglist
  }
};
</script>

<style scoped>
</style>
