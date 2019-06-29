<template>
    <transition name="slide-fade">
        <div class="r_popup_confirm r_popup_commission" v-if="visible">
            <transition name="slide-scale" v-if="visibleIn">
                <div class="popup_main">
                    <div class="popup_title">
                        预计佣金明细
                        <div class="popup_close_btn" @click="close"></div>
                    </div>
                    <div class="popup_content">
                        <div class="popuo_content_msg">
                            <p><span>本周输赢总值:</span><span class="font_color1">20000.00</span></p>
                            <p><span>本周优惠额:</span><span class="font_color1">20000.00</span></p>
                            <p><span>平台费:</span><span class="font_color1">20000.00</span></p>
                            <p><span>存取款手续费:</span><span class="font_color1">20000.00</span></p>
                            <p><span>下级代理佣金:</span><span class="font_color1">20000.00</span></p>
                            <p><span>直属下线佣金:</span><span class="font_color1">20000.00</span></p>
                            <p><span>佣金比例:</span><span class="font_color1 to_search">查询</span></p>
                            <div class="bottom_line"></div>
                            <div class="c_box_bottom">
                                <p>预计佣金</p>
                                <p class="font_color1">8500</p>
                            </div>
                        </div>
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
            config: ''
        };
    },

    components: {},

    computed: {},

    methods: {
        show(config) {
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
