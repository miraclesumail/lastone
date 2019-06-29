<script>
export default {
    data:()=>({
        list: '',
        duration: 0,
    }),
    mounted(){
        // Promise.all([this.getPlatformAnnouncements('all'), this.getPlatformAnnouncements('players')]).then(res=>{
        //     let text = '';
        //     const platformAnnouncements = res[0].concat(res[1]);
        //     platformAnnouncements.forEach(el => {
        //         text += el.content
        //     });
        //     this.list = text
        //     this.duration = text.length * 0.15
        // })
    },

    methods: {
        getPlatformAnnouncements(reach){
            return new Promise((reslove, reject) => {
                Tool.send('getPlatformAnnouncements',{ reach, _catch: true }).then(res=>{
                    reslove(res.data)
                })
            })
        },
    },
}
</script>

<template>
    <div class="marquee">
        <p :style="{ 'animation-duration' : duration + 's'}">{{ list }}</p>
    </div>
</template>
