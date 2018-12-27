<template>
   <div>
          <div class="form-group">
                <p class="pwd">更改密码</p>
          </div>
          <div class="form-group">
            <el-input type="password" id="pass1" v-model="ruleForm.oldPassword"  name="password" placeholder="请输入原密码">
              <i v-on:mousedown="mousedown1(1)" v-on:mouseup="mouseup1(1)" class="icon iconfont icon-bukejian el-input__icon chead" slot="suffix">
              </i>
            </el-input>
            <el-collapse-transition>
              <div class="tishi" v-show="show1">
                  <div><i class="icon iconfont" :class="ichange('err1')"></i> &nbsp;原始密码不正确</div>
              </div>
            </el-collapse-transition>
          </div>
          <div class="form-group">
            <el-input type="password" id="pass2" v-model="ruleForm.newPassword"  name="password" placeholder="请输入新密码">
              <i v-on:mousedown="mousedown1(2)" v-on:mouseup="mouseup1(2)" class="icon iconfont icon-bukejian el-input__icon chead" slot="suffix">
              </i>
            </el-input>
            <el-collapse-transition>
              <div class="tishi" v-show="show2">
                <div><i class="icon iconfont" :class="ichange('err2')"></i> &nbsp;不能包含空格</div>
                <div><i class="icon iconfont" :class="ichange('err3')"></i> &nbsp;长度为8-16个字符</div>
                <div><i class="icon iconfont" :class="ichange('err4')"></i> &nbsp;必须包含字母和数字</div>
              </div>
            </el-collapse-transition>
          </div>
          <div class="form-group">
            <el-input type="password"  id="pass3" v-model="password2" placeholder="请再次输入密码">
              <i v-on:mousedown="mousedown1(3)" v-on:mouseup="mouseup1(3)" class="icon iconfont icon-bukejian el-input__icon chead" slot="suffix">
              </i>
            </el-input>
            <el-collapse-transition>
              <div class="tishi" v-show="show3">
                <div><i class="icon iconfont" :class="ichange('err5')"></i> &nbsp;两次输入不同</div>
              </div>
            </el-collapse-transition>
          </div>
          <div class="form-group " style="margin-top:20px;">
            <button class="btn btn-info" type="button" @click="password()"> &nbsp; &nbsp; &nbsp; &nbsp;提交 &nbsp; &nbsp; &nbsp; &nbsp;</button>
          </div>
    </div>
</template>

<script>
import { asyncchangePassword } from "../../../plugins/api.js";
import $ from "jquery";
export default {
  data() {
    return {
      ruleForm: {
        newPassword: "",
        oldPassword: ""
      },
      password2: "",
      iserr: {
        err1: true,
        err2: false,
        err3: false,
        err4: false,
        err5: false
      },
      show1: false,
      show2: false,
      show3: false
    };
  },
  watch: {
    "ruleForm.newPassword"() {
      this.jiance(2);
      this.jiance(3);
    },
    password2() {
      this.jiance(3);
    },
    "iserr.err1": function(v) {
      this.show1 = !v;
    },
    "iserr.err2": function(v) {
      this.show2 = !(v && this.iserr.err3 && this.iserr.err4);
    },
    "iserr.err3": function(v) {
      this.show2 = !(v && this.iserr.err2 && this.iserr.err4);
    },
    "iserr.err4": function(v) {
      this.show2 = !(v && this.iserr.err3 && this.iserr.err2);
    },
    "iserr.err5": function() {
      this.show3 = !this.iserr.err5;
    }
  },
  methods: {
    async password() {
      if (this.ruleForm.oldPassword == "") {
        this.$message({
          message: "密码不能为空",
          type: "warning"
        });
        return;
      }
      for (let err in this.iserr) {
        if (this.iserr[err] == false) {
          this.$message({
            message: "信息没有填写完整",
            type: "warning"
          });
          return false;
        }
      }
      try {
        await asyncchangePassword(this.ruleForm);
        alert("修改成功");
        this.$router.push("/logout");
      } catch (err) {
        this.$message({
          message: "修改失败",
          type: "warning"
        });
        this.iserr = false;
      }
    },
    jiance(i) {
      if (i === 2) {
        this.iserr.err2 = jiankongge(this.ruleForm.newPassword);
        if (
          this.ruleForm.newPassword.length >= 8 &&  
          this.ruleForm.newPassword.length <= 16
        ) {
          this.iserr.err3 = true;
        } else {
          this.iserr.err3 = false;
        }
          this.iserr.err4 = jianliangzhong(this.ruleForm.newPassword);
      }

      if (i === 3) {
        if (
          this.ruleForm.newPassword === this.password2 &&
          this.password2 !== ""
        ) {
          this.iserr.err5 = true;
        } else {
          this.iserr.err5 = false;
        }
          this.show3 = !this.iserr.err5;
      }

      function jiankongge(data) {
        var reg = new RegExp(/^\s*(\S+)\s*$/);//匹配任何非空元素
        if (reg.test(data)) {
          return true;
        } else {
          return false;
        }
      }

      function jianliangzhong(data) {
        var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);//任意字母或数字
        if (reg.test(data)) {
          return true;
        } else {
          return false;
        }
      }
    },
    mousedown1: function(i) {
      if (i === 1) {
        $("#pass1").prop("type", "text");
      }
      if (i === 2) {
        $("#pass2").prop("type", "text");
      }
      if (i === 3) {
        $("#pass3").prop("type", "text");
      }
    },
    mouseup1: function(i) {
      if (i === 1) {
        $("#pass1").prop("type", "password");
      }
      if (i === 2) {
        $("#pass2").prop("type", "password");
      }
      if (i === 3) {
        $("#pass3").prop("type", "password");
      }
    },
    ichange:function(i) {
      if (this.iserr[i]) {
        return "icon-zhengque text-success"; //输入正确的样式
      } else {
        return "icon-cuowu text-danger";
      }
    }
  }
};
</script>

<style scoped>
.form-group {
  max-width: 360px;
}
/*更改密码*/
.pwd {
  font-size: 14px;
  color:#494949;
}
.btn-info{
  background-color:#35c2e9;
  border:1px solid #35c2e9;
}
</style>
