<template>
    <div class="canvas">
    </div>
</template>
<script>
    import utils from "../utils"
    export default {
        data () {
            return {
                WechatShareData :{
                    'title': '原来它才是卡车司机与家人之间的纽带',
                    'sharetitle': '原来它才是卡车司机与家人之间的纽带',
                    'link': "https://topic.360che.com/m/2017060501/#/",
                    'icon': 'https://s.kcimg.cn/wap/images/game/20170601/share.jpg',
                    'desc': '与家人为牛牛涂色并写下您的祝福，有机会获得奖品'
                }
            }
        },
        created(){
            // truckhomeAccountBinding.show();
            var canvasView = document.querySelector('.canvas-view');
            canvasView.style.display = 'block';
            // this.WechatShareData.link = location.href;
            this.shareFun();
        },
        methods:{
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
<style media="screen">
    .canvas-view{
        overflow: auto;
    }
</style>
