<template>
    <div class="home_index">
        <Header :showLogo="true" :showEmail="true" :showLogin="true"/>
        <div class="main_home">
            <swiper :options="swiperOption" class="banner" ref="mySwiper">
                <!-- slides -->
                <swiper-slide v-for="(val, key) in swiperList" :key="key">
                    <img :src="val.imgUrl" @click="pzOpen(val)">
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination"  slot="pagination"></div>
                <!-- <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div> -->
                <div class="swiper-scrollbar"   slot="scrollbar"></div>
            </swiper>
            <Notice/>
            <div class="hot">
                <router-link tag="div" to="/program" class="hot_fangan"></router-link>
                <router-link tag="div" to="/cooperation" class="hot_hezuo"></router-link>
                <router-link tag="div" to="/leaderboard" class="hot_paihang"></router-link>
                <router-link tag="div" to="/download" class="hot_xiazai"></router-link>
            </div>
            <div class="statistics">
                <div class="statistics_title"></div>
            </div>
            <!-- 折线图 -->
            <div class="areaspline_ctr">
                <div>
                    <div>
                        <select class="select_data_list" v-model="selectData" >
                            <option v-for="(item,index) in selectDataList" :key="index" :value="item.code">{{item.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <select class="select_type_list" v-model="selectType">
                            <option v-for="(item,index) in selectTypeList" :key="index" :value="item.type">{{item.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div id="home_areaspline"></div>
            <div class="box_line"></div>
            <div class="foot">
                <router-link tag="div" to="/pagcor" class="foot_1_1 foot_zizhi"></router-link>
                <div class="foot_1_2">
                    <div class="foot_2_1">
                        <router-link tag="div" to="/join" class="foot_3_1 foot_xieyi"></router-link>
                        <router-link tag="div" to="/collection" class="foot_3_2 foot_daili"></router-link>
                    </div>
                    <div class="foot_2_2">
                        <router-link tag="div" to="/" class="foot_3_3 foot_guanwang"></router-link>
                        <router-link tag="div" to="/download" class="foot_3_4 foot_app"></router-link>
                        <router-link tag="div" to="/about" class="foot_3_5 foot_guanyu"></router-link>
                    </div>
                </div>
            </div>
        </div>
        <!--<SelectDialog :opentionList="selectList" v-if="showSelectOption" @closeDialog="closeSelectOption" @confirm="submitSelect"/>-->
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapState} from 'vuex';
import Notice from './notice'

function mockData(type) {
    if(type == 1) {
        return Array.from({length:24}, (item , index) => (
            {
                activeCrewCount: 30 + Math.random()*50, crewProfit: 30 + Math.random()*30, date: new Date(new Date().getTime() - 24*3600*1000).format('yyyy-MM-dd') + 'T16:00:00.000Z',
                depositCount: 30 + Math.random()*50, newPlayerCount: 50 + Math.random()*50, promoAmount: 40 + Math.random()*50, validBet: 10 + Math.random()*50, withdrawAmount: 30 + Math.random()*50
            }
        ))
    }else if(type == 2) {
        return Array.from({length:7}, (item , index) => (
            {
                activeCrewCount: 30 + Math.random()*50, crewProfit: 30 + Math.random()*30, date: new Date(new Date().getTime() - 24*3600*1000).format('yyyy-MM-dd') + 'T16:00:00.000Z',
                depositCount: 30 + Math.random()*50, newPlayerCount: 50 + Math.random()*50, promoAmount: 40 + Math.random()*50, validBet: 10 + Math.random()*50, withdrawAmount: 30 + Math.random()*50
            }
        ))
    } else {
        return Array.from({length:30}, (item , index) => (
            {
                activeCrewCount: 30 + Math.random()*50, crewProfit: 30 + Math.random()*30, date: '2019-05-31T16:00:00.000Z',
                depositCount: 30 + Math.random()*50, newPlayerCount: 50 + Math.random()*50, promoAmount: 40 + Math.random()*50, validBet: 10 + Math.random()*50, withdrawAmount: 30 + Math.random()*50
            }
        ))
    }
}

export default {
    name: 'home',
    data () {
        return {
            swiperList: [],
            showSelectOption: false,
            swiperOption: {
				autoplay: {
                    disableOnInteraction: false,   // 触摸后不停止自动播放
                },
            },
            period: {
                name: '日',
                code: 1
            },
            sortMode: {
                name: '新增会员',
                functionName: 'newPlayerCount'
            },
            selectTitleType: 0,
            selectList: [],
            dateList: [],        // 时间数组，用于折线图X轴
            valueList: [],
            selectDataList:[
                {
                    name: '日',
                    code: 1
                },
                {
                    name: '周',
                    code: 2
                },
                {
                    name: '月',
                    code: 3,
                    // pointStart: Date.UTC(2019, 5, 1),
                    // pointInterval:  36e5 * 24   // one day
                }
            ],
            selectTypeList:[
                {
                    name: '新增会员',
                    type: 1
                },
                {
                    name: '活跃会员',
                    type: 2
                },
                {
                    name: '输赢',
                    type: 3
                },
                {
                    name: '存款',
                    type: 4
                },
                {
                    name: '提款',
                    type: 5
                },
                {
                    name: '投注额',
                    type: 6
                },
                {
                    name: '优惠',
                    type: 7
                }
            ],
            selectData: 1,
            selectType: 1,
            tabInitData: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 30.5, 108.2],
            tabInitPointStart: Date.UTC(2019, 5, 13),
            tabInitPointInterval:  3600 * 1000
        };
    },
    mounted() {
        // 获取轮播图信息
        Tool.getFrontEndData(23).then(data => {
            console.log(data);
			const list = data.list;
			if (list.length > 0){
				this.swiperList = list[0].games;
			}
        });
        // 默认 日 新增会员
        this.getTabData(1, 1);     
    },
    components: {
        swiper,
        swiperSlide,
        Notice
    },
    computed: {
        ...mapState(['isLogin'])
    },
    methods: {
        getTabData(period, sortMode) {
            if(Tool.getSession('partnerId')) {
                Tool.send('partner', 'getDownLinePlayerTimeSequence', {
                period,
                sortMode
            }, false).then(res => {
                let resList = res.data.list;
                this.processData(period, sortMode, resList);
                // let list = [];
                // let pointInterval = '';
                // let fieldList = ['newPlayerCount', 'activeCrewCount', 'crewProfit', 'depositCount', 'withdrawAmount', 'validBet', 'promoAmount'];
                // let startDate = new Date(resList[0].date);
                // let pointStart = Date.UTC(startDate.format('yyyy'), startDate.format('MM') - 1, startDate.format('dd'));
                // if (period === 1) {
                //     pointInterval = 3600 * 1000;
                // } else {
                //     pointInterval = 3600 * 1000 * 24;
                // }
                // resList.map(item => {
                //     list.push(item[fieldList[sortMode - 1]]);
                // });
                // this.tabInit(list, pointStart, pointInterval);
                });
            } else {
                this.processData(period, sortMode, null);
            }    
        },
        processData (period, sortMode, resList) {
                resList = resList ? resList : mockData(period);
                let list = [];
                let pointInterval = '';
                //let fieldList = ['depositCount', 'withdrawAmount', 'crewProfit', 'validBet', 'newPlayerCount', 'activeCrewCount', 'promoAmount'];
                let fieldList = ['newPlayerCount', 'activeCrewCount', 'crewProfit', 'depositCount', 'withdrawAmount', 'validBet', 'promoAmount'];
                let startDate = new Date(resList[0].date);
                let pointStart = Date.UTC(startDate.format('yyyy'), startDate.format('MM') - 1, startDate.format('dd'));
                if (period === 1) {
                    pointInterval = 3600 * 1000;
                } else {
                    pointInterval = 3600 * 1000 * 24;
                }
                resList.map(item => {
                    list.push(item[fieldList[sortMode - 1]]);
                });
                this.tabInit(list, pointStart, pointInterval);       
        },
        tabInit (data, pointStart, pointInterval) {
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
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        day: '%m-%e'
                    },
                    lineColor: '#daa83e',   // X坐标轴颜色
                    lineWidth: 2,           // X坐标轴宽度
                    gridLineWidth: 0,
                    gridLineColor: 'rgba(255, 255, 255, 0.2)',
                    // tickColor: '#ddaf44',
                    // categories: ['2018-05-23', '2018-05-24', '2018-05-25', '2018-05-26', '2018-05-27', '2018-05-28', '2018-05-29'],
                    // categories: this.dateList,
                    labels: {                                           // X周标签文字配置
                        formatter: function () {
                            console.log(this)
                            if (this.tickPositionInfo.unitName === 'hour') {
                                return new Date(this.value - 8*3600*1000).format('hh:mm');
                            } else {
                                return new Date(this.value - 8*3600*1000).format('MM-dd');
                            }
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
                    // name: '输赢额度',
                    color: '#daa73e',
                    data,
                    // data: this.valueList,
                    pointStart,
                    pointInterval
                }],
                credits: {
                    enabled: false
                }
            }
            Highcharts.chart(document.getElementById('home_areaspline'), options);
        },
        submitSelect(index) {
            // let data = {};
            if (this.selectTitleType) {
                this.period = this.selectList[index];
            } else {
                this.sortMode = this.selectList[index];
            }
            // this.dateList = [];
            // this.valueList = [];
            // ws.partner[this.sortMode.functionName]({
            //     period: this.period.code,
            //     circleTimes: 7,
            //     startIndex: 0
            // }).then(res => {
            //     let _data = res.data;
            //     _data.map(item => {
            //         this.dateList.push(new Date(item.date).format('yyyy-MM-dd'));
            //         this.valueList.push(item.activeCrewNumbers);
            //     });
            //     this.tabInit();
            // });
        }
    },
    watch: {
        selectData: function (newVal, oldVal) {
              const type = this.selectType ? this.selectType : this.selectTypeList.filter(item => item.name == this.sortMode.name)[0].type;
              this.period = this.selectDataList[newVal - 1];
              this.getTabData(newVal, type);
        },
        selectType: function (newVal, oldVal) {
              const code = this.selectData ? this.selectData : this.period.code;
              this.sortMode = this.selectTypeList[newVal - 1];
              this.getTabData(code, newVal)
        }
    }
}
</script>