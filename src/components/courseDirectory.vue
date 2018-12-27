<template>
    <div class="container-fluid" >
        <div class="row" v-for="(v, i) in $attrs.courses.lesson" :key="i" >
            <div class="col" >
                <div class="card">
                <div class="card-header bg-dark text-white" >
                    <b>{{i}}</b> {{v.name}}
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item bg-light"  v-for="(vo, io) in v.section" :key="io" >
                           <router-link :to="{name: 'sections', params: {sectionsId: vo.id}}" >  <i class="icon iconfont icon-live_fill"></i>    Cras justo odio</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "courseDirectory",

}
</script>

<style scoped>
    .row {
        margin-top: 24px;
    }
    .icon {
        font-size: 24px;
        color: blueviolet;
    }
</style>
