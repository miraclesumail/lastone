<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components: {
        swiper,
        swiperSlide
    },
    data(){
        return {
            list: [],
            swiperOption: {
                autoplay: {
                    disableOnInteraction: false,   // 触摸后不停止自动播放
                },
                delay:1000,
                direction: "vertical",
                loop:true
            },
        }
    },
    created(){
        // Promise.all([this.getPlatformAnnouncements('all'), this.getPlatformAnnouncements('players')]).then(res=>{
        //     const platformAnnouncements = res[0].concat(res[1]);
        //     // platformAnnouncements.forEach(el => {
        //     //     this.list.push(el.content);
        //     // });
        //     this.list = platformAnnouncements.slice()
        // })
        Tool.send('platform', 'getPlatformAnnouncements', { _catch: true }, true, true).then(res=>{
            let list = res.data.filter(item => {
                if (item.reach === 'partner' || item.reach === 'all') return item;
            });
            this.list = list;
        });
    },
    mounted(){
    },
    methods: {
        getPlatformAnnouncements(reach){
            return new Promise((reslove, reject) => {
                Tool.send('getPlatformAnnouncements',{ reach, _catch: true }).then(res=>{
                    reslove(res.data)
                })
            })
        },
        togo(){
            this.$router.push('/notification');
        },
    },
}
</script>

<template>
    <div class="marquee" @click="togo">
        <swiper :options="swiperOption" class="swiper_content" v-if="list.length>0">
            <swiper-slide v-for="(item, index) in list" :key="index" class="swiper_list">
                <span>{{index+1+'.'+item.content}}</span>
            </swiper-slide>
        </swiper>
    </div>
</template>
