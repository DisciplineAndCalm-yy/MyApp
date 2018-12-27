<template>
  <div class="container-fluid">
    <div class="mga row">
      <div class="col-sm-12">
        <div class="player-olympic" id="playerparent" ref="playerTemp">
          <Loading v-show="videoLoading" :color-list="loadingColor"/>
          <el-collapse-transition v-if="radio" id="transition3">
            <el-dialog
              :custom-class="diacall"
              :visible.sync="dialogVisible"
              :style="imgse(this.dangqian)"
              id="videoLxt"
              :modal="false"
              top="0"
              width="100%"
              :modal-append-to-body="false"
              :close-on-click-modal="false"
              :close-on-press-escape="false"
              :show-close="false"
            >
              <div
                class="position-relative"
                :style="divstyle"
                v-if="question[this.dangqian].questionType == 'singleChoice'"
              >
                <input
                  type="radio"
                  v-for="(v , i) in radio"
                  :key="i"
                  class="position-absolute"
                  :name="v.name"
                  v-model="singleChoice"
                  :id="v.id"
                  :value="v.value"
                  :style="styles(v.style)"
                >
              </div>
              <div
                class="position-relative"
                :style="divstyle"
                v-else-if="question[this.dangqian].questionType == 'multipleChoice'"
              >
                <input
                  type="checkbox"
                  v-for="(v , i) in radio"
                  :key="i"
                  class="position-absolute"
                  :name="v.name"
                  v-model="multipleChoice"
                  :id="v.id"
                  :value="v.value"
                  :style="styles(v.style)"
                >
              </div>
            </el-dialog>
          </el-collapse-transition>
          <div></div>
        </div>
      </div>
    </div>
    <div class="row" v-if="dialogVisible">
      <div class="col text-right">
        <el-button @click="tiaoguo">重新观看这次问题</el-button>
        <el-button @click="submit">提交答案</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import _ from "underscore";
import {
  asynccheckQuestion,
  asyncgetvideoInfo,
  asyncselectWhitepoint
} from "../../../plugins/api.js";
import { delayed, videoDimensions } from "../../../plugins/utils.js";
export default {
  name: "aliplayer",
  data() {
    return {
      dialogVisible: false,
      videoList: null,
      player: null,
      diacall: "a1",
      playingVideo: {},
      loadingColor: ["#276cb3", "#f2ac1a", "#28130e", "#229849", "#db2344"],
      videoLoading: true,
      singleChoice: "",
      divstyle: "",
      multipleChoice: [],
      dangqian: 0,
      radio: null,
      openWT: null, // 监听问题变化
      whites: []
    };
  },
  props: ["lid", "question"],
  async mounted() {
    this.videoList = await asyncgetvideoInfo({ lid: this.lid });
    this.whites = await asyncselectWhitepoint({ lid: this.lid });
    window.onresize = () => {
      this.start();
    };
    this.ready();
  },
  watch: {
    dialogFalse() {
      this.dialogVisible = false;
    },
    videoList() {
      if (this.player == null) {
        this.createDemoPlayer(
          this.videoList.VideoMeta.VideoId,
          this.videoList.VideoMeta.Source,
          this.videoList.VideoMeta.CoverURL,
          this.videoList.PlayAuth
        );
      } else {
        this.player.replayByVidAndPlayAuth(
          this.videoList.VideoMeta.VideoId,
          this.videoList.PlayAuth
        );
      }
      this.videoLoading = false;
    },
    async $route() {
      this.videoList = await this.asyncgetvideoInfo(this.lid);
    },
    async openWT(v) {
      if (v) {
        this.player.fullscreenService.cancelFullScreen();
        this.player.pause();
        this.uishow(this.dangqian);
      }
    }
  },
  beforeDestroy() {
    //销毁事件删除dom节点
    document.removeEventListener("keydown", this.playing, false);
  },
  methods: {
    async start() {
      let v = $("video")[0];
      if (v) {
        let { width, height } = videoDimensions(v);
        if (width < 25) {
          await delayed(300);
        }
        width = videoDimensions(v).width;
        height = videoDimensions(v).height;
        let a = v.offsetHeight;
        let b = (a - height) / 2;
        this.divstyle = `width:${width}px;height:${height}px; margin: 0 auto;top:${b}px `;
      }
    },
    styles(style) {
      return `top:${style.top}%; left:${style.left}%;`;
    },
    imgse(i) {
      return `background-image: url(${this.question[i].picture})`;
    },
    videoplayer() {
      //视频画布点击播放和暂停
       console.log(this.player.getStatus());
      if (this.player.getStatus() === "playing"){
        this.player.pause();
      }
      if (this.player.getStatus() === "pause"){
        this.player.play();
      }
      if (this.player.getStatus() === "init"){
        this.player.play();
      }
    },
    async createDemoPlayer(vid, source, cover, playauth) {
      if (document.getElementById("player-con") === null) {
        let playerDomWrap = this.$refs.playerTemp;
        let playerDom = document.createElement("div");
        //console.log(playerDom);整个视频dom节点
        playerDom.setAttribute("id", "player-con");
        playerDomWrap.appendChild(playerDom);
        //视频下方添加小div
        let bar = document.createElement("div");
        bar.setAttribute("id", "barcontrol");
        playerDom.appendChild(bar);
      }
      let props = {
        id: "player-con",
        width: "100%",
        height: "550px",
        autoplay: false,
        language: "zh-cn",
        preload: false,
        isLive: false,
        // source: source, 添加(修改)//player.alicdn.com/video/aliyunmedia.mp4",
        cover: cover,
        // components: [
        //   {
        //     name: 'ketiComponent',
        //     type: ketiComponent,
        //     args: ["radio",this.bgImg ,this.submit,this.tiaoguo, this.options]
        //   }
        // ]
        playauth: playauth,
        vid: vid
      };
      const Aliplayer = window.Aliplayer;
      this.player = new Aliplayer(props);
      this.player.on("timeupdate", this.timeupdate);
      this.player.on("completeSeek", this.completeSeek);
      this.player.on("ended", this.ended);
      this.player.on("readyed", this.getwhite);
      await delayed(500);
      let videoclicl = document.getElementsByTagName("video")[0];
      videoclicl.addEventListener("click", this.videoplayer, false);
    },
    timeupdate() {
      if (this.question.length) {
        // 获取当前视频时间
        let currentTime = Math.ceil(this.player.getCurrentTime());
        let arr = [];
        for (let v of this.question) {
          arr.push(v.time);
        }
        // 判断是否在暂停时间内
        let index = _.indexOf(arr, currentTime);
        if (index != -1) {
          this.openWT = currentTime;
          this.dangqian = index;
        }
      }
    },
    ready(){
      document.addEventListener("keydown", this.playing, false);
      this.getwhite();
      // console.log(this.player);
    },
    playing(e) {
      if (e.keyCode === 32) {
        this.videoplayer();
      } else if (e.keyCode === 39) {
        let currentTime = Math.ceil(this.player.getCurrentTime());
        this.player.seek((currentTime += 3));
      } else if (e.keyCode === 37) {
        let currentTime = Math.ceil(this.player.getCurrentTime());
        this.player.seek((currentTime -= 3));
      }
      // console.log(e);
    },
    getwhite() {
      //定位快速搭建的位置
      for (let v of this.whites) {
        let dom = document.createElement("div");
        dom.className = "whites";
        dom.style = `left:${(v.starttime / v.totaltime) * 100}%`;
        dom.title = v.miaoshu;
        $(".prism-progress")[0].append(dom);
      }
    },
    uishow(i) {
      this.singleChoice = "";
      this.multipleChoice = [];
      let data = this.question[i].questionData;
      this.radio = data;
      this.dialogVisible = true;
      this.start();
    },
    async submit() {
      switch (this.question[this.dangqian].questionType) {
        case "singleChoice":
          try {
            let data = await asynccheckQuestion({
              qid: this.question[this.dangqian].ID,
              answer: this.singleChoice
            });
            if (data) {
              this.$notify({
                title: "提示",
                type: "success",
                message: `回答成功,分数增加${data}分`
              });
              this.dialogVisible = false;
              this.player.play();
            } else {
              this.$notify({
                title: "错误",
                type: "error",
                message: "回答错误"
              });
            }
          } catch (err) {
            console.log(err);
            this.$notify({
              title: "错误",
              type: "error",
              message: "回答错误"
            });
          }
          break;
        case "multipleChoice":
          try {
            let data = await asynccheckQuestion({
              qid: this.question[this.dangqian].ID,
              answer: this.multipleChoice.join("!@#$%^&")
            });
            this.$notify({
              title: "提示",
              type: "success",
              message: `回答成功,分数增加${data}分`
            });
            this.dialogVisible = false;
            this.player.play();
          } catch (err) {
            // console.log(err); 添加（注释）
            this.$notify({
              title: "错误",
              type: "error",
              message: "回答错误",
              duration: 0
            });
          }

          break;
      }
    },
    tiaoguo() {
      // 重新观看
      this.openWT = null;
      this.dialogVisible = false;
      this.player.seek(this.question[this.dangqian].questionStartTime);
      this.player.play();
    },
    completeSeek() {
      // 用户拖拽视频进度
      // 将问题初始化
      this.openWT = null;
    },
    ended() {
      this.openWT = null;
    }
  }
};
</script>

<style>
#videoLxt .a1 {
  height: 100%;
  margin: 0 auto;
}
#videoLxt {
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 0 15px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: #000;
  overflow: hidden;
}

#videoLxt .el-dialog__header {
  padding: 0;
}
#videoLxt .el-dialog {
  background: none;
}

#videoLxt .el-dialog__body {
  height: 100%;
  padding: 0;
}

#transition3 {
  width: 100%;
  height: 100%;
}
.height100 {
  height: 100%;
}
.whites {
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: #124375;
  cursor: pointer;
  z-index: 8000;
  display: inline-block;
  position: relative;
  top: -11px;
}

.whites:hover {
  height: 14px;
  width: 14px;
  top: -4px;
}
.prism-cover {
  position: relative;
}
#barcontrol {
  position: absolute;
  bottom:55px;
  left: 0;
  width: 100%;
  height:20px;
  z-index: 999;
}
</style>
