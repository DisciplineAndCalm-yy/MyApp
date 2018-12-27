<template>
     <div class="container-fluid">
    <div class="row">
      <div class="col">
        <breadcrumb v-bind:paths="paths" :name="name"></breadcrumb>
      </div>
    </div>
    <div class="row msg">
      <div class="col">
        <h5>添加课件</h5>
      </div>
    </div>
     </div>
     
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import {
  asyncselectCoursefile,
  asyncdeleteCoursefile
} from "../../../plugins/api.js";
export default {
  props: ["cid"],
  components: {
    addlession
  }
};
</script>

<style scoped>
</style>
