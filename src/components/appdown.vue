<template>
    <div class="d_appdown" v-if="urls && $store.state.showAppDown && $route.name == 'home'" @click="opennew">
        <img :src="urls.imgUrl" alt="">
        <img :src="urls.imgUrl2" alt="" @click.stop="close">
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "appdown",
        data() {
            return {
                urls: null,
            }
        },
        mounted() {
            // if (Tool.isApp()) { 
            //     this.$store.commit('setState', {key: 'showAppDown', value: false});
            //     return;
            // }
            // Tool.getFrontEndData(22).then(data => {
            //     if (data) {
            //         const urls = data.list[0].list[0];
            //         this.urls = urls;
            //     } else {
            //         this.$store.commit('setState', {key: 'showAppDown', value: false});
            //     }
            // });
        },
        methods: {
            ...mapMutations(['setState']),
            opennew() {
                let url = '';
                if (Tool.versions().android) url = Tool.getSession('androidDownLoadUrl');
                else if (Tool.versions().ios) url = Tool.getSession('iosDownLoadUrl');
                window.open(url);
            },
            close(){
                this.setState({key:'showAppDown',val:false})
            }
        }
    }
</script>