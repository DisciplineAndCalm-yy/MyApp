<template>
<div class="container-fluid">
  <div class="row" >
     <breadcrumb v-bind:paths="paths" v-bind:name="name" ></breadcrumb>
  </div>
  <div class="row msg" >
    <div class="col-lg-4" >
      <introduce v-if="user" v-bind:user="user" ></introduce>
    </div>
    <div class="col-lg-8" >
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane  label="用户课程详细信息" name="first">
          <userCourse v-if="user" v-bind:user="user" ></userCourse>
        </el-tab-pane>
        <el-tab-pane v-if="user?user.usertype == 'Agent': false"  label="代理商的课程包" name="second">
          <userPackage  v-bind:user="user" ></userPackage>
        </el-tab-pane>
        <el-tab-pane v-if="user?user.usertype == 'Agent': false"  label="子用户管理" name="third">

        <!-- {{tableData}} -->

        <div class="tablebox">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">用户id</th>
                <th scope="col">用户类型</th>
                <th scope="col">用户昵称</th>
                <th scope="col">用户手机号</th>
                <th scope="col">最近登录</th>
                <th scope="col">等级</th>
                <th scope="col">学校</th>
                <th scope="col">学号</th>
                <th scope="col">地区</th>
                <th scope="col">其他信息</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in tableData" :key="index">
              <tr>
                <td>{{item.userid}}</td>
                <td>{{item.usertype}}</td>
                <td>{{item.username}}</td>
                <td>{{item.phonenum}}</td>
                <td>{{item.lastlogintime}}</td>
                <td>{{item.level}}</td>
                <td>{{item.address}}</td>
                <td>{{item.stuid}}</td>
                <td>{{item.area}}</td>
                <td>{{item.info}}</td>
              </tr>
            </tbody>
          </table>
        </div>

          <!-- <el-table
              :data="tableData"
              style="width: 100%"
              height="320">
            <el-table-column
              prop="userid"
              label="用户id"
              width="80">
            </el-table-column>
            <el-table-column
              prop="usertype"
              label="用户类型"
              width="80">
            </el-table-column>
            <el-table-column
              fixed
              prop="username"
              label="用户昵称"
              width="80">
            </el-table-column>
            <el-table-column
              prop="phonenum"
              label="用户手机号"
              width="130">
            </el-table-column>
            <el-table-column
              prop="lastlogintime"
              label="最近登录"
              width="100">
            </el-table-column>
            <el-table-column
              prop="level"
              label="等级"
              width="50">
            </el-table-column>
            <el-table-column
              prop="address"
              label="学校"
              width="200">
            </el-table-column>
            <el-table-column
              prop="stuid"
              label="学号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="area"
              label="地区"
              width="80">
            </el-table-column>
            <el-table-column
              prop="info"
              label="其他信息"
              width="120">
            </el-table-column>
          </el-table> -->

        </el-tab-pane>
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" v-show="chnum" :total="chnum"></el-pagination>
      </el-tabs>
    </div>
  </div>
</div>
</template>

<script>
import introduce from "@/components/introduce.vue";
import userCourse from "./userCourse.vue";
import userPackage from "./userPackage.vue";
import breadcrumb from "@/components/breadcrumb.vue";
import { asyncgetUserByUser, allUser
//  asyncgetChildren 
 } from "../../../plugins/api.js";
export default {
  data() {
    return {
      paths: [
        {
          name: "查看用户",
          path: "/user"
        }
      ],
      name: this.$attrs.userid,
      user: null,
      activeName: "first",
      Id: '',
      tableData: [],
      testData: '',
      chnum: 0
    };
  },
  created() {

  },
  watch: {
    $route() {
      this.start();
    }
  },
  mounted() {
    this.start();
  },
  methods: {
    async getData() {
      this.testData = await allUser();
      this.Id = this.$route.params.userid;
      
      let j = 0;
      for(let i in this.testData) {
        if(this.testData[i].agent == this.Id) {
          this.tableData[j++] = this.testData[i]
        }
      }
    },

    async start() {
      let id = this.$attrs.userid;
      try {
        this.user = await asyncgetUserByUser({ uid: id });
        this.getData();
      } catch (err) {
        console.log(err);
      }
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  components: {
    introduce,
    userCourse,
    userPackage,
    breadcrumb
  }
};
</script>

<style scoped>

</style>
