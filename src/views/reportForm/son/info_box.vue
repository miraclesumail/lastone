<template>
    <div class="d_info_box">

         <table class="table_b" style="margin: 0rem auto;" v-if="!titleArr.filter(item => item.name == '贡献佣金').length">
            <tr>
                <th v-for="(item,index) in titleArr" :key="index" @click="setOrder(item.name)" :class="arrowClass[index]" style="width:25%">{{item.name}}</th>
            </tr>
            <tr v-for="(item,index) in sjData.list" :key="index" :class="{proxyIndex:proxyIndex}">
                    <td>{{item.crewAccount || item.partnerAccount}}</td>
                    <td v-if="showItem('crewProfit')" >{{item.crewProfit}}</td>
                    <td v-if="showItem('depositAmount')">{{item.depositAmount}}</td>
                    <td v-if="showItem('withdrawAmount')">{{item.withdrawAmount}}</td>
                    <td v-if="showItem('validBet')">{{item.validBet}}</td>
                    <td v-if="showItem('promoAmount')">{{item.promoAmount}}</td>
                    <td v-if="showItem('platformFee')">{{item.platformFee}}</td>
                    <td v-if="showItem('totalDepositWithdrawFee')">{{item.totalDepositWithdrawFee}}</td>
            </tr>
        </table>

        <table class="table_b" style="margin: 0rem auto;" v-if="titleArr.filter(item => item.name == '贡献佣金').length">
            <tr>
                <th v-for="(item,index) in titleArr" @click="setOrder(item.name)" :key="index" :class="arrowClass[index]" style="width:25%">{{item.name}}</th>
            </tr>
            <tr v-for="(item,index) in sjData.list" :key="index" :class="{proxyIndex:proxyIndex}">
                    <td>{{item.partnerAccount}}</td>
                    <td>{{item.commission}}</td>
                    <!-- <li v-if="item.searchInfo" class="searchLogo" @click="$router.push('/myproxydetail')"></li> -->
                    <td class="searchLogo" @click="goToDetail(item)"></td>
            </tr>
        </table>
        <!-- <ul class="title_box">
            <td v-for="(item,index) in titleArr" :key="index" @click="setOrder(item.name)" :class="arrowClass[index]">{{item.name}}</td>
        </ul>

        <ol class="info_box" v-for="(item,index) in sjData.list" :key="index" :class="{proxyIndex:proxyIndex}">
            <td>{{item.crewAccount}}</td>
            <td v-if="showItem('crewProfit')" >{{item.crewProfit}}</td>
            <td v-if="showItem('depositCount')">{{item.depositCount}}</td>
            <td v-if="showItem('withdrawAmount')">{{item.withdrawAmount}}</td>
            <td v-if="showItem('validBet')">{{item.validBet}}</td>
            <td v-if="showItem('promoAmount')">{{item.promoAmount}}</td>
            <td v-if="showItem('platformFee')">{{item.platformFee}}</td>
            <td v-if="showItem('totalDepositWithdrawFee')">{{item.totalDepositWithdrawFee}}</td>
        </ol> -->

        <div class="warning_box">
            <p>注:点击表头可以按升降序排列</p>
            <Pagination @loadPage="loadPage" :totalCount="totalCount" :needToFetch="true"></Pagination>
        </div>
    </div>
</template>

<script>
    import Pagination from  '../../../components/pagination';
    export default {
        name: "info_box",
        data() {
            return {
                paramsName:{
                     crewProfit: '输赢',
                     depositAmount: '存款',
                     withdrawAmount: '提款',
                     validBet: '投注额',
                     promoAmount: '优惠',
                     platformFee: '平台费',
                     totalDepositWithdrawFee: '手续费'
                }
            }
        },
        props: {
            sjData: {
                type: Object,
                default: () => {
                    return [
                        {name: 'dwight01', dep: 11111, wit: 111, win: 500},
                        {name: 'dwight01', dep: 11111, wit: 111, win: 500},
                        {name: 'dwight01', dep: 11111, wit: 111, win: 500},
                        {name: 'dwight01', dep: 11111, wit: 111, win: 500},
                    ]
                }
            },
            proxyIndex:{
                type:Boolean,
                default:false
            },
            selectTime: {
                type: Number
            },
            sortBy: {
                type: Object
            },
            selectMember: {
                type: Number,
                default: () => {
                    return 1
                }
            },
            titleArr:{
                type: Array,
                default: () => {
                    return [
                        {name: '账号'},
                        {name: '存款'},
                        {name: '提款'},
                        {name: '输赢'},
                    ]
                }
            }
        },
        components:{
            Pagination
        },
        computed: {
            arrowClass() {
                return this.titleArr.map(item => {
                      if(this.sortBy.name != item.name)
                          return 'sort_title';
                      else if(this.sortBy.name == item.name && this.sortBy.order == 'up')
                          return 'sort_title up';
                      else 
                          return 'sort_title down';    
                }) 
            },
            totalCount() {
                return this.sjData.stats ? this.sjData.stats.totalCount : 0;
            }
            // currentPage() {
            //     return this.sjData.stats ? this.sjData.stats.currentPage : 1;
            // }
        },
        methods: {
            showItem(name) {
                return this.titleArr.filter(item => this.paramsName[name] == item.name).length > 0;
            },
            goToDetail(item) {
                this.$router.push({name: 'myproxydetail', params: {selectTime: this.selectTime, partnerAccount: item.partnerAccount}})
            },
            loadPage(page) {
                // this.$emit('setProperty', 'page', page);
                let data = {
                    period: this.selectTime,
                    whosePlayer: this.selectMember,
                    playerType: 1,
                    requestPage: page
                }

                data = this.sortBy.name ? {...data, sortType: this.sortBy.name, sort: this.sortBy.order == 'down' ? false : true} : data;
                this.$emit('fetchData', page);
            },
            setOrder(order) {
                if(order == '账户') return;
                this.$emit('setProperty', 'sortBy', order);
            }
        }
    }
</script>