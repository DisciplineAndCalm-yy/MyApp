<template>
    <el-footer v-cloak :height="altitude">
        <div v-if="Course.permission" class="study">
            <router-link :to="{ name: 'sections', params: { cid: userCourse.ID,num: Course.lessonNum}}"
                class="btn btn-primary btn-study">立即学习</router-link>
        </div>
        <div v-else class="row incon">
            <el-button type="button btn-size" @click="payment(true)">
                <i class="icon iconfont icon-suo"></i>
            </el-button>
            <el-button type="button btn-red" @click="learn()" :style="bg">
                <i :class="iconCollect" :style="isCollect()"></i>
            </el-button>
        </div>
    </el-footer>
</template>

<script>
import { mapGetters } from "vuex";
import { asyncForfeepay } from "../plugins/api.js";
export default {
  data() {
    return {
      socket: null,
      altitude: "80px"
    };
  },
  props: [
    "Course",
    "ktId",
    "learn",
    "iconCollect",
    "isCollect",
    "bg",
    "payment",
    "userCourse"
  ],
  computed: mapGetters(["user"]),
  methods: {
    async payshow() {
      const y = this.userCourse.coursePrize;
      if (y == 0) {
        try {
          await asyncForfeepay({ lid: this.ktId });
          this.$message({
            message: "恭喜你，购买成功",
            type: "success"
          });
          this.startinit();
        } catch (err) {
          this.$message({
            message: err,
            type: "error"
          });
          this.startinit();
        }
      } else {
        this.payment(true);
      }
    }
  }
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.study {
  width: 78%;
  margin: auto;
  margin-left: 22%;
}
.btn-study {
  width: 90%;
  height: 56px;
  background-color: #02b3e4;
  margin-left: 10%;
  box-shadow: 6px 4px 6px 0px rgba(0, 0, 0, 0.17);
  font-family: MicrosoftYaHei;
  border-radius: 5px;
  border: none;
  text-align: center;
  line-height: 42px;
  letter-spacing: 7px;
  margin-top:6px;
}
/*以下改动*/
.incon {
  padding: 0;
  height: 76px;
  margin-top:-11px;
}
.btn-size,
.btn-red {
  width: 76px;
  height: 76px;
}
.btn-size {
  border-radius: 5px;
  background-color: #02b3e4;
}
.btn-size .icon {
  font-size: 35px;
  color:rgba(255,255, 255, 0.8);
  vertical-align: -webkit-baseline-middle;
  text-align: center;
}
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
</style>
<style>
.el-dialog .tHeight {
  . height: 418px;
  border-radius: 10px;
}
.height {
  height: 429px;
}
</style>