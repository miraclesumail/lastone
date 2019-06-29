<template>
    <div class="program">
        <Header :showCbBtn="true" class="header">佣金详细说明</Header>
        <div class="content">
            <div class="item1 box_bg_color box_shadow2">
                <p class="prefix">您的佣金由直属下线会员佣金与下级代理佣金组成；</p>
                <p class="prefix">代理的直属下线会员佣金按照网站（直属下线佣金比例）分给的比例获得佣金，上级代理按照（下级代理佣金比例）抽取分成；</p>
                <p class="prefix">上级代理可自定义下一级代理的代理佣金比例；</p>
                <p class="prefix">代理佣金20%高起点，最高50%；</p>
                <p class="prefix">根据与网站的代理经理达成的协议，达到对应条件即可晋升佣金比例；</p>
                <p class="prefix">可根据您的具体情况定制不同的合作方案，实行全方位定制化佣金奖励模式。</p>
            </div>
            <div class="item2">
                <div class="left box_shadow2"><p>直属下线佣金比例</p></div>
                <div class="right box_shadow2"><p>下线代理佣金比例</p></div>
            </div>
            <div class="item3 box_bg_color box_shadow2">
                <div class="title">真人 · 体育 · 彩票 · 捕鱼</div>
                <table class="table_b">
                    <tr>
                        <th colspan="2">输赢值</th>
                        <th colspan="2">活跃人数</th>
                        <th colspan="3" rowspan="2">佣金比例<br/>(仅供参考)</th>
                    </tr>
                    <tr>
                        <th>最小值<br/>(仅供参考)</th>
                        <th>最大值</th>
                        <th>最小值<br/>(仅供参考)</th>
                        <th>最大值</th>
                    </tr>
                    <tr>
                        <td>0</td><td>-</td><td>2</td><td>-</td><td>20%</td>
                    </tr>
                    <tr>
                        <td>30000</td><td>-</td><td>2</td><td>-</td><td>22%</td>
                    </tr>
                    <tr>
                        <td>50000</td><td>-</td><td>5</td><td>-</td><td>23%</td>
                    </tr>
                    <tr>
                        <td>200000</td><td>-</td><td>5</td><td>-</td><td>24%</td>
                    </tr>
                </table>
                <div class="title">电子 · 棋牌</div>
                <table class="table_b">
                    <tr>
                        <th colspan="2">输赢值</th>
                        <th colspan="2">活跃人数</th>
                        <th colspan="3" rowspan="2">佣金比例<br/>(仅供参考)</th>
                    </tr>
                    <tr>
                        <th>最小值<br/>(仅供参考)</th>
                        <th>最大值</th>
                        <th>最小值<br/>(仅供参考)</th>
                        <th>最大值</th>
                    </tr>
                    <tr>
                        <td>0</td><td>-</td><td>2</td><td>-</td><td>20%</td>
                    </tr>
                    <tr>
                        <td>30000</td><td>-</td><td>2</td><td>-</td><td>22%</td>
                    </tr>
                    <tr>
                        <td>50000</td><td>-</td><td>5</td><td>-</td><td>23%</td>
                    </tr>
                    <tr>
                        <td>200000</td><td>-</td><td>5</td><td>-</td><td>24%</td>
                    </tr>
                </table>
            </div>
            <div class="item4 box_bg_color box_shadow2">
                <div><span class="title">注：</span></div>
                <div><span>输赢值:</span>所有下线用户（包括直属下线会员+下级代理线下会员）投注记录输赢总计；</div>
                <div><span>活跃会员:</span>周期内充值X笔XX元以上，投注XX笔投注额达到XX以上；</div>
                <div><span>有效会员:</span>充值X笔XX元以上，投注X笔投注额XX以上；</div>
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
