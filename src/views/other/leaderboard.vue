<template>
    <div class="leaderboard">
        <Header :showCbBtn="true" class="header">代理榜单</Header>
        <div class="content box_shadow2 box_bg_color_opacity">
            <div class="title">
                <div><span class="sign"></span></div>
                <div>
                    <select v-model="active" v-on:change="changeType">
                        <option v-for="(item,index) in type" :key="index" :value="item.value">{{item.text}}</option>
                    </select>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>排名</td>
                        <td>代理账号</td>
                        <td>累计佣金</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in boardRanking" :key="index">
                        <td><div :class="item.className">{{item.rank}}</div></td>
                        <td>{{item.name}}</td>
                        <td>{{item.amount}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Header from '../../components/header'
export default {
    data () {
        return {
            type:[{text:'本日', value:"1"},{text:'本周', value:"2"},{text:'半月', value:"3"},{text:'本月', value:"4"},{text:'总榜', value:"5"}],
            active:"5",
            boardRanking:[]
        };
    },

    components: {
        Header
    },

    created() {
        this.getData();
    },

    computed: {},

    methods: {
        changeType(){
            this.getData();
        },
        getData(){
            let data = {
                mode: "6",
                periodCheck: this.active
            };
            Tool.send('partner', 'getPartnerBillBoard', data).then(res => {
                this.boardRanking = res.data.totalcommission.boardRanking.map((item, index) => {
                    item.amount = Tool.fixedNum(item.amount, 2);
                    if (parseInt(item.rank) >= 1 && parseInt(item.rank) <= 3) {
                        item.className = 'num' + item.rank;
                        item.rank = '';
                    } else {
                        item.className = '';
                    }
                    return item;
                })
            });
        }
    }
}
</script>
