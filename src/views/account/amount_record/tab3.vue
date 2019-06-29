<template>
    <div class="tb">
        <table class="table_b">
            <tr>
                <th>时间</th>
                <th>提款金额</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            <tr v-for="(item,index) in showList" :key="index">
                <td>{{changeDate(item.createTime)}}</td>
                <td>{{item.data.amount}}</td>
                <td>{{item.status | processingStatus}}</td>
                <td @click="cancelWithdraw(item.status, item.proposalId)">取消</td>
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
        name: "tab3",
        props:{
            showList:Array
        },
        data(){
            return{
                pageCount:1,
                nowList:[],
                allowCancellation: ['Pending', 'AutoAudit', 'CsPending'],
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
            changeDate(date) {
                let newDate = new Date(date);
                return newDate.format('yyyy-MM-dd hh:mm:ss')
            },
            //跳转
            goRightPage(index){
                this.initData();
                this.nowList = this.nowList.splice(index,this.pageCount);
            },
            cancelWithdraw(status, id) {
                if (this.allowCancellation.includes(status)) {
                    let sendData = {
                        proposalId: id
                    };
                    Tool.send('partner', 'cancelBonusRequest', sendData).then(result => {
                        popup.confirm('取消成功');
                        this.getBonusRequestList();
                    })
                } else {
                    popup.confirm('该笔提款已经不能取消');
                }
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

<style scoped>

</style>