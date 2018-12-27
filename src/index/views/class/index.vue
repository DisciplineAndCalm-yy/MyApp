<template>
    <el-main class="tk-main bg" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="container-fluid containers" v-if="ktUser && ktUser.length" >
            <div class="row mga box-top"><!--上-->
                <div class="col  padds1">
                    <div class="container-fluid">
                        <courseIndex v-bind="{ktId:ktUser[0].ID}"></courseIndex>
                        <div class="row mga rounded padds" v-if="ktUser[0]">
                            <div class="col go-on">
                                <h4>继续学习{{ktUser[0].name}}</h4>
                                <code class="text-muted">正在学习 {{ktUser[0].name}}</code>
                            </div>
                            <div class="col c-left">
                                <div class="row done">
                                    <div class="col-sm-4 prog">
                                        <span class="text-line stocks"> 已完成 {{progress}} % </span>
                                    </div>
                                    <div class="col-sm-8 strip">
                                        <el-progress color="#40cbf2" :percentage="progress" :text-inside="true"></el-progress>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <h4 class="add">添加的课程</h4>
            </div>
            <div class="row mga  padds">
                <div class="col-md-6 mga" v-for="(v,i) in this.ktUser"  :key="i">
                    <div class="card r-radius mykt card-widthf">
                        <div class="card-body text-info">
                            <div class="row">
                                <div class="col">
                                    <div class="media">
                                        <img class="mr-3 img-fluid imgs" width="150" :src="v.banner" alt="Generic placeholder image">
                                        <div class="media-body">
                                            <h5 class="mt-0 text-dark nones" v-text="v.name"></h5>
                                            <p class="card-text text-muted info nones txt" v-text="v.info"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent border-infos text-right">
                            <router-link class="btn btn-outline-info" :to="{ name: 'course', params: { ktId: v.ID }}"> 查看课程</router-link><!--v.course_ID-->
                        </div>
                    </div>
                </div>
            </div>
            <moreTuijian v-bind:ktTuijian="ktTuijian"></moreTuijian>
        </div>
    </el-main>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moreTuijian from "@/components/moreTuijian.vue";
import courseIndex from "@/components/courseIndex.vue";
import {asyncgetktUser, asyncgetTuijian} from "../../../plugins/api.js";
export default {
  data() {
    return {
      fullscreenLoading: false,
      info: "info",
      collect: false,
      iconCollect: "icon iconfont icon-heart-fill text-success",
      progress: 0,
      showText: false
    };
  },
  computed: mapState([
    "username",
    "difficulty",
    "ktAll",
    "ktUser",
    "ktTuijian"
  ]),
  async mounted() {
    try {
      await this.session();
    } catch (err) {
      console.log(err);
      this.$router.push("/login");
    }
    this.fullscreenLoading = true;
    let ktAll = this.ktAll;
    let ktUser = this.ktUser;
    let ktTuijian = this.ktTuijian;

    if (ktUser.length == 0) {
      let user = await asyncgetktUser();
      this.$store.commit("SET_KTUSER", user);
    }
    if (ktTuijian.length == 0) {
      await asyncgetTuijian();
    }
    if (ktAll.length == 0) {
      await this.getkcAll();
    }
    this.fullscreenLoading = false;
    if (this.ktUser[0]) {
      if (this.ktUser[0].lessonNum == 0) {
        this.progress = 100;
      } else {
        this.progress =
          parseInt(
            (this.ktUser[0].lessonNum / this.ktUser[0].permission) * 100
          ) || 0;
      }
    } else {
      this.$router.push("/allclass");
    }
  },
  methods: {
    ...mapActions(["getkcAll", "session"])
  },
  components: {
    moreTuijian,
    courseIndex
  }
};
</script>

<style scoped>
.imgshadow {
  -moz-box-shadow: 1px 1px 14px #333333;
  -webkit-box-shadow: 1px 1px 14px #333333;
  box-shadow: 1px 1px 14px #333333;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: Center;
}

.padd {
  padding-left: 45px;
  padding-right: 45px;
}

.padds {
  padding: 25px;
}

.btn-block1 {
  -moz-box-shadow: 12px 15px 20px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 12px 15px 20px rgba(0, 0, 0, 0.1);
  box-shadow: 12px 15px 20px rgba(0, 0, 0, 0.1);
}

.btn-block1:hover {
  -moz-box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
}

.mykt {
  -moz-box-shadow: 12px 15px 20px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 12px 15px 20px rgba(0, 0, 0, 0.1);
  box-shadow: 12px 15px 20px rgba(0, 0, 0, 0.1);
  height: 250px;
  -webkit-transition: box-shadow 0.2s ease-in-out;
  -moz-transition: box-shadow 0.2s ease-in-out;
  transition: box-shadow 0.2s ease-in-out;
}

.mykt:hover {
  -moz-box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
}

/* @media screen and (max-width: 700px) {
  .padds {
    padding: 2px;
  }
}

@media screen and (max-width: 900px) {
  .nones {
    display: none;
  }
  .media-body {
    display: none;
  }
}
@media screen and (max-width: 1200px) {
  .media-body {
    display: none;
  }
} */

.card-footer {
  padding:15px;
}

.media {
  padding: 20px;
}

.info {
  display: -webkit-box;
  display: -o-box;
  display: -ms-box;
  display: -moz-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  -ms-box-orient: vertical;
  -ms-line-clamp: 3;
  -o-box-orient: vertical;
  -o-line-clamp: 3;
  -moz-box-orient: vertical;
  -moz-line-clamp: 3;
  overflow: hidden;
  max-height: 72px;
}

.info6 {
  display: -webkit-box;
  display: -o-box;
  display: -ms-box;
  display: -moz-box;
  -ms-box-orient: vertical;
  -ms-line-clamp: 6;
  -o-box-orient: vertical;
  -o-line-clamp: 6;
  -moz-box-orient: vertical;
  -moz-line-clamp: 6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
}

.el-dialog__title {
  color: blueviolet;
}

.row-dialog {
  padding: 25px;
}

.col-dialog {
  padding-right: 25px;
  padding-left: 25px;
}
.padds1 {
  padding-top: 2em;
}
.clearfix:after {
  contain: "";
  display: block;
  clear: both;
}
.bg {
  background-color: #f1f1f1;
}
/*上*/
.containers {
  width: 97%;
  margin: auto;
}
.box-top {
  width: 102%;
  margin-top: 25px;
  background-color: #ffffff;
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  border: 0;
}
h4 {
  letter-spacing: 2px;
}
/*完成率*/
.done {
  width: 65%;
  float: right;
  padding: 0;
  margin-top: 30px;
}
.stocks {
  width: 10%;
  height: 14px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 2px;
  color: #bfbfbf;
  text-align: right;
}

.prog {
  /* max-width: 23%; */
  margin-left: 10%;
}
.strip {
  float: right;
  margin: -23px 0 0 31%;
}
.c-left {
  min-width: 55%;
  margin: 0px;
  padding: 0;
}
.go-on {
  margin-top: 20px;
}
.el-progress__text {
  color: white;
}
/*添加课程*/
.add {
  margin-top: 20px;
  color: "#3c3c3c";
}
.card-widthf {
  width: 96%;
  margin: 10px 0 0 13px;
  border-radius: 10px;
}
.add-info {
  border-top: 1px solid #e8e8e8;
}
.btn-outline-info {
  width: 130px;
  margin-right: 5%;
  margin-top:-6px;
  border-radius: 5px;
  border: 1px solid #02b3e4;
  color: #02b3e4;
}
.btn-outline-info:hover {
  background-color: #02b3e4;
  color: white;
}
.txt {
  font-size: 14px;
  letter-spacing: 1px;
  color: #999999;
  text-align: justify;
  margin-top:18px;
}
.imgs {
  width: 29%;
  /* height: 113px; */
  border-radius: 3px;
}
@media screen and (max-width: 1366px) {
  .go-on {
    margin-top: -5px;
  }
  .done {
    width: 80%;
    margin-top: -5px;
  }
  .prog {
    max-width:40%;
    margin-left: -5px;
  }
  .prog span{
    font-size:12px;
  }
}
</style>