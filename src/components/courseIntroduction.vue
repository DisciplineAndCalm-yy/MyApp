<template>
    <div class="card bg-dark text-white cardheight">
  <img class="card-img" :src="$attrs.courses.img"  alt="Card image">
  <div class="card-img-overlay dark6">
      <div class="container-fluid " >
          <div class="row" >
              <div class="col-sm-3 text-center" >
                  <i class="icon iconfont icon-play-circle text36" ></i>
                  <p class="card-text pmargin" >观看导学视频</p>
              </div>
              <div class="col-sm-6  flex" >
                  <div>
                    <h4 class="card-title" v-text="$attrs.courses.name" ></h4>
                    <p class="card-text pheight" v-text="$attrs.courses.introduction"></p>
                  </div>
                  
              </div>
              <div class="col-sm-3 padd text-center" >
                  <div>
                  <img :src="$attrs.courses.headPortrait" alt="..." width="150" height="150" class="rounded-circle img-fluid">
                    <br>
                    <span class="card-text" v-text="$attrs.courses.teacher"></span>
                     <br>
                    <span class="card-text" v-text="$attrs.courses.teIntroduction"></span>
                  </div>
              </div>
          </div>
      </div>
    
   
  </div>
</div>
</template>

<script>
export default {
  name: "courseIntroduction",
  methods: {}
};
</script>

<style scoped>
.dark6 {
  background-color: rgba(0, 0, 0, 0.6);
}
.text36 {
  font-size: 128px;
  color: rgba(255, 255, 255, 0.5);
  -webkit-transition: color 0.4s ease-in-out;
  -moz-transition: color 0.4s ease-in-out;
  transition: color 0.4s ease-in-out;
  cursor: pointer;
}
.text36:hover {
  color: rgb(255, 255, 255);
}
.cardheight {
  height: 320px;
  overflow: hidden;
}
.container-fluid {
  padding: 27px;
}
.pheight {
    text-overflow:ellipsis;
    word-wrap: break-word;
}
.flex {
      display: flex;
  justify-content: center;
  align-items: Center;
}
.padd {
    padding: 17px;
}
.pmargin {
    margin-top: -15px;
}
</style>
