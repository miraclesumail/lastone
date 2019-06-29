<template>
    <div class="button_index" :style="{'justify-content': flex}">
        <button type="button" :class="btnClass" @click="cb" :style="{width:width+'rem',height:height+'rem'}">
            <slot></slot>
        </button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            btnType: {
                size: ['xsmall', 'small', 'middle', 'big'],    // 按钮大小  超小、小、中、大
                shape: ['round'],                              // 按钮形状  圆框按钮
                type: ['primary', 'cancel','nobg']                    // 按钮类型  主要按钮、取消按钮
            },

            inPreset: {                                        // 预设 (暂时未用)
                1: {
                    size: 'small',
                    shape: 'round',
                },
                2: {
                    size: 'middle',
                    shape: 'round',
                },
                3: {
                    size: 'big',
                    shape: 'round',
                }
            }

        };
    },

    props: {
        flex: {
            default: 'center',
            type: String
        },
        size: {
            default: 'big',
            type: String
        },
        shape: {
            default: 'round',
            type: String
        },
        type: {
            default: 'primary',
            type: String
        },
        preset: {
            default: 1,
            type: Number
        },
        width:String,
        height:String
    },

    components: {},

    computed: {
        btnClass () {
            // let btnObj = {};
            // if (this.preset) {
            //     btnObj = this.inPreset[this.preset];
            //     if (this.type) {
            //         btnObj.type = this.type;
            //     }
            // }
            let classArr = [`btn_size_${this.size}`, `btn_shape_${this.size}_${this.shape}`, `btn_${this.type}`];
            return classArr;
        }
    },

    methods: {
        cb() {
            this.$emit('cb');
        }
    }
}
</script>