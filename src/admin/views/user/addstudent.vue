<template>
  <div @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="file">选择execl文件</label>
          <input type="file" class="form-control" id="file" :accept="SheetJSFT" @change="_change">
          &nbsp;
        </div>
        <div class="col">
          <!-- <label for="file">保存成execl</label>
          <button
            :disabled="data.length ? false : true"
            class="btn btn-success"
            @click="_export"
          >Export</button>-->
          &nbsp;
          <label for="file">开始创建学生</label>
          <button
            :disabled="data.length ? false : true"
            class="btn btn-success"
            @click="upload"
          >创建学生</button>
        </div>
      </div>
    </div>
    <div class="row msg" v-if="data2.length">
      <div class="col">
        <h3>添加成功的
          <el-button @click="_export(0)">保存添加成功的</el-button>
        </h3>
        <table class="table">
          <tbody>
            <tr v-for="(r, key) in data2" :key="key">
              <td v-for="c in cols" :key="c.key">{{ r[c.key] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row msg" v-if="data3.length">
      <div class="col">
        <h3>添加失败
          <el-button @click="_export(1)">保存添加失败的</el-button>
        </h3>
        <table class="table">
          <tbody>
            <tr v-for="(r, key) in data3" :key="key">
              <td v-for="c in cols" :key="c.key">{{ r[c.key] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th v-for="c in cols" :key="c.key">{{c.name}}</th>
            </tr>
            <tr>
              <th v-for="(c,i) in bt" :key="i" v-text="c"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, key) in data" :class="inspecttr(r,key)" :key="key">
              <td v-for="c in cols" :key="c.key">{{ r[c.key] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
import _ from "underscore";
import { asyncaddStudent } from "../../../plugins/api.js";
const make_cols = refstr =>
  Array(XLSX.utils.decode_range(refstr).e.c + 1)
    .fill(0)
    .map((x, i) => ({
      name: XLSX.utils.encode_col(i),
      key: i
    }));

const _SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
]
  .map(function(x) {
    return "." + x;
  })
  .join(",");
export default {
  data() {
    return {
      data: [],
      cols: [],
      SheetJSFT: _SheetJSFT,
      isok: 1,
      bt: [],
      data2: [], //添加成功
      data3: [] // 添加失败
    };
  },
  methods: {
    _suppress(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    },

    _drop(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      const files = evt.dataTransfer.files;
      if (files && files[0]) this._file(files[0]);
    },
    _change(evt) {
      const files = evt.target.files;
      if (files && files[0]) this._file(files[0]);
    },
    _export(i) {
      /* convert state to workbook */
      let data = [];
      let str = "";
      let ar = [];
      ar[0] = this.bt;
      if (i == 0) {
        data = _.union(ar, this.data2);
        str = "创建成功的";
      } else {
        data = _.union(ar, this.data3);
        str = "创建失败的";
      }
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      /* generate file and send to client */
      XLSX.writeFile(wb, str + ".xlsx");
    },
    _file(file) {
      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      this.data = []
       this.cols = []
      reader.onload = e => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, {
          type: "binary"
        });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {
          header: 1
        });
        /* Update state */
        let mess = this.inspects(data);
        if (mess) {
          this.data = mess;
          this.cols = make_cols(ws["!ref"]);
        } else {
          this.$alert("文件不合法");
        }
      };
      reader.readAsBinaryString(file);
    },
    inspects(data) {
      let arr = [
        "姓名",
        "手机",
        "性别",
        "学校",
        "家长姓名",
        "学号",
        "学校地址",
        "负责老师",
        "负责老师电话",
        "班级"
      ];
      let mess = [];
      this.isok = 1;
      for (let row of data) {
        let nuarr = _.difference(arr, row);
        if (nuarr.length === 0) {
          this.isok = 0;
          this.bt = row;

          continue;
        }
        if (this.isok === 0) {
          let x = _.compact(row);
          if (x.length != 0) {
            mess.push(row);
          }
        }
      }
      if (this.isok != 0) {
        return false;
        //this.$alert("这个文件不合法");
      } else {
        return mess;
      }
    },
    inspecttr(row) {
      let 手机 = _.indexOf(this.bt, "手机");
      let 学号 = _.indexOf(this.bt, "学号");
      if (row[手机] || row[学号]) {
        return "alert alert-primary";
      } else {
        return "alert alert-danger";
      }
    },
    async upload() {
      this.data2 = [];
      this.data3 = [];
      let arr = [
        "姓名",
        "手机",
        "性别",
        "学校",
        "家长姓名",
        "学号",
        "学校地址",
        "负责老师",
        "负责老师电话",
        "班级"
      ];
      let i = 0;
      let err = [];
      for (let v of this.data) {
        i++;
        let posdata = {
          username: v[_.indexOf(this.bt, arr[0])],
          phonenum: v[_.indexOf(this.bt, arr[1])],
          password: 12345678,
          usertype: "User",
          stuid: v[_.indexOf(this.bt, arr[5])]
        };
        let thitinfo = {
          性别: v[_.indexOf(this.bt, arr[2])],
          学校: v[_.indexOf(this.bt, arr[3])],
          家长姓名: v[_.indexOf(this.bt, arr[4])],
          学校地址: v[_.indexOf(this.bt, arr[6])],
          负责老师: v[_.indexOf(this.bt, arr[7])],
          负责老师电话: v[_.indexOf(this.bt, arr[8])],
          班级: v[_.indexOf(this.bt, arr[9])]
        };
        posdata.thitinfo = JSON.stringify(thitinfo);
        try {
          await asyncaddStudent(posdata);
          this.data2.push(v);
        } catch (e) {
          err.push({ index: i, err: e });
          v.push(e)
          this.data3.push(v);
        }
      }
      this.data = [];
      this.$alert(
        `上传完成,成功${this.data2.length}个，失败${this.data3.length}`
      );
      console.log(err);
    }
  }
};
</script>

<style scoped>
</style>