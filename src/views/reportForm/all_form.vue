<template>
    <div class="d_all_form">
        <Header :showCbBtn="true" :showRight="true">
            总报表
            <template v-slot:header_right>
                <HeaderRightSlot @onInput="searchByName"></HeaderRightSlot>
            </template>
        </Header>
        <SearchBox @selectName="getMenus" @setProperty="setProperty" @fetchData="fetchData" :selectTimeArr="selectTimeArr" :selectMemberArr="selectMemberArr"></SearchBox>
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
        name: "allForm",
        data(){
            return{
                selectTime: 1,
                selectTimeArr: [
                    {name: '本日', code:1},
                    {name: '本周', code:2},
                    {name: '本月', code:3}
                ],
                selectMemberArr: [
                    {name: '全部', code:1},
                    {name: '直属下线会员', code:2},
                    {name: '下线代理会员', code:3},
                ],
                memberFeeList: [
                        {name: "新开户", englishName: 'totalNewPlayerCount', number: ''},
                        {name: "有效会员", englishName: 'totalValidCrewPlayer', number: ''},
                        {name: "总存款", englishName: 'totalDepositAmount', number: ''},
                        {name: "总提款", englishName: 'totalWithdrawAmount', number: ''},
                        {name: "优惠额", englishName: 'totalPromoAmount', number: ''},
                        // {name: "有效投注", englishName: 'totalvalidBet', number: 40},
                        {name: "输赢金额", englishName: 'totalCrewProfit', number: ''},
                        {name: "平台费", englishName: 'totalPlatformFee', number: ''},
                        {name: "手续费", englishName: 'totalDepositWithdrawFee', number: ''}
                ]
            }
        },
        mixins: [mixins],
        components:{
            SearchBox,
            InfoBox,
            MemberFee,
            HeaderRightSlot
        },
        methods: {
            // 获取初始数据
            init(name='', resetPage=false) {
                if(resetPage) {
                    eventBus.$emit('trigger', 1); 
                    this.page = 1;
                }
                
                // 判断sortBy 
                let data = name ? {
                    period: this.selectTime,
                    whosePlayer: this.selectMember,
                    playerType: 1,
                    requestPage: this.page,
                    count: 2,
                    crewAccount: name 
                } : {
                    period: this.selectTime,
                    whosePlayer: this.selectMember,
                    playerType: 1,
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