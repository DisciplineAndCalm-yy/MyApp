<template>
  <el-container>
    <el-form ref="form" :model="sub" style="width:100%" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="sub.Title"></el-input>
      </el-form-item>
      <el-form-item label="分组">
        <el-select v-model="sub.CateName" placeholder="请选择">
          <el-option label="Blockly&Arduino" value="Blockly&Arduino"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="sub.Description"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-tooltip class="item" effect="dark" content="按回车键完成单个标签输入" placement="top">
          <el-select
            style="display:block;"
            v-model="Tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签"
          ></el-select>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="封面">
        <img :src="sub.CoverURL" width="120" alt>
      </el-form-item>
      <el-form-item label="重新选择封面">
        <el-button type="primary" @click="showdialog(0)">从截图中选择</el-button>
        <el-button type="success" @click="showdialog(1)">从封面库中选择</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
    <el-dialog width="80%" :title="title" :visible.sync="innerVisible" append-to-body>
      <ossImglist v-if="fm" v-bind="{selected}"></ossImglist>
      <div class="container-fluid" v-if="!fm">
        <div class="row bg-dark">
          <img
            v-for="(v, i) in form.Snapshots.Snapshot"
            @click="selected(v)"
            :src="v"
            :key="i"
            class="float-left padd"
            alt="..."
          >
        </div>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { asyncupdateVideoInfo } from "../../plugins/api.js";
import ossImglist from "@/components/newpublic/oss.vue";
import _ from "underscore";
export default {
  data() {
    return {
      innerVisible: false,
      prefix: "cover/",
      fm: false,
      Tags: [],
      title: "选择图片哦",
      sub: {
        VideoId: "",
        CoverURL: "",
        Description: "",
        Title: "",
        Tags: "",
        CateName: ""
      }
    };
  },
  watch: {
    Tags(v) {
      if (v.length > 4) {
        this.Tags.splice(4, 1);
        this.$message("最大4条");
      }
    },
    form() {
      this.childrenstart();
    }
  },
  props: ["form", "start", "closedialog"],
  mounted() {
    this.childrenstart();
  },
  methods: {
    childrenstart() {
      const {
        VideoId,
        CoverURL,
        Description,
        Title,
        CateName,
        Tags,
        CateId
      } = JSON.parse(JSON.stringify(this.form)); //stringify从一个对象中解析出字符串  parse从一个字符串中解析出一个json对象
      this.Tags = _.compact(Tags.split(","));
      this.sub = {
        VideoId,
        CoverURL,
        Description,
        Title,
        Tags,
        CateId,
        CateName
      };
    },
    async onSubmit() {
      const form = JSON.parse(JSON.stringify(this.sub));
      form.Tags = this.Tags.join(",");
      console.log(form);
      try {
        await asyncupdateVideoInfo(form);
        this.$message("修改成功");
        this.start();
        this.closedialog();
      } catch (err) {
        this.$message.error(`失败`);
      }
    },
    showdialog(i) {
      if (i) {
        this.title = "从封面库中选择";
        this.fm = true;
      } else {
        this.title = "从截图中选择";
        this.fm = false;
      }
      this.innerVisible = true;
    },
    selected(v) {
      this.sub.coverURL = v;
      this.innerVisible = false;
    }
  },
  components: {
    ossImglist
  }
};
</script>
<style scoped>
.padd {
  width: 400px;
  height: 225px;
  cursor: pointer;
  margin: 15px;
}
</style>
