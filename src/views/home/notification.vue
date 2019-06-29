<template>
    <div class="notification">
        <Header :showCbBtn="true" class="header">公告</Header>
        <div class="notification_item" v-for="item in noticeList" :key="item.date">
            <div class="notification_info">
                <div class="notification_sign">
                    <div class="notification_laba"></div>
                    <div class="notification_title pz_text_color2">{{ item.title }}</div>
                </div>
                <div class="notification_content">
                    {{ item.content }}
                </div>
            </div>
            <div class="notification_date">创建时间：{{ item.date.getDate() }}</div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/header'
export default {
    data () {
        return{
            noticeList:[],
        }
    },

    components: {
        Header
    },

    created(){
        Tool.send('platform', 'getPlatformAnnouncements', null, true, true).then(res=>{
            let list = res.data.filter(item => {
                if (item.reach === 'partner' || item.reach === 'all') return item;
            });
            this.noticeList = list;
        });
    },

    computed: {},

    methods: {
    }
}
</script>
