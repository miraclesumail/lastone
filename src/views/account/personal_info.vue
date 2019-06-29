<template>
    <div class="personal_info">
        <Header :showCbBtn="true">个人资料</Header>
        <div class="main_personal_info">
            <p class="s_font2 title_font">个人资料</p>
            <ul class="box_title_item">
                <li class="title_item">
                    <span>代理账号</span>
                    <span class="title_item_cont_1" v-text="username"></span>
                </li>
                <router-link to="/updatephone" tag="li" class="title_item">
                    <span>联系电话</span>
                    <span class="title_item_cont_2 have_right_arr" v-text="phoneNumber"></span>
                </router-link>
                <li class="title_item">
                    <span>真实姓名</span>
                    <span class="title_item_cont_1" v-text="realName ? realName : '未绑定'"></span>
                </li>
                <li class="title_item">
                    <span>注册时间</span>
                    <span class="title_item_cont_1" v-text="registrationTime"></span>
                </li>
            </ul>
            <p class="s_font2 title_font">代理模式</p>
            <ul class="box_title_item">
                <li class="title_item">
                    <span>佣金模式</span>
                    <span class="title_item_cont_1">{{commissionType | cmTypeFilter}}</span>
                </li>
                <li class="title_item">
                    <span>拥金累积周期</span>
                    <div class="title_item_cont_1 box_commission">
                        <div>至</div>
                        <div class="date_commission">
                            <p>22222222</p>
                            <p>22222222</p>
                        </div>
                    </div>
                </li>
                <li class="title_item">
                    <span>拥金发放时间</span>
                    <span class="title_item_cont_1">每周一18:00之前</span>
                </li>
                <li class="title_item">
                    <span>拥金比例</span>
                    <span class="title_item_cont_1">50%</span>
                </li>
            </ul>
            <p class="s_font2 title_font">银行卡资料</p>
            <div class="box_bank_info">
                <div v-if="!haveBankCard" class="bank_card add_bank_card"></div>
                <div v-else class="bank_card">
                    <div class="bank_name">
                        <img :src="bankImg(1)" alt="">
                    </div>
                    <div class="bank_account">{{bankAccount | splitNumber}}</div>
                    <div class="bank_info">
                        <div class="bank_username" v-text="realName"></div>
                        <div class="bank_address">
                            <p>北京</p>
                            <p>小胡同</p>
                        </div>
                        <router-link to="/updatebank"  tag="div" class="btn_change_bank"></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    data () {
        return {
        };
    },

    components: {},

    computed: {
        ...mapState(['username', 'phoneNumber', 'realName', 'haveBankCard', 'bankInfo', 'commissionType', 'registrationTime', 'haveBankCard'])
    },

    methods: {
        bankImg(typeId) {
            let img = '';
            try {
                img = require(`../../assets/images/bank/bank_${typeId}.png`);
            } catch(e) {
                console.error(e);
            }
            return img;
        }
    },

    filters: {
        splitNumber(val) {
            if (!val) return '';
            return val ? val.replace(/(.{4})/g, '$1 '+'\xa0') : '';
        }
    },
}
</script>