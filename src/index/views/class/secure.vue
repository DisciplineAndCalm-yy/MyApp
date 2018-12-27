<template>
  <el-main class="tk-main">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 col-lg-2  offset-lg-2 chead left-box">
          <h6 :class="active(1)" @click="nermt(1)"> &nbsp; 个人信息</h6>
          <h6 :class="active(2)" @click="nermt(2)"> &nbsp; 修改密码</h6>
          <h6 v-if="usertype == 'Agent'" :class="active(3)" @click="nermt(3)"> &nbsp; 子账号管理</h6>
          <h6 :class="active(4)" @click="nermt(4)"> &nbsp; 勋章</h6>
          <h6 v-if="usertype == 'Agent'" :class="active(5)" @click="nermt(5)"> &nbsp; 邀请码</h6>
          <!-- <h6 :class="active(6)" @click="nermt(6)">&nbsp; 关联微信</h6> -->
        </div>
        <div class="col-md-8 col-lg-8 col-sm-12">
          <div v-if="index == 2">
            <resetpass></resetpass>
          </div>
          <div v-else-if="index == 1">
            <myinfo></myinfo>
          </div>
          <div v-else-if="index == 3">
              <table  class="table col-lg-8 col-md-10 col-sm-12">
                <thead>
                  <tr>
                    <td scope="col">用户昵称</td>
                    <td scope="col">用户手机号</td>
                    <td scope="col">消费数额</td>
                    <td scope="col">最近登录</td>
                    <td scope="col">审核情况</td>
                  </tr>
                </thead>
                <tbody class="word">
                  <tr v-for="(v,i) in phIndex" :key="i">
                    <td v-text="v.username"></td>
                    <td v-text="v.phonenum"></td>
                    <td v-text="v.totalspend"></td>
                    <td v-text="v.lastlogintime"></td>
                    <td>
                      <button v-if="v.usertype =='Tourist' " class="btn btncolor" type="button" @click="shenhe(v)">审核</button>
                      <button v-if="v.usertype =='User' " disabled class="btn btngren" type="button">已审核</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" v-show="chnum" :total="chnum">
            </el-pagination>
            </div>
          <div v-else-if="index == 4">
            <medal v-bind:user="user"></medal>
          </div>
          <div v-else-if="index == 5">
            <div class="row">
              <table class="table col-lg-8 col-md-10 col-sm-12">
                <thead>
                  <tr class="header">
                    <th  scope="col">课程名称</th>
                    <th scope="col">注册链接</th>
                    <th scope="col">复制链接</th>
                    <th scope="col">剩余数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v,i) in inIndex" :key="i">
                    <th v-text="v.packegeName" class="word">1</th>
                    <td><a :href="href(v.key_ID, v.agent_ID)" class="widths">{{href(v.key_ID,
                        v.agent_ID).substring(17,href(v.key_ID, v.agent_ID))}}</a></td>
                    <td><button type="button" class="btn btn-sm btncolor" @click="copys(v)">复制</button></td>
                    <td v-text="v.count" ></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <el-pagination @current-change="chchange" layout="prev, pager, next" v-show="innum" :total="innum" class="col-lg-8 col-md-10 col-sm-12"
              style="text-align:right;">
            </el-pagination>
          </div>
          <div v-else-if="index == 6">
            <div class="col-md-4 col-md-6 WeChat">
              <p class="bang">绑定微信</p>
              <div class="row detail">
                <!-- <table class="table">
                    <tr>
                      <th class="got">昵称</th>
                      <th class="got">奎奎</th>
                      <th><el-button type="primary" class="guan">关联微信</el-button></th>
                    </tr>
                </table> -->
              </div>  
              <canvas id='webingcode' width="300" height="300"></canvas>
              <!-- <el-button type="primary">点击解绑微信</el-button> -->
              <!-- <div class="straps">{{}}</div> -->
            </div>
          </div>
        </div>
      </div>
      <input type="text" id="inputText">
    </div>
  </el-main>
</template>

<script>
import { mapActions, mapState } from "vuex";
import medal from "@/components/medals.vue";
import myinfo from "../secure/index.vue";
import resetpass from "../secure/resetpass.vue";
import QRCode from "qrcode";
import { asyncgetBindQRCode } from "../../../plugins/api.js";
import {
  asyncgetChildren,
  asyncgetInvite,
  asynccheckUser
} from "../../../plugins/api.js";
export default {
  data() {
    return {
      imageUrl: "",
      index: 1,
      invite: [],
      children: [],
      phIndex: [],
      chnum: 0,
      inIndex: [],
      innum: 0,
      socket: null
    };
  },
  async mounted() {
    if (this.user == null) {
      await this.session();
    }
  },
  computed: mapState(["username", "usertype", "user"]),
  watch: {
    async index(v) {
      if (v == 6) {
        try {
          const text = await asyncgetBindQRCode();
          this.useqrcode(text);
          this.wxsocket();
        } catch (err) {
           this.$alert("你已经绑定过微信了");
        }
       }else {
        if(this.socket){
          this.socket.close([1000]);
        }
      }
    }
  },
  methods: {
    wxsocket() {
      let name = this.user.userid;
      let host = location.host;
      if ("WebSocket" in window) {
        this.socket = new window.WebSocket(`ws://${host}/websocket/${name}`);
      } else if ("MozWebSocket" in window) {
        this.socket = new window.MozWebSocket(`ws://${host}/websocket/${name}`);
      } else {
        this.socket = new window.SockJS(`http://${host}/websocket/${name}`);
      }

      this.socket.addEventListener("message", event => {
        if (event.data.error) {
          this.$message("绑定失败");
        } else {
          this.$message("绑定成功");
          this.socket.close([1000]);
        }
      });
    },
    href(kid, uid) {
      return (
        "http://" +
        window.location.host +
        "/register.html?packegeid=" +
        kid +
        "&agent=" +
        uid
      );
    },
    active(i) {
      if (this.index == i) {
        return "h-bg text-white";
      }
    },
    handleCurrentChange(a) {
      this.phIndex = [];
      for (let v = a * 5 - 5; v < a * 5; v++) {
        this.phIndex.push(this.children[v]);
        if (v + 1 === this.children.length) {
          return;
        }
      }
    },
    async nermt(i) {
      this.index = i;
      if (i === 3) {
        this.children = await asyncgetChildren();
        this.phIndex = this.jisuan(this.children);
        this.chnum = Math.ceil(this.children.length / 5) * 10;
      } else if (i === 5) {
        this.invite = await asyncgetInvite();
        this.inIndex = this.jisuan(this.invite);
        this.innum = Math.ceil(this.invite.length / 5) * 10;
      }
    },
    shenhe(data) {
      this.$confirm(
        `是否审核用户id为${data.userid},用户名称为${data.username}`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(async () => {
        try {
          await asynccheckUser({
            uid: data.userid
          });
          this.$message({
            type: "success",
            message: "审核成功!"
          });
          for (let v of this.children) {
            if (v.userid == data.userid) {
              v.usertype = "User";
            }
          }

          for (let v of this.phIndex) {
            if (v.userid == data.userid) {
              v.usertype = "User";
            }
          }
        } catch (err) {
          this.$message({
            type: "info",
            message: "审核失败"
          });
        }
      });
    },
    chchange(a) {
      this.inIndex = [];
      for (let v = a * 5 - 5; v < a * 5; v++) {
        this.inIndex.push(this.invite[v]);
        if (v + 1 === this.invite.length) {
          return;
        }
      }
    },
    jisuan(data) {
      if (data.length <= 5) {
        return data;
      } else {
        let arr = [];
        for (let v = 0; v < 5; v++) {
          arr.push(data[v]);
        }
        return arr;
      }
    },
    useqrcode(text) {
      var canvas = document.getElementById("webingcode");
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
    logout() {
      this.$router.push("/login");
    },
    copys(v) {
      let str = this.href(v.key_ID, v.agent_ID);
      var inputText = document.getElementById("inputText");
      inputText.value = str;
      var currentFocus = document.activeElement;
      inputText.focus();
      inputText.setSelectionRange(0, inputText.value.length);
      document.execCommand("copy", true);
      currentFocus.focus();
      this.$message({
        message: "复制成功",
        type: "success"
      });
    },
    ...mapActions(["session"])
  },
  components: {
    medal,
    myinfo,
    resetpass
  }
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
.h-bg {
  background-color: #35c2e9;
}
h6 {
  line-height: 36px;
  font-size: 16px;
}

.container-fluid {
  margin-top: 8%;
}

.bcs {
  padding-left: 35px;
  padding-right: 35px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #000000;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

#inputText {
  position: fixed;
  top: 2000px;
}

.h370 {
  height: 400px;
}

/*以下改动*/
.bg-info {
  background-color: #35c2e9;
}
.left-box h6 {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  letter-spacing: 1px;
  color: #494949;
}

.bg-color {
  background-color: #35c2e9;
  border-radius: 2px;
}

.table thead th {
  text-align: center;
  border: 0;
}

.table td {
  border: 0;
  text-align: center;
}

th,
td {
  border: 0;
}

.header th,
.header th,
.word {
  font-family: MicrosoftYaHei;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 1px;
}

.header th,
.header td {
  font-size: 16px;
  color: #565656;
}

.word,
.word td {
  text-align: center;
  font-size: 14px;
  color: #7f7f7f;
}

.btncolor {
  background-color: #35c2e9;
}

.btngren {
  background-color: #2fd047;
}

.btncolor,
.btngren {
  width: 61px;
  height: 25px;
  line-height: 14px;
  color: white;
  font-size: 12px;
  border-radius: 2px;
}
/*绑定微信*/
.bang {
  text-align: left;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  letter-spacing: 1px;
  color: #565656;
}
.table th {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  letter-spacing: 1px;
  color: #7f7f7f;
}
.got {
  display: inline-block;
  margin: 10px 0 0 35px;
}
.guan {
  margin-left: 20px;
  background-color: #35c2e9;
  border: 1px solid #35c2e9;
}
</style>