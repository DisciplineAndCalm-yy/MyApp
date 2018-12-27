<template>
    <div class="container-fluid" >
        <div class="row" >
            <breadcrumb v-bind:paths="paths" :name="name" ></breadcrumb>
        </div>
    <el-row>
      <el-button type="primary" @click="dialogVisible = true" plain>添加学校</el-button>
    </el-row>
    <div class="row msg">
      <div class="card" v-for="(v, i) in tableData" :key="i"  style="width: 320px;">
        <div class="card-img-top">
          <el-carousel trigger="click" indicator-position="none"  height="180px">
            <el-carousel-item v-for="(item,key) in v.snapshots" :key="key">
              <img :src="item" class="img-responsive" alt="123">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="card-body">
          <h6>Title:{{v.title}}</h6>
          <p class="card-text">描述：{{v.description}}</p>
          <p class="card-text">标签：{{v.tags}}</p>
          <p class="card-text">创建时间： {{v.createTime}}</p>
          <el-button type="primary" icon="el-icon-edit" @click="upvideo(v)" circle></el-button>
          <el-button type="danger" @click="delvideo({VideoId:v.videoId})" icon="el-icon-delete" circle></el-button>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
export default {
  data() {
    return {
      paths: [

      ],
      name: "学校管理",
      dialogVisible: false,
      tableData: [],
    };
  },
  components: {
    breadcrumb
  }
};
</script>

<style scoped>
</style>
