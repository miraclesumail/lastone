<template>
    <div class="d_myProxy_detail">
        <Header :showCbBtn="true" :showRight="true">
            代理报表
            <template v-slot:header_right>
                <HeaderRightSlot :show-yj="true" @onInput="searchByName"></HeaderRightSlot>
            </template>
        </Header>
        <SearchBox :selectTimeArr="selectTimeArr" :selectMemberArr="selectMemberArr" @selectName="getMenus" @setProperty="setProperty" @fetchData="fetchData" :defaultSelectTime="selectTime"></SearchBox>
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
        name: "d_myProxy_detail",
        data(){
            return{
               memberFeeList: [
                        {name: "新增代理", englishName: 'totalNewPartnerCount', number: 30},
                        {name: "总下线代理", englishName: 'totalPartnerCount', number: 110},
                        {name: "总存款", englishName: 'totalDepositAmount', number: 10},
                        {name: "总提款", englishName: 'totalWithdrawAmount', number: 20},
                        {name: "优惠额", englishName: 'totalPromoAmount', number: 30},
                        {name: "输赢金额", englishName: 'totalCrewProfit', number: 50},
                        {name: "平台费", englishName: 'totalPlatformFee', number: 60},
                        {name: "手续费", englishName: 'totalHandlingFee', number: 70}
                ],    
                selectTimeArr: [
                    {name: '本日', code:1},
                    {name: '本周', code:2},
                    {name: '本月', code:3}
                ],
                /**
                 *  进入该页面   先判断router参数  partnerAccount  selectTime
                 *  searchBox   里面修改了selectTime  以后发送请求就用 anotherSelectTime
                 */
                anotherSelectTime:''
            }
        },
        mixins: [mixins],
        components:{
            SearchBox,
            InfoBox,
            MemberFee,
            HeaderRightSlot
        },
        computed: {
            partnerAccount() {
                return this.$route.params.partnerAccount || '';
            },
            selectTime: {
                get: function() {
                     return this.$route.params.selectTime - 1 || 1;
		        },
                set: function(newValue) {
                     console.log(newValue, '你是说四十');
                }
            },
            selectMemberArr() {
                return this.$route.params.partnerAccount ?  [
                    {name: '全部', code:1}
                ]:[
                    {name: '全部', code:1},
                    {name: '新增', code:2}
                ] ;
            }
        },
        methods: {
            setProperty(key, val) {
            // 排序
                if(key == 'sortBy') {
                    if(!this.sortBy.name) {
                        this.sortBy = {name: val, order: 'down'};
                    } else if(this.sortBy.name == val && this.sortBy.order == 'down'){  
                        this.sortBy = {name: val, order: 'up'}
                    } else {
                        this.sortBy = {name: val, order: 'down'}
                    }
                } else {
                       if(key == 'selectTime') 
                          this.anotherSelectTime = val;
                       else
                          this[key] = val;   
                }
            },
            // 获取初始数据  没有sortBy
            init(name='', resetPage=false) {
                if(resetPage) {
                    eventBus.$emit('trigger', 1); 
                    this.page = 1;
                }
                name && (this.partnerAccount = name);
                
                let data = this.partnerAccount ? {
                    period: this.anotherSelectTime || this.selectTime,  // selectTime 只会在首次请求的时候用到
                    partnerType: this.selectMember,
                    partnerAccount: this.partnerAccount,
                    requestPage: this.page
                } : {
                    period: this.anotherSelectTime || this.selectTime,
                    partnerType: this.selectMember,
                    requestPage: this.page
                }

                // 判断sortBy 
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
        },
        watch: {
            anotherSelectTime(next, prev) {
                eventBus.$emit('trigger', 1); 
                this.page = 1;
                if(Object.keys(this.sortBy).length)
                    this.sortBy = {}
                else
                    this.init();   
            }
        }
    }
</script>