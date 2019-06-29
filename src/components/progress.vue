<template>
    <div>
        <div class="linear_box">
            <div class="linear_box_wrap" v-for="item in list" :key="item.lockName">
                <div class="lock_name" v-text="item.lockName"></div>
                <div class="progress_box">
                    <p><span v-text="item.currentNum"></span>/<span v-text="item.targetNum"></span></p>
                    <div class="progress">
                        <div class="progress_line"
                             :style="{ width: `${percent(item.currentNum, item.targetNum)}%`}"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                inList: [
                    {
                        lockName: '',            // 名称
                        currentNum: 100,         // 当前数值
                        targetNum: 1000          // 目标数值
                    }
                ]
            };
        },

        props: {
            list: {
                required: true,
                type: Array,
            }
        },

        components: {},

        computed: {},

        methods: {
            percent(current, target) {
                return Math.floor((current / target) * 100);
            }
        },
        watch: {
            list: {
                handler(newVal, oldVal) {
                    for (let i = 0; i < newVal.length; i++) {
                        if (oldVal[i] != newVal[i]) {
                            console.log(newVal)
                        }
                    }
                },
                deep: true
            }

        }
    }
</script>