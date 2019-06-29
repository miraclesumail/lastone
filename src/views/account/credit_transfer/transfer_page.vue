<template>
    <div class="transfer_page">
        <Header :showCbBtn="true">额度转移</Header>
        <div class="single_input_box">
            <div>
                <span>转账账号</span>
                <span>{{showItem.crewAccount}}</span>
            </div>
            <div>
                <span>可转额度</span>
                <span>{{localBalance}}</span>
            </div>
            <div>
                <span>转账金额</span>
                <input type="number" v-model="showItem.amount" placeholder="请输入金额">
            </div>
            <div>
                <span>锁定大厅</span>
                <select v-model="showItem.providerGroupId">
                    <option value="">自由额度</option>
                    <option :value="item.id" v-for="(item,index) in lobbyList" :key="index">{{item.nickName}}</option>
                </select>
            </div>
            <div>
                <span>提款流水</span>
                <input type="number" placeholder="流水倍数" v-model="showItem.spendingTimes">
            </div>
        </div>

        <div class="btn_box" @click="submit"></div>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    export default {
        name: "transfer_page",
        data() {
            return {
                lobbyList:[],
                showItem:null,
            }
        },
        created(){
            this.initData();
        },
        mounted() {
        },
        computed: {
            ...mapState(['localBalance']),
        },
        methods: {
            ...mapActions(['refreshUserInfo']),
            initData() {
                let obj = this.$route.query.showItem;
                if(obj)this.showItem = JSON.parse(obj);
                Tool.send('platform','getLockedLobbyConfig').then(result => {
                    this.lobbyList = result.data;
                });
            },
            submit(){
                let sendData ={
                    targetList:[
                        {
                            username: this.showItem.crewAccount,
                            amount: parseInt(this.showItem.amount),
                            providerGroupId: this.showItem.providerGroupId && parseInt(this.showItem.providerGroupId),
                            spendingTimes: parseInt(this.showItem.spendingTimes)
                        }
                    ]
                }
                Tool.send('partner','partnerCreditToPlayer',sendData).then(result => {
                    popup.confirm('转账成功');
                    this.$router.push('/credittransfer')
                    this.refreshUserInfo();
                })
            }
        }
    }
</script>