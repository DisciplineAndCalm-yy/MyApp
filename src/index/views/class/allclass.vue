<template>
  <el-main class="tk-main bg">
    <div class="container-fluid">
      <div class="row">
        <!-- <div class="col-7 centent">
          <el-dropdown id="aaa" @command="typeess" trigger="click">
            <span class="el-tag smtag el-tag--small">分类
              <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu style="padding:0px;" slot="dropdown">
              <el-dropdown-item command="1" :class="drotype(1)">课程分类</el-dropdown-item>
              <el-dropdown-item command="2" :class="drotype(2)">难度分类</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div> -->
        <!-- <div class="col text-right">
          <el-autocomplete
            class="inline-input a5"
            v-model="state1"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.name }}</div>
              <span class="addr">{{ item.level }}</span>
            </template>
          </el-autocomplete>
        </div> -->
      </div>

      <!-- 课程包 -->
      <div class="row">
         <div name="el-zoom-in-center">
          <div class="row" v-show="showCtl">
            <!--Blockly-->
            <div class="card pointer" :style="bgimg()">
             <div class="card-header text-center"  @click="handleCtl(), tag('Blockly', 'courseType')" :style="tagclass('Blockly')" v-show="tagInfo == 1"></div>
              <div class="card-footer text-muted container-fluid">
                <div class="row">
                  <div class="col space">
                    <span class="between">Blockly课程包</span>
                      <i class="icon iconfont icon-redu"></i>
                  </div>
                  <div class="col text-right">
                    <el-rate disabled></el-rate>
                  </div>
                </div>
              </div>
            </div>
            <!--Python-->
             <div class="card pointer">
              <div class="card-header text-center"  @click="handleCtl(), tag('Python', 'courseType')"   :style="tagclass('Python')"  v-show="tagInfo == 1"></div>
              <div class="card-footer text-muted container-fluid">
                <div class="row">
                  <div class="col space">
                    <span class="between">Python课程包</span>
                      <i class="icon iconfont icon-redu"></i>
                  </div>
                  <div class="col text-right">
                    <el-rate disabled></el-rate>
                  </div>
                </div>
              </div>
            </div>
            <!-- Arduino -->
            <div class="card pointer">
              <div class="card-header text-center"  @click="handleCtl(), tag('Arduino','courseType')" :style="tagclass('Arduino')" v-show="tagInfo == 1"></div>
              <div class="card-footer text-muted container-fluid">
                <div class="row">
                  <div class="col space">
                    <span class="between">Arduino课程包</span>
                      <i class="icon iconfont icon-redu"></i>
                  </div>
                  <div class="col text-right">
                    <el-rate disabled></el-rate>
                  </div>
                </div>
              </div>
            </div>
            <!-- DouBaoBit -->
            <div class="card pointer">
              <div class="card-header text-center"  @click="handleCtl(), tag('DouBaoBit','courseType')" :style="tagclass('DouBaoBit')" v-show="tagInfo == 1"></div>
              <div class="card-footer text-muted container-fluid">
                <div class="row">
                  <div class="col space">
                    <span class="between">DouBaoBit课程包</span>
                      <i class="icon iconfont icon-redu"></i>
                  </div>
                  <div class="col text-right">
                    <el-rate disabled></el-rate>
                  </div>
                </div>
              </div>
            </div>
           <!-- 灵巧手 -->
            <div class="card pointer">
              <div class="card-header text-center"  @click="handleCtl(), tag('灵巧手', 'courseType')" :style="tagclass('灵巧手')" v-show="tagInfo == 1"></div>
              <div class="card-footer text-muted container-fluid">
                <div class="row">
                  <div class="col space">
                    <span class="between">灵巧手课程包</span>
                      <i class="icon iconfont icon-redu"></i>
                  </div>
                  <div class="col text-right">
                    <el-rate disabled></el-rate>
                  </div>
                </div>
              </div>
            </div>
          </div>
         </div>
         <div v-show="!showCtl" @click="handleCtl()">
           <span class="el-tag smtag el-tag--small">
              <i class="el-icon-arrow-left"></i>&nbsp;&nbsp;返回
            </span>
         </div>
        </div>
      <!--课程展示-->
      <div name="el-zoom-in-center">
        <div v-show="!selectkt, showAllClass" @click="handleCtl()" class="row">
          <div class="card" v-for="(v, i) in showCrouse" :key="i">
            <router-link :to="{name:'course', params: { ktId: v.ID }}">  
              <div class="card-header text-center" :style="bgimg(v.banner)">
                <i class="icon iconfont icon-play-circle ic"></i>
              </div>
              <div class="card-footer text-muted container-fluid">
                <div class="row">
                  <div class="col space">
                    <span class="between" v-text="v.name"></span>
                    <i class="icon iconfont icon-redu"></i>
                  </div>
                  <div class="col text-right">
                    <el-rate disabled v-model="v.difficulty"></el-rate>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-if="selectkt" class="row">
        <div class="card">
          <router-link :to="{name:'course', params: {ktId: selectkt.ID}}">
            <div class="card-header text-center" :style="bgimg(selectkt.banner)">
              <i class="icon iconfont icon-play-circle ic"></i>
            </div>
            <div class="card-footer text-muted container-fluid">
              <div class="row" v-if="showAllClass">
                <div class="col space">
                  <span class="between" v-text="selectkt.name"></span>
                  <i class="icon iconfont icon-redu"></i>
                </div>
                <div class="col text-right">
                  <el-rate disabled v-model="selectkt.difficulty"></el-rate>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </el-main>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "allclass",
  data() {
    return {
      index: 0,
      input5: null,
      color: "#fff",
      showCrouse: [], //所有的课程
      state1: "",
      selectkt: null,
      tagInfo: 1,
      tagarr: {
        all: "all",
        courseType: false,
        level: false
      },
      showCtl: true,
      showAllClass: false
    };
  },
  computed: mapState(["ktAll"]),
  watch: {
    async $route() {
      this.start();
    },
    state1(v) {
      if (!v) {
        this.selectkt = null;
      }
    },
    tagarr: {
      handler: function(v) {
        this.showCrouse = [];
        if (v.all) {
          this.showCrouse = this.ktAll;
        } else {
          if (v.courseType) {
            if (v.level) {
              for (let vo of this.ktAll) {
                if (v.courseType == vo.courseType && v.level == vo.level) {
                  this.showCrouse.push(vo);
                }
              }
            } else {
              for (let vo of this.ktAll) {
                if (v.courseType == vo.courseType) {
                  this.showCrouse.push(vo);
                }
              }
            }
          } else {
            for (let vo of this.ktAll) {
              if (v.level == vo.level) {
                this.showCrouse.push(vo);
              }
            }
          }
        }
      },
      deep: true
    }
  },
  async mounted() {
    this.start();
  },
  methods: {
    handleCtl() {
      this.showCtl = !this.showCtl;
      this.showAllClass = !this.showAllClass;
      console.log(this.showCtl, this.showAllClass)
    },
    handleSelect(item) {
      if (item) {
        this.state1 = item.name;
        this.selectkt = item;
      } else {
        this.state1 = null;
        this.selectkt = null;
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.ktAll;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    typeess(i) {
      i = new Number(i);
      this.tagInfo = i;
    },
    drotype(i) {
      if (this.tagInfo == i) {
        return "el-dropdown-menu__item";
      }
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    async start() {
      this.showCrouse = [];
      if (this.ktAll.length === 0) {
        try {
          await this.getkcAll();
        } catch (err) {
          console.log(err);
        }
      }
      this.showCrouse = this.ktAll;
    },
    tag(str, i) {
      if (i == 0) {
        this.tagarr.all = str;
        this.tagarr.courseType = false;
        this.tagarr.level = false;
      } else {
        this.tagarr.all = false;
        if (this.tagarr[i] == str) {
          this.tagarr[i] = false;
        } else {
          this.tagarr[i] = str;
        }
      }
    },
    tagclass(v) {
      if (
        v == this.tagarr.all ||
        v == this.tagarr.courseType ||
        v == this.tagarr.level
      ) {
        return "background-color: white; color: #fff;";//background-color: #40cbf2;
      } 
    },
    bgimg(i) {
      return `background-image: url(${i});background-size: 100%;background-repeat: no-repeat;`;
    },
    active(i) {
      if (this.index == i) {
        return "bg-primary text-white";
      }
    },
    nermt(i) {
      this.index = i;
    },
    ...mapActions(["getkcAll"]),
    gernerateId: function(index) {
      return " preson_" + index;
    }
  }
};
</script>

<style scoped>
.card {
  margin-top: 27px;
  margin-bottom: 35px;
  margin-left: 25px;
  margin-right: 25px;
}

.card-text {
  height: 60px;
  line-height: 28px;
}

.card-header {
  height: 30%;
}

.ic {
  z-index: 75;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  font-size: 6.5em;
}

.ic:hover {
  color: rgba(255, 255, 255, 0.8);
}

.card {
  width: 348px;
}

.card-header {
  height: 180px;
}

.item {
  cursor: pointer;
}

.smtag {
  cursor: pointer;
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 20px;
  margin-left: 20px;
  margin-right: 20xp;
}

.mntag {
  cursor: pointer;
  border-radius: 12px;
  margin-left: 12px;
  padding-left: 8px;
  padding-right: 8px;
  color: #3f3f3f;
}

.mntag:hover {
  color: #000;
}

.icon-redu {
  color: red;
}

.tab-row {
  padding-top: 15px;
  padding-bottom: 15px;
}

.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.addr {
  font-size: 12px;
  color: #b4b4b4;
}

.highlighted .addr {
  color: #ddd;
}
.a6-2 {
  width: 101px;
  height: 27px;
  border-radius: 14px;
  border: solid 1px #02b3e4;
}
.a5 {
  min-width: 300px;
  background-color: #35c2e9;
  border-radius: 16px;
  margin-right: 75px;
}
.el-input__inner {
  height: 23px;
  border-radius: 50px;
}
.a13 {
  width: 159px;
  height: 84px;
  background-color: #4c5f79;
  border-radius: 10px;
}
/*以下改动*/
.bg {
  background-color: #f1f1f1;
}
.centent {
  line-height: 35px;
}
.el-dropdown-menu {
  background-color: #4c5f79;
}
.el-dropdown-menu__item {
  color: white;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #40cbf2;
  color: white;
}
.el-tag {
  background-color: #f1f1f1;
  border: 1px solid #40cbf2;
  color: #40cbf2;
}
.card-footer {
  background-color: white;
  font-size: 12px;
}
.space {
  padding-left: 15px;
  padding-right: 0px;
}
.between {
  font-family: MicrosoftYaHei;
  color: #02b3e4;
}
/*课程文件包*/
.upack {
  margin: auto;
}
.squre {
  width: 200px;
  height: 200px;
  margin: 15px;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
}
.squre .bags {
  width: 160px;
  height: 160px;
  margin: auto;
}
.squre .bags .icon {
  font-size: 120px;
  color: #13227a;
  cursor: pointer;
  text-align: center;
  margin: 20px;
}
.squre p {
  text-align: center;
  font-size: 16px;
  color: black;
  margin-top: 5px;
}
.pointer{
  cursor: pointer;
}
/* .heights {
  height: 180px;
} */
</style>