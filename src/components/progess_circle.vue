<template>
   <div class="d_circle">
       <svg :width="radius" :height="radius" viewBox="0 0 146 146">
           <circle r="48" cx="73" cy="73" :fill="fillColor" :stroke="strokeColor" stroke-width="25"></circle>
           <circle r="48" cx="73" cy="73" fill="none" :stroke="strokeHighColor" stroke-width="25"  :stroke-dasharray="strokeDashArray" :transform="transformData"></circle>
       </svg>
       <span>{{percent}}%</span>
   </div>
</template>

<script>
    export default {
        name: "progess_circle",
        props:{
            radius:{
                type:String,
                default:'146'
            },
            percent: {
                type: Number,
                default: 90
            },
            fillColor:{
                type:String,
                default:'#101010'
            },
            strokeColor:{
                type:String,
                default:'#1b1b1b'
            },
            strokeHighColor:{
                type:String,
                default:'#edd983'
            }
        },
       computed:{
            strokeDashArray(){
                let ins = Math.PI*2*48;
                let per = (this.percent/100)*ins;
                let inputs = per+' '+ins*2;
                return inputs;
            },
            transformData(){
                return `matrix(0,-1,1,0,0,${this.radius})`
            }
       }
    }
</script>

<style scoped lang="less">
.d_circle{
    margin-top: 0.1rem;
    position: relative;
    >span{
        font-size: 0.42rem;
        font-weight: bold;
        color: #eacf75;
        display: inline-block;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        position: absolute;
        left: 0;
        top:60px;
        right: 0;
        margin: auto;
    }
}
</style>