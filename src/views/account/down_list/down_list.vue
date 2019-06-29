<template>
    <div class="d_down_list">
        <Header :showCbBtn="true" :showRight="true">
            下线列表
            <template v-slot:header_right>
                <HeaderRightSlot></HeaderRightSlot>
            </template>
        </Header>

        <div class="select_box">
            <select v-model="active">
                <option value="0">会员</option>
                <option value="1">代理</option>
            </select>
        </div>
        <components :is="currentComponent[active]"></components>
    </div>
</template>

<script>
    import HeaderRightSlot from '../../reportForm/son/header_right_slot';
    import Memeber from './member';
    import Proxy from './proxy';
    export default {
        name: "down_list",
        data(){
            return{
                active:0,
                currentComponent:[Memeber,Proxy]
            }
        },
        components: {
            HeaderRightSlot,
            Memeber,
            Proxy
        }
    }
</script>