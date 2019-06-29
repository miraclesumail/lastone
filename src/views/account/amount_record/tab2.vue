<template>
    <div class="tb">
        <table class="table_b">
            <tr>
                <th>开始时间</th>
                <th>结算时间</th>
                <th>金额</th>
                <th>状态</th>
            </tr>
            <tr v-for="(item,index) in nowList" :key="index">
                <td>{{changeTimeFormat(item.commissionPeriod,0)}}</td>
                <td>{{changeTimeFormat(item.commissionPeriod,1)}}</td>
                <td>{{item.proposalAmount.toFixed(2)}}</td>
                <td>{{item.status | processingStatus}}</td>
            </tr>
        </table>

        <div class="pag_box">
            <Pagination :pageCount="pageCount" :total-count="showList.length" @next="goRightPage" @pre="goRightPage"></Pagination>
        </div>

    </div>
</template>

<script>
    import Pagination from '../../../components/pagination';

    export default {
        name: "tab2",
        props:{
            showList:Array
        },
        data(){
            return{
                pageCount:1,
                nowList:[],
            }
        },
        filters: {
            processingStatus(value) {
                let statusType = {
                    Success: '提案成功',
                    Fail: '提案失败',
                    Pending: '待审批',
                    PrePending: '系统异常',
                    Approved: '审批通过',
                    Rejected: '审批拒绝',
                    Cancel: '已取消',
                    Processing: '处理中',
                    AutoAudit: '自动审核',
                    Undetermined: '提款待定',
                    Recover: '恢复处理',
                    CsPending: '待审核'
                }
                return statusType[value]
            },
        },
        components:{
            Pagination
        },
        methods:{
            changeTimeFormat (time, index) {
                if (!time)
                    return;
                let date = '';
                const tempTimeArr = time.split('~');
                tempTimeArr.map((str, i) => {
                    if (i === index) {
                        date =  new Date(str.trim()).format('yyyy-MM-dd');
                    }
                });
                return date;
            },
            changeDate(date) {
                let newDate = new Date(date);
                return newDate.format('yyyy-MM-dd hh:mm:ss')
            },
            //跳转
            goRightPage(index){
                this.initData();
                this.nowList = this.nowList.splice(index,this.pageCount);
            },
            initData(){
                [...this.nowList] = this.showList;
            }
        },
        mounted() {
            this.goRightPage(0);
        }
    }
</script>