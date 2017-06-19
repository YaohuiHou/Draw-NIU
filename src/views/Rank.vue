<template>
    <div class="rank">
        <header>排行榜</header>
        <div class="rank-view" @scroll="onScroll($event)">
            <ul class="rank-list">
                <li v-for="item in infodata">
                    <router-link :to="{ path: '/Detail', query: {'id':item.infoid,'wxShare':wxShare}}">
                        <figure>
                            <img :src="item.imgsrc" />
                            <p>{{ item.bless }}</p>
                        </figure>
                        <div class="user">
                            <span class="userimg">
                                <img :src="item.bbsimg" />
                            </span>
                            <b class="usernum">{{ item.score }}分</b>
                        </div>
                    </router-link>
                </li>
            </ul>
            <div class="nothing" v-if="nothing">
                <p>暂无排名哦~</p>
            </div>
        </div>
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
                page:1,
                nothing:false,
                pageB:false,
                infodata:[

                ],
                toastView : false,
                toastText : '', // 错误文案
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
            // 加载
            this.ajaxList (this.page);
            this.WechatShareData.link = "https://topic.360che.com/m/2017060501/#/";
            this.shareFun();
        },
        methods:{
            toastMeg ( judge ){     //弹窗
                this.toastView = !judge;
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
                var dataObj = "page="+page;
                var me = this;
                utils.getRankData(function(res){
                    if( res.status == 200){
                        var data = res.data;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .rank{
        padding-top: 116px;
        position: relative;
        height: 100%;
        header{
            height: 96px;
            position: absolute;
            top: 0;
            width: 100%;
            background: url("https://s.kcimg.cn/wap/images/game/20170601/rank-title.png") no-repeat 50% 100%;
            font-size: 0;
        }
    }
    @import "../assets/list.less";
    .nothing{
        text-align: center;
        line-height: 50px;
        font-size: 40px;
        color: #fff;
    }
</style>
