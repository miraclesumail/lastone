<template>
    <div class="d_mem_proxy">
        <table class="table_b nomargin">
            <tr>
                <th>账号</th>
                <th>注册时间</th>
                <th>最后登录时间</th>
                <th>操作</th>
            </tr>
            <tr>
                <td>dwight</td>
                <td>18-11-11 18:00</td>
                <td>18-11-11 18:00</td>
                <td>
                    <router-link to="/yjpage" tag="span" class="yj_white"></router-link>
                    <span class="search"></span>
                    <span class="see_dl" @click="showMemInfo"></span>
                </td>
            </tr>
        </table>

        <div class="pag_box">
            <Pagination></Pagination>
        </div>


        <div class="r_popup_confirm" v-if="isShow">
            <transition name="slide-scale">
                <div class="popup_main hasBorderBottom">
                    <div class="popup_title">
                        Nihoa
                        <div class="popup_close_btn" @click="showMemInfo" ></div>
                    </div>
                    <div class="popup_content">
                            <table class="table infotable">
                                <tr>
                                    <th>账号</th>
                                    <th>注册时间</th>
                                    <th>最后登录时间</th>
                                </tr>
                                <tr>
                                    <td>atest01</td>
                                    <td>atest01</td>
                                    <td>atest01</td>
                                </tr>
                            </table>
                    </div>
                </div>
            </transition>
        </div>

        <div class="btn_box"></div>
    </div>
</template>

<script>
    import Pagination from  '../../../components/pagination';
    export default {
        name: "member",
        data(){
            return{
                isShow:false
            }
        },
        components:{
            Pagination
        },
        methods:{
            showMemInfo(){
                this.isShow = !this.isShow
            }
        },
        mounted() {
        }
    }
</script>