<template>
    <div class="container-fluid" >
        <div class="row" >
            <breadcrumb v-bind:paths="paths" :name="name" ></breadcrumb>
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
      name: "学校管理"
    };
  },
  components: {
    breadcrumb
  }
};
</script>

<style scoped>
</style>
