<template>
    <div class="container-fluid" >
        <div class="row" >
            <div class="col-sm-4" >
                <div class="card " >
                <div class="card-header">
                    控制器
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="(v, i) in  $attrs.courses.parameters.控制器" :key="i" v-text="v"></li>
                </ul>
                </div>
            </div>
            <div class="col-sm-4" >
                <div class="card " >
                <div class="card-header">
                    传感器
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="(v, i) in  $attrs.courses.parameters.传感器" :key="i" v-text="v"></li>
                </ul>
                </div>
            </div>
            <div class="col-sm-4" >
                <div class="card " >
                <div class="card-header">
                    其他
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="(v, i) in  $attrs.courses.parameters.其他" :key="i" v-text="v"></li>
                </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "courseParameters"    
}
</script>

<style scoped>

</style>

