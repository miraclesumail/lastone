<template>
    <div class="xd_sign_in" :class="{g:newName == 'game'}">
        <div class="home_part" v-if="newName == 'home'">
            <div class="get_money">
                <span>{{balance}}</span>
            </div>
            <div class="play_btn" @click="$router.push('/game')"></div>
            <div class="go_act"></div>
            <div class="show_footer" @click="actBtn">
                <div class="icon"></div>
                <p class="name">优惠</p>
            </div>
        </div>
        <div class="game_part" v-if="newName == 'game'">
            <div class="close" @click="gameBtn"></div>
            <div class="more_game"></div>
        </div>
    </div>
</template>

<script>
    import {mapMutations,mapState} from 'vuex';

    export default {
        name: "xd_sign_in",
        data() {
            return {
                newName: '',
                timer:null
            }
        },
        mounted() {
            let name = this.$route.name;
            if (name == 'home') {
                this.newName = 'home';
            } else if (name == 'game') {
                this.newName = 'game';
                if(Tool.getLocal('xdSignIn') != 'done'){
                    this.timer = setInterval(()=>{
                        this.hideNote()
                    },3000)
                }
            }

            if(Tool.getLocal('xdSignIn') == 'done'){
                this.hideNote()
            }
        },
        computed:{
            ...mapState(['balance'])
        },
        methods:{
            ...mapMutations(['setState']),
            hideNote(){
                this.setState({key:'xdSignIn',value:false})
                Tool.setLocal('xdSignIn','done')
            },
            actBtn(){
                this.$router.push('/promotions/allPromotions');
                this.hideNote()
            },
            gameBtn(){
                this.hideNote()
            }
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
    }
</script>