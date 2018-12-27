<template>
  <el-main class="tk-main">
    <div class="container-fluid" id="course">
      <div class="row marg">
      <courseIndex v-bind="{ktId:$attrs.ktId}" ></courseIndex>
      </div>
      <moreTuijian v-bind:ktTuijian="ktTuijian"></moreTuijian>
    </div>
  </el-main>
</template>

<script>
import { mapState } from "vuex";
import moreTuijian from "@/components/moreTuijian.vue";
import courseIndex from "@/components/courseIndex.vue";
import { asyncgetTuijian } from "../../../plugins/api.js";
export default {
  name: "course",
  data() {
    return {
      zfb: false,
      html: null
    };
  },
  computed: mapState(["ktTuijian"]),
  watch: {
    $route() {
      this.start();
    }
  },
  async mounted() {
    this.start();
  },
  methods: {
    async start() {
      if (this.ktTuijian.length === 0) {
        await asyncgetTuijian();
      }
    }
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

@media screen and (max-width: 700px) {
  .padds {
    padding: 2px;
  }
  .hide {
    display: none;
  }
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
.smtag {
  cursor: pointer;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: 20px;
  margin-right: 20xp;
}
/*以下改动*/
.tk-main {
  overflow-y: scroll;
}
.tk-main::-webkit-scrollbar {
  width: 10px;
  height: 1px;
}
.tk-main::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.tk-main::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.marg {
  margin: 31px 13px 0 15px;
}
</style>