<template>
    <div class="success">
        <header>
            <h3>提交成功</h3>
            <p>您是第<b>{{ num }}</b>位参加的用户</p>
        </header>
        <ul class="btns">
            <li>
                <router-link to="Canvas">再画一次</router-link>
            </li>
            <li>
                <router-link :to="{ path: 'Zone', query: { 'id': uid}}">我的作品</router-link>
            </li>
            <li>
                <router-link to="Rank">查看排行榜</router-link>
            </li>
            <!-- <li @click="weixinShore = !weixinShore">
                分享
            </li> -->
        </ul>
        <div class="wechat-tips" v-show="weixinShore">
            <span class="button" @click="weixinShore = !weixinShore">我知道了</span>
        </div>
    </div>
</template>

<style scoped lang="less">
    .success{
        background: url("https://s.kcimg.cn/wap/images/game/20170601/success.jpg") no-repeat 50%;
        background-size: 100% 100%;
        height: 100%;
        position: relative;
        header{
            position: absolute;
            top: 120px;
            left: 0;
            width: 100%;
            h3{
                font-size: 60px;
                line-height: 60px;
                text-align: center;
                color: #fff;
                margin-bottom: 30px;
            }
            p{
                text-align: center;
                line-height: 40px;
                font-size: 40px;
                color: #fff;
            }
        }
        .btns{
            position: absolute;
            bottom: 0;
            padding-bottom: 30px;
            width: 100%;
            li{
                width: 283px;
                height: 102px;
                margin: 0 auto 20px;
                font-size: 40px;
                line-height: 102px;
                text-align: center;
                color: #fff;
                background-position: 50%;
                background-repeat: no-repeat;
                a{
                    display: block;
                    color: #fff;
                }
                &:nth-of-type(1){
                    background-image: url("https://s.kcimg.cn/wap/images/game/20170601/submit.png");
                }
                &:nth-of-type(2){
                    background-image: url("https://s.kcimg.cn/wap/images/game/20170601/rule.png");
                }
                &:nth-of-type(3){
                    background-image: url("https://s.kcimg.cn/wap/images/game/20170601/rank.png");
                }
                &:nth-of-type(4){
                    background-image: url("https://s.kcimg.cn/wap/images/game/20170601/share-btn.png");
                }
            }
        }
        .wechat-tips{
             position: fixed;
             z-index: 999;
             left: 0;top: 0;
             width: 100%;height: 100%;
             background: rgba(0,0,0,.9) url(http://static.360che.com/public/images/wechat-tips.png) no-repeat 100% 0;
        }
        .button{
             position: relative;
             display: block;
             width: 382px;height: 64px;
             line-height: 64px;
             margin: 0 auto;top: 624px;
             border: 2px solid #fff;
             color: #fff;
             font-size: 30px;
             text-align: center;
        }
    }
</style>
<script>
    import utils from "../utils"
    export default {
        data () {
            return {
                num:666,
                uid:0,
                weixinShore:false,
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
            this.uid = utils.uid()
            var canvasView = document.querySelector('.canvas-view');
            var bless = document.querySelector('#bless');
            bless.value = "";
            canvasView.style.display = 'none';
            var canvasImg = localStorage.getItem('canvasImg');
              if(canvasImg){
                  canvasImg = JSON.parse(canvasImg);
                  this.num = canvasImg.allcount;
              }
              this.WechatShareData.link = "https://topic.360che.com/m/2017060501/#/";
              this.shareFun();
        },
        methods:{
            back(url){
                location.href =  url;
            },
            shareFun (){
                var me = this;
                var dataObj = "url="+escape("https://topic.360che.com/m/2017060501/#/");
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
