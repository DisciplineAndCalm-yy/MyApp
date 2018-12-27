<template>
    <div class="container-fluid" >
      <el-alert
         title="除管理员以外的用户都是用代理商创建"
          type="warning"
          show-icon>
        </el-alert>
        <div class="row msg" >
            <breadcrumb v-bind:paths="paths" :name="name" ></breadcrumb>
        </div>
        <div class="row msg" >
          <div class="col" >
          <el-table :data="tableData" style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                              <h3>代理商</h3>
                                <el-form-item label="名称">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <span>{{ props.row.password }} s</span>
                                </el-form-item>
                                <el-form-item label="邮箱">
                                    <span>{{ props.row.email }} s</span>
                                </el-form-item>
                                <el-form-item label="电话">
                                    <span>{{ props.row.phone }}</span>
                                </el-form-item>
                                <el-form-item label="介绍">
                                    <span>{{ props.row.info }}</span>
                                </el-form-item>
                            </el-form>
                            <hr>
                            <el-form label-position="left" inline class="demo-table-expand">
                              <h3>学生</h3>
                                <el-form-item label="名称">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <span>{{ props.row.password }} s</span>
                                </el-form-item>
                                <el-form-item label="邮箱">
                                    <span>{{ props.row.email }} s</span>
                                </el-form-item>
                                <el-form-item label="电话">
                                    <span>{{ props.row.phone }}</span>
                                </el-form-item>
                                <el-form-item label="介绍">
                                    <span>{{ props.row.info }}</span>
                                </el-form-item>
                            </el-form>
                            <hr>
                            <el-form label-position="left" inline class="demo-table-expand">
                              <h3>老师</h3>
                                <el-form-item label="名称">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <span>{{ props.row.password }} s</span>
                                </el-form-item>
                                <el-form-item label="邮箱">
                                    <span>{{ props.row.email }} s</span>
                                </el-form-item>
                                <el-form-item label="电话">
                                    <span>{{ props.row.phone }}</span>
                                </el-form-item>
                                <el-form-item label="介绍">
                                    <span>{{ props.row.info }}</span>
                                </el-form-item>
                            </el-form>
                            <hr>
                            <el-form label-position="left" inline class="demo-table-expand">
                              <h3>学校负责人</h3>
                                <el-form-item label="名称">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <span>{{ props.row.password }} s</span>
                                </el-form-item>
                                <el-form-item label="邮箱">
                                    <span>{{ props.row.email }} s</span>
                                </el-form-item>
                                <el-form-item label="电话">
                                    <span>{{ props.row.phone }}</span>
                                </el-form-item>
                                <el-form-item label="介绍">
                                    <span>{{ props.row.info }}</span>
                                </el-form-item>
                            </el-form>
                            <hr>
                            <el-form label-position="left" inline class="demo-table-expand">
                              <h3>管理员</h3>
                                <el-form-item label="名称">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <span>{{ props.row.password }} s</span>
                                </el-form-item>
                                <el-form-item label="邮箱">
                                    <span>{{ props.row.email }} s</span>
                                </el-form-item>
                                <el-form-item label="电话">
                                    <span>{{ props.row.phone }}</span>
                                </el-form-item>
                                <el-form-item label="介绍">
                                    <span>{{ props.row.info }}</span>
                                </el-form-item>
                            </el-form>
                            <hr>
                            <el-form label-position="left" inline class="demo-table-expand">
                              <h3>用户</h3>
                                <el-form-item label="名称">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <span>{{ props.row.password }} s</span>
                                </el-form-item>
                                <el-form-item label="邮箱">
                                    <span>{{ props.row.email }} s</span>
                                </el-form-item>
                                <el-form-item label="电话">
                                    <span>{{ props.row.phone }}</span>
                                </el-form-item>
                                <el-form-item label="介绍">
                                    <span>{{ props.row.info }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="id" prop="id">
                    </el-table-column>
                    <el-table-column label="用户id" prop="userid">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="updaleByid(scope.$index)" type="text" size="small">编辑</el-button>
                            <el-button @click="deldata(scope.row.ID)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
          </div>
        </div>
    </div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
export default {
  data() {
    return {
      paths: [],
      name: "代理商管理",
      tableData: []
    };
  },
  components: {
    breadcrumb
  }
};
</script>

<style scoped>
</style>
