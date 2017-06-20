<template>
    <div class="home" v-bind:class="{visible : homeVisible }">
        <header>
            <p>卡友大会8周年</p>
            <span>太阳</span>
            <h4></h4>
        </header>
        <div class="explain">
            <h4>
                <p>
                    选择色卡为牛牛涂色，可写出<br/>
                    您对家人、卡友或卡车之家的祝福，<br/>
                    得分越高的作品有机会获得丰厚大奖！<br/>
                </p>
            </h4>
            <span class="rule-btn" @click="ruleView = !ruleView">规则</span>
            <div class="prize">奖品</div>
        </div>

        <div class="home-btns">
            <!-- <router-link to="Canvas"> -->
                <div class="begin-draw"  @click="clickMe('Canvas')">开始填色</div>
            <!-- </router-link> -->
            <!-- <router-link :to="{ path: 'Zone', query: { 'id': uid}}"> -->
                <div class="my-draw" @click="clickMe('Zone',uid)">我的作品</div>
            <!-- </router-link> -->
        </div>
        <div class="rule-box" v-show="ruleView">
            <div class="rule-view">
                <div class="rule">
                    <h4>活动规则</h4>
                    <p>
                        <span>选择色卡为牛头涂色，可写出您对家人、卡友或卡车之家的祝福，得分越高的作品有机会获得丰厚大奖！</span>
                        <h5>贴心提示：</h5>
                        <span>
                            1.用户信息请务必填写完整，用于领奖。<br/>
                            2.每个ID对同一作品每天只可打一次分。<br/>
                            3.发现作弊行为将取消用户参赛资格。<br/>
                            4.获奖卡友领奖后需到论坛发帖晒奖品，以保证活动的公平、公正、公开。<br/>
                            5.活动时间为2017年6月18日-25日。<br/>
                            6.活动最终解释权归卡车之家所有。
                        </span>
                        <h5>奖项设置：</h5>
                        <span>
                            <em>最萌牛头奖（5名）  车模+短袖</em>
                            参与活动得分前50名的用户，从中飞镖选出5名幸运用户获奖
                            <em>最佳人气奖（10名）  充电宝+短袖</em>
                            得分前50名用户中除最萌牛头奖外，其他45名用户得票前10名获奖
                            <em>卡家关爱奖</em>
                            参与活动并得分超过5000分的前500名卡友每人可获得一份车贴或者儿童礼包
                        </span>
                    </p>
                </div>
                <span class="rule-close"  @click="ruleView = !ruleView">关闭</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
/*home*/
.home{
    position: relative;z-index: 10;width: 100%;height: 100%;overflow: hidden;
    background: url("https://s.kcimg.cn/wap/images/game/20170601/home.jpg") no-repeat;
    header{
        position: relative;
        padding-top: 35px;
        height: 295px;
        p{
            position: relative;
            z-index: 1;
            width: 456px;
            height: 277px;
            background: url("https://s.kcimg.cn/wap/images/game/20170601/home-title.png") no-repeat;
            margin: 0 auto;
            font-size: 0;
        }
        span{
            position: absolute;
            left: 50%;
            top: 25px;
            width: 114px;
            height: 114px;
            background: url("https://s.kcimg.cn/wap/images/game/20170601/sun.png") no-repeat;
            font-size: 0;
            margin-left: 144px;
            transition: all 1s ease-in-out;
            transform:translate3d(-90px,0,0) scale(0);
        }
        h4{
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 460px;
            height: 98px;
            background: url("https://s.kcimg.cn/wap/images/game/20170601/phone.png") no-repeat;
            margin-left: -230px;
            z-index: 2;
            transition: all 2s ease-in-out;
            transform:translate3d(100%,0,0);
            font-size: 0;
        }
    }
    .explain{
        position: relative;
        margin-top: 20px;
        h4{
            width: 592px;
            height: 206px;
            padding-top: 130px;
            background:  url("https://s.kcimg.cn/wap/images/game/20170601/tishi1.png") no-repeat;
            margin: 0 auto;
            p{
                font-size: 24px;
                line-height: 36px;
                width: 460px;
                margin: 0 auto;
                font-weight: 400;
                text-align: center;
                color: #c78142;
            }
        }
        .rule-btn{
            position: absolute;
            top: 30px;
            right: 170px;
            width: 94px;
            height: 67px;
            font-size: 0;
            background:  url("https://s.kcimg.cn/wap/images/game/20170601/rule-icon.png") no-repeat;
        }
        .prize{
            width: 600px;
            height: 170px;
            font-size: 0;
            margin: 10px auto;
            background:  url("https://s.kcimg.cn/wap/images/game/20170601/prize.png") no-repeat;
        }
    }
    &.visible{
        header span,header h4{
            transform:translate3d(0,0,0) scale(1);
        }
    }
}
.rule-btn{
    margin-bottom: 30px;font-size: 0;
    background: url("https://s.kcimg.cn/wap/images/game/20170601/rule-icon.png") no-repeat;
    width: 94px;
    height: 67px;
    position: absolute;

}
.home-btns{
    position: absolute;
    bottom: 55px;
    left: 0;
    width: 100%;
    height: 102px;
    text-align: center;
    padding: 0 30px;
    box-sizing: border-box;
    div{
        float: left;
        line-height: 102px;
        text-align: center;
        height: 102px;
        width: 283px;
        background-size: 100%;
        background-repeat: no-repeat;
        color: #fff;
        font-size: 40px;
    }
    .begin-draw{
        background-image: url('https://s.kcimg.cn/wap/images/game/20170601/submit.png');
        margin-right: 10px;
    }
    .my-draw{
        background-image: url('https://s.kcimg.cn/wap/images/game/20170601/rule.png');
    }
}
.rule-box{position: fixed;left: 0;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.6);z-index: 10;}
.rule-view{position: absolute;left: 50%;top: 50%;width: 580px;height: 780px;margin: -430px 0 0 -290px;box-sizing: border-box;border: 10px solid #f09c46;background: #ffee9b;border-radius: 50px;}
.rule-view:after{content: "";position: absolute;;left: -20px;top: -15px;width: 115px;height: 130px;background: url("https://s.kcimg.cn/wap/images/game/20170601/hua.png ") no-repeat;}
.rule-close{position: absolute;bottom: -140px;left: 50%;margin-left: -142px;;background: url("https://s.kcimg.cn/wap/images/game/20170601/rule.png") no-repeat 50%; font-size: 40px;line-height: 102px;text-align: center;width: 283px;height: 102px;color: #fff;}
.rule-view .rule{height: 760px;box-sizing: border-box;;overflow: auto;-webkit-overflow-scrolling:touch;padding: 25px 40px;}
    .rule{
        span{display: block;font-size: 24px;line-height: 36px;color: #c78142;}
        h4{
            color: #c78142;
            font-size: 30px;
            text-align: center;
            line-height: 50px;
        }
        h5,em{
            color: #c78142;
            font-size: 24px;
            line-height: 36px;
        }
        em{
            display: block;
            color: #fe8f1c;
            font-style: normal;
        }
    }
</style>
<script>
    import utils from "../utils"
    export default {
        data () {
            return {
                ruleView : false,
                visible : 'visible',
                homeVisible : false,
                uid:"-1",
                WechatShareData :{
                    'title': '原来它才是卡车司机与家人之间的纽带',
                    'sharetitle': '原来它才是卡车司机与家人之间的纽带',
                    'link': "",
                    'icon': 'https://s.kcimg.cn/wap/images/game/20170601/share.jpg',
                    'desc': '与家人为牛牛涂色并写下您的祝福，有机会获得奖品'
                }
            }
        },
        created(){
            var me = this;
            try {
                me.uid = document.cookie.match(/AbcfN_ajaxuid=([^;$]+)/)[1];
            } catch (e) {}
            var canvasView = document.querySelector('.canvas-view');
            canvasView.style.display = 'none';

            var time = setTimeout(function(){
                me.homeVisible = true;
                clearTimeout(time)
            },500);
            this.WechatShareData.link = "https://topic.360che.com/m/2017060501/#/";
            this.shareFun();
        },
        methods:{
            clickMe (go,id){
                if(this.uid == undefined || this.uid == '-1'){
                    truckhomeAccountBinding.show(function(){
                        window.location.reload();
                    });
                    return;
                }

                // truckhomeAccountBinding.show();
                (go == undefined || go == "") && his.$router.push({ path: '/'});

                if(this.$route && id){
                    this.$router.push({ path: go , query: { 'id': id }})
                }else{
                    this.$router.push({ path: go })
                }
            },
            shareFun (){
                var me = this;
                var dataObj = "url="+escape(location.href);
                utils.shareHref(function(res){
                    if( res.status == 200){
                        var data = res.data;
                        wx.config({
                            debug: false,
                            appId: data.appId,
                            timestamp: data.timestamp, // 生成签名的时间戳
                            nonceStr: data.nonceStr, // 生成签名的随机串
                            signature: data.signature, // 签名
                            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'showOptionMenu']
                        });
                    }
                },dataObj)

                  wx.ready(function() {
                      wx.showOptionMenu();
                      wx.onMenuShareTimeline({
                          title: me.WechatShareData.sharetitle,
                          link: me.WechatShareData.link,
                          imgUrl: me.WechatShareData.icon,
                          success: function() {
                              //DoVote();
                          }
                      });
                      wx.onMenuShareAppMessage({
                          title: me.WechatShareData.title,
                          desc: me.WechatShareData.desc,
                          link: me.WechatShareData.link,
                          imgUrl: me.WechatShareData.icon,
                          success: function() {
                          }
                      });
                  });
                  wx.error(function(res) {
                  });
            }
        }
    }
</script>
