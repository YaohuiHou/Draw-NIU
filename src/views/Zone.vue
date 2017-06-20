<template>
    <div class="zone">
        <header>
            <p class="title">
                <span v-if="!nothing">快让你的好友给你打分吧</span>
            </p>
            <router-link to="/Rank">
                <span class="btn">查看排行榜</span>
            </router-link>
        </header>
        <div class="rank-view" @scroll="onScroll($event)">
            <ul class="rank-list">
                <li v-for="item in infodata">
                    <router-link :to="{ path: '/Detail', query: {'id':item.infoid,'wxShare':wxShare}}">
                        <figure>
                            <img :src="item.imgsrc" />
                            <p>{{ item.bless }}</p>
                        </figure>
                        <div class="user">
                            <!-- <span class="userimg">
                                <img :src="item.userImg" />
                            </span> -->
                            <em class="userank">{{ item.rank }}名</em>
                            <b class="usernum">{{ item.score }}分</b>
                        </div>
                    </router-link>
                </li>
            </ul>
            <div class="nothing" v-if="nothing">
                <p disable="disable">您暂时还没有作品！</p>
            </div>
        </div>
        <router-link to="/">
            <div class="go-home">首页</div>
        </router-link>
        <Toast :toastView="toastView" :toastText="toastText" v-on:toastbox="toastMeg"></Toast>
        <Share></Share>
    </div>
</template>

<script>
    import utils from "../utils"
    import Toast from '@/components/Toast'
    import Share from '@/components/share'
    export default {
        components:{
            Toast,
            Share
        },
        data () {
            return {
                infodata:[],
                toastView : false,
                toastText : '', // 错误文案
                page:1,
                nothing:false,
                pageB:false,
                userid:'-1',
                wxShare:0,
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
            if(this.$route && this.$route.query){
                var userdata = this.$route.query;
                this.userid = userdata.id;
                userdata.wxShare && (this.wxShare = userdata.wxShare);
            };
            // if(location.href.indexOf('wxShare') != '-1'){
            //     this.wxShare = 1
            // }
            // 加载
            this.ajaxList (this.page);
            var me = this;
            var time = setTimeout(function(){
                me.shareFun();
                clearTimeout(time)
            },200)
        },
        methods:{
            toastMeg ( judge ){     //弹窗
                this.toastView = !judge;
                if(this.wxShare == 1){
                    this.$router.push('/');
                }
            },
            onScroll (event){
                var me = this;
                var offsetHeight = event.currentTarget.offsetHeight,
                    scrollHeight = event.target.scrollHeight,
                    scrollTop = event.target.scrollTop,
                    scrollBottom = offsetHeight + scrollTop;
                if(scrollBottom > scrollHeight - 200 && !me.nothing && !me.pageB){
                    me.pageB = true;
                    me.page = parseInt(me.page) + 1;
                    me.ajaxList (me.page);
                }
            },
            ajaxList (page){
                var me = this;
                var dataObj = "page="+page;
                if(me.wxShare == 1){
                    dataObj += "&userid="+me.userid
                }
                utils.getUserData(function(res){
                    if( res.status == 200){
                        var data = res.data;
                        if(data.isget == 1){
                            me.$router.push({ path: '/Prize'})
                            return;
                        }
                        if(data.result == 1){
                            data.data.forEach(function(ele,index){
                                me.infodata.push(ele) ;
                            })
                            me.pageB = false;
                            if(me.infodata.length <= 0){
                                me.nothing = true;
                            }
                            if(data.data.length <= 0){
                                me.pageB = true;
                            }
                        }else{
                            me.toastView = true;
                            me.toastText = data.data.mess;
                        }
                    }
                },dataObj)
            },
            shareFun (){
                var me = this;
                var dataObj = "url="+escape(window.location.href.split('#')[0]);
                utils.shareHref(function(res){
                    if( res.status == 200){
                        var data = res.data;
                        wx.config({
                            debug: false,
                            appId: data.appId,
                            timestamp: data.timestamp, // 生成签名的时间戳
                            nonceStr: data.nonceStr, // 生成签名的随机串
                            signature: data.signature, // 签名
                            jsApiList: [
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'showOptionMenu',
                                'showAllNonBaseMenuItem',
                                'hideMenuItems'
                            ]
                        });
                        // var time = setTimeout(function(){
                            // me.readyFun();
                        //     clearTimeout(time)
                        // },200)
                    }
                },dataObj)

            },
            readyFun(){
                var me = this;
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

<style lang="less">
    @import "../assets/list.less";
    .zone{
        padding-top: 204px;
        position: relative;
        height: 100%;
        header{
            height: 204px;
            position: absolute;
            top: 0;
            width: 100%;
            .title{
                height: 90px;
                span{
                    height: 90px;
                    width: 100%;
                    display: block;
                    background: url("https://s.kcimg.cn/wap/images/game/20170601/zone-title.png") no-repeat 50% 26px;
                    font-size: 0;
                }
            }
            .btn{
                display: block;
                width: 283px;
                height: 102px;
                margin: 0 auto;
                background: url("https://s.kcimg.cn/wap/images/game/20170601/rank.png") no-repeat 50%;
                line-height: 102px;
                text-align: center;
                font-size: 40px;
                color: #fff;
            }
        }
        .rank-list{
            padding-bottom: 204px;
        }
        .nothing{
            text-align: center;
            line-height: 50px;
            font-size: 40px;
            color: #fff;
        }
        .go-home{
            position: fixed;
            right: 10px;
            bottom: 50px;
            width: 120px;
            height: 120px;
            background: #c3a5f2;
            font-size: 36px;
            color: #fff;
            line-height: 120px;
            text-align: center;
            border-radius: 50%;
            box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
        }
    }
</style>
