<template>
    <div class="tb">
        <table class="table_b">
            <tr>
                <th>转入账号</th>
                <th>转入金额</th>
                <th>锁定大厅</th>
                <th>所需流水</th>
            </tr>
            <tr v-for="(item,index) in nowList" :key="index">
                <td>{{item.username}}</td>
                <td>{{item.transferAmount}}</td>
                <td>{{changeLobbyName(item.providerGroupId)}}</td>
                <td class="seex" @click="seex(index)">{{item.withdrawConsumption}}</td>
            </tr>
        </table>

        <div class="pag_box">
            <Pagination :pageCount="pageCount" :total-count="showList.length" @next="goRightPage" @pre="goRightPage" @jump="goRightPage" ></Pagination>
        </div>

    </div>
</template>

<script>
    import Pagination from '../../../components/pagination';

    export default {
        name: "tab4",
        props:{
            showList:Array,
            transferArr:Array
        },
        data(){
            return{
                lobbyList: [],
                pageCount:1,
                nowList:[]
            }
        },
        components:{
            Pagination
        },
        methods:{
            changeLobbyName(value) {
                let nickName = '';
                if (value) {
                    this.lobbyList.map(item => {
                        if (item.id == value) {
                            nickName = item.nickName;
                        }
                    });
                    return nickName;
                } else {
                    return '自由大厅'
                }
            },
            getLobbyList() {
                Tool.send('platform', 'getLockedLobbyConfig').then(result => {
                    this.lobbyList = result.data;
                });
            },
            //跳转
            goRightPage(index){
                this.initData();
                this.nowList = this.nowList.splice(index,this.pageCount);
            },
            seex(index) {
                this.$router.push({
                    path: '/transferinfo',
                    query: {
                        transferArr: JSON.stringify(this.transferArr[index]),
                    }
                })
            },
            initData(){
                [...this.nowList] = this.showList;
            }
        },
        mounted() {
            this.getLobbyList();
            this.goRightPage(0);
        }
    }
</script>

<style scoped>

</style>