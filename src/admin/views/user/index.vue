<template>
  <div class="container-fluid">
    <el-alert title="用户是可以登陆到网站上的用户" type="warning" show-icon></el-alert>
    <div class="row">
      <div class="col">
        <breadcrumb v-bind:paths="paths" v-bind:name="name"></breadcrumb>
      </div>
    </div>
    <div class="row msg">
      <div class="col-sm-5">
        <el-button-group>
          <el-button type="primary" @click="showdialo()" icon="el-icon-edit">添加代理商</el-button>
          <router-link :to="{'name': 'addstudent'}">
            <el-button type="primary" @click="showstudent()" icon="el-icon-edit">添加学生</el-button>
          </router-link>
          <a
            href="https://hte-public.oss-cn-qingdao.aliyuncs.com/hterobot_student_list.xlsx"
            target="view_window"
          >
            <el-button type="primary" icon="el-icon-edit">下载学生模板</el-button>
          </a>
          <el-button type="primary" @click="adcourse = true">批量添加课程</el-button>
        </el-button-group>
      </div>
      <div calss="col-sm-8 obstruct">
        <span>选择日期&nbsp;&nbsp;</span>
        <el-date-picker
          v-model="datetime"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <!-- 查询用户id-->
        <el-input-number
          v-if="datebase.length"
          v-model="idnum[0]"
          :min="datebase[0].userid"
          :max="datebase[datebase.length-1].userid"
          style="margin-left:30px;"
        ></el-input-number>
        <el-input-number
          v-if="datebase.length"
          v-model="idnum[1]"
          :min="datebase[0].userid"
          :max="datebase[datebase.length-1].userid"
        ></el-input-number>
        <el-button @click="getidtouser" class="queryuser">查询id的用户</el-button>
        <!-- <el-button @click="getidtouser" class="queryuser">查询id的用户</el-button> -->
      </div>
    </div>
    <div class="row msg">
      <div class="col">
        <el-table
          class="text-center"
          @selection-change="handleSelectionChange"
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border
          :height="700"
          style="width: 100%;"
          v-loading="loading"
        >
          <el-table-column fixed type="selection" width="55"></el-table-column>
          <el-table-column fixed prop="userid" sortable label="用户ID" width="150"></el-table-column>
          <el-table-column prop="username" label="姓名" width="120"></el-table-column>
          <el-table-column prop="usertype" sortable label="用户类型" width="120"></el-table-column>
          <el-table-column prop="phonenum" sortable label="手机号码" width="120"></el-table-column>
          <el-table-column prop="useremail" label="邮箱" width="120"></el-table-column>
          <el-table-column prop="medal" sortable label="奖章" width="150"></el-table-column>
          <el-table-column prop="totalspend" sortable label="消费金额" width="120"></el-table-column>
          <el-table-column prop="lastlogintime" sortable label="最近登陆" width="150">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px" v-text="scope.row.lastlogintime"></span>
            </template>
          </el-table-column>
          <el-table-column prop="agent" label="agent" width="120"></el-table-column>
          <el-table-column prop="level" label="level" width="120"></el-table-column>
          <el-table-column prop="packegeid" label="邮编" width="120"></el-table-column>
          <el-table-column prop="area" label="区号" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <router-link
                :to="{ name:'watchuser', params: { userid: scope.row.userid } }"
                class="btn btn-sm btn-info"
                size="small"
              >查看</router-link>&nbsp;
              <el-button
                @click="updateuser(scope.row)"
                type="warning"
                class="el-icon-edit-outline"
                size="small"
              ></el-button>
              <el-button
                type="danger"
                @click="deldata({uid:scope.row.userid})"
                icon="el-icon-delete"
                title="删除"
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="添加代理商" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="代理商名称" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="代理商密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择地区" :label-width="formLabelWidth">
          <el-select v-model="form.area" auto-complete="off">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代理商手机" :label-width="formLabelWidth">
          <el-input v-model="form.phonenum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="代理商邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.useremail" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改用户" :visible.sync="dialogUser">
      <el-form v-if="form1" :model="form1">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form1.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="form1.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" :label-width="formLabelWidth">
          <el-select v-model="form1.usertype" auto-complete="off">
            <el-option
              v-for="item in usertypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择地区" :label-width="formLabelWidth">
          <el-select v-model="form1.area" auto-complete="off">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户手机" :label-width="formLabelWidth">
          <el-input v-model="form1.phonenum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="formLabelWidth">
          <el-input v-model="form1.useremail" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUser= false">取 消</el-button>
        <el-button type="primary" @click="onSubmit1">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="adcourse" width="500px">
      <el-table
        ref="multipleTable"
        :data="ktAll"
        tooltip-effect="dark"
        style="width: 100%"
        :height="400"
        v-loading="loading"
        @selection-change="courseSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" sortable label="课程名称" width="150"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adcourse = false">取 消</el-button>
        <el-button type="primary" @click="addcourse">确 定</el-button>
      </span>
    </el-dialog>

    <div class="row col-sm-5 block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, Totals]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Totals">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import {
  allUser,
  asyncgetAllPackege,
  asyncnewAgent,
  asyncdeleteUserByID,
  asyncupdateUser,
  asyncaddUsercouser
} from "../../../plugins/api.js";
import { mapGetters } from "vuex";
import breadcrumb from "@/components/breadcrumb.vue";
export default {
  data() {
    return {
      datetime: [],
      paths: [],
      name: "查看用户",
      dialogFormVisible: false,
      dialogUser: false,
      dialogstudent: false,
      formLabelWidth: "120px",
      idnum: [],
      multipleSelection: [],
      loading: false,
      adcourse: false,
      courses: [],
      tableData: [
        {
          userid: "2016-05-03",
          info: "",
          password: "",
          usertype: "",
          username: "",
          useremail: "",
          phonenum: "",
          level: "",
          experience: "",
          headimg: "",
          medal: "",
          totalspend: "",
          lastlogintime: "",
          agent: "",
          packegeid: "",
          area: ""
        }
      ],
      datebase: [],
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
      usertypes: [
        {
          value: "Tourist",
          label: "游客"
        },
        {
          value: "User",
          label: "用户"
        },
        {
          value: "Agent",
          label: "代理商"
        },
        {
          value: "Admin",
          label: "管理员"
        },
        {
          value: "Teacher",
          label: "教师"
        },
        {
          value: "Student",
          label: "学生"
        }
      ],
      form: {
        password: "",
        usertype: "Agent",
        username: "",
        useremail: "",
        phonenum: "",
        area: "0086"
      },
      form1: null,
      packages: [],

      currentPage: 1,
      pagesize: 20,
      Totals: 0

    };
  },
  computed: mapGetters(["ktAll"]),
  async mounted() {
    this.start();
  },
  watch: {
    datetime(v) {
      //根据用户注册时间查找用户
      this.tableData = [];
      let startime = Date.parse(new Date(v[0]));
      let endtime = Date.parse(new Date(v[1]));
      for (let v of this.datebase) {
        if (v.createtime) {
          let time = Date.parse(new Date(v.createtime));
          if (time > startime && time < endtime) {
            this.tableData.push(v);
          }
        }
      }
    }
  },
  methods: {

    handleSizeChange(val) {
        this.pagesize = val;
        console.log(`每页 ${val} 条`);
      },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    getPages() {
      this.Totals = this.datebase.length;
     },

    showdialo() {
      this.dialogFormVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getidtouser() {
      //查询用户id范围
      this.tableData = [];
      for (let v of this.datebase) {
        if (v.userid >= this.idnum[0] && v.userid <= this.idnum[1]) {
          this.tableData.push(v);
        }
      }
    },
    async start() { //展示所有的用户信息
      this.datebase = await allUser();
      this.tableData = this.datebase;
      this.packages = await asyncgetAllPackege();
      await this.getPages();
    },
    async onSubmit() {
      try {
        await asyncnewAgent(this.form);
        this.start();
        this.$message({
          message: "恭喜你，添加成功",
          type: "success"
        });
        this.dialogFormVisible = false;
      } catch (err) {
        this.$message.error("错了哦，添加失败:" + err);
      }
    },
    addpackage() {
      this.form.packegeid.push("");
      this.form.packege_count.push(1);
    },
    delpackage(i) {
      this.form.packegeid.splice(i, 1);
      this.form.packege_count.splice(i, 1);
    },
    async deldata(i) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await asyncdeleteUserByID(i);
            this.start();
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
    async updateuser(i) {
      console.log(i);
      this.form1 = i;
      this.dialogUser = true;
    },
    async onSubmit1() {
      try {
        await asyncupdateUser(this.form1);
        this.start();
        this.$message({
          message: "恭喜你，修改成功",
          type: "success"
        });
        this.dialogUser = false;
      } catch (err) {
        this.$message.error("错了哦，修改失败:" + err);
      }
    },
    showstudent() {
      this.dialogstudent = !this.dialogstudent;
    },
    courseSelectionChange(value) {
      this.courses = value;
    },
    async addcourse() {
      // 选中的用户
      this.loading = true;
      for (let v of this.multipleSelection) {
        // 选中的课程
        for (let vo of this.courses) {
          await asyncaddUsercouser({
            uid: v.userid,
            cid: vo.ID
          });
        }
      }
      this.adcourse = false;
      this.loading = false;
    }
  },
  components: {
    breadcrumb
  }
};
</script>

<style scoped>
.obstruct {
  margin: 0 0 0 10px;
  display: inline-block;
}
.block{
  float: right;
}
.queryuser{
 background-color:#409EFF;
 color:white;
}
</style>