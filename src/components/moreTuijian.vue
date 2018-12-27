<template>
    <div class="row" id="moreTuijian">
        <div class="col">
            <div class="row mga">
                <div class="col">
                    <h4 class="referre">推荐课程</h4>
                </div>
            </div>
            <div class="row more">
                <div class="col-sm-1">
                    <i class="el-icon-d-arrow-left d-font" @click="moreTuijian(1)"></i>
                </div>
                <div class="col m-center">
                    <transition name="el-fade-in">
                    <div class="row" v-show="show">
                        <div class="col">
                            <router-link v-if="ktTuijianShow(inde[0])" :to="{ name: 'course', params: { ktId:ktIds(inde[0])}}">
                                <img :src="ktTuijian[inde[0]].banner" class="img-fluid rounded imgshadow" alt="">
                            </router-link>
                        </div>
                        <div class="col">
                            <router-link v-if="ktTuijian[inde[1]]" :to="{ name: 'course', params: { ktId: ktTuijian[inde[1]].ID }}">
                                <img :src="ktTuijian[inde[1]].banner" class="img-fluid rounded imgshadow" alt="">
                            </router-link>
                        </div>
                        <div class="col">
                            <router-link v-if="ktTuijian[inde[2]]" :to="{ name: 'course', params: { ktId: ktTuijian[inde[2]].ID }}">
                                <img :src="ktTuijian[inde[2]].banner" class="img-fluid rounded imgshadow" alt="">
                            </router-link>
                        </div>
                        <div class="col">
                            <router-link v-if="ktTuijian[inde[3]]" :to="{ name: 'course', params: { ktId: ktIds(inde[3]) }}">
                                <img :src="ktTuijian[inde[3]].banner" class="img-fluid rounded imgshadow" alt="">
                            </router-link>
                        </div>
                    </div>
                    </transition>
                </div>
                <div class="col-sm-1">
                    <i class="el-icon-d-arrow-right d-font" @click="moreTuijian(-1)"></i>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { mapState } from "vuex";
import { delayed } from "../plugins/utils.js";
import { asyncgetTuijian } from "../plugins/api.js";
export default {
  data() {
    return {
      inde: [0, 1, 2, 3],
      show: true
    };
  },
  computed: mapState(["difficulty", "ktTuijian"]),
  async mounted() {
    if (this.ktTuijian.length == 0) {
      let data =  await asyncgetTuijian();
      this.$store.commit("SET_KTALL" , data);
      
    }
  },
  watch: {
    async '$route'() {
      if (this.ktTuijian.length == 0) {
        let data =  await asyncgetTuijian();
        this.$store.commit("SET_KTALL" , data);
      }
    }
  },
  methods: {
    ktTuijianShow(i) {
      return this.ktTuijian[i];
    },
    ktIds(i) {
      return this.ktTuijian[i].ID;
    },
    img(i) {
      return this.ktTuijian[i].banner;
    },
    async moreTuijian(i) {
      let n = this.ktTuijian.length;
      if (i == 1) {
        for (let v in this.inde) {
          if (this.inde[v] == 0) {
            break;
          }
          this.inde[v] = this.inde[v] - 4;
        }
        this.show = false;
        await delayed(200);
        this.show = true;
      } else {
        if (this.inde[3] != false && this.inde[3] + 1 < n) {
          this.show = false;
          for (let v in this.inde) {
            this.inde[v] = this.inde[v] + 4;
          }
          await delayed(200);
          this.show = true;
        }
      }
    }
  }
};
</script>


<style scoped>
#moreTuijian {
  margin-top: 15px;
  margin-bottom: 45px;
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
.more {
  width: 100%;
  margin: auto;
  min-height: 150px;
}
.m-center {
  margin: auto;
}
.referre {
  margin-left: -15px;
  font-family: MicrosoftYaHeiLight;
  font-size: 26px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 2px;
  color: #3c3c3c;
}
</style>