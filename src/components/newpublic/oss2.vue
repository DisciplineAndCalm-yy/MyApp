<template>
  <div class="container-fluid">
    <el-alert title type="warning" show-icon></el-alert>
    <div class="row">
      <div class="col">
        <el-button-group>
          <el-button @click="uploadimg = !uploadimg" size="mini">
            添加图片
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
          <el-button type="success" @click="submitUpload" size="mini" :disabled="!uploadimg">上传图片</el-button>
          <el-button size="mini" @click="putdir">新建文件夹</el-button>
        </el-button-group>
        <el-button-group>
          <el-button size="mini">下载</el-button>
          <el-button size="mini" @click="delectClick">删除</el-button>
          <el-button size="mini">重命名</el-button>
          <el-button size="mini" @click="gitosslist">刷新图片列表</el-button>
        </el-button-group>
      </div>
    </div>
    <el-row class="downks">
      <el-col :span="12">
        <span
          v-if="fileListOss.length"
          type="primary"
          @click="files(-1)"
          size="mini"
          icon="el-icon-arrow-left"
        >返回上一级&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <span
          type="primary"
          :disabled="fileListOss.length === 0"
          @click="dirlist = ''"
          size="mini"
        >全部文件&nbsp;&nbsp;>&nbsp;&nbsp;</span>
        <el-button
          type="primary"
          :disabled="fileListOss.length === i+1"
          v-for="(v,i) of fileListOss "
          :key="v"
          size="mini"
          @click="files(v,i)"
          v-text="v"
        ></el-button>
      </el-col>
      <!-- <el-col :span="12">
        <i class="el-icon-warning text-warning" circle></i> 搜索 &nbsp;
        <el-autocomplete
          class="inline-input"
          v-model="state1"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.name }}</div>
            <span class="addr">{{ item.lastModified }}</span>
          </template>
        </el-autocomplete>
      </el-col>-->
    </el-row>
    <div class="row">
      <div class="col">
        <transition name="el-fade-in-linear">
          <el-upload
            v-show="uploadimg"
            accept="image/*"
            class="upload-demo"
            ref="upload"
            drag
            :file-list="fileList"
            :auto-upload="false"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="putimg"
            :on-success="successUpload"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击选择文件</em>
            </div>
            <div slot="tip" class="el-upload__tip">只能上传图片文件，如果上传的名称相同就会覆盖原文件</div>
          </el-upload>
        </transition>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div v-for="(v, i) in prefixes " :key="i" :title="v" class="well pull-left">
          <div class="pull-left" style="width:32px; height:110px;">
            <el-checkbox class="padds" v-model="delectimg" :label="v">&nbsp;</el-checkbox>
          </div>
          <div style="width:110px; " class="pull-right">
            <i @click="nextdir(v)" class="icon iconfont icon-wenjianjiaguanbi"></i>
          </div>
          <br class="clearfix">
          <p v-text="v.split('/')[v.split('/').length-2]" class="text-center"></p>
        </div>
        <div v-for="v in imglist " :key="v.etag" :title="v.url" class="well pull-left">
          <div class="pull-left" style="width:32px; height:110px;">
            <el-checkbox class="padds" v-model="delectimg" :label="v.name">&nbsp;</el-checkbox>
            <a target="view_window" :href="v.url">
              <i class="el-icon-search padds"></i>
            </a>
          </div>
          <div style="width:110px; " class="pull-right">
            <i @click="nextdir1(v)" v-if="isdir(v)" class="icon iconfont icon-wenjianjiaguanbi"></i>
            <i v-else :class="matchType(v.url).style">
              <img v-if="matchType(v.url).show" class="boxDiv" :src="stylename(v.url)" alt>
            </i>
          </div>
          <br class="clearfix">
          <p v-text="v.name.split('/')[v.name.split('/').length-1]" class="text-center"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OSS from "ali-oss";
import { asyncuploadAccess } from "../../../plugins/api.js";
import breadcrumb from "@/components/breadcrumb.vue";
import _ from "underscore";
export default {
  name: "oss",
  data() {
    return {
      paths: [],
      state1: "", // 搜索
      selectkt: null,
      name: "图片管理",
      fileList: [], // 要上传的文件
      fileListOss: [], // 目录
      imglist: [],
      dirlist: "",
      delectimg: [], // 要删除的文件
      uploadimg: false,
      prefixes: [] //文件夹
    };
  },
  mounted() {
    this.start();
  },
  watch: {
    dirlist(arr) {
      this.fileListOss = _.compact(arr.split("/"));
      this.gitosslist();
    }
  },
  methods: {
    stylename(name) {
      return `${name}?x-oss-process=style/style-50`;
    },
    files(i, iso) {
      console.log(this.fileListOss);
      let arr = [];
      if (i == -1) {
        for (let v = 0; v < this.fileListOss.length - 1; v++) {
          arr.push(this.fileListOss[v]);
        }
        this.dirlist = arr.join("/");
      } else {
        if (iso != this.fileListOss.length - 1) {
          for (let v = 0; v <= iso; v++) {
            arr.push(this.fileListOss[v]);
          }
          this.dirlist = arr.join("/");
          console.log(this.dirlist);
        }
      }
    },
    handleSelect(item) {
      let arr = item.name.split("/");
      arr.pop();
      this.dirlist = arr;
    },
    querySearch(queryString, cb) {
      var restaurants = this.imglist;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        let arr = restaurant.name.split("/");
        let name = arr[arr.length - 1]
          ? arr[arr.length - 1]
          : arr[arr.length - 2];
        return name.toLowerCase().indexOf(queryString.toLowerCase()) != -1;
      };
    },
    async start() {
      this.gitosslist();
    },
    submitUpload() {
      let name = this.dirlist ? this.dirlist : "根目录";
      this.$confirm(`此次将提交到：${name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs.upload.submit();
          this.gitosslist();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    async delectClick() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          console.log(this.delectimg);
          try {
            let option = await this.getcreds();
            let client = new OSS(option);
            await client.deleteMulti(this.delectimg);
            this.gitosslist();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } catch (e) {
            this.$message({
              type: "info",
              message: "删除失败"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    matchType(result) {
      //判断文件的后缀名
      //后缀名的获取
      let suffix = result.slice(result.lastIndexOf(".") + 1);
      //匹配图片
      var list = ["jpg", "png", "jpeg", "bmp", "gif", "psd", "tag", "tiff"];
      //匹配word
      var word = [
        "doc",
        "docx",
        "dot",
        "dotx",
        "docm",
        "dotm",
        "mxl",
        "mht",
        "mhtml",
        "wpt"
      ];
      //匹配excel
      var excel = [
        "xlsx",
        "xls",
        "xlsm",
        "xlt",
        "xltx",
        "xltm",
        "et",
        "ett",
        "dbf",
        "prn"
      ];
      //匹配视频
      var mmp = [
        "avi",
        "wmv",
        "mpeg",
        "mp4",
        "mov",
        "mkv",
        "flv",
        "f4v",
        "m4v",
        "rmvb",
        "rm",
        "3gp",
        "dat",
        "ts",
        "mts",
        "vob"
      ];
      //匹配ppt
      var ppt = ["ppt"];
      //匹配txt
      var txtlist = ["txt"];
      //匹配pdf
      var pdf = ["pdf"];
      if (_.indexOf(list, suffix) != -1) {
        return {
          style: "",
          show: true
        };
      } else if (_.indexOf(excel, suffix) != -1) {
        return {
          style: "icon iconfont icon-excel",
          show: false
        };
      } else if (_.indexOf(word, suffix) != -1) {
        return {
          style: "icon iconfont icon-word",
          show: false
        };
      } else if (_.indexOf(mmp, suffix) != -1) {
        return {
          style: "icon iconfont icon-shipin",
          show: false
        };
      } else if (_.indexOf(txtlist, suffix) != -1) {
        return {
          style: "icon iconfont icon-wenjian",
          show: false
        };
      } else if (_.indexOf(ppt, suffix) != -1) {
        return {
          style: "icon iconfont icon-ppt",
          show: false
        };
      } else if (_.indexOf(pdf, suffix) != -1) {
        return {
          style: "icon iconfont icon-pdf",
          show: false
        };
      } else {
        return {
          style: "icon iconfont icon-shu",
          show: false
        };
      }
    },
    async gitosslist() {
      try {
        let option = await this.getcreds();
        let client = new OSS(option);
        let list = await client.list({
          "max-keys": 1000,
          prefix: this.dirlist,
          delimiter: "/"
        });
        console.log(list);
        this.imglist = list.objects;
        this.prefixes = list.prefixes;
      } catch (err) {
        console.log(err);
      }
    },
    async putimg(e) {
      if (this.uploadimg) {
        try {
          let option = await this.getcreds();
          let client = new OSS(option);
          // object表示上传到OSS的名字，可自己定义
          // file浏览器中需要上传的文件，支持HTML5 file 和 Blob类型
          await client.put(`${this.dirlist}${e.file.name}`, e.file);
        } catch (e) {
          console.error("error: %j", e);
        }
      }
    },
    async putdir() {
      this.$prompt("请输入文件夹", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: new RegExp("^[\u4E00-\u9FA5A-Za-z0-9_]+$"),
        inputErrorMessage: "文件夹格式不正确"
      })
        .then(async ({ value }) => {
          console.log(value);
          try {
            let option = await this.getcreds();
            let client = new OSS(option);
            // object表示上传到OSS的名字，可自己定义
            // file浏览器中需要上传的文件，支持HTML5 file 和 Blob类型
            let blob = new Blob(new Int32Array(new ArrayBuffer(0)));
            await client.put(`${this.dirlist}${value}`, blob);
            await this.gitosslist();
            this.$message({
              type: "success",
              message: "你的文件夹是: " + value
            });
          } catch (err) {
            console.error("error: %j", err);
            this.$message({
              type: "error",
              message: "创建失败"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    async getcreds() {
      let creds = await asyncuploadAccess();
      return {
        region: "oss-cn-beijing",
        bucket: "hterobot-image",
        stsToken: creds.securityToken,
        accessKeyId: creds.accessKeyId,
        accessKeySecret: creds.accessKeySecret
      };
    },
    successUpload(e) {
      console.log(e);
    },
    nextdir1(v) {
      let str = "hterobot-image.oss-cn-beijing.aliyuncs.com";
      let l = v.url.indexOf(str) + str.length + 1;
      let vs = v.url.substring(l) + "/";
      this.nextdir(vs);
    },
    nextdir(v) {
      this.dirlist = v;
    },
    isdir(v) {
      if (v.size === 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    breadcrumb
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.upload-demo {
  height: 450px;
  overflow-y: scroll;
  padding: 35px;
}

.well {
  width: 150px;
  height: 150px;
  float: left !important;
  cursor: pointer;
  margin: 15px;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.well:hover {
  background-color: #f5f5f5;
}

.iconfont {
  font-size: 72px;
  color: #ffca28;
}

.downks {
  margin-top: 8px;
}

.downks span {
  cursor: pointer;
  font-size: 14px;
  color: #6c96f2;
}

p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
.padds {
  padding: 4px;
  margin-top: 20px;
}
.el-icon-search:hover {
  color: #000000;
}
.boxDiv {
  display: block;
  margin-top: 30px;
}
</style>