<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <el-button @click="showdialo(name, true)" >增加问题</el-button>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <el-table :data="question" style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="问题类型">
                                    <span>{{ props.row.questionType }}</span>
                                </el-form-item>
                                <el-form-item label="问题暂停时间">
                                    <span>{{ props.row.time }} s</span>
                                </el-form-item>
                                <el-form-item label="问题重新观看时间">
                                    <span>{{ props.row.questionStartTime }} s</span>
                                </el-form-item>
                                <el-form-item label="问题ID">
                                    <span>{{ props.row.ID }}</span>
                                </el-form-item>
                                <el-form-item label="问题答案">
                                    <span>{{ props.row.answer }}</span>
                                </el-form-item>
                            </el-form>
                            <hr>
                            <el-form label-position="left" v-for="(v, i) in props.row.questionData" :key="i" inline class="demo-table-expand">
                                 <el-form-item  label="选项的值">
                                        <span>{{ v.value }}</span>
                                </el-form-item>
                                <el-form-item  label="选项id">
                                        <span>{{ v.id }}</span>
                                </el-form-item>
                                <el-form-item  label="选项名称">
                                        <span>{{ v.name }}</span>
                                </el-form-item>
                                <el-form-item  label="选项高度">
                                        <span>{{ v.style.top }}%</span>
                                </el-form-item>
                                <el-form-item  label="选项左侧距离">
                                        <span>{{ v.style.left }}%</span>
                                </el-form-item>
                               
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="ID" prop="ID">
                    </el-table-column>
                    <el-table-column label="分数" prop="mark">
                    </el-table-column>
                    <el-table-column label="图片" prop="picture">
                        <template slot-scope="scope" >
                            <img :src="imgstyle(scope.row.picture)" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="updaleByid(scope.$index,'dialogFormVisible1', true)" type="text" size="small">编辑</el-button>
                            <el-button @click="deldata({ID:scope.row.ID}, asyncdeleteQuestion)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { asyncdeleteQuestion } from "../../../plugins/api.js";
export default {
  data() {
    return {
      form: {
        id: "",
        value: "",
        name: "",
        style: {
          top: "",
          left: ""
        }
      }
    };
  },
  props: ["question", "showdialo", "deldata", "updaleByid", "name"],
  methods: {
    imgstyle(name) {
      return `${name}?x-oss-process=style/style-50`;
    },
    asyncdeleteQuestion: asyncdeleteQuestion
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