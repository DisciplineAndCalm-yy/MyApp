<template>
  <div class="x-medals">
    <div class="media">
      <img
        class="mr-3 rounded-circle"
        width="75"
        height="75"
        :src="user.headimg"
        alt="Generic placeholder image"
      >
      <div class="media-body">
        <h6 class="mt-0" v-text="user.username"></h6>
        <h6 class="mt-0">
          <span class="sp rounded">Lv
            <b v-text="level"></b>
          </span>
          <!-- 获取当前等级 -->
          <img
            src="/public/guanwang/images/grade_4.png"
            v-for="v in level4"
            :key="Symbol(v)"
            width="16"
            height="22"
            :alt="v"
          >
          <img
            src="/public/guanwang/images/grade_3.png"
            v-for="v in level3"
            :key="Symbol(v)"
            width="16"
            height="22"
            :alt="v"
          >
          <img
            src="/public/guanwang/images/grade_2.png"
            v-for="v in level2"
            :key="Symbol(v)"
            width="16"
            height="22"
            :alt="v"
          >
          <img
            src="/public/guanwang/images/grade_1.png"
            v-for="v in level1"
            :key="Symbol(v)"
            width="16"
            height="22"
            :alt="v"
          >
        </h6>
        <el-tooltip
          v-if="medals"
          class="item"
          effect="dark"
          :content="medalswatch.toString()"
          placement="top"
        >
          <el-progress
            :text-inside="true"
            :show-text="false"
            :stroke-width="18"
            :percentage="medalswatch"
            color="RGB(53,194,233)"
          ></el-progress>
          <!--进度条-->
        </el-tooltip>
      </div>
    </div>
    <div class="sjfs container-fluid">
      <!--分数统计图-->
      <div class="row">
        <canvas width="600" height="500" id="alljf"></canvas>
      </div>
    </div>
    <div class="sjfs container-fluid">
      <h5 class="color117 medal">我的勋章墙</h5>
      <div class="row honor">
        <div class="col-md-4 col-sm-6 col-lg-3">
          <img width="72" height="88" src="/public/guanwang/medals/medal_1.png" alt>
        </div>
        <div class="col-md-4 col-sm-6 col-lg-3">
          <img width="72" height="88" src="/public/guanwang/medals/nomedals/Nomedals_2.png" alt>
        </div>
        <div class="col-md-4 col-sm-6 col-lg-3">
          <img width="72" height="88" src="/public/guanwang/medals/nomedals/Nomedals_3.png" alt>
        </div>
        <div class="col-md-4 col-sm-6 col-lg-3">
          <img width="72" height="88" src="/public/guanwang/medals/nomedals/Nomedals_4.png" alt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import echarts from "echarts";
import { asyncgetUserAllPoint, asyncgetuserTypePoint } from "../plugins/api.js";
import _ from "underscore";
export default {
  name: "medal",
  data() {
    return {
      //level1、2、3、4分别代表升级数
      level: 1,
      medalswatch: 1,
      level4: 0,
      level3: 0,
      level2: 0,
      level1: 0,
      Symbol:""
    };
  },
  computed: mapState(["username", "headimg", "user", "medals"]),
  async mounted() {
    if (this.user.ID == undefined) {
      await this.session();
    }
    this.start();
  },
  methods: {
    async start() {
      try {
        const jingyan = await asyncgetUserAllPoint();
        this.$store.commit("SET_MEDALS", parseInt(jingyan));
        // 获取图标信息
        const tubiao = await asyncgetuserTypePoint();
        let data = this.genData(tubiao);
        let o1 = this.getoption(data);
        var alljfChart = echarts.init(document.getElementById("alljf")); 
        alljfChart.setOption(o1);
        let fenshu = this.medals ? this.medals : 10;
        this.level = parseInt(fenshu / 100);
        this.level4 = parseInt(this.level / 64)
          ? parseInt(this.level / 64) % 4
          : parseInt(this.level / 64);
        this.level3 = parseInt(this.level / 16) 
          ? parseInt(this.level / 16) % 4
          : parseInt(this.level / 16);
        this.level2 = parseInt(this.level / 4) 
          ? parseInt(this.level / 4) % 4
          : parseInt(this.level / 4);
        this.level1 = parseInt(this.level / 4)
          ? parseInt(this.level / 1) % 4
          : parseInt(this.level / 1);
        this.medalswatch = fenshu % 100;
      } catch (err) {
        console.log(err);
      }
    },
    getoption(value) {
      const arry = value.seriesData;
      const indicator = [
        {
          name: arry[0].name,//学习时长
          max:5000// arry[0].value * 1.3
        },
         {
          name: arry[1].name,//答题正确
          max:2000
        },
         {
          name: arry[2].name,//发布评论
          max:500
        },
         {
          name: arry[3].name,//通过审核
          max:30
        },
         {
          name: arry[4].name,//解锁课程
          max:50
        },
      ];

      return {
        title: {
          text: "本周统计图"
        },
        tooltip: {}, // 提示框组件
        legend: {
          // 图例组件
          data: ["分数分配（Score distribution）"]
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: _.map(arry, v => v.value),
                name: "分数分配（Score distribution）"
              }
            ]
          }
        ]
      };
    },
    genData(cu) {
      let sb = [
        {
          v: "在线10分钟",
          n: "学习时长"
        },
        {
          v: "答题正确",
          n: "答题得分"
        },
        {
          v: "发布评论",
          n: "课后提问"
        },
        {
          v: "通过审核",
          n: "建议反馈"
        },
        {
          v: "解锁新课程",
          n: "解锁课程"
        }
      ];
      let out = [
        "在线10分钟",
        "答题正确",
        "发布评论",
        "通过审核",
        "解锁新课程"
      ];
      const seriesData = [];
      console.log(seriesData);
      for (let v of cu) {
        for (let vo of sb) {
          if (v.type == vo.v) {
            seriesData.push({
              name: `${vo.n}${v.sum}`,
              value: v.sum
            });
          }
        }
        out = _.without(out, v.type);
      }
      for (let v in out) {
        seriesData.push({ name: out[v], value: 10 });
      }
      return {
        seriesData
      };
    },
    ...mapActions(["session"])
  }
};
</script>

<style scoped>
#alljf {
  margin: 0 auto;
}
.sp {
  display: inline-block;
  line-height: 15px;
  padding: 5px;
  background-color: RGB(53, 194, 233);
  color: aliceblue;
  margin-right: 20px;
}
.color117 {
  color: RGB(117, 212, 240);
}
.sjfs {
  margin-top: 35px;
}
.line {
  line-height: 110px;
  text-align: center;
  font-size: 24px;
  color: RGB(117, 212, 240);
}
@media screen and (max-width: 1200px) {
  .col-lg-1 {
    display: none;
  }
}
.x-medals {
  max-width: 900px;
}
</style>
