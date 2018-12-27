<template>
  <div class="all">
    <div class="left">
       <img src="@/assets/mmexport1538713510720.jpg">
       <p>哈工科教后台登录</p>
    </div>
  <div class="main" v-bind:class="alls">
  <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <div class="form-group">
      <span class="spans">用户名:</span><input class="form-control" type="text" placeholder="手机号" @keyup.13="submitForm()" v-model="ruleForm2.loginID"
        auto-complete="off">
    </div>
    <div class="form-group">
      <span class="spans contol">密码:</span><input class="form-control" type="password" placeholder="密码" @keyup.13="submitForm()" 
        auto-complete="off" v-model="ruleForm2.password">
    </div>
    <span class="spans one">主题:</span>
    <el-radio-group v-model="radio2" class="model">
      <el-radio label="class1" class="label">主题一</el-radio>
      <el-radio label="class2">主题二</el-radio>
      <el-radio label="class3">主题三</el-radio>
    </el-radio-group>
    <div class="form-group-btn">
        <button type="button" class="btn-block" @click="submitForm()">登录</button>
      </div>
    <div class="form-group text-right">
       <span @click="dialogFormVisible = true" class="cr chead">忘记密码?</span>
    </div>
  </el-form>
</div>
<div style="clear:both"></div>
</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      radio2: 3,
      ruleForm2: {
        loginID: null,
        password: null
      },
      alls: "class1"
    };
  },
  watch: {
    radio2: function(value) {
      this.alls = value;
    }
  },
  methods: {
    ...mapActions(["login"]),
    async submitForm() {
      if (!this.ruleForm2.loginID && !this.ruleForm2.password) {
        this.$alert("输入的用户名和密码不能为空", "错误提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.ruleForm2.loginID) {
        this.$alert("输入的用户名不能为空!");
      } else if (!this.ruleForm2.password) {
        this.$alert("输入的密码不能为空!");
      } else {
        try {
          await this.login(this.ruleForm2);
          this.$router.push("/user");
        } catch (err) {
          this.$message({
            message: "" + err + "!",
            type: "warning"
          });
        }
      }
    },
    guabbi() {
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style scoped>
.all {
  width: 50%;
  margin: auto;
}
p {
  text-align: center;
  margin-top: 60px;
  color: #1d559e;
  font-size: 18px;
  font-family: 微软雅黑;
  text-shadow: 0 0 2px #1d559e;
  width: 100%;
}
.left {
  width: 20%;
  height: 190px;
  float: left;
  margin: 220px 0 0 31px;
}
.left img {
  width: 100%;
  height: 100%;
}
.main {
  width: 64%;
  height: 350px;
  margin: 180px 0 0 60px;
  float: left;
  background: url(../../../assets/1.jpg) no-repeat center/cover;
  background-size: cover;
  background-size: contain;
  border: 8px solid white;
  box-shadow: 0 0 20px #1d559e;
}
.demo-ruleForm {
  height: 100%;
}
.form-group {
  margin-top: 35px;
  padding: 0 30px 0 90px;
}
.form-group-btn {
  width: 60%;
  margin: 18px auto;
}
.form-control {
  font-size: 12px;
}
.spans {
  color: white;
  display: block;
  float: left;
  margin: 3px 0 0 -59px;
  font-size: 16px;
  font-weight: blod;
}
.btn-block {
  height: 35px;
  border-radius: 5px;
  background-color: white;
  border: none;
  color: #3365a7;
  cursor: pointer;
}
.cr {
  color: white;
  cursor: pointer;
}
.cr:hover {
  text-decoration: underline;
}
.contol {
  margin-left: -43px;
}
.model {
  margin: 15px 0 0 15px;
}
label {
  color: white;
}
.one {
  margin: 12px 0 0 48px;
}
.text-right {
  margin: 0px 70px 0 0;
}
@media screen and (max-width: 1200px) {
  .model {
    max-width: 48%;
  }
  .label {
    margin-left: 30px;
  }
  .left {
    display: none;
  }
  .main {
    width: 90%;
    margin: 110px auto;
  }
}
.class1 {
  background: url(../../../assets/2.jpg) no-repeat;
}
.class2 {
  background: url(../../../assets/1.jpg) no-repeat center/cover;
}
.class3 {
  background: url(../../../assets/3.jpg) no-repeat;
}
</style>
