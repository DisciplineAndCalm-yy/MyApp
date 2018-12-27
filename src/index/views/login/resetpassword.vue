<template>
  <form class="container-fluid" :class="setting()">
    <div v-show="a1">
      <div class="row">
        <div class="zc1 col borders"></div>
        <div class="zc col f-text">找回密码</div>
        <div class="zc1 col borders"></div>
      </div>
      <div class="form-group power">
        <el-select class="btn-block" v-model="ruleForm.aleph">
          <el-option v-for="item in qh" :key="item.value" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="form-group power">
        <el-input v-model="ruleForm.phonenum" name="phonenum" placeholder="请输入手机号码">
          <i slot="suffix" class="el-input__icon icon-yonghu icon iconfont"></i>
        </el-input>
        <el-collapse-transition>
          <div class="tishi" v-show="show1">
            <div>
              <i class="icon iconfont" :class="ichange('err1')"></i> &nbsp;
              <span v-text="errs.tel"></span>
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <div class="form-group row power f-ng">
        <el-input class="col-6 duanxin" v-model="yzm" placeholder="请输入短信验证码"></el-input>
        <button
          class="col-6 btn btn-block btn-info btn-size"
          v-if="isTel"
          type="button"
          @click="findcode()"
        >获取验证码</button>
        <button
          class="col-6 btn btn-block btn-size"
          v-else
          disabled
          type="button"
          v-text="times()"
          style="font-size:14px;"
        ></button>
        <el-collapse-transition>
          <p class="send-yz" v-show="ma">
            点击获取验证码，短信将发送至安全手机*******
            <span>{{ma}}</span>
          </p>
        </el-collapse-transition>
      </div>
      <el-collapse-transition>
        <div class="tishi yanzheng" v-show="show5">
          <div>
            <i class="icon iconfont icon-cuowu text-danger"></i> &nbsp;验证码错误
          </div>
        </div>
      </el-collapse-transition>
      <div class="form-group" style="margin-top:20px;">
        <button v-if="isUser" class="btn btn-block bt-next power" type="button" @click="next1()">下一步</button>
        <button v-else class="btn btn-block btn-info next" disabled type="button">下一步</button>
      </div>
    </div>
    <div v-show="a2">
      <div class="row">
        <div class="zc1 col-sm-3"></div>
        <div class="zc col-sm-6 text-center pw-txt">设置新密码</div>
        <div class="zc1 col-sm-3"></div>
        <p class="middle">
          请设置
          <span>{{shou}}</span>****
          <span>{{ma}}</span>的新密码，建议使用数字、字母、字符的组合密码，提高密码安全等级
        </p>
      </div>
      <!-- <p>请设置<span v-text="teladd()"></span>的新密码</p> -->
      <div class="form-group change-pwd">
        <el-input
          type="password"
          id="pass1"
          v-model="ruleForm.password"
          name="password"
          placeholder="请输入密码"
        >
          <i
            v-on:mousedown=" mousedown1(1)"
            v-on:mouseup="mouseup1(1)"
            class="icon iconfont icon-bukejian el-input__icon chead"
            slot="suffix"
          ></i>
        </el-input>
        <el-collapse-transition>
          <div class="tishi" v-show="show2">
            <div>
              <i class="icon iconfont" :class="ichange('err2')"></i> &nbsp;不能包含空格
            </div>
            <div>
              <i class="icon iconfont" :class="ichange('err3')"></i>
              &nbsp;长度为8-16个字符
            </div>
            <div>
              <i class="icon iconfont" :class="ichange('err4')"></i>
              &nbsp;必须包含字母和数字
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <div class="form-group change-pwd">
        <el-input type="password" id="pass2" v-model="ruleForm.password2" placeholder="请再次输入密码">
          <i
            v-on:mousedown="mousedown1(2)"
            v-on:mouseup="mouseup1(2)"
            class="icon iconfont icon-bukejian el-input__icon chead"
            slot="suffix"
          ></i>
        </el-input>
        <el-collapse-transition>
          <div class="tishi" v-show="show3">
            <div>
              <i class="icon iconfont" :class="ichange('err5')"></i> &nbsp;两次输入不同
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <div class="form-group change-pwd" style="margin-top:20px;">
        <button class="btn btn-block btn-info next-step" type="button" @click="next2()">下一步</button>
      </div>
    </div>
    <div v-show="a3">
      <div class="row">
        <div class="zc1 col-sm-3"></div>
        <div class="zc col-sm-6 text-center">密码修改成功</div>
        <div class="zc1 col-sm-3"></div>
      </div>
      <div style="margin-top:25px;margin-button:25px;" class="form-group text-center">
        <i class="icon iconfont icon-zhengque text250"></i>
      </div>
      <div class="form-group text-center">
        <span>3秒后可自动关闭</span>
      </div>
    </div>
  </form>
</template>

<script>
import {
  asyncfind_getCode,
  asyncfind_checkCode,
  asyncfind_findPassword
} from "../../../plugins/api.js";
import $ from "jquery";

function propclick() {
  $("#pass1").prop("type", "password");
  $("#pass2").prop("type", "password");
}
export default {
  name: "resetpassword",
  beforeMount() {
    document.addEventListener("mouseup", propclick, false);
  },
  beforeDestroy() {
    document.removeEventListener("mouseup", propclick, false);
  },
  data() {
    return {
      isUser: false,
      isTel: false,
      ruleForm: {
        aleph: "0086",
        phonenum: "",
        password: "",
        password2: "",
        // yzm:""
      },
      yzm: "",
      show1: false,
      show2: false,
      show3: false,
      show5: false,
      qh: [
        {
          aleph: "zg",
          continent: 0,
          id: "0086",
          length: 11,
          pinyin: "zhongguo",
          value: "中国 0086"
        },
        {
          aleph: "zgtw",
          continent: 0,
          id: "0886",
          length: 9,
          pinyin: "zhongguotaiwan",
          value: "中国台湾 0886"
        }
      ],
      iserr: {
        err1: true,
        err2: false,
        err3: false,
        err4: false,
        err5: false
      },
      errs: {
        tel: "手机号不能为空"
      },
      ma: false,
      shou: false,
      a1: true,
      a2: false,
      a3: false,
      time: 60,
      timer: Object
    };
  },
  watch: {
    "ruleForm.password"() {
      this.jiance(2);
      this.jiance(3);
    },
    "ruleForm.password2"() {
      this.jiance(3);
    },
    "ruleForm.phonenum"(v) {
      if (v) {
        this.jiance(1);
      } else {
        this.isTel = false;
      }
    },
    time(v) {
      if (v == 60) {
        this.isTel = true;
      } else {
        this.isTel = false;
      }
    },
    "iserr.err1": function(v) {
      this.show1 = !v;
      if (v) {
        this.errs.tel = "ok";
        this.isTel = true;
      } else {
        this.isTel = false;
      }
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
    async findcode() {
      try {
        await asyncfind_getCode({ phonenumber: this.ruleForm.phonenum });
        var a = this.hc;
        this.timer = setInterval(a, 1000);
        this.isUser = true;
      } catch (err) {
        this.iserr.err1 = false;
        this.errs.tel = err;
      }
      this.ma = this.ruleForm.phonenum.substring(7, this.ruleForm.phonenum);
      this.shou = this.ruleForm.phonenum.substring(0, 3);
    },
    times() {
      if (this.time == 60) {
        return "获取验证码";
      } else {
        return `${this.time} s`;
      }
    },
    hc() {
      var a = this.time;
      this.time--;
      if (a == 0) {
        clearInterval(this.timer);
        this.time = 60;
      }
    },
    ichange: function(i) {
      if (this.iserr[i]) {
        return "icon-zhengque text-success";
      } else {
        return "icon-cuowu text-danger";
      }
    },
    jiance(i) {
      if (i === 1) {
        this.iserr.err1 = jianphone(this.ruleForm.phonenum);
        if (this.iserr.err1 == false) {
          this.errs.tel = "手机格式不正确";
        } else {
          this.isTel = true;
        }
      }

      if (i === 2) {
        this.iserr.err2 = jiankongge(this.ruleForm.password);

        if (
          this.ruleForm.password.length >= 8 &&
          this.ruleForm.password.length <= 16
        ) {
          this.iserr.err3 = true;
        } else {
          this.iserr.err3 = false;
        }
        this.iserr.err4 = jianliangzhong(this.ruleForm.password);
      }

      if (i === 3) {
        if (
          this.ruleForm.password === this.ruleForm.password2 &&
          this.ruleForm.password2 !== "" && this.ruleForm.yzm !== "" && this.ruleForm.phonenum !== ""
        ) {
          this.iserr.err5 = true;
        } else {
          this.iserr.err5 = false;
        }
        this.show3 = !this.iserr.err5;
      }

      function jiankongge(data) {
        var reg = new RegExp(/^\s*(\S+)\s*$/);
        if (reg.test(data)) {
          return true;
        } else {
          return false;
        }
      }

      function jianliangzhong(data) {
        var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
        if (reg.test(data)) {
          return true;
        } else {
          return false;
        }
      }

      function jianphone(data) {
        var reg = new RegExp(/^1[34578]\d{9}$/);
        if (reg.test(data)) {
          return true;
        } else {
          return false;
        }
      }
    },
    teladd() {},
    async next1() {
      if (this.yzm) {
        try {
          await asyncfind_checkCode({ yzm: this.yzm });
          this.a1 = false;
          this.a2 = true;
        } catch (err) {
          this.show5 = true;
        }
      } else {
        this.$alert("验证码不能为空");
      }
    },
    async next2() {
      for (var err in this.iserr) {
        if (this.iserr[err] == false) {
            this.$alert("信息不完整");
             return false;
        }
      }
      if (this.ruleForm.password == this.ruleForm.password2) {
        try {
          await asyncfind_findPassword({
            password: this.ruleForm.password,
            password2: this.ruleForm.password2,
            phonenum: this.ruleForm.phonenum,
            // yzm: this.ruleForm.yzm,
          });
          this.a2 = false;
          this.a3 = true;
          let guabbi = this.$attrs.guabbi;
          setTimeout(guabbi, 3000);
        } catch (err) {
          this.$alert(err);
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
    },
    mouseup1: function(i) {
      if (i === 1) {
        $("#pass1").prop("type", "password");
      }
      if (i === 2) {
        $("#pass2").prop("type", "password");
      }
    },
    setting() {
      if (this.a1 === true) {
        return "a1-box";
      } else if (this.a2 === true) {
        return "a2-box";
      } else {
        return "all-box";
      }
    }
  }
};
</script>

<style scoped>
.text250 {
  font-size: 86px;
  color: RGB(9, 186, 7);
}
.zc1 {
  height: 15px;
  border-bottom: 1px solid RGB(247, 247, 247);
}

.zc {
  font-size: 20px;
  padding-left: 20px;
  padding-right: 20px;
}

.zc1 {
  height: 15px;
  border-bottom: 1px solid RGB(247, 247, 247);
}

span {
  display: inline-block;
}
/*以下改动*/
.a1-box {
  height: 415px;
  margin-top: -25px;
}
.a2-box {
  height: 356px;
  margin: auto;
}
.middle {
  width: 80%;
  margin: 10px 0 0 59px;
  line-height: 20px;
  font-size: 12px;
}
.middle span {
  color: #1d569d;
}
.change-pwd {
  width: 82%;
  margin: 20px auto;
}
.next-step {
  margin-top: 25px;
}
.borders {
  border-bottom: 1px solid #e8e8e8;
}
.f-text {
  margin-left: 47px;
  font-family: MicorsoftYaHei;
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  color: #5d5c5c;
}
.power {
  width: 70%;
  height: 42px;
  margin: 36px auto;
}
.btn-info {
  background-color: #1d559e;
}
.f-ng {
  margin-left: 15%;
}
.duanxin {
  padding-left: 0;
  width: 30%;
}
.btn-size,
.next {
  cursor: pointer;
}
.btn-size {
  height: 42px;
  background-color: #1d559e;
  border-radius: 2px;
  color: white;
}
.send-yz {
  width: 95%;
  margin-top: 15px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 1px;
  color: #a0a0a0;
  font-family: MicrosoftYaHei;
}
.next {
  width: 70%;
  height: 46px;
  margin: 85px auto;
  background-color: #1d569d;
  border: none;
}
.bt-next {
  margin-top: 30px;
  background-color: #1d569d;
  color: white;
  margin-top: 35px;
}
.yanzheng {
  width: 73%;
  margin: 12px auto;
}
</style>