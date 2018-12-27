<template>
    <el-container class="marginTop"><!--border-top-->
        <!-- <el-dialog width="36%" title="请使用下方微信二维码付款" :visible.sync="innerVisible" center append-to-body :custom-class="height"
            :top="top">
            <canvas id="wxcode"></canvas>
            <div>
                <p class="text-center saoma">打开微信【扫一扫】按提示进行付款</p> -->
                <!-- <button class="btn btn-info btn-block text-center" type="button" @click="innerVisible = false">付款完成后请点击这里</button> -->
                <!-- <p class="operata">请在2小时之内完成操作，过期后请返回页面重新购买</p>
            </div>
        </el-dialog> -->
        <el-main class="elmain">
            <!-- <div class="row row-dialog">
                <div class="col text-center border-right">
                    <div v-text="userCourse.name" class="tWord"></div>
                    <div class="money">￥ <b v-text="userCourse.coursePrize" class="money"></b> </div>
                </div>
                <div class="col col-dialog">
                    <div class="row">
                        <div class="row col-md-8 offset-md-2 big-box">
                            <div class="chose">选择你的支付方式</div>
                            <button type="button" @click="zfbpay()" target="web_wiew" class="btn btn-block text-white zf-width">
                                <i class="icon iconfont icon-alipay-circle-fill"></i>
                                &nbsp; 支付宝 </button>
                            <button type="button" @click="wxpay()" class="btn btn-block text-white wx-width">
                                <i class="icon iconfont icon-weixinzhifu"></i>
                                &nbsp; 微信支付 </button>
                            <span class="user">付款即确定哈工科教课堂<a href="/xieyi.html" target="view_window">用户协议</a></span>
                        </div>
                    </div>
                </div>
            </div> -->
            <p class="taxon">您暂时没有权限查看该课程！</p>
        </el-main>
    </el-container>
</template>
<script>
import { mapGetters } from "vuex";
import { delayed } from "../plugins/utils.js";
import { asyncWXpay } from "../plugins/api.js";
import QRCode from "qrcode";
export default {
  data() {
    return {
      innerVisible: false,
      height: "height",
      top: "28vh"
    };
  },
  watch: {
    innerVisible(v) {
      if (v == false) {
        this.startinit();
      }
    }
  },
  props: ["zfbpay", "userCourse","startinit", "payment", "ktId"],
  computed: mapGetters(["user"]),
  methods: {
    async wxpay() {
      let id = this.ktId;
      try {
        let qcode = await asyncWXpay({
          cid: id
        });
        this.innerVisible = true;
        await delayed(100);
        this.useqrcode(qcode);
        this.wxsocket();
      } catch (err) {
        console.log(err);
      }
    },
    wxsocket() {
      let name = this.user.userid;
      let host = location.host;
      if ("WebSocket" in window) {
        this.socket = new window.WebSocket(`ws://${host}/websocket/${name}`);
      } else if ("MozWebSocket" in window) {
        this.socket = new window.MozWebSocket(`ws://${host}/websocket/${name}`);
      } else {
        this.socket = new window.SockJS(`https://${host}/websocket/${name}`);
      }
      this.socket.addEventListener("message", event => {
        if (event.data.error) {
          this.$message("支付失败");
        } else {
          this.$message("支付成功");
          this.socket.close([1000]);
        }
        this.innerVisible = false;
        this.payment(false);
      });
    },
    useqrcode(text) {
      var canvas = document.getElementById("wxcode");
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
    }
  }
};
</script>
<style>
/*以下改动*/
.btn-red {
  background-color: #c3c3c3;
  border-radius: 5px;
} 
.btn-red .icon {
  font-size: 35px;
}
.el-button:nth-child(2) {
  margin-left: 28px;
}
.title {
  color: #0265ac;
}
.tWord,
.money,
.chose,
.zf-width,
.wx-width,
.user {
  font-family: MicrosoftYaHeiLight;
  font-weight: normal;
  font-stretch: normal;
}
.tWord {
  margin-top: 36px;
  font-size: 20px;
  letter-spacing: 2px;
  color: #636363;
}
.money {
  display: inline-block;
  margin-top: 21px;
  font-size: 36px;
  letter-spacing: 3px;
  color: #02b3e4;
}
.chose {
  margin-top: 35px;
  font-size: 24px;
  letter-spacing: 2px;
  color: #636363;
}
.zf-width {
  width: 275px;
  height: 43px;
  margin-top: 33px;
  background-color: #02b3e4;
}
#resetpass button {
  border-radius: 3px;
}
.wx-width {
  width: 275px;
  height: 44px;
  margin-top: 18px;
  background-color: #15c26b;
}
.user {
  display: inline-block;
  text-align: center;
  font-size: 12px;
  margin-top: 17px;
  letter-spacing: 1px;
  color: #9d9d9d;
}
.big-box {
  width: 50%;
}
.marginTop {
  margin-top: -12px;
}
#wxcode {
  margin-top: -38px;
}
.saoma {
  margin-top: -3px;
  font-family: MicrosoftYaHeiLight;
  font-size: 16px;
  letter-spacing: 1px;
  color: #636363;
}
.operata {
  text-align: center;
  font-size: 16px;
  font-family: MicrosoftYaHeiLight;
  color: #636363;
}
.elmain{
  height:250px;
}
.taxon{
  font-size:18px;
  font-family: icrosoftYaHeiLight;
  text-align: center;
  line-height: 170px;
}
</style>
<style>
.el-dialog .tHeight {
  height: 418px;
  border-radius: 10px;
}
.height {
  height: 429px;
}
</style>