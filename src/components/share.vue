<template>
    <div></div>
</template>
<script>
    export default {
        data () {
            return {
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
            var time = setTimeout(function(){
                me.readyFun();
                clearTimeout(time)
            },200)
        },
        methods:{
            readyFun(){
                var me = this;
                me.WechatShareData.link = document.location.href+"&wxShare=1";
                console.log(me.WechatShareData.link)
                wx.ready(function() {
                    window.wx.showAllNonBaseMenuItem()
                      window.wx.hideMenuItems({
                        menuList: [
                          'menuItem:share:qq',
                          'menuItem:share:weiboApp',
                          'menuItem:favorite',
                          'menuItem:share:facebook',
                          'menuItem:share:QZone',
                          'menuItem:editTag',
                          'menuItem:delete',
                          'menuItem:originPage',
                          'menuItem:readMode',
                          'menuItem:openWithQQBrowser',
                          'menuItem:openWithSafari',
                          'menuItem:share:email',
                          'menuItem:share:brand'
                        ]
                      })
                      window.wx.showMenuItems({
                        menuList: [
                          'menuItem:share:appMessage',
                          'menuItem:share:timeline'
                        ]
                      })
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
                    console.log(res);
                });
            }
        }
    }
</script>
