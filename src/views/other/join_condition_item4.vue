<template>
    <div class="join_condition">
        <Header :showCbBtn="true" class="header">管理条款</Header>
        <div class="content">
            <div class="title s_font2 s_border_b">
                <span>管理条款</span>
            </div>
            <div class="list box_bg_color">
                <div class="item">
                    <div class="item_left">
                        <div class="sign"></div>
                        <div>第一条</div>
                    </div>
                    <div class="item_right">
                        <p>一个加盟代理只能申请一个代理帐户。</p>
                    </div>
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="sign"></div>
                        <div>第二条</div>
                    </div>
                    <div class="item_right">
                        <p>同一姓名和同一收款帐号的会员只能是一个加盟代理的下线玩家。如出现特殊原因下线玩家没有在加盟代理的管理后台体现，您可以在该会员开户后24小时内申报。</p>
                    </div>
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="sign"></div>
                        <div>第三条</div>
                    </div>
                    <div class="item_right">
                        <p>无论公司或者个人都是在双方自愿的情况下和网站签订协议，网站合作协议将受菲律宾法律的保护。任何与网站合作协议相关的法律行为都必须被带到菲律宾政府处理。如果你申请并已经成为网站代理加盟，说明你自愿并已经认真阅读了合作协议，并同意合作协议的所有规则及条款。通过加盟代理申请并已经拥有了网站的推广链接，证明您自愿并已经明确地同意被此协议的规则和条款所约制。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/header'
export default {
    data () {
        return {
        };
    },

    components: {
        Header
    },

    created() {
    },

    computed: {},

    methods: {
    }
}
</script>
