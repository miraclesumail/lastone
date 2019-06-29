<template>
    <div class="withdrawal">
        <Header :showCbBtn="true">提款</Header>
        <div class="main_withdrawal">
            <Balance :closeBtn="false"/>
            <div class="box_main_bank box_shadow">
                <div class="bank_info">
                    <div v-if="isBankInfo">
                        <p class="icon_bank" :style="{backgroundImage: `url(${bankIcon})` }"></p>
                        <div class="bank_card">
                            <p>{{bankCnName}}</p>
                            <p>尾号 {{bankCardLastNum}} 储蓄卡</p>
                        </div>
                    </div>
                    <div v-else>
                        <p class="icon_bank"></p>
                        <div class="bank_card">
                            <p>暂无银行卡资料</p>
                        </div>
                    </div>
                    <p class="font_color1">{{isBankInfo ? '修改':'添加'}}</p>
                </div>
                <div class="box_input_amount">
                    <p class="text">提款金额</p>
                    <div class="box_input">
                        <label>￥</label>
                        <input type="text" placeholder="请输入提款金额" v-model="amount" v-va:Number="'amount'">
                    </div>
                </div>
                <div class="main_btn btn_sumbit" @click="submit"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Balance from './c_balance';
import {mapState} from 'vuex'
export default {
    data () {
        return {
            amount:'',
            bankTypeList : [],
            bankCnName: ""
        };
    },

    rules: {
        amount: {
            test: 'required',
            message: '请输入提款金额'
        }
    },

    components: {
        Balance
    },

    created(){
        // if(this.bankInfo && this.bankInfo.bankAccount && this.bankInfo.bankAccountName) {
        //     this.init()
        // } else {
        //     this.msg('你尚未绑定银行卡，请绑定。', 'error')
        //     this.$router.push('/account/bankcard')
        // }

        // this.bankInfo.bankName = 2;
        // this.bankInfo.bankAccount = '62220212121545411'
        //
        // this.bankInfo.bankAccountName = "sdfsdfdsfdf"

        Tool.send('payment', 'getBankTypeList').then(res => {
            if(this.bankInfo && this.bankInfo.bankName){
                res.data.forEach((item)=>{
                    if(item.flag==1 && item.bankTypeId == this.bankInfo.bankName){
                        this.bankCnName = item.name;
                    }
                })
            }
        });
    },

    computed: {
        ...mapState(['bankInfo','localBalance']),
        isBankInfo(){
            return this.bankInfo && this.bankInfo.bankAccount && this.bankInfo.bankAccountName ? true : false
        },
        bankCardLastNum(){
            return this.bankInfo && this.bankInfo.bankAccount ? this.bankInfo.bankAccount.toString().substr(this.bankInfo.bankAccount.toString().length - 4) : ''
        },
        bankIcon(){
            return this.bankInfo && this.bankInfo.bankName ? require('../../assets/images/bank_icon/bank_' + this.bankInfo.bankName + '.png') : ''
        },
        error() {
            return this.$verify.$errors;
        }
    },

    methods: {
        submit(){
            if (!this.$verify.check()) {
                popup.confirm(this.error.amount);
                return;
            }
            if (this.amount < 100 || this.amount > 200000) {
                popup.confirm('提款金额必须大于100，小于20万');
                return;
            }
            Tool.send('partner', 'applyBonus', {
                bonusId: '001',
                amount: parseInt(this.amount),
            }).then(res => {
                popup.confirm('提款成功');
            });
        },
    }
}
</script>
