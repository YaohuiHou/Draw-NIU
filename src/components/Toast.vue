<template>
    <div class="toast" v-show="toastView">
        <div class="toast-view">
            <p>{{ toastText }}</p>
            <div class="toast-btn">
                <!-- <span class="cancel">取消</span> -->
                <span class="confirm" @click="remove">确定</span>
            </div>
        </div>
        <i class="toast-curtain"></i>
    </div>
</template>
<style lang="less" scoped>
    .toast{
        display: block;
    }
</style>
<script>
export default {
    props: ['toastView','toastText',"toastBack"],
    data () {
        return {
        }
    },
    methods:{
      remove (){
        if(this.toastBack == 1){
            this.$router.push('/zone');
            return;
        }
        this.$emit('toastbox',this.toastView);
      }
    }
}
</script>
