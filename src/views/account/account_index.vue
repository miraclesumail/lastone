<template>
    <div class="account_index">
        <Header :showLogo="true" :showEmail="true"></Header>
        <div class="main_account">
            <div class="head_portrait">
                <div class="photo"></div>
                <p>欢迎您，<span class="font_color1">小羊</span></p>
            </div>
            <ul class="account_item">
                <router-link to="/popularize" tag="li">推广</router-link>
                <router-link to="/personal_info" tag="li">个人资料</router-link>
                <router-link to="/updatepassword" tag="li">修改密码</router-link>
                <router-link to="/downsign" tag="li">下线开户</router-link>
                <router-link to="/downlist" tag="li">下线明细</router-link>
                <router-link to="/credittransfer" tag="li">额度转移</router-link>
                <router-link to="/amountrecord" tag="li">额度记录</router-link>
                <li @click="logout">登出</li>
            </ul>

            <!-- <table class="table_b">
                <tr>
                    <th colspan="2">输赢值</th>
                    <th colspan="2">活跃人数</th>
                    <th colspan="3" rowspan="2">佣金比例（仅供参考）</th>
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
                    <td>5</td>
                </tr>
            </table> -->
         </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
        };
    },

    components: {},

    computed: {
        
    },

    methods: {
        logout() {
            this.$store.commit('setLogout');
        }
    }
}
</script>