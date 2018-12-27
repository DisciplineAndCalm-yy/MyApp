<template>
  <div class="container-fluid" >
    <div class="row" >
      <div class="col" >
        <breadcrumb v-bind:paths="paths" v-bind:name="name" ></breadcrumb>
      </div>
    </div>
    <div class="row msg" >
      <div class="col" >
            <el-button-group>
      <el-button type="primary" @click="showdialo()" icon="el-icon-edit">添加课程</el-button>
    </el-button-group>
      </div>
    </div>
    <div class="row msg" >
      <div class="col" >
            <el-table :data="tableData" border style="width: 100%" max-height="550">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column fixed prop="ID" sortable label="ID" width="150">
      </el-table-column>
      <el-table-column fixed prop="name" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="coursePrize" label="价格" width="120">
      </el-table-column>
      <el-table-column prop="introduction" label="简介" width="120">
      </el-table-column>
      <el-table-column prop="courseType" label="类型" width="150">
      </el-table-column>
      <el-table-column prop="level" label="level" width="120">
      </el-table-column>
      <el-table-column prop="info" label="介绍" width="400">
      </el-table-column>
      <el-table-column prop="difficulty" label="星级" width="120"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px" v-text="scope.row.createTime"></span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="最近登陆" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px" v-text="scope.row.updateTime"></span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <router-link :to="{name:'coursebyid', params: { courseId: scope.row.ID }}" class=" btn btn-sm btn-info" type="text" size="small">查看</router-link>
          &nbsp;
          <el-button @click="upcourseshow(scope.$index)" type="warning" class="el-icon-edit-outline"  size="small"></el-button>
          <el-button @click="deldata({cid:scope.row.ID})" icon="el-icon-delete" type="danger" title="删除" size="small"></el-button>
        </template>
      </el-table-column>
    </el-table>
      </div>
    </div>

    <el-dialog title="修改课程" :visible.sync="dialogupdata">
      <el-form ref="form" :rules="rules2" :model="form" label-width="80px">
        <h2>添加课程</h2>
        <el-form-item label="课程名称" prop="name" >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="课程价格">
          <el-input-number v-model="form.coursePrize" :precision="2" :step="0.01"></el-input-number>
        </el-form-item>
          <el-form-item label="选取图片" prop="banner">
       <button type="button" @click="innerVisible = true" class="btn btn-info el-form-item__label text-white" style="width:80px" >选取图片</button>
        <el-input  :value="form.banner"  disabled></el-input>
      </el-form-item>
        <el-form-item label="课程简介">
          <el-input type="textarea" v-model="form.info"></el-input>
        </el-form-item>
        <el-form-item label="课程详细介绍">
          <el-input type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>
        <el-form-item label="课程难度" prop="level">
          <el-select v-model="form.level" placeholder="请选择课程难度">
            <el-option label="level 1" value="level 1"></el-option>
            <el-option label="level 2" value="level 2"></el-option>
            <el-option label="level 3" value="level 3"></el-option>
            <el-option label="level 4" value="level 4"></el-option>
            <el-option label="level 5" value="level 5"></el-option>
            <el-option label="level 6" value="level 6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程类型"  prop="Python">
          <el-select v-model="form.courseType" placeholder="请选择课程类型">
            <el-option label="Python" value="Python"></el-option>
            <el-option label="Blockly" value="Blockly"></el-option>
            <el-option label="Arduino" value="Arduino"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程星级">
          <el-rate v-model="form.difficulty"></el-rate>
        </el-form-item>
        <el-form-item label="课程标签">
        <el-tooltip class="item" effect="dark" content="按回车键完成单个标签输入" placement="top">
          <el-select
          style="display:block;"
        v-model="Tags"
        multiple
        filterable
        allow-create
        default-first-option
    placeholder="请选择文章标签">
          </el-select>
        </el-tooltip>
  </el-form-item>
        <el-form-item label="课程排序">
          <el-tooltip class="item" effect="dark" content="小的在前" placement="top-start">
            <el-input-number v-model="form.paixu" :step="1"></el-input-number>
          </el-tooltip>
        </el-form-item>
           <el-dialog
      width="80%"
      title="选取图片"
      :visible.sync="innerVisible"
      append-to-body>
      <ossImglist v-bind:selected="selected" ></ossImglist>
    </el-dialog>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogupdata = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加课程" :visible.sync="dialogFormVisible">
      <addcourse v-bind:dialog="dialog" v-bind:start="start" ></addcourse>
    </el-dialog>

  </div>

</template>

<script>
import {
  getallcourse,
  asyncdeleteCourse,
  asyncupdateCourse
} from "../../../plugins/api.js";
import addcourse from "./addcourse.vue";
import ossImglist from "@/components/newpublic/oss.vue";
import breadcrumb from "@/components/breadcrumb.vue";
export default {
  data() {
    return {
      name: "查看课程",
      paths: [],
      num1: 0,
      dialogFormVisible: false,
      dialogupdata: false,
      formLabelWidth: "120px",
      Tags: [],
      tableData: [
        {
          ID: "",
          name: "",
          coursePrize: 0.01,
          introduction: "",
          level: "",
          courseType: "",
          delivery: false,
          courseTag: "",
          resource: "",
          info: "",
          difficulty: 1,
          paixu: 100
        }
      ],
      options: [
        {
          value: "0086",
          label: "中国 0086"
        },
        {
          value: "+886",
          label: "中国台湾 00886"
        }
      ],
      upc: 0,
      form: {
        ID: "",
        name: "",
        coursePrize: 0.01,
        introduction: "",
        level: "",
        courseType: "",
        delivery: false,
        courseTag: "",
        resource: "",
        info: "",
        difficulty: 1,
        paixu: 100
      },
      rules2: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "blur" }
        ],
        banner: [
          { required: true, message: "请选择一张图片", trigger: "blur" }
        ],
        level: [
          { required: true, message: "请选择leavl等级", trigger: "blur" }
        ],
        courseType: [
          { required: true, message: "请选择课程类型", trigger: "blur" }
        ]
      },
      imglist: [],
      innerVisible: false
    };
  },
  async mounted() {
    this.start();
    //let list = await client(option)
    //applyTokenDo(option, listFiles);
  },
  watch: {
    Tags(v) {
      if (v.length > 4) {
        this.Tags.splice(4, 1);
        this.$message("最大4条");
      }
    }
  },
  methods: {
    async start() {
      this.tableData = await getallcourse();
    },
    showdialo() {
      this.dialogFormVisible = true;
    },
    couserindex() {
      return this.tableData[this.upc];
    },
    dialog() {
      this.dialogFormVisible = false;
    },
    selected(v) {
      this.form.banner = v;
      this.innerVisible = false;
    },
    async onSubmit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          try {
            this.form.courseTag = this.Tags.join(',');
            await asyncupdateCourse(this.form);
            this.tableData = await getallcourse();
            this.$message({
              message: "恭喜你，修改成功",
              type: "success"
            });
            this.dialogupdata = false;
          } catch (err) {
            this.$message.error("错了哦，修改失败:" + err);
          }
        } else {
          return false;
        }
      });
    },
    async deldata(i) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await asyncdeleteCourse(i);
            this.tableData = await getallcourse();
            this.$message({
              message: "恭喜你，删除成功",
              type: "success"
            });
          } catch (err) {
            this.$message.error("错了哦，删除失败:" + err);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addpackage() {
      this.form.packegeid.push({
        packegeid: "",
        packege_count: 1
      });
    },
    delpackage(i) {
      this.form.packegeid.splice(i, 1);
    },
    upcourseshow(i) {
      this.form = this.tableData[i];
      this.Tags = this.form.courseTag.split(',');
      this.dialogupdata = true;
    }
  },
  components: {
    addcourse,
    ossImglist,
    breadcrumb
  }
};
</script>

<style scoped>
</style>