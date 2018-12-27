<template>
  <div class="quiz">
    <div class="all"><span>向老师提问</span>+</div>
    <div>
      <textarea class="textBox" placeholder="我来向老师提问......"></textarea>
    </div>
    <div class="send-btn">
      <p>发送</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'quiz'
  }
</script>

<style scoped>
  .quiz {
    width: 1500px;
    float: right;
  }

  .quiz .all {
    width: 80%;
    margin: auto;
    /* border: 1px solid red; */
    font-size: 28px;
    color: #15b7f0;
    font-weight: bold;
    cursor: pointer;
  }

  .quiz .all span {
    margin-right: 30px;
    font-size: 22px;
    color: #484848;
  }

  .quiz .textBox {
    width: 80%;
    height: 245px;
    margin: 25px auto;
    font-size: 16px;
    text-indent: 32px;
    display: block;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 0 5px #e0e0e0;
    z-index: 666;

  }

  placeholder {
    color: #a4a4a4;
    padding-top: 10px;
  }

  .quiz .send-btn {
    margin: 10px 140px 0 0;
    float: right;
    width: 125px;
    height: 42px;
    background-color: #34c3e8;
    border-radius: 20px;
    cursor: pointer;
  }

  .quiz .send-btn p {
    color: white;
    text-align: center;
    line-height: 10px;
    font-size: 16px;
  }
</style>