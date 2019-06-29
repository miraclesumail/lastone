<template>
    <div class="popularize">
        <Header :showCbBtn="true">推广</Header>
        <div class="main_popularize">
            <p>专属推广地址：<span class="p_url">jin152.com/2614</span></p>
            <div class="box_qr_code">
                <div id="qr_code"></div>
            </div>
            <div>
                <span class="text_small">专属推广海报：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="main_btn btn_get_poster"></span>
            </div>
            <p class="have_margin">复制、分享链接或二维码图发给您的下线</p>
            <ul class="box_share">
                <li>
                    <div class="share_icon qq_icon"></div>
                    <p class="text_small">分享到QQ</p>
                </li>
                <li>
                    <div class="share_icon wechat_icon"></div>
                    <p class="text_small">分享到微信</p>
                </li>
                <li>
                    <div class="share_icon link_icon"></div>
                    <p class="text_small">复制链接</p>
                </li>
                <li>
                    <div class="share_icon download_icon"></div>
                    <p class="text_small">下载宣传图</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },

    components: {},

    computed: {},

    methods: {}
}
</script>