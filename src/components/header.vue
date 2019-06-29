<template>
    <div class="r_header">
        <div class="r_header_in">
            <div class="header_left">
                <slot name="left">
                    <div v-if="showLogo" class="header_logo"></div>
                    <div v-if="showCbBtn" class="header_callback_btn" @click="goBack"></div>
                </slot>
            </div>
            <div class="header_right" v-if="_showRight">
                <slot name="header_right">
                    <div class="header_right_item header_email" v-if="isLogin && showEmail" @click="togo('/mail')">
                        <div class="herder_email"></div>
                        <!-- <div class="mail_noread" v-show="mailNoReadLength">
                            <span>{{mailNoReadLength}}</span>
                        </div> -->
                    </div>
                    <div class="login_btns" v-if="!isLogin && showLogin">
                        <p class="sign_up s_font" @click="togo('/sign_up')">注册</p>
                        <p class="s_font" @click="togo('/sign_in')">登录</p>
                    </div>
                </slot>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },

    props: ['showCbBtn', 'noReturnPrevPage', 'showLogo', 'showEmail', 'showLogin', 'showRight', 'showLeft'],

    computed: {
        _showRight() {
            return this.showRight || this.showEmail || this.showLogin;
        },

        isLogin() {
            return this.$store.state.isLogin;
        },

        // mailNoReadLength(){
        //     let number = '';
        //     let mailList = this.$store.state.mailList;
        //     if (mailList.length > 0) {
        //         number = 0;
        //         mailList.forEach((item)=>{
        //             if(!item.hasBeenRead){
        //                 number++;
        //             }
        //         })
        //     }
        //     return number;
        // }
    },

    methods: {
        goBack() {
            if (this.noReturnPrevPage) {
                this.$emit('returnWhere');
            } else {
                this.$router.go(-1);
            }
        },
        togo(path) {
            this.$router.push(path);
        }
    }
}
</script>
