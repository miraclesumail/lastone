<template>
    <div class="transfer_info">
        <Header :showCbBtn="true" :showRight="true">转账明细</Header>
        <div class="single_input_box">
            <div>
                <span>时间</span>
                <span>{{changeDate(transferArr.time)}}</span>
            </div>
            <div>
                <span>额度变化</span>
                <span>{{transferArr.amount}}</span>
            </div>

            <div>
                <span>提案类型</span>
                <span>转账</span>
            </div>
        </div>

        <table class="table_b">
            <tr>
                <th>时间</th>
                <th>额度变化</th>
                <th>账号</th>
            </tr>
            <tr>
                <td>{{changeDate(transferArr.time)}}</td>
                <td>{{transferArr.amount}}</td>
                <td>{{transferArr.transferList[0].username}}</td>
            </tr>
        </table>

    </div>
</template>

<script>
    export default {
        name: "transfer_info",
        data() {
            return {}
        },
        mounted() {
        },
        methods: {
            changeDate(date) {
                let newDate = new Date(date);
                return newDate.format('yyyy-MM-dd hh:mm:ss')
            }
        },
        computed: {
            transferArr() {
                let arr = [];
                arr = this.$route.query.transferArr;
                return JSON.parse(arr);
            },
            transferList() {
                return this.transferArr.transferList[0];
            }
        },
    }
</script>