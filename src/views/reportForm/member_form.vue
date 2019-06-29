<template>
    <div class="d_member_form">
        <Header :showCbBtn="true" :showRight="true">
            直属会员报表
            <template v-slot:header_right>
                <HeaderRightSlot @onInput="searchByName"></HeaderRightSlot>
            </template>
        </Header>
        <!-- <SearchBox @selectName="titleName"></SearchBox> -->
        <SearchBox :selectTimeArr="selectTimeArr" :selectMemberArr="selectMemberArr" @selectName="getMenus" @setProperty="setProperty" @fetchData="fetchData"></SearchBox>
        <!-- <InfoBox :titleArr="titleArr"></InfoBox> -->
        <InfoBox :titleArr="titleArr" :sjData="sjData" @setProperty="setProperty" @fetchData="fetchData" :selectTime="selectTime" :selectMember="selectMember" :sortBy="sortBy"></InfoBox>
        <MemberFee :memberFeeList="memberFeeList"></MemberFee>
    </div>
</template>

<script>
    import SearchBox from './son/search_box';
    import InfoBox from './son/info_box';
    import MemberFee from './son/member_fee';
    import HeaderRightSlot from './son/header_right_slot';
    import { mixins } from './mixin';

    export default {
        name: "member_form",
        data(){
            return{
                memberFeeList: [
                        {name: "新开户", englishName: 'totalNewPlayerCount', number: 10},
                        {name: "有效会员", englishName: 'totalValidCrewPlayer', number: 110},
                        {name: "总存款", englishName: 'totalDepositAmount', number: 10},
                        {name: "总提款", englishName: 'totalWithdrawAmount', number: 20},
                        {name: "优惠额", englishName: 'totalPromoAmount', number: 30},
                        // {name: "有效投注", englishName: 'totalvalidBet', number: 40},
                        {name: "输赢金额", englishName: 'totalCrewProfit', number: 50},
                        {name: "平台费", englishName: 'totalPlatformFee', number: 60},
                        {name: "手续费", englishName: 'totalDepositWithdrawFee', number: 70}
                ],    
                selectTime: 1,
                selectTimeArr: [
                    {name: '本日', code:1},
                    {name: '本周', code:2},
                    {name: '本月', code:3}
                ],
                selectMemberArr: [
                    {name: '全部', code:1},
                    {name: '新增会员', code:2},
                    {name: '活跃会员', code:3},
                ],
            }
        },
        mixins: [mixins],
        components:{
            SearchBox,
            InfoBox,
            MemberFee,
            HeaderRightSlot
        },
        methods:{
            titleName(arr){
                this.titleArr = arr;
            },
            mockData() {
                let list = Array.from({length: 130}, (item, index) => ({
                      crewAccount: `eteddst${index}`,
                      crewRegisterTime: "2018-08-06T01:02:08.957Z",
                      crewLastLoginTime: '',
                      crewProfit: -300 + Math.random()*500 | 0,                                                   // 输赢金额
                      depositCount: -300 + Math.random()*500 | 0,                                               // 存款金额     ***开发留言：更改depositAmount字段，金额用Amount比较合适
                      withdrawAmount: -300 + Math.random()*500 | 0,                                    // 提款金额
                      validBet: 300 + Math.random()*500 | 0,                                                      // 有效投注额
                      promoAmount:  -300 + Math.random()*500 | 0,                                        // 优惠金额
                      platformFee:   300 + Math.random()*500 | 0,                                                // 平台手续费
                      totalDepositWithdrawFee: 300 + Math.random()*500 | 0                            // 存取款手续费 
                }))

                return {
                    status: 200,
                    stats: {
                          "totalCount": 130,
                          "currentPage": 1,
                          "totalPage": 10
                    },
                    list
                }
            },
            // 获取初始数据
            init(name='', resetPage=false) {
                if(resetPage) {
                    eventBus.$emit('trigger', 1); 
                    this.page = 1;
                }
                // 判断sortBy 
                let data = name ? {
                    period: this.selectTime,
                    whosePlayer: 1,
                    playerType: this.selectMember,
                    requestPage: this.page,
                    count: 2,
                    crewAccount: name
                } : {
                    period: this.selectTime,
                    whosePlayer: 1,
                    playerType: this.selectMember,
                    requestPage: this.page,
                    count: 2
                }

                if(!Object.keys(this.sortBy).length)
                    data = data;
                else {
                    const { name, order } = this.sortBy;
                    const sortIndex = this.sortTypes.indexOf(name) + 1;
                    const flag = order == 'up' ? true : false;
                    data = {
                        ...data,
                        sortType: sortIndex,
                        sort: flag
                    }
                }    
                ws.partner.getDownLinePlayerInfo(data).then(res => {
                      this.sjData = {
                          list: res.data.list,
                          stats: {
                                totalCount: res.data.stats.totalCount,
                                currentPage: res.data.stats.currentPage,
                                totalPage: res.data.stats.totalPage
                          }
                      }

                      this.memberFeeList = this.memberFeeList.map(item => (
                          {...item, number: res.data.stats[item.englishName]}
                      ))
                })
            }
        }
    }
</script>