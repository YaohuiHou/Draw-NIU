<template>
    <div class="detail">
        <figure>
            <img :src="info.imgsrc" />
            <p>{{ info.bless }}</p>
        </figure>
        <span class="erweima">长按保存图片</span>
        <div class="userinfo">
            <span class="userimg">
                <img :src="info.bbsimg" />
            </span>
            <em class="username">{{ info.bbsname }}</em>
            <b class="usernum">{{ info.score }}分</b>
        </div>
        <ul class="score">
            <li @click="score(item)" v-for="item in btns" :class="calss ? item.className : ''">{{ item.btnText }}</li>
        </ul>
        <Toast :toastView="toastView" :toastText="toastText" v-on:toastbox="toastMeg"></Toast>
    </div>
</template>

<script>
    import utils from "../utils"
    import Toast from '@/components/Toast'
    export default {
        components:{
            Toast
        },
        data () {
            return {
                info:{
                },
                toastView : false,
                infoid:0,
                calss:true,
                toastText : '', // 错误文案
                btns:[
                    { id:"0",btnText : "0分滚粗",'className':'' ,num:0},
                    { id:"1",btnText : "666分不要太骄傲",'className':'' ,num:666},
                    { id:"2",btnText : "888分画得真好，么么哒",'className':'',num:888 }
                ],
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
                this.infoid = userdata.id;
                this.wxShare = userdata.wxShare;
                if(location.href.indexOf('wxShare') == '-1'){
                    this.wxShare = 1
                }
                this.ajaxList(this.infoid);
            }
            this.WechatShareData.link = location.href;
            var me = this;
                me.shareFun();
        },
        methods:{
            score (item){
                if(!truckhomeAccountBinding.bindStatus){
                    truckhomeAccountBinding.show();
                    return;
                }
                var me = this;
                if(item.className == "current") return;
                // 传分数
                var dataObj = "infoid="+this.infoid;
                dataObj += "&score="+item.id

                utils.addVote(function(res){
                    if( res.status == 200){
                        var data = res.data;
                        if(data.result == 1){
                            item.className = "current";
                            me.info.score = parseInt(me.info.score) + parseInt(item.num);
                        }
                        me.toastView = true;
                        me.toastText = data.data.mess;
                    }
                },dataObj)
            },
            toastMeg ( judge ){     //弹窗
                this.toastView = !judge;
                if(this.wxShare == 1){
                    location.href = "https://topic.360che.com/m/2017060501/#/"
                }
            },
            ajaxList (id){          //详情
                var me = this;
                var dataObj = "infoid="+id;
                utils.getInfoData(function(res){
                    if( res.status == 200){
                        var data = res.data;
                        if(data.result == 1){
                            me.info = data.data;
                            if(me.info.isvote == 1){
                                me.btns[me.info.votescore].className = "current";
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
                            jsApiList: [
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'showOptionMenu',
                                'showAllNonBaseMenuItem',
                                'hideMenuItems'
                            ]
                        });
                        var me = this;
                        var time = setTimeout(function(){
                            me.ready();
                            clearTimeout(time)
                        },200)
                    }
                },dataObj)

            },
            ready(){
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

<style scoped lang="less">
    .detail{
        position: relative;
        height: 100%;
        overflow: auto;
        .erweima{
            position: absolute;
            right: 35px;
            top: 150px;
            width: 20px;
            font-size: 20px;
            line-height: 26px;
            color: #fff;
        }
        figure{
            width: 410px;
            border: 20px solid #fff;
            background: #eef5f8;
            margin: 30px auto 0;
            position: relative;
            img{
                width: 100%;
            }
            p{
                line-height: 40px;
                font-size: 26px;
                color: #f06645;
                overflow: hidden;
                height: 80px;
                padding: 10px 10px 0;
                text-indent:2em;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
        .userinfo{
            margin: 20px auto;
            width: 450px;
            height: 100px;
            .userimg{
                float: left;
                width: 96px;
                height: 96px;
                display: inline-block;
                border: 2px solid #fff;
                overflow: hidden;
                border-radius: 50%;
                img{
                    width: 100%;
                }
            }
            .username{
                margin-left: 10px;
                line-height: 100px;
                font-size: 24px;
                color: #fff;
                font-style: normal;
            }
            .usernum{
                float: right;
                line-height: 100px;
                font-size: 40px;
                color: #fe8f1c;
            }
        }
        .score{
            margin: 0 auto;
            width: 580px;
            li{
                border: 10px solid #ef9330;
                width: 560px;
                height: 72px;
                background: #ffed91;
                position: relative;
                border-radius: 46px;
                margin-bottom: 20px;
                text-align: center;
                line-height: 72px;
                font-size: 36px;
                color: #c78142;
                &:before{
                    content: "";
                    position: absolute;
                    left: -20px;
                    top: -17px;
                    width: 100px;
                    height: 87px;
                    background: url("https://s.kcimg.cn/wap/images/game/20170601/start.png") no-repeat 50%;
                }
                &.current{
                    color: #888;
                    background: #cdcdcd;
                    border-color: #9b9b9b;
                    &:before{
                        background: url("https://s.kcimg.cn/wap/images/game/20170601/end.png") no-repeat 50%;
                    }
                }
            }
        }
    }
</style>
