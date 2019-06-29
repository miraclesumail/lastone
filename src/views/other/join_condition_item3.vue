<template>
    <div class="join_condition">
        <Header :showCbBtn="true" class="header">合作协议期限和终止</Header>
        <div class="content">
            <div class="title s_font2 s_border_b">
                <span>合作协议期限和终止</span>
            </div>
            <div class="list box_bg_color">
                <div class="item">
                    <div class="item_left">
                        <div class="sign"></div>
                        <div>第一条</div>
                    </div>
                    <div class="item_right">
                        <p>期限和终止</p>
                        <p>合作协议从加盟代理申请成功之日起开始执行。加盟代理可在任何时间终止合作协议。加盟代理必须以在线客服、电邮或QQ等形式，提前7日通知网站。如发现加盟代理有违反合作协议的行为，网站有权在没有通知的情况下终止协议。</p>
                    </div>
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="sign"></div>
                        <div>第二条</div>
                    </div>
                    <div class="item_right">
                        <p>保密信息</p>
                        <p>在协议执行期间，加盟代理未经网站允许，不得向任何人透露相关的合作机密数据，得到书面同意的必须按照书面范围履行。加盟代理有义务在终止协议后仍继续执行机密文件的保密。</p>
                    </div>
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="sign"></div>
                        <div>第三条</div>
                    </div>
                    <div class="item_right">
                        <p>无条件终止</p>
                        <p>加盟代理在任何情形下不得发表任何关于网站的负面消息、错误的声明、要求、承诺以及垃圾电子邮件。如被网站发现将无条件立即终止合作协议，并将加盟代理账户重新审核及冻结账户款项。</p>
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
