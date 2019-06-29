<template>
    <div class="credit_transfer">
        <Header :showCbBtn="true" :showRight="true">
            额度转移
            <template v-slot:header_right>
                <HeaderRightSlot @onInput="getInfo"></HeaderRightSlot>
            </template>
        </Header>

        <div class="credit_box">
            <span>当前额度</span>
            <span>{{localBalance}}</span>
        </div>

        <div class="table_box">
            <div class="title_top">
                <span>下线会员账号</span>
                <span>转账设置</span>
            </div>

            <ul class="user_info">
                <li v-for="(item,index) in showList" :key="index">
                    <span>{{item.crewAccount}}</span>
                    <span class="gobtn" @click="goTo(item)">去转账</span>
                </li>
            </ul>
        </div>

        <div class="pag_box">
            <Pagination :totalCount="totalCount" :page-count="pageCount" @next="goRightPage" @pre="goRightPage"
                        @jump="goRightPage"></Pagination>
        </div>
    </div>
</template>

<script>
    import HeaderRightSlot from '../../reportForm/son/header_right_slot';
    import Pagination from '../../../components/pagination';
    import {mapState} from 'vuex';

    export default {
        name: "credit_transfer",
        data() {
            return {
                pageCount: 2,
                showList: [],
                startIndex: 0,
                totalCount: 0,
                searchInfo: '',
            }
        },
        components: {
            Pagination, HeaderRightSlot
        },
        computed: {
            ...mapState(['localBalance'])
        },
        mounted() {
            this.initData();
        },
        methods: {
            initData() {
                let sendData = {
                    sortMode: 1,
                    startIndex: this.startIndex,
                    count: this.pageCount,
                };
                // 查询用户时候 精确查询
                if (this.searchInfo !== '') {
                    sendData.crewAccount = this.searchInfo;
                    sendData.singleSearchMode = 0;
                }
                Tool.send('partner', 'checkAllCrewDetail', sendData).then(result => {
                    this.showList = this.setItem(result.data.list);
                    this.totalCount = result.data.totalCount;
                });
            },
            getInfo(info) {
                this.searchInfo = info;
                this.initData();
            },
            goTo(item) {
                this.$router.push({
                    path: '/transferpage',
                    query: {
                        showItem: JSON.stringify(item)
                    }
                })
            },
            setItem(data) {
                let arr = [];
                data.forEach(item => {
                    arr.push({
                        crewAccount: item.crewAccount,
                        amount: '',
                        providerGroupId: '',
                        spendingTimes: '',
                    });
                });
                return arr;
            },
            goRightPage(num) {
                this.startIndex = num;
                this.initData();
            },
        }
    }
</script>