<template>
    <div>
        <el-button type="success" icon="el-icon-edit" @click="dialogFormVisible = true" plain>添加课程包</el-button>
            <el-table
      :data="userpak"
      border
      style="width: 100%">
      <el-table-column
        prop="ID"
        label="ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="count"
        label="数量"
        width="150">
      </el-table-column>
      <el-table-column
        prop="packegeInfo"
        label="课程包简介">
      </el-table-column>
       <el-table-column
        prop="packegeName"
        label="课程包名称">
      </el-table-column>
      <el-table-column
        prop="prize"
        label="价格">
      </el-table-column>
    </el-table>
    <el-dialog title="添加课程包" center :visible.sync="dialogFormVisible">
  <el-form :rules="rules" status-icon  ref="form"  :model="form">
    <el-form-item label="活动名称" prop="key_ID" :label-width="formLabelWidth">
      <el-select v-model="form.key_ID" placeholder="请选择">
    <el-option
      v-for="item in allpackage"
      :key="item.ID"
      :label="item.packegeName"
      :value="item.ID">
    </el-option>
  </el-select>
    </el-form-item>
    <el-form-item label="选择数量" :label-width="formLabelWidth">
      <el-input-number v-model="form.count"  :min="1" :max="10000"></el-input-number>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>

<script>

import {
  asyncgetAgentCoursePak,
  asyncgetAllPackege,
  asyncaddAgentKey
} from "../../../plugins/api.js";
import userAddPackage from "./userAddPackage.vue";
export default {
  data() {
    return {
      userpak: null,
      dialogFormVisible: false,
      form: {
        agent_ID: "",
        key_ID: "",
        count: 1
      },
      rules: {
        key_ID: [
          { required: true, message: "请选择一个课程包", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px",
      allpackage: null
    };
  },
  props: ['user'],
  watch: {
    $route() {
      this.start();
    }
  },
  mounted() {
    this.start();
    this.packages();
  },
  methods: {
    async start() {
      let id = this.user.userid;
      try {
        this.userpak = await asyncgetAgentCoursePak({ uid: id });
      } catch (err) {
        console.log(err);
      }
    },
    async packages() {
      this.allpackage = await asyncgetAllPackege();
      return this.allpackage;
    },
    async onSubmit() {
      let formName = "form";
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            this.form.agent_ID = this.user.userid
            await asyncaddAgentKey(this.form);
            this.start();

            this.$message({
              message: "恭喜你，添加成功",
              type: "success"
            });
            this.dialogFormVisible = false;
          } catch (err) {
            this.$message.error("错了哦，添加失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {
    userAddPackage
  }
};
</script>

<style scoped>
</style>
