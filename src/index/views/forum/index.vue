<template>
    <el-main class="tk-main bg">
        <div class="header clearfix">
            <div class="h-left fll">
                <el-tag v-for="(item, index) in articletype" :key="index" :class="{'active': forumData.id == index}" @click="handleSelect(index)">{{item.type}}</el-tag>
            </div>
            <div class="h-right flr">
                <el-input class="r-input" v-model="searchValue"></el-input>
                <el-button class="r-btn" type="primary" @click="submit">发布帖子</el-button>
            </div>
        </div>
        <div class="content">
            <div v-for="(item, index) in forumData" :key="index" class="item clearfix">
                <div class="c-left fll">
                    <div class="cl-top">
                        <i></i>
                        <span>{{item.title}}</span>
                    </div>
                    <div class="cl-container">{{item.content}}</div>
                    <div class="cl-bottom">
                        <div class="clb-left">
                            <div class="b-letf">
                                <i></i>
                                <span>{{item.author}}</span>
                            </div>
                            <div class="center">{{item.createdtime}}</div>
                            <div class="b-right">
                                <div class="bbr1">
                                    <i></i>
                                    <span>{{item.comment}}天前</span>
                                </div>
                                <div class="bbr2">
                                    <i></i>
                                    <span>{{item.looknum}}</span>
                                </div>
                                <div class="bbr3">
                                    <i></i>
                                    <span>{{item.likenum}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="clb-right">
                            <el-tag>{{item.classtype}}</el-tag>
                        </div>
                    </div>
                </div>
                <div class="c-right flr">
                    <img src="../../../assets/forum/fengmian.png" alt="">
                </div>
            </div>
        </div>
    </el-main>
</template>

<script>
    export default {
        data() {
            return {
                articletype: [
                    {
                        id: 0,
                        type: '全部'
                    },
                    {
                        id: 1,
                        type: '最新'
                    },
                    {
                        id: 2,
                        type: '最热'
                    },
                    {
                        id: 3,
                        type: '推荐'
                    },
                    {
                        id: 4,
                        type: '精选'
                    }
                ],
                forumData: [
                    {
                        id: 1,
                        type: '',    //   1 精品贴   2 热门贴  3 推荐贴  4 普通贴
                        title: '双旦有礼，一起来制作礼品啦！',
                        content: '圣诞节临近，周围满满的都是圣诞气息，是时候给我们的课堂也增添一点圣诞氛围啦！现在未来教室“圣诞课程包”限时免费开发，快跟学生一起来制作圣诞贺卡吧！',
                        coverimg: '@/assets/forum/fengmian.png',
                        icon: '@/assets/forum/icon.png',
                        author: '编程教师',
                        createdtime: '3',
                        commentnum: '141',
                        looknum: '3524',
                        likenum: '225',
                        classtype: 'Blockly'
                    },
                    {
                        id: 2,
                        type: '',    //   1 精品贴   2 热门贴  3 推荐贴  4 普通贴
                        title: '双旦有礼，一起来制作礼品啦！',
                        content: '圣诞节临近，周围满满的都是圣诞气息，是时候给我们的课堂也增添一点圣诞氛围啦！现在未来教室“圣诞课程包”限时免费开发，快跟学生一起来制作圣诞贺卡吧！',
                        coverimg: '@/assets/forum/fengmian.png',
                        icon: '@/assets/forum/icon.png',
                        author: '编程教师',
                        createdtime: '5',
                        commentnum: '504',
                        looknum: '5204',
                        likenum: '445',
                        classtype: 'DouBao:bit'
                    },
                    {
                        id: 3,
                        type: '',    //   1 精品贴   2 热门贴  3 推荐贴  4 普通贴
                        title: '双旦有礼，一起来制作礼品啦！',
                        content: '圣诞节临近，周围满满的都是圣诞气息，是时候给我们的课堂也增添一点圣诞氛围啦！现在未来教室“圣诞课程包”限时免费开发，快跟学生一起来制作圣诞贺卡吧！',
                        coverimg: '@/assets/forum/fengmian.png',
                        icon: '@/assets/forum/icon.png',
                        author: '编程教师',
                        createdtime: '2',
                        commentnum: '121',
                        looknum: '2524',
                        likenum: '125',
                        classtype: 'Arduino'
                    },
                    {
                        id: 4,
                        type: '',    //   1 精品贴   2 热门贴  3 推荐贴  4 普通贴
                        title: '双旦有礼，一起来制作礼品啦！',
                        content: '圣诞节临近，周围满满的都是圣诞气息，是时候给我们的课堂也增添一点圣诞氛围啦！现在未来教室“圣诞课程包”限时免费开发，快跟学生一起来制作圣诞贺卡吧！',
                        coverimg: '@/assets/forum/fengmian.png',
                        icon: '@/assets/forum/icon.png',
                        author: '编程教师',
                        createdtime: '7',
                        commentnum: '521',
                        looknum: '6524',
                        likenum: '525',
                        classtype: 'Python'
                    },
                    {
                        id: 4,
                        type: '',    //   1 精品贴   2 热门贴  3 推荐贴  4 普通贴
                        title: '双旦有礼，一起来制作礼品啦！',
                        content: '圣诞节临近，周围满满的都是圣诞气息，是时候给我们的课堂也增添一点圣诞氛围啦！现在未来教室“圣诞课程包”限时免费开发，快跟学生一起来制作圣诞贺卡吧！',
                        coverimg: '@/assets/forum/fengmian.png',
                        icon: '@/assets/forum/icon.png',
                        author: '编程教师',
                        createdtime: '7',
                        commentnum: '521',
                        looknum: '6524',
                        likenum: '525',
                        classtype: 'Python'
                    }
                ],
                searchValue: '',
                tagInfo: 1
            }
        },
        methods: {
            handleSelect(index) {
                index = this.forumData.id
                console.log(index)
            },
            submit() {               
                alert(this.searchValue)
                this.searchValue = ''
            }
        }
    }
</script>

<style scoped>
.fll{
    float: left;
}
.flr{
    float: right;
}
.clearfix::after{
    content: '';
    display: block;
    clear: both;
}
.box{
    width: 100%;    
    height: 100%;
    background: #f1f1f1;
}
.header{
    height: 80px;
    padding: 25px 0;
}
.h-left{
    display: flex;
}
.h-right{
    display: flex;
}
.el-tag{
    flex: 1;
    width: 80px;
    height: 24px;
    line-height: 20px;
    text-align: center;
    margin-left: 30px;
    color: #40cbf2;
    background: #fff;
    border: 1px solid #40cbf2;
    border-radius: 20px;
    cursor: pointer;
}
.active{
    background: #40cbf2;
    color: #fff;
}
.r-input{
    width: 150px;
    height: 30px;
}
.r-btn{
    margin-right: 10px;
    padding-left: 7px;
    width: 70px;
    height: 30px;
    text-align: center;
    line-height: 5px;
}
.item{
    padding: 25px;
    margin-bottom: 1px;
}
</style>