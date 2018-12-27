<template>
    <div class="leftnav" id="leftnav" :style="sty" >
        <ul>
            <li id="leftli" :style="li" ><i  class="icon iconfont icon-unorderedlist"></i></li>
            <li v-show="show"><a href="/#/login" target="view_window" >首页</a></li>
            <li v-show="show"><a href="/about.html" target="view_window">关于我们</a></li>
            <!-- <li v-show="show"><a href="/download.html" target="view_window">软件下载</a></li> -->
            <li v-show="show"><a href="/" target="view_window">投资合作</a></li>
        </ul>
    </div>
</template>

<script>
import $ from "jquery"


export default {
    name:"leftNav",
    data(){
        return{
            show:false,
            sty: "background-color:rgba(0,0,0,0);color:#000;",
            li: "background-color:rgba(0,0,0,0.4);color:#fff;"
        }
    },
    mounted(){
        $("#leftnav").hover((e)=>{
            if(e.type === "mouseenter"){
                this.mouseenter()
            }else {
                this.mouseleave()
            }
        })
    },
    methods:{
        mouseenter() {
            this.show = true
            this.sty = ""
            this.li = ""
        },
        mouseleave() {
            this.show = false
            this.sty= "background-color:rgba(0,0,0,0);color:#000;"
            this.li = "background-color:rgba(0,0,0,0.4);color:#fff;"
        }
    }
}
</script>

<style scoped>
#leftnav {
    position: fixed;
    height: 100%;
    width: 220px;
    background-color: rgba(0,0,0,.3); 
    color: aliceblue;
    top: 0;
    left: 0;
}
#leftnav a {
    color: aliceblue;
    
}
#leftnav ul li  {
   margin-bottom: 25px;
}

#leftnav ul li a {
    margin-left: 25px;
    padding-left: 35px;
}

#leftnav ul li i{
    line-height: 50px;
    margin-left: 25px;
    font-size: 24px;
}
#leftnav ul li:nth-child(2) a {
    border-left: 1px solid #ffffff;
}
.icon {
    cursor: pointer;
}
</style>
