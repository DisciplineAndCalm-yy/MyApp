<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <el-button @click="showdialo(name, true)">增加问题</el-button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <el-table :data="question" style="width: 100%">
          <el-table-column label="id" prop="id"></el-table-column>
          <el-table-column label="介绍" prop="miaoshu"></el-table-column>
          <el-table-column label="跳转时间" prop="starttime"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <!-- <el-button @click="updaleByid(scope.$starttime,'dialogFormVisible2', true)"  type="text" size="small">编辑</el-button> -->
              <el-button @click="deldata({wid:scope.row.id}, asyncdeleteWhitepoint)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { asyncdeleteWhitepoint } from "../../../plugins/api.js";
export default {
  props: ["question", "showdialo", "deldata", "updaleByid", "name",],
  methods: {
    imgstyle(name) {
      return `${name}?x-oss-process=style/style-50`;
    },
    asyncdeleteWhitepoint: asyncdeleteWhitepoint
  }
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>