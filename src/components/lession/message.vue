<template>
  <div class="row mga" >
    <div class="col-md-12 mga" >
      向老师提问 <el-button type="info" circle @click="show2 = !show2" icon="el-icon-plus"></el-button>
    </div>
    <el-collapse-transition class="col-md-12">
      <div class="col-md-12"  v-show="show2"  >
         <textarea class="form-control mga" v-model="texture" name="" id=""  rows="5"></textarea>
    <div class="text-right col-md-12" >
          <el-button v-show="load1" @click="onsubmit()">发送</el-button>
          <el-button v-show="!load1" disabled icon='el-icon-loading' >发送</el-button> 
        </div>
      </div>
   
    </el-collapse-transition>
    
  </div>
</template>

<script>
import { asyncnewMessage } from "../../plugins/api.js";
import { mapGetters, mapActions } from "vuex";
import { delayed } from "../../plugins/utils.js";
export default {
  name: "setmessage",
  data() {
    return {
      texture: "",
      load1: true,
      show2: false
    };
  },
  props: ["lid", "couse1"],
  async mounted() {
    if (!this.ktAll.length) {
      await this.getkcAll();
    }
  },
  watch: {
    async $router() {
      if (!this.ktAll.length) {
        await this.getkcAll();
      }
    }
  },
  methods: {
    ...mapGetters(["ktAll"]),
    ...mapActions(["getkcAll"]),
    async onsubmit() {
      if (this.texture) {
        let { title, data } = this.jstitle();
        let form = {
          to_ID: 10032,
          from_ID: this.$store.state.user.userid,
          texture: this.texture,
          title,
          data
        };
        try {
          await asyncnewMessage(form);
          this.texture = "";
          this.$notify({
            title: "提交成功",
            message: "可以在消息中等待回复",
            type: "success"
          });
        } catch (err) {
          this.$message.error(`${err}`);
        }
        this.loa();
      }
    },
    jstitle() {
      let id = this.$store.state.user.userid;
      let { cid, num } = this.$route.params;
      let lid;
      let title1;
      for (let v of this.ktAll()) {
        if (v.ID == cid) {
          title1 = v.name;
        }
      }
      for (let v of this.couse1) {
        if (v.num == num) {
          lid = v.ID;
        }
      }
      let title = `向${title1}的提问`;
      let data = {
        lid,
        cid,
        userid: id
      };
      data = JSON.stringify(data);
      return { data, title };
    },
    async loa() {
      this.load1 = false;
      await delayed(3000);
      this.load1 = true;
    }
  }
};
</script>

<style scoped>
</style>
