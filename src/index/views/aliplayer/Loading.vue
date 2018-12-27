<template>
    <div class="az-loading">
        <i v-for="(color, index) in colorList" :key="index" :style="{backgroundColor: color}"></i>
    </div>
</template>
<script>
export default {
  props: {
    colorList: {
      type: Array
    }
  }
};
</script>
<style scoped>
.az-loading {
  text-align: center;
}
i {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin: 0 6px;
}
i:nth-child(1) {
  animation: azloading 1.4s linear 0.48s infinite;
}
i:nth-child(2) {
  animation: azloading 1.4s linear 0.36s infinite;
}
i:nth-child(3) {
  animation: azloading 1.4s linear 0.24s infinite;
}
i:nth-child(4) {
  animation: azloading 1.4s linear 0.12s infinite;
}
i:nth-child(5) {
  animation: azloading 1.4s linear infinite;
}
@keyframes azloading {
  0% {
    transform: translateY(0);
  }
  42% {
    transform: translateY(45px);
  }
  66% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
}
</style>