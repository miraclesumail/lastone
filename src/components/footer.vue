<template>
    <div class="r_footer">
        <div class="main_footer">
            <router-link class="footer_item" to="/home" tag="div">
                <div class="icon footer_home_icon"></div>
                <p class="page_name" v-text="'首页'"></p>
            </router-link>
            <router-link class="footer_item" to="/report_form" tag="div">
                <div class="icon footer_baobiao_icon"></div>
                <p class="page_name" v-text="'报表'"></p>
            </router-link>
            <router-link class="footer_item" to="/commission" tag="div">
                <div class="icon footer_yongjin_icon"></div>
                <p class="page_name" v-text="'佣金'"></p>
            </router-link>
            <div class="footer_item" @click="showCsServiceHolder" :class="{'footer_acitve': csServiceActive}">
                <div class="icon footer_kefu_icon"></div>
                <p class="page_name" v-text="'客服'"></p>
            </div>
            <router-link class="footer_item" to="/account" tag="div">
                <div class="icon footer_zhanghu_icon"></div>
                <p class="page_name" v-text="'账户'"></p>
            </router-link>
        </div>
        <!-- 客服 -->
        <div class="box_service" v-show="showCsService">
            <div class="list">
                <div class="item item1" @click="service('cs')">
                    <div class="bg"></div>
                    <div class="text">在线客服</div>
                </div>
                <div class="item item2" @click="service('qq')">
                    <div class="bg">
                        <span class="s_font2">{{csQQ}}</span>
                    </div>
                    <div class="text">招商经理</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    data () {
        return {
            showCsService: false,
            csServiceActive: false,
        };
    },

    components: {},

    computed: {
        ...mapState(['csQQ'])
    },

    created(){

    },

    methods: {
     showCsServiceHolder() {
            this.showCsService = !this.showCsService;
            this.csServiceActive = !this.csServiceActive;
       },
        service(type) {
            if (type === 'cs') {
                Tool.service('cs', this.$store);
            } else if (type === 'qq') {
                Tool.service('qq', this.$store);
            } else if (type === 'phone') {
                Tool.service('phone', this.$store);
            } else if (type === 'wechat') {
                Tool.service('wechat', this.$store);
            }
        }
    },

}
</script>
