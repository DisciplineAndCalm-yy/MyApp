<template>
    <div class="box">
        <header class="row header">
            <div class="row logo"><img src="@/assets/home_icon_logo.png" /></div>
        </header>
        <div class="col-sm-4 middle col-center-block">
            <div class="row micro"><p>绑定微信</p></div>
            <div class="m-top">
                <p class="basic">基本信息</p>
                <div class="form-group">
                    <label>*&nbsp;</label> 
                    <input type="text" v-model="formData.phonenum" class="col-11 control" placeholder="手机号/学号/id"  autocomplete="off"/>
                </div>
                <div class="form-group">
                    <label>*&nbsp;</label>
                    <input type="password" v-model="formData.password" class="col-11 control" placeholder="密码" autocomplete="off"/>
                </div>
                <div class="row form-group verify">
                    <input  type="text" v-model="formData.yzm" class="col-sm-8 col-md-6 col-lg-4 note control" placeholder="短信验证码" autocomplete="off"/>
                    <button type="button" class="col-7 btn btn-block btn-size control" @click="findcode()">发送短信验证码</button>
                    <!--<el-collapse-transition><p class="send-yz" v-show="ma" >点击获取验证码，短信将发送至安全手机*******<span>{{ma}}</span></p></el-collapse-transition> -->
                </div>
                <button type="button" class="col-11 btn btn-block bang" @click="soonbind()">立即绑定</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { asyncfind_getCode, bindwechat } from "../../../plugins/api.js";

    export default {
        data() {
            return {
                formData: {
                    phonenum:'',
                    password:'',
                    openid:'',
                    yzm:''
                },
                isTel: false,
                ruleForm: {
                    aleph: "0086",
                    phonenum: "",
                    password: "",
                    password2: ""
                },
                yzm: "",
                show1: false,
                show2: false,
                show3: false,
                show5: false,
                qh: [
                    {
                    aleph: "zg",
                    continent: 0,
                    id: "0086",
                    length: 11,
                    pinyin: "zhongguo",
                    value: "中国 0086"
                    },
                    {
                    aleph: "zgtw",
                    continent: 0,
                    id: "0886",
                    length: 9,
                    pinyin: "zhongguotaiwan",
                    value: "中国台湾 0886"
                    }
                ],
                iserr: {
                    err1: true,
                    err2: false,
                    err3: false,
                    err4: false,
                    err5: false
                },
                errs: {
                    tel: "手机号不能为空"
                },
                ma: false,
                shou: false,
                a1: true,
                a2: false,
                a3: false,
                time: 60,
                timer: Object
            }
        },
        created() {
            this.GetQueryString('openid')
        },
        watch: {
            "ruleForm.password"() {
                this.jiance(2);
                this.jiance(3);
            },
            "ruleForm.password2"() {
                this.jiance(3);
            },
            "ruleForm.phonenum"(v) {
                if (v) {
                    this.jiance(1);
                } else {
                    this.isTel = false;
                }
            },
            time(v) {
                if (v == 60) {
                    this.isTel = true;
                } else {
                    this.isTel = false;
                }
            },
            "iserr.err1": function(v) {
                this.show1 = !v;
                if (v) {
                    this.errs.tel = "ok";
                    this.isTel = true;
                } else {
                    this.isTel = false;
                }
            },
            "iserr.err2": function(v) {
                this.show2 = !(v && this.iserr.err3 && this.iserr.err4);
            },
            "iserr.err3": function(v) {
                this.show2 = !(v && this.iserr.err2 && this.iserr.err4);
            },
            "iserr.err4": function(v) {
                this.show2 = !(v && this.iserr.err3 && this.iserr.err2);
            },
            "iserr.err5": function() {
                this.show3 = !this.iserr.err5;
            }
        },
        methods: {
            GetQueryString(name) { 
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
                var r = window.location.search.substr(1).match(reg); 
                var context = ""; 
                if (r != null) 
                    context = r[2]; 
                reg = null; 
                r = null; 
                this.formData.openid = context == null || context == "" || context == "undefined" ? "" : context;
            },
            soonbind() {
                bindwechat(this.formData).then(resovle => {
                    if(resovle.error == 0) {
                        this.$router.push('/myclass')
                    }
                })
            },
            async findcode() {
                // let phonenum = this.formData.phonenum
                try {
                    await asyncfind_getCode({ phonenumber: this.formData.phonenum });
                    var a = this.hc;
                    this.timer = setInterval(a, 1000);
                    this.isUser = true;
                } catch (err) {
                    this.iserr.err1 = false;
                    this.errs.tel = err;
                }
                this.ma = this.formData.phonenum.substring(7, this.formData.phonenum);
                this.shou = this.formData.phonenum.substring(0, 3);
            }
        }
    }
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
.header {
    margin: 0px;
    height: 75px;
    background-color: #ffffff;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
}
.logo {
    width: 116px;
    height: 40px;
    margin: auto;
}
.middle {
    margin-top: 135px;
    height: 399px;
}
.col-center-block {
    float: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.micro {
    height: 23px;
    border-bottom: 1px solid #e8e8e8;
}
.micro p {
    width: 200px;
    margin: auto;
    text-align: center;
    font-family: MicrosoftYaHei;
    font-size: 26px;
    color: #5d5c5c;
    background-color: #fff;
}
.m-top{
    margin-top:72px;
    margin-left:25px;
}
.basic {
    width:80px;
    height: 17px;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    letter-spacing: 1px;
    color: #565656;
}
.control {
    height:37px;
    border: solid 1px #d1d1d1;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    letter-spacing: 1px;
    color: #464444;
    opacity: 0.6;
    margin-top:20px;
}
.verify{
    width:94%;
    margin:auto;
}
.btn-size{
    height: 37px;
    background-color: #1d569d;
    border-radius: 2px;
    color:#fff;
    margin-left:6%;
    font-family: MicrosoftYaHei;
    font-size: 17px;
    letter-spacing: 1px;
}
.note{
    margin-left:-5px;
}
.bang{
    margin-top:60px;
    margin-left:14px;
    height: 37px;
    background-color: #1d569d;
    color:#fff;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    letter-spacing: 1px;
}
</style>