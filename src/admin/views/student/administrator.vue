<template>
    <div class="container-fluid" >
      <el-alert
         title="管理员可以划分角色权限,后台是管理员才可以登陆进来的"
          type="warning"
          show-icon>
        </el-alert>
        <div class="row" >
            <breadcrumb v-bind:paths="paths" :name="name" ></breadcrumb>
        </div>
        <div class="row msg">
      <div class="col" >
            <el-button-group>
      <el-button type="primary" @click="showdialo()" icon="el-icon-edit">添加管理员</el-button>
    </el-button-group>
      </div>
    </div>
  <div class="row msg" >
    <div class="col" >
    <el-table class="text-center"  :data="tableData" border :height="700" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
        </template>
      </el-table-column>
      <el-table-column  fixed prop="userid" sortable label="用户ID" width="150">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="usertype" sortable label="用户类型" width="120">
      </el-table-column>
      <el-table-column prop="phonenum" sortable label="手机号码" width="120">
      </el-table-column>
      <el-table-column prop="useremail" label="邮箱" width="120">
      </el-table-column>
      <el-table-column  prop="medal" sortable label="奖章" width="150">
      </el-table-column>
      <el-table-column prop="totalspend" sortable label="消费金额" width="120">
      </el-table-column>
      <el-table-column prop="lastlogintime" sortable label="最近登陆" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px" v-text="scope.row.lastlogintime"></span>
        </template>
      </el-table-column>
      <el-table-column prop="agent" label="agent" width="120">
      </el-table-column>
      <el-table-column prop="level" label="level" width="120">
      </el-table-column>
      <el-table-column prop="packegeid" label="邮编" width="120">
      </el-table-column>
      <el-table-column prop="area" label="区号" width="120">
      </el-table-column>
      <el-table-column fixed="right"  label="操作" width="180">
        <template slot-scope="scope">
          <router-link :to="{ name:'watchuser', params: { userid: scope.row.userid } }" class=" btn btn-sm btn-info" size="small">查看</router-link>
          &nbsp;
          <el-button @click="updateuser(scope.$index)" type="warning" class="el-icon-edit-outline" size="small"></el-button>
          <el-button type="danger" @click="deldata({uid:scope.row.userid})" icon="el-icon-delete" title="删除" size="small"></el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
      <el-dialog title="添加代理商" :visible.sync="dialogFormVisible">
      <el-form v-if="form" :model="form">
        <el-form-item label="代理商名称" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="代理商密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="代理商手机" :label-width="formLabelWidth">
          <el-input v-model="form.phonenum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="代理商邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.useremail" auto-complete="off"></el-input>
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

import breadcrumb from "@/components/breadcrumb.vue";
export default {
  name: 'administrator',
  data() {
    return {
      paths: [

      ],
      name: "管理员管理",
      tableData: [],
      dialogFormVisible: false,
      form: null
    };
  },
  methods: {
    onSubmit() {

    },
    showdialo() {}
  },
  components: {
    breadcrumb
  }
};
</script>

<style scoped>
</style>
