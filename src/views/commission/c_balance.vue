<template>
    <div class="c_balance">
        <div class="box_localBalance box_shadow">
            <p class="text">我的余额</p>
            <div class="box_bottom">
                <p class="localBalance"><span class="insignia">￥</span>99999999</p>
                <router-link 
                    class="main_btn btn_withdrawal" 
                    to="/withdrawal"
                    v-if="closeBtn"
                    ></router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },

    props: {
        closeBtn: {
            type: Boolean,
            default: true
        }
    },

    components: {},

    computed: {},

    methods: {}
}
</script>