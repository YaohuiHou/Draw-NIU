<template>
    <div class="prize">
        <header>
            <h3>填写信息赢取卡家大礼</h3>
            <p>用于中奖后快递奖品，请您认真填写</p>
        </header>
        <form class="prize-form" method="post" @submit.prevent="submit">
            <label>
                <input type="text" name="name" value="" placeholder="姓名" v-model="form.name" maxlength="10">
            </label>
            <label>
                <input type="tel" name="tel" value="" placeholder="手机号" v-model="form.tel" maxlength="11">
            </label>
            <label>
                <input type="text" name="add" value="" placeholder="地址" v-model="form.address" >
            </label>
            <button type="submit" class="submit">提交</button>
        </form>
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
                toastView : false,
                toastText : '', // 错误文案
                toastBack:0,
                form : {
                    name: '',
                    tel: '',
                    address:''
                },
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
            // this.WechatShareData.link = location.href;
            this.shareFun();
        },
        methods:{
            toastMeg ( judge ){     //弹窗
                this.toastView = !judge;
                if(this.toastBack == 1){
                    this.$router.push('/Zone');
                }
            },
            submit(){
                var me = this;
                // 验证
                if( this.form.name.length <= 0){
                    me.toastText = '请输入您的姓名！';
                    me.toastView = true;
                    return;
                }
                if(this.form.tel && !(/^1(([38]\d)|(4[57])|(5[012356789])|(7[0678]))\d{8}$/.test(this.form.tel))){
                    me.toastText = '请输入正确的联系电话！';
                    me.toastView = true;
                    return;
                };
                if( this.form.address <= 0){
                    me.toastText = '请输入您的住址！';
                    me.toastView = true;
                    return;
                }
                me.form.name = escape(me.form.name);
                me.form.address = escape(me.form.address);
                var form = 'name='+me.form.name;
                form += '&tel='+me.form.tel;
                form += '&address='+me.form.address;
                utils.addUserData(function(res){
                    if( res.status == 200){
                        var data = res.data.data;
                        me.toastText = data.mess;
                        me.toastBack = 1;
                        me.toastView = true;
                        me.form.name = unescape(me.form.name);
                        me.form.address = unescape(me.form.address);
                    }
                },form);

                me.form.name = unescape(me.form.name);
                me.form.address = unescape(me.form.address);
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

<style scoped lang="less">
    .prize{
        position: absolute;
        left: 0;
        top: 200px;
        width: 100%;
        height: 810px;
        header{
            margin-bottom: 160px;
            h3{
                text-align: center;
                line-height: 88px;
                font-size: 48px;
                color: #fff;
            }
            p{
                line-height: 44px;
                font-size: 24px;
                color: #fff;
                text-align: center;
            }
        }
        .prize-form{
            width: 520px;
            margin: 0 auto;
            position: relative;
            &:before{
                content: "";
                position: absolute;
                left: 50%;
                top: -160px;
                width: 147px;
                height: 161px;
                background: url("https://s.kcimg.cn/wap/images/game/20170601/form.png") no-repeat 50%;
                margin-left: -74px;
            }
            label{
                display: block;
                width: 436px;
                height: 38px;
                border: 2px solid #db5e41;
                background: #fff;
                padding: 20px 40px;
                overflow: hidden;
                border-radius: 40px;
                margin-bottom: 20px;
                input{
                    width: 100%;
                    height: 38px;
                    line-height: 38px;
                    font-size: 36px;
                }
            }
            .submit{
                display: block;
                width: 283px;
                height: 102px;
                margin: 25px auto 0;
                background: url("https://s.kcimg.cn/wap/images/game/20170601/submit.png") no-repeat 50%;
                line-height: 102px;
                text-align: center;
                color: #fff;
                font-size: 40px;
                border: none;
            }
        }
    }
</style>
