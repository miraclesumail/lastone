<script>
import HeadMarquee from './marquee2'

export default {
    components:{
        HeadMarquee,
    },
    data(){
        return{
        }
    },
}
</script>
<template>
    <router-link to="/notification" class="notice pointer" tag="div">
        <!-- <img src="@/assets/images/icon-news.png"> -->
        <div class="r_icon-news"></div>
        <HeadMarquee/>
    </router-link>
</template>


