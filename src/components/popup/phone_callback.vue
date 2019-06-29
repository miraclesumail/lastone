<template>
    <transition name="slide-fade">
        <div class="r_popup_confirm" v-if="visible">
            <transition name="slide-scale" v-if="visibleIn">
                <div class="popup_main">
                    <div class="popup_title">
                        温馨提示
                        <div class="popup_close_btn" @click="close"></div>
                    </div>
                    <div class="popup_content">
                        <div class="popuo_content_msg">
                            <div class="form_item">
                                <div class="form_item_in">
                                    <input type="text" class="full" placeholder="请输入您的手机号码" v-model="phoneNumber" v-va:Number="'phoneNumber'" />
                                </div>
                                <p class="meg_error">{{error.phoneNumber}}</p>
                            </div>
                            <div class="box_form_item sms_code">
                                <div class="item_left">
                                    <div class="form_item">
                                        <div class="form_item_in">
                                            <label>验证码</label>
                                            <input type="text" placeholder="输入验证码" v-model.lazy="captcha" v-va:Number="'captcha'" />
                                        </div>
                                        <p class="meg_error">{{error.captcha}}</p>
                                    </div>
                                </div>
                                <div class="item_right">
                                    <img @click='changeCaptcha' :src="captchaImg" width="140" height="42">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box_popup_btn">
                        <div class="popup_btn" @click="sendPhone">确定</div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
            visible: false,
            visibleIn: false,
            captchaImg: '',
            phoneNumber: '',
            captcha: '',
            randomNumber: '',
            lineId: 5566,
        };
    },

    rules: {
        phoneNumber: {
            test: 'phone',
            message: '请输入正确的手机号'
        },
        captcha: 'required'
    },

    components: {},

    computed: {
        error() {
            return this.$verify.$errors;
        }
    },

    created(){
        this.changeCaptcha()
    },

    methods: {
        show() {
            this.visible = true;
            setTimeout(() => {
                this.visibleIn = true;
            }, 100);
        },
        close() {
            this.visibleIn = false;
            setTimeout(() => {
                this.visible = false;
            }, 300);
        },
        sendPhone() {
            if (!this.$verify.check()) return;
            let data = {
                phoneNumber: this.phoneNumber,
                captcha: this.captcha,
                randomNumber: this.randomNumber,
                lineId: 5566,
            }
            Tool.send('callBackToUser', data).then(() => {
                popup.confirm('正在呼叫，请稍后', [{name: '确定'}]);
                this.close()
            }).catch(() => {
                popup.confirm('呼叫失败', [{name: '确定'}]);
                this.close()
            });
        },
        changeCaptcha() {
            Tool.send('getOMCaptcha').then(res => {
                this.captchaImg = res.data.b64ImgDataUrl
                this.randomNumber = res.data.randomNumber
            })
        },
    }
}
</script>
