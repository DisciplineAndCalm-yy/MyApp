<template>
 <el-main class="tk-main">
  <div class="main">
    <transition name="el-fade-in-linear">
      <div class="showDialog" v-show="showDialog">
        <div class="dialog clearfix">
          <div class="closes clearfix"><span>【哈工科教云课堂】</span> <i @click="showDialog = false">×</i></div>
          <div class="chat" ref="chat" id="chats"  v-if="rows.length">
            <p v-text="rows[rows.length-1].createTime"></p>
            <div v-for="(v,i) in rows" :key='i'>
              <div v-if="v.from_ID == user.userid" class="his fr clearfix">
                <div class="headPortrait-One fr"><img :src="$store.state.user.headimg?$store.state.user.headimg:headimg"></div>
                <div v-text="v.texture" class="messageOne fl ">
                </div>
              </div>
              <div v-else class="me fl clearfix">
                <div class="messageTwo fl"><img src="/public/guanwang/Headportrait/fox.png"></div>
                <div v-text="v.texture" class="headPortrait_Two fr">
                </div>
              </div>
            </div>

          </div>
          <div>
            <textarea v-model="texture" class="txt"></textarea>
          </div>
          <div class="send">
            <p @click="onsubmit()">发送</p>
          </div>
        </div>
      </div>
    </transition>
    <ul class="ul">
      <li v-for="(v,i) in tableData" :key='i'>
        <div class="l-left">
          <div class="l-center">
            <div class="left" >
              <p v-text="v[0].title"></p>
            </div>
            <div class="right">
              <p v-text="v[v.length-1].createTime"></p>
            </div>
          </div>
        </div>
        <div class="l-right">
          <div class="btn">
            <p class="showon" @click="watchMessage1(v)">查看</p>
          </div>
        </div>
        <div style="clear:both;"></div>
      </li>
    </ul>
  </div>
 </el-main>
</template>

<script>
import {
  asyncsentMessage,
  asyncreceivedMessage,
  asyncnewMessage
} from "../../../plugins/api.js";
import $ from "jquery";
import breadcrumb from "@/components/breadcrumb.vue";
import watchMessages from "@/components/lession/watchmessage.vue";
import _ from "underscore";
import { mapGetters } from "vuex";
export default {
  name: "message",
  data() {
    return {
      name: "消息中心",
      paths: [],
      dialogVisible: false,
      sentlist: [],
      receivedlist: [],
      messagelist: [],
      showDialog: false,
      mess: [],
      tableData: [],
      rows: [],
      texture: ""
    };
  },
  computed: mapGetters(["user"]),
  async mounted() {
    this.start();
  },
  watch: {
    showDialog() {
      if ($("#chats")[0]) {
        $("#chats")[0].scrollTop = 99999;
      }
    }
  },
  methods: {
    async start() {
      try {
        this.sentlist = await asyncsentMessage();
      } catch (err) {
        console.log(err);
      }
      try {
        this.receivedlist = await asyncreceivedMessage();
      } catch (err) {
        console.log(err);
      }
      const arr = _.union(this.sentlist, this.receivedlist);
      let map = [];
      map = _.groupBy(arr, function(num) {
        return num.title;
      });
      for (let v in map) {
        this.tableData.push(map[v]);
      }
      
    },
    userid(d) {
      return d.row[0].from_ID;
    },
    watchMessage1(d) {
      let row = _.sortBy(d, x => {
        return x.createTime;
      });
      this.rows = row;
      this.showDialog = true;
    },
    async onsubmit() {
      if (this.texture) {
        let form = {
          to_ID: 10032,
          from_ID: this.$store.state.user.userid,
          texture: this.texture,
          title: this.rows[0].title
        };
        try {
          await asyncnewMessage(form);
          this.rows.push(form);
          this.texture = "";
        } catch (err) {
          this.$message.error(`${err}`);
        }
      }
      $("#chats")[0].scrollTop = 99999;
    }
  },
  components: {
    breadcrumb,
    watchMessages
  }
};
</script>

<style scoped>
.main {
  margin: auto;
  max-width: 1200px;
  margin-top: 10px;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

.main ul {
  list-style: none;
}

.main ul li {
  width: 1023px;
  height: 82px;
  margin-top: 12px;
  background-color: #f9f9f9;
}

.main ul li .l-left {
  float: left;
  width: 789px;
  height: 100%;
}

.l-center {
  width: 690px;
  margin: auto;
}

.l-center .left {
  float: left;
  width: 430px;
}

.l-center .right {
  float: right;
}

.l-center .left,
.l-center .right {
  height: 82px;
  line-height: 82px;
  cursor: pointer;
}

.l-center .left p,
.l-center .right p {
  color: #888888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.main ul li .l-right {
  float: right;
  width: 130px;
  height: 100%;
}

.main ul li .l-right .btn {
  width: 88px;
  height: 36px;
  margin: 23px auto;
  background-color: #34c3e8;
  border-radius: 3px;
}

.main ul li .l-right .btn p {
  color: white;
  font-size: 14px;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
}

/* 聊天对话框 */
.showDialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(12, 12, 12, 0.2);
  z-index: 999;
}

.dialog {
  position: relative;
  width: 581px;
  height: 617px;
  margin: 105px auto 0;
  background-color: #f8f8f8;
  box-shadow: 0 0 15px #ccc;
}

.dialog .closes {
  width: 581px;
  font-size: 35px;
  cursor: pointer;
  color: #a6a6a6;
  text-align: right;
}

.dialog .closes span {
  position: absolute;
  top: 10px;
  left: 30px;
  font-size: 20px;
  color: #5b5b5b;
}

.dialog .chat {
  height: 414px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 20px;
}

.dialog .chat p {
  height: 36px;
  text-align: center;
  color: #acacac;
  line-height: 58px;
  font-size: 12px;
}

.dialog .chat,
.dialog .txt {
  display: block;
  width: 557px;
  margin: 15px auto;
  background-color: white;
  border-radius: 10px;
  font-size: 14px;
  text-indent: 8px;
}

.dialog .txt {
  height: 80px;
}

.dialog .send {
  width: 82px;
  height: 28px;
  margin: -5px 15px 0 485px;
  background-color: #34c3e8;
  border-radius: 50px;
  cursor: pointer;
}

.dialog .send p {
  text-align: center;
  color: white;
  font-size: 14px;
  line-height: 28px;
  font-family: 微软雅黑;
}
/* 文字消息 */
.his {
  float: right;
} /*左边*/
.me {
  float: left;
} /*右边*/
.his,
.me {
  width: 341px;
  margin-top: 28px;
  position: relative;
}
.messageOne,
.headPortrait-One {
  float: right;
} /*右边头像聊天*/
.messageTwo,
.headPortrait_Two {
  float: left;
} /*左边头像聊天*/

/*聊天*/
.messageOne {
  background-color: #e3bb20;
  margin-right: 10px;
} /*右边聊天*/
.headPortrait_Two {
  background-color: #eee;
  margin-left: 10px;
} /*左边聊天*/
.messageOne,
.headPortrait_Two {
  position: relative;
  max-width: 251px;
  word-break: break-all;
  border-radius: 8px;
  color: black;
  font-size: 14px;
  padding: 5px;
}

.headPortrait-One,
.messageTwo {
  text-indent: 0;
}
.messageTwo img,
.headPortrait-One img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
/*右边聊天框和左边头像框*/
.messageOne,
.messageTwo {
  position: relative;
}

.messageOne::after {
  content: "";
  position: absolute;
  right: -16px;
  bottom: 15%;
  border: 10px solid #e3bb20;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-right-color: transparent;
}

.headPortrait_Two::after {
  content: "";
  position: absolute;
  left: -16px;
  top: 19%;
  border: 10px solid #eee;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
}

/* 向老师提问页面 */
.quiz {
  width: 1500px;
  float: right;
}

.quiz .all {
  width: 80%;
  margin: auto;
  font-size: 28px;
  color: #15b7f0;
  font-weight: bold;
  cursor: pointer;
}

.quiz .all span {
  margin-right: 30px;
  font-size: 22px;
  color: #484848;
}

.quiz .textBox {
  width: 80%;
  height: 245px;
  margin: 25px auto;
  font-size: 16px;
  text-indent: 32px;
  display: block;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 0 5px #e0e0e0;
  z-index: 666;
}

placeholder {
  color: #a4a4a4;
  padding-top: 10px;
}

.quiz .send-btn {
  margin: 10px 140px 0 0;
  float: right;
  width: 125px;
  height: 42px;
  background-color: #34c3e8;
  border-radius: 20px;
  cursor: pointer;
}

.quiz .send-btn p {
  color: white;
  text-align: center;
  line-height: 10px;
  font-size: 16px;
}
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
div,
dl,
dt,
dd,
ul,
ol,
li,
p,
blockquote,
pre,
hr,
figure,
table,
caption,
th,
td,
form,
fieldset,
legend,
input,
button,
textarea,
menu {
  margin: 0;
  padding: 0;
}
header,
footer,
section,
article,
aside,
nav,
hgroup,
address,
figure,
figcaption,
menu,
details {
  display: block;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
caption,
th {
  text-align: left;
  font-weight: normal;
}
html,
body,
fieldset,
img,
iframe,
abbr {
  border: 0;
}
i,
cite,
em,
var,
address,
dfn {
  font-style: normal;
}
[hidefocus],
summary {
  outline: 0;
}
li {
  list-style: none;
}
h1,
h2,
h3,
h4,
h5,
h6,
small {
  font-size: 100%;
}
sup,
sub {
  font-size: 83%;
}
pre,
code,
kbd,
samp {
  font-family: inherit;
}
q:before,
q:after {
  content: none;
}
textarea {
  overflow: auto;
  resize: none;
}
label,
summary {
  cursor: default;
}
a,
button {
  cursor: pointer;
}
h1,
h2,
h3,
h4,
h5,
h6,
em,
strong,
b {
  font-weight: bold;
}
del,
ins,
u,
s,
a,
a:hover {
  text-decoration: none;
}
body,
textarea,
input,
button,
select,
keygen,
legend {
  font: 12px/1.14 arial, \5b8b\4f53;
  color: #333;
  outline: 0;
}
body {
  background: #fff;
}
a,
a:hover {
  color: #333;
}
</style>