<template>
    <div class="d_myProxy_form">
        <Header :showCbBtn="true" :showRight="true">
            代理报表
            <template v-slot:header_right>
                <HeaderRightSlot :show-detail="true" :selectTime="selectTime" @onInput="searchByName"></HeaderRightSlot>
            </template>
        </Header>
        <!-- <SearchBox :show-member="false" :show-more="false"></SearchBox> -->
        <SearchBox :show-member="false" :show-more="false" :selectTimeArr="selectTimeArr" @selectName="getMenus" @setProperty="setProperty" @fetchData="fetchData"></SearchBox>
        <!-- <InfoBox :titleList="titleList" :sjList="sjList" :proxy-index="true"></InfoBox> -->
        <InfoBox :titleArr="titleList" :sjData="sjData" :proxy-index="true" @setProperty="setProperty" @fetchData="fetchData" :selectTime="selectTime" :sortBy="sortBy"></InfoBox>
        <MemberFee :show-line="false" :memberFeeList="memberFeeList" :oneh="true"></MemberFee>
    </div>
</template>

<script>
    import SearchBox from './son/search_box';
    import InfoBox from './son/info_box';
    import MemberFee from './son/member_fee';
    import HeaderRightSlot from './son/header_right_slot';
    import { mixins } from './mixin';

    export default {
        name: "myProxy_form",
        data(){
            return{
                titleList:[
                    {name:'账号'},
                    {name:'贡献佣金'},
                    {name:'查看明细'},
                ],
                sjList:[
                    {name:'dwight01',gsyj:11111,searchInfo:500},
                    {name:'dwight01',gsyj:11111,searchInfo:500},
                    {name:'dwight01',gsyj:11111,searchInfo:500},
                ],
                memberFeeList:[
                    {name: "新增代理", englishName: 'totalNewPartnerCount', number: 100},
                    {name: "总下线代理", englishName: 'totalPartnerCount', number: 120},
                    {name: "贡献佣金", englishName: 'totalCommission', number: 66},
                ],
                selectTimeArr: [
                    {name: '本期', code:1},
                    {name: '本日', code:2},
                    {name: '本周', code:3},
                    {name: '本月', code:4}
                ],
                // selectMemberArr: [
                //     {name: '全部', code:1},
                //     {name: '新增会员', code:2},
                //     {name: '活跃会员', code:3},
                // ],          
                selectTime: 1   
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
            mockData() {
                let list = Array.from({length: 100}, (item, index) => ({
                      partnerAccount: `e阿西吧${index}`,
                      commission:  Math.random()*66 | 0                            // 存取款手续费 
                }))
                return {
                    status: 200,
                    stats: {
                          "totalCount": 100,
                          "currentPage": 1,
                          "totalPage": 10
                    },
                    list
                }
            },
            init(name='', resetPage=false) {
                if(resetPage) {
                    eventBus.$emit('trigger', 1); 
                    this.page = 1;
                }
                let data = name ? {
                     period: this.selectTime,
                     partnerType: 1,
                     partnerAccount: name,
                     requestPage: this.page
                } : {
                     period: this.selectTime,
                     partnerType: 1,
                     requestPage: this.page
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
                ws.partner.getDownLinePartnerInfo(data).then(res => {
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