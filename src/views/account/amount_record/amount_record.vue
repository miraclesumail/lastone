<template>
    <div class="amount_record">
        <Header :showCbBtn="true" :showRight="true">额度记录</Header>
        <div class="single_input_box date_box">
            <div>
                <span>开始时间</span>
                <input type="datetime-local" v-model="startDateTime"/>
            </div>
            <div>
                <span>结束时间</span>
                <input type="datetime-local" v-model="endDateTime">
            </div>

            <div>
                <span>提案类型</span>
                <select v-model="searchType">
                    <option v-for="(item,index) in searchTypeList" :key="index" :value="item.id">{{item.name}}</option>
                </select>
            </div>
        </div>

        <div class="warning">
            <span>温馨提示：</span>
            系统只保留近14天的额度记录
        </div>
        <div class="btn_box" @click="submit"></div>
        <Tab2 v-if="(this.searchType == 2 ||this.searchType == 1) && commissionProposalList.length !== 0" :show-list="commissionProposalList"></Tab2>
        <Tab3 v-if="(this.searchType == 3 ||this.searchType == 1) && bonusRequestList.length !== 0" :show-list="bonusRequestList"></Tab3>
        <Tab4 v-if="(this.searchType == 4 ||this.searchType == 1) && transferList.length !== 0" :show-list="transferList" :transferArr="transferArr"></Tab4>
    </div>
</template>

<script>
    import Tab4 from './tab4';
    import Tab3 from './tab3';
    import Tab2 from './tab2';

    export default {
        name: "amount_record",
        data() {
            return {
                startDateTime: '',
                endDateTime: '',
                searchType: 1,
                pageCount:1,
                searchTypeList: [
                    {
                        id: 1,
                        name: '全部'
                    },
                    {
                        id: 2,
                        name: '佣金'
                    },
                    {
                        id: 3,
                        name: '提款'
                    },
                    {
                        id: 4,
                        name: '转账'
                    }
                ],
                transferList: [],
                transferArr: [],
                bonusRequestList: [],
                commissionProposalList:[],
                allowCancellation: ['Pending', 'AutoAudit', 'CsPending'],
            }
        },
        components: {
            Tab4,
            Tab3,
            Tab2
        },
        mounted() {
            this.initData();
        },
        methods: {
            initData() {
                let date = new Date();
                let today = new Date();
                let ago = date.setDate(date.getDate() - 2);
                this.startDateTime = new Date(ago).format('yyyy-MM-dd') + 'T00:00';
                this.endDateTime = new Date(today).format('yyyy-MM-dd') + 'T23:59';
            },

            //转账记录
            getPartnerTransferList() {
                let sendData = {
                    startTime: this.startDateTime,
                    endTime: this.endDateTime,
                }
                Tool.send('partner', 'getPartnerTransferList', sendData).then(result => {
                    this.transferArr = result.data.list;
                    result.data.list.map(item => {
                        item.transferList.map(item => {
                            this.transferList.push(item);
                        })
                    });
                    if (this.transferList.length === 0) popup.confirm('暂无记录');
                });
            },
            // 提款记录
            getBonusRequestList() {
                let sendData = {
                    startTime: this.startDateTime,
                    endTime: this.endDateTime,
                }
                Tool.send('partner', 'getBonusRequestList', sendData).then(result => {
                    console.log(result, 'result')
                    this.bonusRequestList = result.data.records;
                    if (this.bonusRequestList.length === 0) popup.confirm('暂无记录');
                })
            },
            // 佣金记录
            getCommissionProposalList(){
                let sendData={
                    startTime: this.startDateTime,
                    endTime: this.endDateTime,
                }
                Tool.send('partner','getCommissionProposalList',sendData).then(result => {
                    if (result.data.length === 0) popup.confirm('暂无记录');
                    this.commissionProposalList = result.data;
                });
            },
            submit() {
                if ((new Date().valueOf() / 1000 / 60 / 60 / 24) - (new Date(this.startDateTime).valueOf() / 1000 / 60 / 60 / 24) > 15) {
                    popup.confirm('您输入的起止时间应该在14天以内');
                    return;
                }
                if (this.searchType === 1) {
                    this.getPartnerTransferList();
                    this.getBonusRequestList();
                    this.getCommissionProposalList();
                }else if (this.searchType === 2) {
                    this.getCommissionProposalList();
                } else if (this.searchType === 3) {
                    this.getBonusRequestList();
                } else if (this.searchType === 4) {
                    this.getPartnerTransferList();
                }
            }
        }
    }
</script>