<template>
    <div>
        <div class="d_search_logo" @click="showSearch = !showSearch"></div>
        <div @click="goToDetail()" class="d_xq_logo" v-if="showDetail"></div>
        <div class="d_yj_logo" @click="$router.push('/myproxyform')" v-if="showYj"></div>
        <div class="search_input" v-if="showSearch">
            <form class="r_box_form">
                <div class="form_item">
                    <div class="form_item_in">
                        <label>会员账号</label>
                        <input type="text" placeholder="输入会员账号" v-model="inputInfo"  @blur="onInput"/>
                    </div>
                    <p class="meg_error"></p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "header_right_slot",
        props:{
            showDetail:{
                type:Boolean,
                default:false
            },
            showYj:{
                type:Boolean,
                default:false
            },
            selectTime: {
                type: Number,
                default: () => {
                    return 1
                }
            },
        },
        data(){
            return{
                showSearch:false,
                inputInfo:''
            }
        },
        methods:{
            onInput(){
                this.showSearch = !this.showSearch;
                this.$emit('onInput',this.inputInfo);
            },
            goToDetail(){
                this.$router.push({name: 'myproxydetail', params: {selectTime: this.selectTime}})
               // {name: 'deposit', params: {id: 1}}
                //$router.push('/myproxydetail')
            }
        }
    }
</script>