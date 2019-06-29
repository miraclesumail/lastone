<template>
    <div class="sign_in_up">
        <Header :showCbBtn="true">注册</Header>
        <div class="main_sign_in_up">
            <div class="sign_logo"></div>
            <form class="r_box_form">
                <div class="form_item form_item_b">
                    <div class="form_item_in">
                        <label class="form_item_icon icon_p"></label>
                        <input class="username" type="text" :placeholder="accPlaceUsername" @focus="setFix" v-model="username" v-va:CeAndLe="'username'">
                    </div>
                    <p class="meg_error">{{error.username ? error.username[0] : ''}}</p>
                </div>
                <div class="form_item form_item_b">
                    <div class="form_item_in">
                        <label class="form_item_icon icon_mima"></label>
                        <input type="password" :placeholder="accPlacePwd" v-model="password" v-va="'password'">
                    </div>
                    <p class="meg_error">{{error.password}}</p>
                </div>
                <div class="form_item form_item_b">
                    <div class="form_item_in">
                        <label class="form_item_icon icon_phone"></label>
                        <input type="tel" placeholder="请输入正确的电话号码" v-model="phoneNumber" v-va="'password'">
                    </div>
                    <p class="meg_error">{{error.phoneNumber}}</p>
                </div>
                <div class="form_item form_item_b">
                    <div class="form_item_in">
                        <label class="form_item_icon icon_smscode"></label>
                        <input type="tel" placeholder="请输入短信验证码" v-model="smsCode" v-va="'password'">
                        <div class="main_btn getSmsCodeBtn" @click="gatSMScode">{{getSmsBtnText}}</div>
                    </div>
                    <p class="meg_error">{{error.smsCode}}</p>
                </div>
                <p class="small_text sign_up_text">收不到？<span class="font_color1">联系客服</span></p>
                <div class="main_btn reg_btn" @click="signUp"></div>
                <p class="small_text">已有账号?<span class="font_color1" @click="togo('/sign_in')">立即登录</span></p>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {
            username: '',
            password: '',
            phoneNumber: '',
            smsCode: '',
            getSmsBtnText: '获取验证码'
        };
    },

    rules: {
        username: [
            {
                test: 'required',
                message: '请输入账号'
            },
            {
                test: 'username'
            },
            {
                test: function(val) {
                    return new Promise((resolve, reject) => {
                        if (!val) reject();
                        ws.partner.isValidUsername({name: val}, false, false).then(() => {
                            resolve(true);
                        }).catch((err) => {
                            if (err.status === 404) {
                                resolve(false);
                            } else {
                                resolve(true);
                            }
                        });
                    });
                },
                async: true,
                message: '此用户名已被占用，请您跟换用户名。'
            },
            {
                test: function(val) {
                    if (val.length < this.accountMinLength || val.length > this.accountMaxLength) return false;
                    else return true;
                },
                message: function() {
                    return this.accPlaceUsername;
                }
            }
        ],
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

    components: {},

    computed: {
        ...mapState(['platformConfig']),
        error() {
            return this.$verify.$errors;
        },
        accountPrefix() {
            return this.platformConfig.accountPrefix;
        },
        accountMinLength() {
            return this.platformConfig.accountMinLength;
        },
        accountMaxLength() {
            return this.platformConfig.accountMaxLength;
        },
        accPlaceUsername() {
            let msg = '';
            if (this.accountPrefix) {
                msg = '小写' + this.accountPrefix + '开头';
            }
            return '请输入' + msg + this.accountMinLength + ' - ' + this.accountMaxLength + '位数字或字母组成账号';
        },
        passwordMinLength() {
            return this.platformConfig.passwordMinLength;
        },
        passwordMaxLength() {
            return this.platformConfig.passwordMaxLength;
        },
        accPlacePwd() {
            let msg = '';
            msg = '请输入' + this.passwordMinLength + ' - ' + this.passwordMaxLength + '位数字或字母组成密码';
            return msg;
        }
    },

    methods: {
        togo(path) {
            this.$router.push(path);
        },
        setFix() {
            this.username = this.accountPrefix ? this.accountPrefix : this.username;
        },
        signUp() {
            if (!this.$verify.check()) return;
            if (this.accountPrefix && this.username.charAt() !== this.accountPrefix) {
                popup.confirm('账号必须是' + this.accountPrefix + '开头');
                return;
            }
            let data = {
                name: this.username,
                password: this.password,
                phoneNumber: this.phoneNumber,
                smsCode: this.smsCode
            }
            ws.partner.register(data, false).then(data => {
                Tool.setLocal('p_username', this.username);
                this.$store.commit('setLogin', data);
                this.$router.push('/');
                popup.confirm('恭喜您，注册成功');
            });
        },
        gatSMScode() {
            if (this.getSmsBtnText !== '获取验证码') return;
            if (!this.$verify.check(['username', 'password', 'phoneNumber'])) return;
            ws.partner.getSMSCode({
                name: this.username,
                phoneNumber: this.phoneNumber,
                purpose: 'Partner_registration',
            }).then(() => {
                popup.confirm('验证码发送成功');
                this.setTime();
            });
        },
        setTime() {
            this.getSmsBtnText = 60;
            this.timer = setInterval(() => {
                if (this.getSmsBtnText === 0) {
                    clearInterval(this.timer);
                    this.getSmsBtnText = '获取验证码'
                } else {
                    this.getSmsBtnText--;
                }
            }, 1000);
        }
    },

    watch: {
        username(newVal, oldVal) {
            if (newVal == '') {
                this.username = this.accountPrefix;
            }
        }
    }
}
</script>