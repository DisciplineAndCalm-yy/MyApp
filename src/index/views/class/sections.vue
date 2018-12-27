<template>
  <el-main class="tk-main">
    <div class="container-fluid" id="course" v-if="sections">
      <aliplayer v-bind="{lid:sections.ID, question}"></aliplayer>
      <div class="row mga">
        <div class="col">
          <div class="block">
            <span class="demonstration">课程列表</span>
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item" v-for="v in total() " :key="v">
                  <router-link
                    :style="link(v)"
                    class="page-link"
                    :to="{ name: 'sections', params: { cid: $attrs.cid,num:v }}"
                    v-text="v"
                  ></router-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div class="row mga" v-if="files.length || teacherfile.length">
        <span class="demonstration course">课程课件下载</span>
        <hr>
      </div>
      <div class="row mga">
        <div class="col">
          <a v-for="(v, i) in files" v-if="agent(v)" :key="i" :href="v.file_URL" target="_blank">
            <img :src="v.img_URL" alt="安装程序">
          </a>
          <a v-for="(v, i) in teacherfile" :key="i" :href="v.fileurl" target="_blank" v-if="ppts()">
            <img :src="kturl(v)" alt="教师课件"  class="kejian">
          </a>
        </div>
      </div>
      <!-- <div class="row mga" v-if="ppts()">
        <span class="demonstration col-md-12">教师资料下载</span>
        <div class="col-md-12">
          <a
            v-for="(v, i) in teacherfile"
            :key="i"
            v-text="JSON.parse(v.info).name"
            :href="v.fileurl"
            target="_blank"
          ></a>
        </div>
      </div> -->
      <setmessage v-bind="{cid,couse1}"></setmessage>
    </div>
  </el-main>
</template>

<script>
import aliplayer from "../aliplayer/index.vue";
import {
  asyncvideoQuestion,
  asyncgetLessionByCourseid,
  asynclearn,
  asyncgetCourseFile,
  asyncselectCoursefile
} from "../../../plugins/api.js";
import setmessage from "@/components/lession/message.vue";
import { mapGetters } from "vuex";

import _ from "underscore";
export default {
  name: "sections",
  data() {
    return {
      value2: true,
      sections: false,
      input5: "",
      cid: this.$attrs.cid,
      files: false,
      question: [],
      couse1: [],
      teacherfile: []
    };
  },
  
  computed: mapGetters(["user"]),
  watch: {
    $route() {
      this.start();
      asynclearn({ cid: this.$attrs.cid, num: this.$attrs.num });
    },
    async cid() {
      try {
        this.files = await asyncgetCourseFile({ cid: this.$attrs.cid });
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    this.start();
    try {
      asynclearn({ cid: this.$attrs.cid, num: this.$attrs.num });
      this.files = await asyncgetCourseFile({ cid: this.$attrs.cid });
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    aliplayer,
    setmessage
  },
  methods: {
    ppts() {
      let arr = ["Tourist", "User", "Student"];

      if (_.indexOf(arr, this.user.usertype) == -1) {
        return true;
      } else {
        return false;
      }
    },
    kturl(v) {//教师课件资料
      let data = [
        "https://hte-public.oss-cn-qingdao.aliyuncs.com/1BA67F1C-C720-4d18-BAD9-8B1510AD8D2E.png",
        "https://hte-public.oss-cn-qingdao.aliyuncs.com/ECD0639D-5E6E-4867-9B96-D996D3E1CDE8.png"
      ];
      let s = v.info.type
      return data[s];
    },
    link(v) {
      if (v == this.$attrs.num) {
        return "background:rgba(0,0,0,.2)";
      }
    },
    agent(v) {//判断电脑型号
      var agent = navigator.userAgent.toLowerCase();
      let system, arch;
      if (agent.indexOf("windows") != -1) {
        if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
          arch = "64";
        } else {
          arch = "32";
        }
        system = "windows";
        if (v.system == system && v.arch == arch) {
          return true;
        }
      } else if (agent.indexOf("mac") != -1) {
        system = "mac";
        if (v.system == system) {
          return true;
        }
      }
      return false;
    },
    async start() {
      let cid = this.$attrs.cid;
      let num = this.$attrs.num;
      try {
        this.couse1 = await asyncgetLessionByCourseid({ cid: cid });
        this.teacherfile = await asyncselectCoursefile({ cid: cid });
        for (let v of this.couse1) {
          if (v.num == num) {
            this.sections = v;
            this.question = await asyncvideoQuestion({ lid: this.sections.ID });
          }
        }
      } catch (err) {
        this.$alert("课程马上开放请先观看其他课程");
        this.$router.push("/allclass");
      }
    },
    current(e) {
      console.log(e);
    },
    total() {
      return this.couse1.length;
    }
  }
};
</script>

<style scoped>
.setions-row {
  padding-top: 12px;
}
.kejian{
  height:166px;
  margin:-1px 0 0 1px;
}
.course{
  text-indent: 16px;
}
</style>