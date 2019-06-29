<template>
    <!--select弹框-->
    <div class="statistics_show_dialog">
        <div class="statistics_select">
            <div class="statistics_option">
                <div v-for="(item,index) in opentionList" 
                    :key="item.name" 
                    :class="{active: currentIndex === index}" 
                    @click="activeItem(index)">{{item.name}}</div>
            </div>
            <div class="statistics_btn_group">
                <div class="statistics_cancel" @click="cancel">取消</div>
                <div class="statistics_ok" @click="confirm">确认</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            currentIndex: 0
        };
    },

    props: {
        opentionList: {
            type: Array,
            required: true
        } 
    },

    components: {},

    computed: {},

    methods: {
        activeItem(index) {
            this.currentIndex = index;
        },
        cancel() {
            this.close();
        },
        confirm() {
            this.$emit('confirm', this.currentIndex);
            this.close();
        },
        close() {
            this.$emit('closeDialog');
        }
    }
}
</script>