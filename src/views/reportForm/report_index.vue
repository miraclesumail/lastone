<template>
    <div class="d_report_index">
        <Header :showLogo="true" :showEmail="true"/>
        <ul class="report_list">
            <router-link :to='item.routerPath' tag="li" v-for="(item,index) in reportList" :key="index"></router-link>
        </ul>
        <div class="info_show">
            <div class="title_bg member_num"></div>
            <div class="info_box">
                <div class="left">
                    <span>下线会员</span>
                    <span><em>{{totalInfo.downLinePlayerCount}}</em><i>人</i></span>
                </div>
                <div class="line"></div>
                <div class="right">
                    <span>下线代理</span>
                    <span><em>{{totalInfo.downLinePartnerCount}}</em><i>人</i></span>
                </div>
            </div>

            <div class="title_bg agent_num"></div>

            <div class="info_box">
                <div class="left">
                    <span>下线会员</span>
                    <span><em>{{totalInfo.downLinePlayer}}</em></span>
                </div>
                <div class="line"></div>
                <div class="right">
                    <span>代理会员</span>
                    <span><em>{{totalInfo.downLinePartnerPlayer}}</em></span>
                </div>
            </div>

            <div class="title_bg zb_num"></div>
            <ProgressCircle :percent="percent"></ProgressCircle>

            <div class="info_box te">
                <p>有效会员: <span>存款x次，金额x元以上</span> </p>
                <p>总会员数: <span>包含下线代理的会员及直属下线会员总数</span> </p>
            </div>

        </div>
    </div>
</template>

<script>
    import ProgressCircle from '../../components/progess_circle'
    export default {
        name: "report_index",
        data(){
            return{
                reportList:[
                    {name:'总报表',routerPath:'/allform'},
                    {name:'直属会员报表',routerPath:'/memberform'},
                    {name:'下级代理报表',routerPath:'/myproxyform'},
                ],
                totalInfo: {
                    downLinePlayerCount: '',
                    downLinePartnerCount: '',
                    downLinePlayer: '',
                    downLinePartnerPlayer: ''
                },
                percent: 0
            }
        },
        components:{
            ProgressCircle
        },
        created() {
            ws.partner.getPartnerTotalInfo().then(res => {
                  this.totalInfo = {
                      downLinePlayerCount: res.data.stats.downLinePlayerCount,
                      downLinePartnerCount: res.data.stats.downLinePartnerCount,
                      downLinePlayer: res.data.stats.crewProfitTotal.downLinePlayer,
                      downLinePartnerPlayer: res.data.stats.crewProfitTotal.downLinePartnerPlayer
                  }

                  this.percent = res.data.stats.downLinePlayerValid/res.data.stats.downLinePlayerCount*100;
            })

        //       "stats": {
        //      "downLinePlayerCount":  1000,                      // 下线会员人数（直属会员）
        //       downLinePartnerPlayerCount:   1000            // 下线代理会员人数 （全部会员）
        //      "downLinePartnerCount": 100,                       // 下线代理人数  （全部代理）
        //       downLinePlayerValid:  666,                         // 下线有效会员人数 （直属）
        //       downLinePartnerPlayerValid: 10,               // 下线代理会员有效人数  （全部下线除了直属）
        //       crewProfitTotal: {
        //            downLinePlayer:   100000,                      // 下线会员输赢值 （直属）
        //            downLinePartnerPlayer:  1000                // 下线代理会员输赢值 （全部除了直属）
        //       }
        //  }
        }
    }
</script>