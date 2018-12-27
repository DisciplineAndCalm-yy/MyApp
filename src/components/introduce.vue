<template>
    <div class="card" v-if="user">
    <div class="card-img-top text-center"  alt="Card image cap">
        <img :src="user.headimg" class="rounded-circle ma" width="104" height="104"   alt="">
    </div>
    <div class="card-header  bg-white text-center">
        <span v-text="user.username" ></span>
  </div>
    <div class="card-body alert alert-success">
        <p> <i class="el-icon-info" ></i> &nbsp; <span v-text="user.usertype" ></span></p>
        <p> <i class="el-icon-location"></i> &nbsp; <span ></span> </p>
        <p> <i class="el-icon-phone"></i> &nbsp; <span v-text="user.phonenum" ></span> </p>
        <hr>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"]
};
</script>

<style scoped>
.ma {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
