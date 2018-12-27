<template>
    <div>
        <ul  class="container-fluid  chat" id="chat1475369" >
          <li class="row"  v-for="(v, i) in row" :key='i'  >
            <div class="col-md-12 text-center texts2" v-text="v.createTime"></div>
            <div class="col-md-6 offset-md-6" v-if="getme(v)" >
              <div class="float-right" >
                <img class="userheader"   :src="$store.state.user.headimg?$store.state.user.headimg:headimg" alt="">
              </div>
              
              <p class="float-right pr text-right" v-text="v.texture" ></p>
 
              
            </div>
            <div v-else class="col-md-6  " >
              <div class="float-left" >
                <img class="userheader"   :src="headimg" alt="">
              </div>
              
              <p class="float-left pl " v-text="v.texture"></p>
            </div>
          </li>
        </ul>
        <textarea class="form-control" v-model="texture" name="" id=""  rows="5"></textarea>
        <div class="text-right" >
          <el-button @click="onsubmit()">发送</el-button> 
        </div>
    </div>
</template>

<script>
import { asyncgetUserByUser, asyncnewMessage } from "../../plugins/api.js";
import $ from "jquery";
export default {
  data() {
    return {
      headimg: "/public/guanwang/Headportrait/panda.png",
      visible: true,
      touser: {},
      texture: ""
    };
  },
  props: ["row"],
  async mounted() {
    this.touser = await asyncgetUserByUser({ uid: this.row[0].from_ID });
    this.headimg = this.touser.headimg ? this.touser.headimg : this.headimg;
    $("#chat1475369")[0].scrollTop = 99999;
  },
  methods: {
    getme(v) {
      if (v.from_ID == this.$store.state.user.userid) {
        return true;
      }
    },
    async onsubmit() {
      if (this.texture) {
        let form = {
          to_ID: this.touser.userid,
          from_ID: this.$store.state.user.userid,
          texture: this.texture,
          title: this.row[0].title
        };
        try {
          await asyncnewMessage(form);
          this.row.push(form);
          this.texture = "";
          $("#chat1475369")[0].scrollTop = 99999;
        } catch (err) {
          this.$message.error(`${err}`);
        }
      }
    }
  }
};
</script>

<style scoped>
.texts2 {
  color: black;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 12px;
}
.userheader {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.pl {
  background-color: rgb(234, 234, 234);
  border-radius: 4px;
  margin-left: 14px;
  border: 1px solid #ebeef5;
  width: 300px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 3px;
  padding-right: 3px;
}
.pr {
  background-color: rgb(255, 205, 1);
  border-radius: 4px;
  width: 300px;
  margin-right: 14px;
  border: 1px solid #ebeef5;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 3px;
  padding-right: 3px;
}
.chat {
  height: 262px;
  padding: 15px 15px 5px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
