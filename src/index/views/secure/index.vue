<template>
    <form v-if="user">
        <div class="row form-group">
            基本信息
        </div>
        <div>
        <div class="retract">
        <div class="row form-group petName">
            <label class="col-sm-4 col-md-3 col-lg-2 col-form-label changFont">昵称</label>
            <input type="text" class="form-control col-sm-8 col-md-6 col-lg-4 textbox" v-model="ruleForm.username" placeholder="用户名称">
        </div>
        <div class="form-group row">
            <label class="col-sm-4 col-md-3 col-lg-2 col-form-label changFont">头像</label>
            <div class="photo">
                <el-tooltip class="item" effect="dark" content="点击可更改头像" placement="top"></el-tooltip>
                 <img :src="user.headimg" width="150" height="150" @click="dialogVisible = true" class="rounded-circle">
                 <!-- <el-button type="primary" class="Change">更换头像</el-button> -->
            </div>
        </div>
        </div>
        <div class="correlation">
        <div class="row form-group relevance">
            <label class="col-sm-4 col-md-3 col-lg-2 col-form-label changFont">关联手机</label>
            <input type="text" class="col-sm-8 col-md-6 col-lg-4 spanx txtbox" v-model="user.phonenum" placeholder="关联手机">
        </div>
        <div class="row form-group relevance">
            <label class="col-sm-4 col-md-3 col-lg-2 col-form-label changFont">关联邮箱</label>
            <input type="email" class="col-sm-8 col-md-6 col-lg-4 spanx txtbox" v-model="user.useremail" placeholder="关联邮箱">
        </div>
        </div>
        <!-- <div class="form-check">
                <input type="checkbox" class="form-check-input">
                <label class="form-check-label" for="exampleCheck1">我愿意接受逗包课堂的推送消息。</label>
              </div> -->
        <div class="from-check" v-show="err1">
            <small id="emailHelp" class="form-text text-success" v-text="err1"></small>
        </div>
        <div class="form-group save">
            <button type="button" @click="userbc" class="btn bcs"> &nbsp;&nbsp;&nbsp; 保存 &nbsp;&nbsp;&nbsp; </button>
        </div>
        <el-dialog id="secureIndex" title="头像选择" :visible.sync="dialogVisible" width="579px" >
            <div class="el-dialog__body1">
                <img class="img  rounded-circle"   v-for="(v,i) in imgUrl" :key="i" width="60" height="60" :src="v" :class="headUrl(v)" @click="upimg(i)" alt="">
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </span>
        </el-dialog>
        </div>
    </form>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { asyncupdate } from "../../../plugins/api.js";
export default {
  data() {
    return {
      err1: null,
      ruleForm: {
        username: "",
        headimg: "",
        phonenum: "",
        // Email: ""
        useremail:""
      },
      dialogVisible: false,
      imgUrl: [
        "/public/guanwang/Headportrait/fox.png",
        "/public/guanwang/Headportrait/lion.png",
        "/public/guanwang/Headportrait/chicken.png",
        "/public/guanwang/Headportrait/goat.png",
        "/public/guanwang/Headportrait/leopard.png",
        "/public/guanwang/Headportrait/monkey.png",
        "/public/guanwang/Headportrait/ostrich.png",
        "/public/guanwang/Headportrait/panda.png",
        "/public/guanwang/Headportrait/penguin.png",
        "/public/guanwang/Headportrait/rabbit.png",
        "/public/guanwang/Headportrait/sheep.png",
        "/public/guanwang/Headportrait/zebre.png"
      ]
    };
  },
  computed: mapState(["user"]),
  async mounted() {
    if (this.user == null) {
      let data = await this.session();
      this.ruleForm.username = data.username;
    } else {
      this.ruleForm.username = this.user.username;
      //  console.log(this.ruleForm.username);
    }
  },
  methods: {
    async userbc() {
      try {
        await asyncupdate(this.ruleForm);
        this.$notify({
          title: "提示",
          message: "修改成功",
          type: "success"
        });
      } catch (err) {
        this.$notify.error({
          title: "错误",
          message: err
        });
      }
    },
    headUrl(v) {
      if (v == this.user.headimg) {
        return "border border-light";
      }
    },
    async upimg(e) {
      let data = this.user;
      data.headimg = this.imgUrl[e];
      this.ruleForm.headimg = this.imgUrl[e];
      this.setuser(data);
    },
    ...mapMutations({
      setuser: "SET_USERNAME"
    }),
    ...mapActions(["session"])
  }
};
</script>

<style scoped>
.img {
  margin: 5px 13px;
}
.img:hover {
  border: 1px solid #ffffff;
}
.sed {
  margin-top: 125px;
}
.spanx {
  font-size: 12px;
  line-height: 36px;
  margin-left: -6%;
}
/*以下更改*/
.form-group{
  font-size:14px;
}
.changFont {
  font-size: 14px;
  line-height: 35px;
  letter-spacing: 1px;
  color: #7f7f7f;
  padding:0;
}
.retract {
  margin-left: 25px;
}
.petName {
  width: 60%;
}
.textbox {
  height: 32px;
  margin-left:1%;
  border-radius: 0;
  margin-top: 2px;
}
.relevance {
  width: 60%;
}
.txtbox {
  height: 32px;
  margin-left:4%;
  margin-top: 2px;
}
.photo {
  width: 134px;
  height: 134px;
  margin-left:-6%;
}
.photo img {
  width: 100%;
  height: 100%;
}
.save {
  margin-top: 50px;
  border-radius: 2px;
}
.save .bcs {
  width: 124px;
  height: 35px;
  background-color: #35c2e9;
  color: white;
}

</style>