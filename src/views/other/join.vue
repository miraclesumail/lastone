<template>
    <div class="join">
        <Header :showCbBtn="true" class="header">加盟协议</Header>
        <div class="content">
            <div class="list">
                <div>
                    <router-link class="item1" tag="div" to="/join_condition/item1"></router-link>
                </div>
                <div>
                    <router-link class="item2" tag="div" to="/join_condition/item2"></router-link>
                </div>
                <div>
                    <router-link class="item3" tag="div" to="/join_condition/item3"></router-link>
                </div>
                <div>
                    <router-link class="item4" tag="div" to="/join_condition/item4"></router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/header'
export default {
    data () {
        return {
        };
    },

    components: {
        Header
    },

    created() {
    },

    computed: {},

    methods: {
    }
}
</script>
