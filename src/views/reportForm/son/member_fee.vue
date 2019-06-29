<template>
    <ul class="d_member_fee" :class="{line:showLine,oneh:oneh}">
        <li v-for="(item,index) in memberFeeList" :key="index">
            <span>{{item.name}}</span>
            <em>{{item.number}}</em>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "member_fee",
        props: {
            showLine: {
                type: Boolean,
                default: true
            },
            oneh: {
                type: Boolean,
                default: false
            },
            memberFeeList:{
                type:Array,
                default: () => {
                    return [
                        {name: "新开户", englishName: 'totalNewPlayerCount', number: 0},
                        {name: "有效会员", englishName: 'totalValidCrewPlayer', number: 0},
                        {name: "总存款", englishName: 'totalDepositCount', number: 0},
                        {name: "总提款", englishName: 'totalWithdrawAmount', number: 0},
                        {name: "优惠额", englishName: 'totalPromoAmount', number: 0},
                        {name: "有效投注", englishName: 'totalvalidBet', number: 0},
                        {name: "输赢金额", englishName: 'totalCrewProfit', number: 0},
                        {name: "平台费", englishName: 'totalPlatformFee', number: 0},
                        {name: "手续费", englishName: 'totalDepositWithdrawFee', number: 0}
                    ]
                }
            }
        },
        data() {
            return {}
        },
    }
</script>