<template>
  <div class="container-fluid bgcolor">
    <div class="row">
      <div class="card text-white bg">
        <img class="card-img" src="https://hterobot-image.oss-cn-beijing.aliyuncs.com/image/web201800824/banner.jpg" alt="Card image">
        <div class="card-img-overlay">
          <div class="col-md-3 bg-white login offset-md-7 fr-white">
            <p class="card-text text-center p-color">人工智能探索者</p>
            <h1 class="card-title text-center h-color"><b>哈工科教</b></h1>
            <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <div class="form-group">
                <input class="form-control" type="text" placeholder="手机号" @keyup.13="submitForm()" v-model="ruleForm2.loginID"
                  auto-complete="off">
              </div>
              <div class="form-group">
                <input class="form-control" type="password" placeholder="密码" @keyup.13="submitForm()" v-model="ruleForm2.password"
                  auto-complete="off">
              </div>
              <div class="form-group">
                <el-button type="primary" class="btn-block" @click="submitForm()">登录</el-button>
              </div>
              <div class="form-group elsever clearfix">
                <div class="f-left">
                   
                  <p class="weixinlogin"><i class="icon iconfont icon-weixin-"></i><a href="/wechat/pc/login">微信登陆</a></p>
                </div>
                <div class="f-right">
                  <span class="sp-an chead" @click="dialogFormVisible = true" style="color:#1d559e;">忘记密码</span>
                </div>
              </div>
              <div class="form-group">
                <p v-if="error" class="text-danger">账号或者密码不正确</p>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <el-dialog width="450px" title="微信登陆" :visible.sync="innerVisible" center append-to-body>
      <div style="border:1px solid #000; padding: 2px; width:305px; height:305px; margin:5px auto; ">
        <canvas id="wxcode1">
        </canvas>
      </div>
      <h6 align=center>请使用微信扫描二维码登录</h6>
      <h6 align=center>“哈工科教云课堂”</h6>
    </el-dialog>
    <div class="row">
      <img src="https://hterobot-image.oss-cn-beijing.aliyuncs.com/image/web201800824/tiximokuai.jpg" width="100%"
        height="100%" alt="Responsive image">
    </div>
    <div class="row system"></div>
    <div class="row">
      <div class="col">
        <div class="container breadth">
          <div class="row">
            <div class="col">
              <img src="https://hterobot-image.oss-cn-beijing.aliyuncs.com/image/web201800824/1.png" class="img-fluid"
                alt="Responsive image">
            </div>
          </div>
          <div class="row mga bg-white pd">
            <div class="col activity">
              哈工教员与孩子一起活动
              <br>
              7月3日&nbsp;&nbsp; <span class="kwe"> 贵阳&nbsp;2018</span>
            </div>
            <div class="col text-right">
              <el-button round>贵州现场反馈</el-button>
            </div>
          </div>
          <div class="row mga around">
            <div class="col">
              <div class="letalsm1">
                <img src="https://hterobot-image.oss-cn-beijing.aliyuncs.com/image/web201800824/2.png" class="img-fluid"
                  alt="">
                <p class="settime">2018.5.18 Pittsburgh</p>
                <p class="pm"></p>
              </div>
              <div class="letalsm1">
                <img src="https://hterobot-image.oss-cn-beijing.aliyuncs.com/image/web201800824/4.png" class="img-fluid"
                  alt="">
                <p class="settime">2017.9 北京</p>
                <p class="pm"></p>
              </div>
            </div>
            <div class="col">
              <div class="letalsm1">
                <img src="https://hterobot-image.oss-cn-beijing.aliyuncs.com/image/web201800824/3.png" class="img-fluid"
                  alt="">
                <p class="settime">2017.6 山东</p>
                <p class="pm"></p>
              </div>
              <div class="letalsm1">
                <img src="https://hterobot-image.oss-cn-beijing.aliyuncs.com/image/web201800824/5.png" class="img-fluid"
                  alt="">
                <p class="settime">2018.5 美国</p>
                <p class="pm"></p>
              </div>
            </div>
          </div>
          <div class="row padds2">
            <div class="col text-center">
              <el-button type="primary" icon="el-icon-refresh" class="more">查看更多</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col bg-dark">
        <div class="card bg-dark  text-white" id="huiyuan">
          <img src="https://hterobot-image.oss-cn-beijing.aliyuncs.com/image/web201800824/会员故事.png" class="img-fluid"
            alt="">
          <div class="card-img-overlay row justify-content-end">
            <div class="col-6 align-at">
              <p>Intel ISEF —— 全球顶级青少年科技与工程类大赛 四等奖 （打破中国队参赛记录） </p>
              <p>第37届北京青少年科技创新大赛 一等奖</p>
              <p>北京市市长奖</p>
              <p>第32届全国青少年科技创新大赛 一等奖</p>
              <p>茅以升科技奖</p>
              <p>第32届北京学生科技节 初中组 二等奖</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row jiameng">
      <div class="col">
        <div class="container">
          <div class="row">
            <div class="col">
              <img src="https://hterobot-image.oss-cn-beijing.aliyuncs.com/image/web201800824/guang.png" class="img-fluid"
                alt="">
              <p class="homejm">
                广东加盟
              </p>
            </div>
            <div class="col">
              <img src="https://hterobot-image.oss-cn-beijing.aliyuncs.com/image/web201800824/gui.png" class="img-fluid"
                alt="">
              <p class="homejm">
                贵州加盟
              </p>
            </div>
            <div class="col">
              <img src="https://hterobot-image.oss-cn-beijing.aliyuncs.com/image/web201800824/shan.png" class="img-fluid"
                alt="">
              <p class="homejm">
                山东加盟
              </p>
            </div>
            <div class="col">
              <img src="https://hterobot-image.oss-cn-beijing.aliyuncs.com/image/web201800824/bei.png" class="img-fluid"
                alt="">
              <p class="homejm">
                北京加盟
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="container">
          <div class="row">
            <div class="col text-center">
              <p class="concern">关注我们</p>
              <ul class="ul">
                <li><a href="/#/login">首页</a></li>
                <li><a href="/about.html">关于我们</a></li>
                <!-- <li><a href="/download.html">软件下载</a></li> -->
                <li><a href="/">投资合作</a></li>
              </ul>
              <p class="relieve">联系电话：010-8648-3069</p>
              <p class="relieve">地址：北京市上奥世纪中心A座</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :close-on-click-modal=false id="resetpass" width="575px" title="" :custom-class="aab" :visible.sync="dialogFormVisible"
      :top="total">
      <resetpassword v-bind:guabbi="guabbi"></resetpassword>
    </el-dialog>
    <leftNav></leftNav>
  </div>

</template>

<script>
import { mapActions } from "vuex";
import QRCode from "qrcode";
import leftNav from "@/components/leftNav.vue";
import resetpassword from "./resetpassword.vue";
import { asyncgetLoginQRCode } from "../../../plugins/api.js";
import { delayed } from "../../../plugins/utils.js";
export default {
  name: "login",
  components: {
    leftNav,
    resetpassword
  },
  data() {
    return {
      dialogFormVisible: false,
      ruleForm2: {
        loginID: null,
        password: null
      },
      innerVisible: false,
      error: 0,
      rules: {
        userid: [
          {
            required: true,
            message: "请输入用户ID",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      aab: "aab",
      total: "20vh",
      temp: Date.parse(new Date()),
    };
  },
    watch: {
    innerVisible(v) {
      if (v == false) {
        this.socket.close([1000]);
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        let i = await this.login(this.ruleForm2);
        if (i) {
          this.$router.push("/myclass");
        } else {
          this.error = 1;
        }
      } catch (err) {
        this.$message.error(`错了哦，${err}`);
      }
    },
    guabbi() {
      this.dialogFormVisible = false;
    },
    useqrcode(text) {
      var canvas = document.getElementById("wxcode1");
      QRCode.toCanvas(
        canvas,
        text,
        {
          width: 300,
          height: 300,
          colorDark: "#000000",
          colorLight: "#ffffff"
        },
        function(error) {
          if (error) console.error(error);
          console.log("success!");
        }
      );
    },
    wxsocket() {
      let name = this.temp;
      let host = location.host;
      if ("WebSocket" in window) {
        this.socket = new window.WebSocket(`ws://${host}/websocket/${name}`);
      } else if ("MozWebSocket" in window) {
        this.socket = new window.MozWebSocket(`ws://${host}/websocket/${name}`);
      } else {
        this.socket = new window.SockJS(`https://${host}/websocket/${name}`);
      }

      this.socket.addEventListener("message", async event => {
        if (event.data.error) {
          this.$message("没有此用户");
        } else {
          this.$message("登陆成功");
          await delayed(300);
          this.socket.close([1000]);
          this.$router.push("/myclass");
        }
        this.innerVisible = false;
        this.centerDialogVisible = false;
      });
    },
    ...mapActions(["login"])
  }
};
</script>
<style scoped>
@font-face {
  font-family: PangMenZhengDao;
  src: url(/public/font/庞门正道标题体2.0增强版.ttf);
}
.clearfix {
  contain: "";
  clear: both;
  display: block;
}

.bg-white {
  color: black;
}

.bg {
  border: none;
  border-radius: 0px;
}

.login {
  padding-top: 25px;
  padding-bottom: 35px;
  border-radius: 0.25rem;
  margin-top: 71px;
}

.pd {
  /* padding: 25px; */
  padding: 20px;
  width: 100%;
  margin: auto;
}

.homejm {
  margin-top: 16px;
  margin-left: 45px;
  text-align: right;
  border-bottom: 1px solid #aaa;
  font-family: MicrosoftYaHei;
  font-size: 18px;
  letter-spacing: 6px;
  color: #000;
}
.ul,
li {
  display: inline-block;
  padding: 27px;
}

.button0 {
  background-color: rgba(0, 0, 0, 0);
}

.padds2 {
  padding-bottom: 35px;
  margin-top: 54px;
  margin-bottom: 42px;
}

#huiyuan {
  padding: 0;
  border: 0;
  margin: 0;
}

.col-6 {
  position: absolute;
  top: 35%;
  font-size: 1em;
}
.align-at {
  margin-left: -25px;
}

.letalsm1 {
  /*相对定位点*/
  padding-top: 7px;
  padding-bottom:-15px;
  position: relative;
}

.letalsm {
  padding-bottom: 25px;
  padding-top: 25px;
}

.settime {
  position: relative;
  bottom: 52px;
  right: -1px;
  margin-bottom: 0px;
  color: white;
  text-align: right;
  margin-left: 50%;
  padding-right: 35px;
}
.pm {
  /*下划线*/
  position: absolute;
  bottom: 27px;
  right: 30px;
  width: 265px;
  height: 2px;
  border-bottom: solid 1px #ffffff;
}
.more {
  width: 208px;
  height: 51px;
  background-color: #2e71f2;
  border-radius: 23px;
}
.fr-white {
  width: 23%;
  height: 395px;
  border-radius: 10px;
  margin: 190px 0 0 67%;
}

.login {
  padding: 25px;
}

.p-color {
  font-family: PangMenZhengDao;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 27px;
  letter-spacing: 2px;
  color: #1d559e;
}

.h-color {
  font-size: 70px;
  color: #1d559e;
  font-family: PangMenZhengDao;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -1px;
  margin-top: -15px;
}

.form-control {
  border-radius: 12px;
  height: 46px;
  color: #a3a3a3;
}

.btn-block {
  height: 46px;
  background-color: #1d559e;
  border-radius: 10px;
  font-family: MicorsoftYaHei;
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 4px;
  color: #ffffff;
}

.elsever {
  width: 90%;
  margin: auto;
  height: 14px;
  /* border-top: 1px solid #d9d9d9; */
}

.f-left,
.f-right {
  width: 45%;
  float: left;
}

.f-right {
  float: right;
}

.weixinlogin,
.sp-an {
  font-size: 14px;
  color: #a3a3a3;
  font-family: MicorsoftYaHei;
  cursor: pointer;
}
.weixinlogin{
   position: relative;
}
.weixinlogin span{
  display:inline-block;
  position: absolute;
  bottom:11px;
  left:32%;
}

.sp-an {
  height: 45px;
  float: right;
  line-height:49px;
}

.icon {
  font-size: 30px;
  color: #10c904;
  margin-left: 5%;
}

.register {
  color: #1d559e;
}

@media only screen and (max-width: 1366px) {
  .h-color {
    font-size: 50px;
  }

  .f-left,
  .f-right {
    width: 50%;
  }

  .sp-an {
    line-height: 50px;
    color: #a3a3a3;
    font-size: 12px;
  }
}

/*以下改动*/
.bgcolor {
  background-color: #f9f9f9;
}
.bg,.bg,img{
  width:100%;
}
.card-img{
  border-radius:0;
}
.el-dialog__wrapper {
  overflow: visible;
}
.system {
  height: 90px;
}

.activity,
.kwe,
.el-button.is-round,
.concern,
.relieve {
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 3px;
}
.activity {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  line-height: 27px;
  color: #3c3d41;
}
.kwe {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  line-height: 27px;
  letter-spacing: 0px;
  color: #aaaaaa;
}
.el-button.is-round {
  border-radius: 10px;
  margin-top: 1px;
  width: 185px;
  height: 51px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  text-align: center;
  line-height: 25px;
  color: #3c3d41;
  border: solid 1px #dddddd;
}
.breadth {
  width: 1110px;
  padding: 0px;
}
.around {
  margin-top: 21px;
}
.jiameng {
  margin-top: 109px;
  margin-bottom: 96px;
}
.concern {
  font-family: PangMenZhengDao;
  font-size: 83px;
  letter-spacing: -3px;
  color: #3c3d41;
}
.ul li a {
  font-family: MicrosoftYaHei;
  font-size: 24px;
  letter-spacing: 4px;
  color: #3c3d41;
}
.relieve {
  font-family: MicrosoftYaHei;
  font-size: 20px;
  letter-spacing: 6px;
  color: #3c3d41;
}
</style>
<style>
#resetpass .aab {
  border-radius: 10px;
}
</style>