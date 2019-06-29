<template>
    <div class="program">
        <Header :showCbBtn="true" class="header">代理方案</Header>
        <div class="content">
            <div class="bg"></div>
            <div class="qq box_shadow2">
                <div class="logo"></div>
                <div class="text1">联系代理咨询</div>
                <div class="text2">QQ:888888</div>
            </div>
            <div class="list box_shadow2 box_bg_color">
                <div class="item">
                    <div class="item_left">
                        <div class="sign1"></div>
                    </div>
                    <div class="item_right">
                        <div class="title font_color1">代理模式</div>
                        <div class="prefix">代理方可以发展下级代理和下级会员</div>
                        <div class="prefix">7天输赢值模式，周结算</div>
                    </div>
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="sign2"></div>
                    </div>
                    <div class="item_right">
                        <div class="title font_color1">多级代理</div>
                        <div class="prefix">代理无限层级</div>
                        <div class="prefix">可自定义设置下级代理佣金比率</div>
                        <div class="prefix">享受所有下级代理产生的佣金分成</div>
                    </div>
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="sign3"></div>
                    </div>
                    <div class="item_right">
                        <div class="title font_color1">佣金比例</div>
                        <div class="prefix">最低20%，最高50%</div>
                        <div class="prefix">全方位定制化佣金奖励模式</div>
                    </div>
                </div>
                <div class="item">
                    <div class="item_left">
                        <div class="sign4"></div>
                    </div>
                    <div class="item_right">
                        <div class="title font_color1">佣金计算方式</div>
                        <div class="prefix">(周期内输赢值-优惠-平台费-存取手续费）*佣金比例</div>
                        <div class="prefix">佣金累积周期： 周一12:00:00 至 周日 12:00:00</div>
                        <div class="prefix">每周一下午6点之前结算当期佣金</div>
                    </div>
                </div>
            </div>
            <div class="description">
                <router-link to="/program_proxy" tag="div" class="left box_shadow2"><p>代理模式说明</p></router-link>
                <router-link to="/program_commission" tag="div" class="right box_shadow2"><p>佣金详细说明</p></router-link>
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
