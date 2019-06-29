<template>
    <div class="yj_page">
        <Header :showCbBtn="true" :showRight="true">
             佣金配置
            <template v-slot:header_right>
                <div class="d_edit_logo" @click="editInfo"></div>
            </template>
        </Header>

        <div class="single_input_box">
            <div>
                <span>账号</span>
                <span>atest1</span>
            </div>
            <div>
                <span>代理等级</span>
                <span>300.25</span>
            </div>
            <div>
                <span>佣金模式</span>
                <span>7天输赢值</span>
            </div>
            <div>
                <span>佣金类型</span>
                <span>下级代理佣金</span>
            </div>
        </div>

        <div class="set_box">
            <div class="game_title">ebet电子</div>
            <table class="table_b nomargin">
                <tr>
                    <th colspan="2">输赢值</th>
                    <th colspan="2">活跃人数</th>
                    <th colspan="3" rowspan="2">佣金比例</th>
                </tr>
                <tr>
                    <th>最小值</th>
                    <th>最大值</th>
                    <th>最小值</th>
                    <th>最大值</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>
                        <input type="text" placeholder="28%" :readonly="!isEdit" :class="{edit:isEdit}">
                    </td>
                </tr>
            </table>
        </div>

        <div class="btn_box" @click="editInfo"></div>

    </div>
</template>

<script>
    export default {
        name: "yj_page",
        data(){
            return{
                isEdit:false
            }
        },
        methods:{
            editInfo(){
                this.isEdit = !this.isEdit;
            }
        }
    }
</script>

<style scoped>

</style>