<template>
<el-container  class="elcon">
  <!-- <el-main>
      <div class="row">
  <div class="col">
    <h5 class="card-title" v-text="problem"></h5>
        <el-radio v-for="(v, i) in options" :key="i" v-model="form.radio" :label="v.value">{{ v.name }}</el-radio>
  </div>
      </div>
  </el-main>
  <el-footer class="text-right" >
       <el-button >跳过</el-button>
                <el-button type="primary" >确定</el-button>
                <el-tooltip class="item" effect="dark" content="重新看这次的知识点" placement="top-start">
                <el-button type="primary" >回看</el-button>
                </el-tooltip>
  </el-footer> -->
  <input type="radio" id="radio123" class="a12" >
</el-container>
</template>

<script>
import $ from "jquery"
/**
 * 需要接受的值
 * 1. submit 提交方法
 * 2. 背景图片,
 * 3. 问题,
 * 4. 问题选项
 *
 */
export default {
  data() {
    return {
      form: {
        radio: ""
      }
    };
  },
  props: {
    submit: {
      type: Function
    },
    dialogFalse: {
      type: Function
    },
    problem: {
      type: String,
      required: true,
      validator: function(v) {
        return v;
      }
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    styles(style) {
      document.getElementById("radio123").style.position = "absolute"
      document.getElementById("radio123").style.top = top
      document.getElementById("radio123").style.left = left
    }
  }
};


</script>

<style scoped>
.elcon {
  height: 100%;
}
.a12 {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: 1%;
}
</style>
