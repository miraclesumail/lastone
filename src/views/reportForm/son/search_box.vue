<template>
    <ul class="d_search_box">

        <li v-if="showTime">
            <select v-model="selectTime">
                <option v-for="(item,index) in selectTimeArr" :key="index" :value="item.code">{{item.name}}</option>
            </select>
        </li>

        <li v-if="showMember">
            <select v-model="selectMember" :disabled="selectMemberArr.length == 1">
                <!-- <option value="1">全部</option>
                <option value="2">本月</option> -->
                <option v-for="(item,index) in selectMemberArr" :key="index" :value="item.code">{{item.name}}</option>
            </select>
        </li>

        <li v-if="showMore">
            <!-- <select v-model="selectMember">
                <option value="1">输赢</option>
                <option value="2">本月</option>
            </select> -->
            <select v-model="selectMore" multiple @change="changeData" class="more">
                <option v-for="(item,index) in memberFeeList" :key="index" :value="index">{{item.name}}</option>
            </select>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "search_box",
        props: {
            showTime: {
                type: Boolean,
                default: true
            },
            showMember: {
                type: Boolean,
                default: true
            },
            showMore: {
                type: Boolean,
                default: true
            },
            selectTimeArr: {
                type: Array
            },
            selectMemberArr: {
                type: Array
            },
            defaultSelectTime: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                selectTime: 1,
                selectMember: 1,
                selectMore: [0, 1, 2],
                memberFeeList:
                    [
                        {name: "输赢"},
                        {name: "存款"},
                        {name: "提款"},
                        {name: "投注额"},
                        {name: "优惠额"},
                        {name: "优惠"},
                        {name: "平台费"},
                        {name: "手续费"}
                    ]
            }
        },
        methods: {
            init() {
                let arr = [];
                let len = this.selectMore.length;
                if(len>3){
                    popup.confirm('最多选三项');
                    return;
                }
                this.selectMore.forEach((item, index) => {
                    arr.push(this.memberFeeList[item]);
                })
                arr.unshift({name:'账户'})
                this.$emit('selectName', arr);
            },
            changeData() {
                this.init();
            },
            fetchData() {
                let data = {
                    period: this.selectTime,
                    whosePlayer: this.selectMember,
                    playerType: '',
                }
                this.$emit('fetchData', 1);
                ws.player.getDownLinePlayerInfo(data).then(res => {
                    //this.$emit('setProperty', 'sjList', res.data.list)
                    this.$emit('setProperty', 'sjData', res.data)
                });
            },
        },
        mounted() {
            if(this.showMember)
               this.init();
        },
        created() {
              this.selectTime = this.defaultSelectTime;
        },
        watch: {
            selectTime(now, prev) {
                if(now != prev) {
                   this.$emit('setProperty', 'selectTime', now);
                }
            },
            selectMember(now, prev) {
                if(now != prev) {
                   this.$emit('setProperty', 'selectMember', now);
                }
            }  
        }
    }
</script>