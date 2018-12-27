<template>
    <div class="container-fluid" >
      <div class="row bg-dark" >
        <img v-for="(v, i) in imglist" @click="selected(v)" :src="stylename(v)" :key="i" class="rounded float-left img-thumbnail padd" alt="...">
      </div>
    </div>
</template>

<script>
import OSS from "ali-oss";
import { asyncuploadAccess } from "../plugins/api.js";
export default {
  name: "ossImglist",
  data() {
    return {
      imglist: []
    };
  },
  mounted() {
    this.gitosslist();
  },
  props:{
    selected:Function,
    prefix:{
      type: String,
      default: "lessons-baner/",
    }
  },
  methods: {
    stylename(name) {
      return `${name}?x-oss-process=style/style-200`;
    },
    async gitosslist() {
      try {
        let creds = await asyncuploadAccess();
        let option = {
          region: "oss-cn-beijing",
          bucket: "hterobot-image",
          stsToken: creds.securityToken,
          accessKeyId: creds.accessKeyId,
          accessKeySecret: creds.accessKeySecret
        };
        let client = new OSS(option);
        let list = await client.list({
          "max-keys": 100,
          prefix: this.prefix
        });
        let len = this.prefix.length
        for (let v of list.objects) {
          if (v.name.length != len) {
            this.imglist.push(v.url);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.padd {
  margin: 27px;
  cursor: pointer;
}
</style>
