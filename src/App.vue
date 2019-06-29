<template>
	<div id="app">
		<!-- <div class="header">header占位</div> -->
		<Loading v-if="showLoading"/>
		<router-view class="box_view"/>
		<Footer />
		<!-- <div id="popup_box"></div> -->
	</div>
</template>

<script>
import Loading from './components/Loading'
import Footer from './components/footer'
export default {
    data(){
        return{
		}
	},
	components: {
		Loading,
		Footer
	},
	computed: {
		showLoading() {
			return this.$store.state.showLoading;
		}
	},
    watch:{
        '$store.state.isLogin'(val) {
            if (val) {
                this.getMailList()          // 获取站内信
            }
        },
    },

	methods:{
        getMailList(){
            if(this.$store.state.isLogin){
                Tool.send('partner', 'getMailList').then(res => {
                    let mailList = [];
                    res.data.forEach(e => {
                        mailList.push({
                            _id: e._id,
                            title: e.title,
                            content: e.content,
                            createTime: e.createTime,
                            hasBeenRead: e.hasBeenRead,
                        })
                    });
                    this.$store.commit('setState', {key: 'mailList', value: mailList.reverse()});
                });
            } else {
                this.$store.commit('setState', {key: 'mailList', value: []});
            }
        },
	}
}
</script>
