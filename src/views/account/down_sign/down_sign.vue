<template>
    <div class="d_down_sign">
        <Header :showCbBtn="true">下线开户</Header>
        <ul class="link_list">
            <li v-for="(item,index) in linkList" :key="index" :class="{active:index == active}" @click="changeTab(index)"></li>
        </ul>
        <components :is="currentComponent[active]"></components>
    </div>
</template>

<script>
    import DownMember from './down_member';
    import DownProxy from './down_proxy';
    export default {
        name: "down_sign",
        data(){
            return{
                active:0,
                linkList:[
                    {name:'下线会员开户'},
                    {name:'下线代理开户'},
                ],
                currentComponent:[DownMember,DownProxy]
            }
        },
        components:{
            DownMember,
            DownProxy
        },
        methods:{
            changeTab(ins){
                this.active = ins;
            }
        }
    }
</script>