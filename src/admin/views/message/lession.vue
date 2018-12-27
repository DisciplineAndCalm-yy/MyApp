<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <breadcrumb v-bind:paths="paths" v-bind:name="name"></breadcrumb>
            </div>
        </div>
        <div class="row msg" >
          <el-table :data="tableData" border style="width: 100%" max-height="550">
      <el-table-column fixed prop="form_ID" label="用户ID" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-text="userid(scope)"></span>
        </template>
      </el-table-column>
      <el-table-column   prop="title" label="标题" >
        <template slot-scope="scope">
          <span @click="watchMessage1(scope)" class="aspan" style="margin-left: 10px" v-text="scope.row[0].title"></span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="最后时间" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px" v-text="scope.row[scope.row.length-1].createTime"></span>
        </template>
      </el-table-column>
    </el-table>
        </div>
        <el-dialog
  :title="rows[0]?rows[0].title:'提示'"
  :visible.sync="dialogVisible"
  width="900px"
  center
  >
  <watchMessages v-bind="{row:rows}" ></watchMessages>
</el-dialog>
    </div>
</template>

<script>
import {
  asyncsentMessage,
  asyncreceivedMessage
} from "../../../plugins/api.js";
import breadcrumb from "@/components/breadcrumb.vue";
import watchMessages from "@/components/lession/watchmessage.vue";
import _ from "underscore";
import { mapGetters } from "vuex";
export default {
  name: "message",
  data() {
    return {
      name: "消息中心",
      paths: [],
      dialogVisible: false,
      sentlist: [],
      receivedlist: [],
      messagelist: [],
      showDialog: false,
      mess: [],
      tableData: [],
      rows: []
    };
  },
  computed: mapGetters(["user"]),
  async mounted() {
    this.start();
  },
  methods: {
    async start() {
      try {
        this.sentlist = await asyncsentMessage();
      } catch (err) {
        console.log(err);
      }
      try {
        this.receivedlist = await asyncreceivedMessage();
      } catch (err) {
        console.log(err);
      }
      const arr = _.union(this.sentlist, this.receivedlist);
      let map = [];
      map = _.groupBy(arr, function(num) {
        return num.title;
      });
      for (let v in map) {
        this.tableData.push(map[v]);
      }
    },
    userid(d) {
      return d.row[0].from_ID;
    },
    watchMessage1(d) {
      let row = _.sortBy(d.row, x=>{
        return x.createTime
      })
      this.rows = row;
      this.dialogVisible = true;
    },
    showmeg(d) {
      this.showDialog = true;
      const arr = _.union(this.sentlist, this.receivedlist);
      this.mess = [];
      for (let v of arr) {
        if (d == v.title) {
          this.mess.push(v);
        }
      }
    }
  },
  components: {
    breadcrumb,
    watchMessages
  }
};
</script>

<style scoped>
.aspan {
  cursor: pointer;
  color: blueviolet;
}
</style>
