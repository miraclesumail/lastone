<template>
    <div class="sign_in_up">
        <Header :showCbBtn="true" :noReturnPrevPage="true" @returnWhere="togo('/home')">登录</Header>
        <div class="main_sign_in_up">
            <div class="sign_logo"></div>
            <form class="r_box_form">
                <div class="form_item form_item_b">
                    <div class="form_item_in">
                        <label class="form_item_icon icon_p"></label>
                        <input class="username" type="text" placeholder="请输入账号" v-model="username" v-va:CeAndLe="'username'">
                    </div>
                    <p class="meg_error">{{error.username ? error.username[0] : ''}}</p>
                </div>
                <div class="form_item form_item_b">
                    <div class="form_item_in">
                        <label class="form_item_icon icon_mima"></label>
                        <input type="password" placeholder="输入密码" v-model="password" v-va="'password'">
                    </div>
                    <p class="meg_error">{{error.password}}</p>
                </div>
                <div class="form_item form_item_b" v-if="loginErrorCount >= 3">
                    <div class="form_item_in">
                        <label class="form_item_icon icon_sms"></label>
                        <input type="tel" placeholder="请输入验证码" v-model="errorCountCaptcha">
                        <div class="captcha" @click="getImgCode">
                            <img :src="codeImg"/>
                        </div>
                    </div>
                    <p class="meg_error">{{error.captcha}}</p>
                </div>
                <div class="operate">
                    <p>忘记账号/密码</p>
                    <p class="rmb_username" :class="{'rmb_username_active': remUsername}" @click="remHolder">记住账号</p>
                </div>
                <div class="main_btn login_btn" @click="login"></div>
                <p class="small_text" @click="togo('/sign_up')">没有账号?<span class="font_color1">立即注册</span></p>
            </form>
        </div>

        <!-- 防止表单自动填写 -->
        <input type="text" name="username" style="display: none;" disabled autocomplete="off"/>
        <input type="password" name="password" style="display: none;" disabled autocomplete="off"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                username: '',
                password: '',
                phoneNumber: '',
                smsCode: '',
                getSmsBtnText: '',
                showType: 1,
                captcha: '',
                codeImg:'',
                errorCountCaptcha: '',
                remUsername: false
            };
        },

        rules: {
            username: [{
                test: 'required',
                message: '请输入会员账号'
            }, 'username'],
            password: {
                test: 'required',
                message: '请输入密码'
            },
            phoneNumber: {
                test: 'phone',
                message: '请输入正确的手机号'
            },
            smsCode: {
                test: 'required',
                message: '请输入短信验证码'
            }
        },

        mounted() {
            let username = Tool.getLocal('p_username');
            if (username) this.username = username;
            this.isImgCode();
        },

        components: {},

        computed: {
            ...mapState(['platformConfig']),
            error() {
                return this.$verify.$errors;
            },
            accountPrefix() {
                return this.$store.state.platformConfig.accountPrefix;
            },
            loginErrorCount() {
                return this.$store.state.loginErrorCount;
            }
        },

        methods: {
            isImgCode() {
                if (this.platformConfig && this.platformConfig.needImageCodeForSendSMSCode) {
                    this.getImgCode();
                }
            },
            getImgCode() {
                ws.partner.captcha().then(res => {
                    this.codeImg = Tool.arrayBufferToBase64(res.data.data);
                });
            },
            login() {
                if (!this.$verify.check('username') || !this.$verify.check('password')) return;
                if (this.accountPrefix && this.username.charAt() !== this.accountPrefix) {
                    popup.confirm('账号必须是' + this.accountPrefix + '开头');
                    return;
                }

                if (this.loginErrorCount >= 3 && this.errorCountCaptcha === '') {
                    popup.confirm('请输入图形验证码');
                    return;
                } 

                let data = {
                    name: this.username,
                    password: this.password,
                    clientDomain: location.origin,
                    captcha: this.errorCountCaptcha
                };

                ws.partner.login(data, false).then(data => {
                    if (this.remUsername) Tool.setLocal('p_username', this.username);
                    this.$store.commit('setLogin', data);
                    this.$router.push(this.$store.state.toRouter || '/');
                }).catch(err => {
                    this.$store.commit('setState', {key: 'loginErrorCount', value: this.loginErrorCount + 1});
                    if (this.loginErrorCount >= 3) {
                        this.getImgCode();
                    }
                    let message = err.errorMessage;
                    popup.confirm(message, [{name: '确定'}]);
                });
            },

            togo(path) {
                this.$router.push(path);
            },

            remHolder() {
                this.remUsername = !this.remUsername;
            }
        },
        watch:{
            'platformConfig'(){
                this.isImgCode();
            }
        }
    }
</script>
