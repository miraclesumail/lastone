<template>
    <div class="download">
        <Header :showCbBtn="true" class="header">APP下载</Header>
        <div class="content">
            <div class="title s_font2 s_border_b">
                <span>代理APP</span>
            </div>
            <div class="list box_bg_color">
                <div class="item">
                    <div class="item_left">
                        <!--<div class="item_img" :style="{backgroundImage: 'url(' + require('../../assets/images/download_jbldl.png') + ')' }"></div>-->
                        <div class="item_img"><img src="../../assets/images/download_jbldl.png" /></div>
                    </div>
                    <div class="item_center">
                        <div class="item_name s_font2">金佰利代理</div>
                        <div class="item_version">Version4.12</div>
                        <div class="item_device">支持Android，IOS</div>
                    </div>
                    <div class="item_right">
                        <div class="download_btn"></div>
                    </div>
                </div>
            </div>
            <div class="title s_font2 s_border_b">
                <span>官网APP</span>
            </div>
            <div class="list box_bg_color">
                <div class="item">
                    <div class="item_left">
                        <!--<div class="item_img" :style="{backgroundImage: 'url(' + require('../../assets/images/download_jbl.png') + ')' }"></div>-->
                        <div class="item_img"><img src="../../assets/images/download_jbl.png" /></div>
                    </div>
                    <div class="item_center">
                        <div class="item_name s_font2">金佰利</div>
                        <div class="item_version">Version4.12</div>
                        <div class="item_device">支持Android，IOS</div>
                    </div>
                    <div class="item_right">
                        <div class="download_btn"></div>
                    </div>
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
            proxy:{
                title:'代理APP',
                list:[
                    {
                        img:'../../assets/images/download_jbldl.png',
                        iosDownLoadUrl : '',
                        androidDownLoadUrl:''
                    }
                ]
            },
            main:{
                title:'官网APP',
                list:[
                    {
                        img:'../../assets/images/download_jbl.png',
                        iosDownLoadUrl : '',
                        androidDownLoadUrl:''
                    }
                ]
            }
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
