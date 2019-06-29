<template>
    <div class="commission_index">
        <Header :showLogo="true" :showEmail="true"></Header>
        <div class="main_commission">
            <Balance />
            <div class="page_info box_shadow">
                <div class="box_top_page_info">
                    <div class="commission_info">
                        <p class="text ci_text">预计佣金</p>
                        <p><span class="ci_insignia">￥</span>99999999</p>
                    </div>
                    <div class="show_info" @click="showReceipt">查看明细</div>
                </div>
                <div class="box_total">
                    <div>
                        <p class="total_name highest">最高</p>
                        <p>3000.00</p>
                    </div>
                    <div>
                        <p class="total_name lowest">最低</p>
                        <p>3000.00</p>
                    </div>
                    <div>
                        <p class="total_name total">总数</p>
                        <p>3000.00</p>
                    </div>
                    <div>
                        <p class="total_name average">平均</p>
                        <p>3000.00</p>
                    </div>
                </div>
                <div class="box_chart">
                    <p class="text">近期佣金走势</p>
                    <div id="commission_areaspline"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Balance from './c_balance';
export default {
    data () {
        return {
        };
    },

    mounted() {
        this.tabInit();
    },

    components: {
        Balance
    },

    computed: {},

    methods: {
        tabInit () {
            let options = {
                chart: {
                    type: 'areaspline',
                    backgroundColor: 'transparent'
                },
                title:{
                    style: {
                        display: 'none'
                    }
                },
                xAxis: {
                    lineColor: '#daa83e',   // X坐标轴颜色
                    lineWidth: 2,           // X坐标轴宽度
                    gridLineWidth: 0,
                    gridLineColor: 'rgba(255, 255, 255, 0.2)',
                    // tickColor: '#ddaf44',
                    categories: ['2018-05-23', '2018-05-24', '2018-05-25', '2018-05-26', '2018-05-27', '2018-05-28', '2018-05-29'],
                    labels: {                                           // X周标签文字配置
                            formatter: function () {
                                let date = new Date(this.value);
                                let texts = [(date.getMonth() + 1), date.getDate()];
                                if (this.isFirst) {
                                    texts.unshift(date.getFullYear());
                                }
                                return texts.join('/');
                            },
                        style: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    lineColor: '#395266',
                    gridLineColor: 'rgba(255, 255, 255, 0.2)',
                    gridLineWidth: 1,
                    title: {
                        enabled: false
                    },
                    labels: {
                        style: {
                            color: '#fff'
                        }
                    }
                },
                tooltip: {                      // 点击后展示数据提示配置
                        shared: true,
                        valueSuffix: '元'
                },
                legend: {                       // 图例配置
                    enabled: false,
                },
                plotOptions: {                  // 填充区域颜色配置
                    series: {
                        fillColor: {
                            linearGradient: [0, 0, 0, 300],
                            stops: [
                                [0, 'rgba(218, 167, 62, .3)'],
                                [1, 'rgba(18, 18, 17, .1)']
                            ]
                        }
                    }
                },
                series: [{
                    name: '输赢额度',
                    color: '#daa73e',
                    data: [820, 932, 901, -934, 10000, -1330, 1320],
                }],
                credits: {
                    enabled: false
                }
            }
            Highcharts.chart(document.getElementById('commission_areaspline'), options);
        },

        showReceipt() {
            popup.commissionInfo('111');
        }
    }
}
</script>