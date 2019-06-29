<template>
    <div class="mail">
        <Header :showCbBtn="true" class="header">站内信</Header>
        <div class="mail_item" :class="{show_del:item.hasBeenRead}" v-for="(item, index) in $store.state.mailList" :key="item.createTime">
            <div class="mail_body">
                <div class="mail_content" :class="{mail_open:currentItem==index}" @click="showContent(item, index)">
                    <div class="mail_info">
                        <div class="mail_sign">
                            <div v-show="item.hasBeenRead" class="mail_open"></div>
                            <div v-show="!item.hasBeenRead" class="mail_noopen"></div>
                        </div>
                        <div class="mail_title" :class="{mail_noopen:!item.hasBeenRead}">{{ item.title }}</div>
                        <div class="mail_date">{{ item.createTime.getDate() }}</div>
                        <div class="mail_arrow" :class="{open:currentItem==index}"></div>
                    </div>
                    <div class="mail_text">{{ item.content }}</div>
                </div>
                <div class="mail_del" @click="delMail(item, index)">
                    <div class="mail_del_img"></div>
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
            currentItem:-1,
            mailList:[],
        };
    },

    components: {
        Header
    },

    created() {
    },

    computed: {},

    methods: {
        showContent(item, index) {
            index == this.currentItem ? this.currentItem = -1 : this.currentItem = index
            if (!item.hasBeenRead) {
                // const playerId = Tool.getSession('player').playerId
                const data = {
                    // playerId,
                    mailObjId: item._id,
                };
                Tool.send('partner', 'readMail', data).then(() => {
                    item.hasBeenRead = true;
                })
            }
        },
        delMail(item, index) {
            popup.confirm('确定要删除此邮件吗？', [{
                name: '确定', callback: () => {
                    // const playerId = Tool.getSession('player').playerId;
                    const data = {
                        // playerId,
                        mailObjId: item._id,
                    };
                    Tool.send('partner', 'deleteMail', data).then(() => {
                        let mailList = this.$store.state.mailList.slice();
                        mailList.splice(index, 1);
                        this.$store.commit('setState', {key: 'mailList', value: mailList});
                        this.currentItem = -1;
                    })
                }
            }, {name: '取消'}], '提示');
        },
    }
}
</script>
