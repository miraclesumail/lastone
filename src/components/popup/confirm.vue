<template>
    <transition name="slide-fade">
        <div class="r_popup_confirm" v-if="visible">
            <transition name="slide-scale" v-if="visibleIn">
                <div class="popup_main">
                    <div class="popup_title">
                        {{config.title}}
                        <div class="popup_close_btn" @click="close"></div>
                    </div>
                    <div class="popup_content">
                        <div v-if="!showComponent" class="popuo_content_msg" v-html="config.msg"></div>
                        <Test class="popuo_content_msg" v-else />
                    </div>
                    <div class="box_popup_btn">
                        <div class="popup_btn" v-for="item in config.btnList" :key="item.name" @click="close(item.callback)" v-text="item.name"></div>
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
            config: '',
            showComponent: false
        };
    },

    components: {},

    computed: {},

    methods: {
        init(config) {
            if (config) {
                config.title = config.title ? config.title : '温馨提示';
                if (!config.btnList) {
                    config.btnList = [{name: '确定'}];
                }
                this.config = config;
            }
        },

        show(config) {
            this.init(config);
            this.visible = true;
            setTimeout(() => {
                this.visibleIn = true;
            }, 100);
        },

        close(cb) {
            this.visibleIn = false;
            setTimeout(() => {
                this.visible = false;
                typeof cb === 'function'  && cb(this.$router);
            }, 300);
        }
    }
}
</script>