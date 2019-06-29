<template>
    <div class="d_update_password">
        <Header :showCbBtn="true">修改密码</Header>

        <div class="input_box">

            <form class="r_box_form">
                <div class="form_item">
                    <div class="form_item_in">
                        <label>旧密码</label>
                        <input type="password" v-model="oldPassword" placeholder="请输入您的旧密码" v-va="'oldPassword'">
                    </div>
                    <p class="meg_error">{{error.oldPassword}}</p>
                </div>

                <div class="form_item">
                    <div class="form_item_in">
                        <label>新密码</label>
                        <input type="password" placeholder="请输入您的新密码" v-model="newPassword" v-va="'newPassword'">
                    </div>
                    <p class="meg_error">{{error.newPassword}}</p>
                </div>

                <div class="form_item">
                    <div class="form_item_in">
                        <label>确定密码</label>
                        <input type="password" placeholder="请输入您的新密码" v-model="confirmPassword" v-va="'confirmPassword'">
                    </div>
                    <p class="meg_error">{{error.confirmPassword ? error.confirmPassword[0] : ''}}</p>
                </div>

                <div class="box_form_item sms_code" v-if="showImgCode">
                    <div class="item_left">
                        <div class="form_item">
                            <div class="form_item_in">
                                <label>图形验证</label>
                                <input type="text" maxlength="4" placeholder="输入验证码" v-model="captcha" v-va:Number="'captcha'">
                            </div>
                        </div>
                    </div>

                    <div class="item_right">
                        <div class="captcha" @click="getImgCode">
                            <img :src="codeImg" alt="">
                        </div>
                    </div>

                    <p class="meg_error">{{error.captcha}}</p>
                </div>


                <div class="box_form_item sms_code" v-if="needSmsCode">
                    <div class="item_left">
                        <div class="form_item">
                            <div class="form_item_in">
                                <label>短信验证</label>
                                <input type="text" maxlength="4" placeholder="输入验证码" v-model="smsCode" v-va:Number="'smsCode'">
                            </div>
                        </div>
                    </div>
                    <div class="item_right" @click="getSMScode">
                        <div class="get_code_btn">{{getSmsBtnText}}</div>
                    </div>
                    <p class="meg_error" style="margin-top:0.1rem;">{{error.smsCode}}</p>
                </div>

            </form>

            <div class="update_btn" @click="submit"></div>
            <p>收到不到短信验证码？</p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "update_password",
        data() {
            return {
                getSmsBtnText: '',
                oldPassword: '',
                newPassword: '',
                confirmPassword:'',
                captcha:'',
                codeImg:'',
                smsCode:''
            }
        },
        rules: {
            oldPassword: {
                test: 'required',
                message: '请输入旧密码'
            },
            newPassword: {
                test: 'required',
                message: '请输入新密码'
            },
            confirmPassword: [
                {
                    test: 'required',
                    message: '请输入确认新密码'
                },
                {
                    test: function() {
                        return this.confirmPassword === this.newPassword;
                    },
                    message: '两次密码不一致'
                }
            ],
            captcha: {
                test: 'required',
                message: '请输入图形验证码'
            },
            smsCode: {
                test: 'required',
                message: '验证码不能为空'
            }
        },
        computed: {
            error() {
                return this.$verify.$errors;
            },
            showImgCode() {
                return this.$store.state.platformConfig.needImageCodeForSendSMSCode;
            },

            needSmsCode() {
                return this.$store.state.platformConfig.needSMSForModifyPassword;
            }
        },
        mounted(){
            this.getImgCode();
        },
        methods:{
            getImgCode() {
                ws.partner.captcha().then(res => {
                    this.codeImg = Tool.arrayBufferToBase64(res.data.data);
                });
            },
            setTime() {
                this.getSmsBtnText = 60;
                this.timer = setInterval(() => {
                    if (this.getSmsBtnText === 0) {
                        clearInterval(this.timer);
                        this.getSmsBtnText = ''
                    } else {
                        this.getSmsBtnText--;
                    }
                }, 1000);
            },
            getSMScode() {
                if (!this.$verify.check('captcha')) return;
                if (this.getSmsBtnText !== '') return;
                ws.partner.getSMSCode({purpose: 'updatePassword', captcha: this.captcha},true).then(() => {
                    popup.confirm('验证码发送成功');
                    this.setTime();
                }).catch(err => {
                    popup.confirm(err.errorMessage);
                    this.getImgCode();
                });
            },
            submit(){
                if (!this.$verify.check('oldPassword')) return;
                if (!this.$verify.check('newPassword')) return;
                let sendData={
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword,
                    smsCode:this.smsCode
                }
                Tool.send('partner','updatePassword',sendData).then(() => {
                    popup.confirm('修改成功！', [{name: '确定', callback: () => {
                            this.oldPassword = '';
                            this.newPassword = '';
                            this.confirmPassword = '';
                            this.$router.push('/account');
                        }}]);
                });
            }
        }
    }
</script>