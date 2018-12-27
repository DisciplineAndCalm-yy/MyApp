<template>
    <div class="feed">
        <div class="box">
            <div class="header">
                <img src="@/assets/home_icon_logo.png" alt="">
                <span class="header-des">倾听您的声音</span>
            </div>
            <div class="contain">
                <div class="top">
                    <div class="top-current">我要反馈</div>
                </div>
                <div class="content">
                    <div class="title">
                        尊敬的哈工科教用户，您好：
                        <br>
                        <span class="title-des">您在哈工科教遇到产品使用的问题，请在这里告诉我们。</span>
                        <br>
                        <span class="title-des">我们的工作人员会及时处理，多谢您的宝贵意见！</span>
                    </div>
                    <div class="content-title">反馈内容
                        <span id="ct-des" class="ct-des">（不能为空）</span>
                    </div>
                    <textarea v-model="backContent" 
                              name="content" id="content" 
                              placeholder="请输入反馈内容" 
                              cols="97.5" 
                              rows="15"
                    ></textarea>
                    <div class="count">
                        <p id="text-count">{{this.num}}&nbsp;&nbsp;字</p>
                    </div>
                    <div class="phone">
                        <div class="phone-title">联系方式
                            <span class="pt-des">（请正确填写您的联系方式，以便收到我们的反馈！）</span>
                        </div>
                        <div>
                            <el-select v-model="value" placeholder="请选择" size="mini">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                                </el-option>
                            </el-select>
                            <el-input class="phone-input"
                                      v-model="inputValue" 
                                      placeholder="请输入联系方式" 
                                      size="small"
                            ></el-input>
                            <div class="img-box">
                                <img id="right" src="@/assets/right.png" alt="right">
                                <img id="false" src="@/assets/false.png" alt="false">
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn" @click="handleCommit">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                backContent: '',
                num: 0,
                options: [
                    {
                        value: '选项1',
                        label: '手机号'
                    },
                    {
                        value: '选项2',
                        label: '邮箱'
                    }
                ],
                value: '手机号',
                inputValue: ''
            }
        },
        methods: {
            handleCommit() {
                let feedback = this.backContent
                let inputValue = this.inputValue
                if(feedback&&inputValue !== '') {
                    this.$confirm('确认提交, 是否确定?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '提交成功!',
                            });
                            this.backContent = '';
                            this.inputValue = '';
                            alert(feedback);
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消提交'
                            });          
                        })
                } else {
                    alert('请填写反馈内容以及您的联系方式，不要空哦！')
                }
            }
        },
        watch: {
            backContent: {
                handler: function() {
                    if(this.backContent !== '') {
                        document.getElementById('ct-des').style.display= 'none';
                        this.num = this.backContent.length;
                    } else {
                        document.getElementById('ct-des').style.display= 'inline'
                        this.num = 0;
                    }
                }
            },
            inputValue: {
                handler: function (val) {
                    var phoneReg = /^1[3-578]\d{9}$/;
                    var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                    if(val !== '') {
                        if(phoneReg.test(val) || mailReg.test(val)) {
                            document.getElementById('right').style.display= 'inline-block';
                            document.getElementById('false').style.display= 'none';
                            document.getElementById('right').style.background= '#00cf0b';
                        }else{
                            document.getElementById('false').style.display= 'inline-block';
                            document.getElementById('right').style.display= 'none';
                            document.getElementById('false').style.background= '#f00';
                        }
                    } else {
                        val = '';
                        document.getElementById('right').style.display= 'none';
                        document.getElementById('false').style.display= 'none';
                    }
                }
            },
            deep: true,
            immediate: true
        }
    }
</script>

<style scoped>
.feed{
    width: 100vw;
    height: 100vh;
    background: #f1f3f5;
}
.box{
    margin: 0 auto;
    width: 800px;
    background: #fff;
}
.header{
    width: 100%;
    margin: 0 auto;
    padding-top: 40px;
    padding-bottom: 20px;
    background: #f1f3f5;
}
.header-des{
    height: 20px;
    line-height: 20px;
    display: inline-block;
    margin-left: 20px;
    font-size: 15px;
    color: #999;
}
.contain{
    border: 1px solid #f1f3f5;
    border-radius: 6px;
    overflow: hidden;
}
.top{
    height: 50px;
    margin-bottom: 20px;
    background: #0265ac;
    position: relative;
}
.top-current{
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    position: absolute;
    background: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    left: 80px;
    bottom: 0;
}
.title{
    font-size: 18px;
    color: #333;
}
.title-des{
    display: inline-block;
    font-size: 16px;
    color: #555;
    margin-top: 6px;
    padding-left: 36px;
}
.content-title{
    margin-top: 20px;
    margin-bottom: 6px;
    font-size: 16px;
    color: #007bff;
}
.ct-des{
    font-size: 14px;
    color: #f00;
}
.content{
    margin: 0 auto;
    width: 90%;
}
#content{
    width: 100%;
    border-radius: 6px;
}
.count{
    font-size: 14px;
    color: #888;
    margin-right: 20px;
    text-align: right;
}
.phone{
    height: 100px;
}
.phone-title{
    margin: 20px 0;
    font-size: 16px;
    color: #444;
}
.pt-des{
    font-size: 14px;
    color: #bbb;
}
.btn{
    display: block;
    margin: 16px auto 20px;
    width: 120px;
    color: #eee;
    background: #007bff;
}
.phone-input{
    margin-left: 30px;
    width: 200px;
}
.img-box{
    display: inline-block;
    width: 80px;
    height: 30;
}
.img-box img{
    margin-left: 10px;
    width: 25px;
    height: 25px;
}
#right{
    border-radius: 25px;
}
#false{
    border-radius: 25px;
}
</style>