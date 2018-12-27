<template>
      <div v-if="userCourse" class="row middle">
        <div class="col-lg-8 col-md-12 rounded videos">
          <div v-if="!Course.permission">
            <img :src="userCourse.banner" class="img-fluid rounded imgshadow" alt="Responsive image">
             <p class="row icos" @click="centerDialogVisible = true">
               <i class="icon iconfont icon-suo"></i><!--锁-->
             </p>
          </div>
          <!-- 支付 -->
            <router-link v-else :to="{name: 'sections', params: { cid: userCourse.ID,num:Course.lessonNum}}">
               <img :src="userCourse.banner" class="img-fluid rounded imgshadow" alt="Responsive image">
               <p class="row bofang">
                 <i class="icon iconfont icon-bofang"></i><!--播放-->
               </p>
            </router-link>  
        </div>
        <el-container class="col-lg-4 col-md-12 is-vertical">
          <el-main>
            <h2 v-text="userCourse.name"></h2>
            <div class="row two-alls" >
              <!-- <div class="col-lg-6 lecturer" >
                <span>讲师:
                  <b v-text="userCourse.teacher"></b>
                </span>
              </div> -->
              <div class="col">
                  <div class="float-left difficulty">难度:
                      <el-rate class="float-right start" disabled  v-model="userCourse.difficulty"></el-rate>
                  </div>
                  <span class="float-none"></span>
              </div>
            </div>
            <div class="row labels clearfix">
              <div class="frame"><!--col-md-3 col-md-9 style="border:1px solid green;"-->
                标签：
              </div>
              <div class="conleft">
                 <el-tag v-for="(v,i) in etag(userCourse.courseTag)" class="smtag"  :key="i" v-text="v" ></el-tag>
              </div>
            </div>
            <div class="row">
              <div class="col introduce">
                <br>
                <span class="info6 info6-words" id="words">课程简介：{{ userCourse.info }}</span>
              </div>
            </div>
          </el-main>
          <payvue v-bind="{Course:Course,userCourse:userCourse,bg,zfbpay:zfbpay,ktId:$attrs.ktId,learn:learn,iconCollect:iconCollect,isCollect:isCollect,centerDialogVisible,payment}"></payvue>
          <div id="payhtml" v-if="zfb" v-html="html"></div>
        </el-container>
        <el-dialog :visible.sync="centerDialogVisible" width="44%" center :top="tMargin" :custom-class="tHeight" id="resetpass" :close-on-click-modal=false :close-on-press-escape=false>
          <paydialog v-bind="{zfbpay, userCourse, startinit,payment,ktId:$attrs.ktId}"></paydialog>
        </el-dialog>
      </div>
</template>

<script>
import { mapState } from "vuex";
import payvue from "@/components/pay.vue";
import paydialog from "@/components/paydialog.vue";
import {
  asyncgetTuijian,
  asyncUserCourseInfo,
  asyncpay,
  asynaddCollection
} from "../plugins/api.js";
export default {
  name: "course",
  data() {
    return {
      centerDialogVisible: false,
      info: "info",
      Course: null,
      userCourse: null,
      collect: false,
      iconCollect: "icon iconfont icon-heart",
      textCollect: "收藏",
      tabPosition: "top",
      activeName: "second",
      headerShow: false,
      zfb: false,
      html: null,
      bg: "background-color:#c3c3c3",
      tHeight: "tHeight",
      tMargin: "30vh"
    };
  },
  computed: mapState(["ktTuijian"]),
  watch: {
    collect(v) {
      this.isCollect();
      if (v) {
        this.bg = "background-color:#ff5454";
      } else {
        this.bg = "background-color:#c3c3c3";
      }
    },
    async $route() {
      this.startinit();
    }
  },
  async mounted() {
    this.startinit();
  },
  methods: {
    async startinit() {
      let id = this.$attrs.ktId;
      try {
        let ses = await asyncUserCourseInfo({ cid: id });
        this.Course = ses.userCourse || {};
        this.userCourse = ses.Course;
      } catch (err) {
        this.$router.push("/");
      }
      if (this.ktTuijian.length == 0) {
        await asyncgetTuijian();
      }
      if (!this.Course.collect) {
        this.collect = false;
      } else {
        this.collect = true;
      }
    },
    isCollect() {
      this.iconCollect = "icon iconfont icon-heart";
      return "color:white";
      // if (this.collect) {
      //   this.iconCollect = "icon iconfont icon-heart-fill";
      //   return "color:white";
      // } else{
      //   this.iconCollect = "icon iconfont icon-heart";
      //   return "color:red";
      // }
    },
    async zfbpay() {
      let id = this.$attrs.ktId;
      try {
        let html = await asyncpay({ cid: id });
        this.html = html;
        this.zfb = true;
        document.write(this.html);
      } catch (err) {
        console.log(err);
      }
    },

    async learn() {
      try {
        await asynaddCollection({ cid: this.$attrs.ktId });
      } catch (err) {
        console.log(err);
      }
      this.collect = !this.collect;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeAction(name) {
      this.activeName = name;
    },
    HTMLDecode(text) {
      var temp = document.createElement("div");
      temp.innerHTML = text;
      var output = temp.innerText || temp.textContent;
      temp = null;
      return output;
    },
    etag(str) {
      if (str) {
        return str.split(",");
      } else {
        return [];
      }
    },
    payment(i) {
      this.centerDialogVisible = i;
    }
  },
  components: {
    payvue,
    paydialog
  }
};
</script>

<style scoped>
.imgshadow {
  -moz-box-shadow: 0px 0px 10px #333333;
  -webkit-box-shadow: 0px 0px 10px #333333;
  box-shadow: 0px 0px 10px #333333;
}
.mga {
  margin-bottom: 25px;
}
.d-font {
  font-size: 36px;
  color: #dfdfdf;
  cursor: pointer;
  line-height: initial;
}
.d-font:hover {
  color: black;
}
.col-sm-1 {
  display: flex;
  justify-content: center;
  align-items: Center;
}
.padds {
  padding: 35px;
}
#payhtml {
  position: fixed;
  z-index: 10000000;
  height: 500px;
  width: 500px;
  left: 200px;
  top: 120px;
  background-color: #333333;
}
.conleft {
  padding-left: 0;
}
.smtag {
  border-radius: 35px;
  margin-left: 8px;
}
.videos {
  width: 97%;
  border-radius: 10px;
}
.videos .img-fluid {
  width: 100%;
}
.introduce {
  text-align: justify;
}
.two-alls,
.labels {
  margin-top: 10px;
}
.lecturer {
  max-width: 140px;
}
.difficultyr {
  margin-left: 12%;
}
.col-md-9 {
  flex: 0 0 102%;
}
.frame {
  color: #7f7f7f;
  margin-left: 3%;
  padding-right: 0;
}
.info6-words {
  color: #7f7f7f;
}
.el-tag {
  color: #7f7f7f;
  background-color: rgb(255, 255, 255);
  border: 1px solid #7f7f7f;
  height: 25px;
  line-height: 23px;
}
.el-rate {
  margin-top: 3px;
  margin-left: 30px;
}
.unfold,
.pack-up {
  cursor: pointer;
  color: #02b3e4;
  font-size: 14px;
}
.pack-up {
  margin-top: 110px;
  display: none;
}
/*锁、播放图标*/
.videos {
  position: relative;
}
.icos .icon,
.bofang .icon {
  position: absolute;
  top: 28%;
  left: 43%;
  font-size: 150px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}
@media screen and (max-width: 1600px) {
  .info6-words {
    font-size: 12px;
  }
  /*锁、播放图标*/
  .videos {
    position: relative;
  }
  .icos .icon,
  .bofang .icon {
    position: absolute;
    top: 24%;
    left: 43%;
    font-size: 150px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }
}
@media screen and (max-width: 1440px) {
  /*锁、播放图标*/
  .videos {
    position: relative;
  }
  .icos .icon,
  .bofang .icon {
    position: absolute;
    top: 16%;
    left: 43%;
    font-size: 150px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }
}
@media screen and (max-width: 1366px) {
  .info6-words {
    font-size: 12px;
  }
  .col-md-9 {
    flex: 0 0 102%;
  }
  .start {
    padding: 0;
  }
  /*锁图标*/
  .videos {
    position: relative;
  }
  .icos .icon {
    position: absolute;
    font-size: 100px;
    top: 28%;
    left: 43%;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }
  /*播放图标*/
  .bofang .icon {
    position: absolute;
    font-size: 100px;
    top: 20%;
    left: 44%;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }
}
@media screen and (max-width: 700px) {
  .padds {
    padding: 2px;
  }
  .hide {
    display: none;
  }
}
</style>
