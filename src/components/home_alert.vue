<template>
    <transition name="alert">
        <div class="box_alert">
            <div class="box_alert_ctn">
                <div class="r_btn_close" @click="beforeClose"></div>
                <div v-for="(item,index) in alertInfo.list" :key="item.name">
                    <div class="box_red_pager" v-show="closeCount === (index + 1)" @click="pzOpen(item)">
                        <img :src="item.imgUrl" width="100%" height="auto"/>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return { 
            sdcsa: '',       // 圣诞存送A
            sdcsb: '',       // 圣诞存送B
            tzjh: '',        // 投资计划
            closeCount: 1,   // 当前需要关闭的弹窗
        };
    },

    props: ['alertInfo'],

    computed: {
        maxAlert() {
            if (this.alertInfo) {
                return this.alertInfo.list.length;
            }
            return 0;
        }
    },

    methods: {

        beforeClose() {
            if (this.closeCount === this.maxAlert) {
                this.close();
                return;
            }
            this.closeCount++;
        },

        close() {
            this.$emit('closeAlert', false);
        },

        pzOpen(item) {
			Tool.pzOpen.call(this, item);
		},
    }
}
</script>