<template>
    <el-aside width="200px" style="background-color: #545c64">
    <el-menu :router=true  background-color="#545c64" text-color="#fff"   :collapse="isa" :default-active="key"  class="el-menu-vertical-demo"     active-text-color="#ffd04b" >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>课程管理</template>
          <el-menu-item route="/watchcourse" index="1-1">查看课程</el-menu-item>
          <el-menu-item route="/watchpackage" index="1-2">查看课程包</el-menu-item>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title"><i class="el-icon-news"></i>用户管理</template>
        <el-menu-item route="/user" index="1-1">用户管理</el-menu-item>
        <!-- <el-menu-item route="/administrator" index="1-6">管理员管理</el-menu-item>
        <el-menu-item route="/agent" index="1-5">代理商管理</el-menu-item>
        <el-menu-item route="/school" index="1-2">学校管理</el-menu-item>
        <el-menu-item route="/teacher" index="1-3">老师管理</el-menu-item>
        <el-menu-item route="/student" index="1-4">学生管理</el-menu-item> -->
      </el-submenu>
      <el-menu-item index="/oss" >
        <i class="el-icon-document"></i>
        <span slot="title">图片上传管理</span>
      </el-menu-item>
          <el-submenu index="4">
        <template slot="title"><i class="el-icon-message"></i>消息回复</template>
          <el-menu-item route="/message" index="1-1">用户课程消息</el-menu-item>
      </el-submenu>
            <el-submenu index="5">
        <template slot="title"><i class="el-icon-message"></i>视频管理</template>
          <el-menu-item route="/videos1" index="1-1">查看视频</el-menu-item>
      </el-submenu>

          <!-- 权限管理 -->
      <!-- <el-submenu index="7">
        <template slot="title"><i class="el-icon-sold-out"></i>权限管理</template>
        <el-menu-item route="/adminrole" index="1-1">角色管理</el-menu-item>
        <el-menu-item route="/gobalbuyer" index="1-2">查看权限</el-menu-item>
      </el-submenu> -->
      <el-menu-item index="8">
        <i class="el-icon-setting"></i>
        <span slot="title">导航</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "left",
  data() {
    return {
      key: "/",
      isa: false
    };
  }
};
</script>

<style scoped>
.aside {
  max-width: 256px;
  min-width: 256px;
  width: 256px;
}
</style>
