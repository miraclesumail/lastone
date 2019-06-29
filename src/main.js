import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ES6Promise from 'es6-promise'
import Tool from './assets/js/tool'
import Popup from './components/popup/popup'
import './assets/js/rem'
import plugins from './assets/js/plugins'   // 全局组件
import verify from './assets/js/verify'
// import CreatedPostMessage from './assets/js/postMessage'
import './assets/style/index.less'   // 样式
import Highcharts from 'highcharts/highstock';
// import WS from './assets/js/socket_vue'
import WS from './assets/js/sdk/main';

// rem
(function () {
    var docEl = document.documentElement;
    var setRem = function () {
        var screenWidth = docEl.clientWidth || window.screen.width || 360;
        docEl.style.fontSize = (100 * screenWidth / 750) + 'px';
    };
    window.addEventListener('resize', setRem, false);
    document.addEventListener('DOMContentLoaded', setRem, false);
    setRem();
})();

// 全局组件  Button、Header
Vue.use(plugins);

window.eventBus = new Vue()

// 全局验证规则
Vue.use(verify, {
    username: {
        test: /^[0-9a-z]+$/,
        message: '只能输入小写字母或数字',
    },
    phone: {
        test: /^1[0-9]{10}$/,
        message: '手机号码格式错误'
    },
    bankCard: {
        test: /^([1-9]{1})(\d{14}|\d{15}|\d{17}|\d{18}|)$/,
        message: '请输入正确的银行卡号'
    },
    captcha: {
        test: /^[0-9]{4}$/,
        message: '请输入正确的验证码'
    },
    smsCode: {
        test: /^[0-9]{4}$/,
        message: '请输入正确的验证码'
    }
});

// 兼容处理
ES6Promise.polyfill();


let base = document.getElementsByTagName("base");
let platformId = Number(base[0].getAttribute('data-id')) || 6;


// 链接websocket服务器
let serverUrl;
const protocolStr = document.location.protocol
const host = window.location.host
const w = protocolStr.length <= 5 ? 'ws' : 'wss'
if (process.env.NODE_ENV == 'production') {
    // if (location.protocol === 'https:') {
        serverUrl = w + '://' + host + '/websocket'
    // } else {
    //     serverUrl = 'wss://devtest.neweb.me/websocket'
    // }

} else {
    // serverUrl = 'ws://192.168.10.199:9280' // 开发站
     serverUrl = 'wss://devtest.neweb.me/websocket' // 开发站
    //serverUrl = 'ws://eu-ng-cstest.neweb.me/websocket'   // 测试站
    // serverUrl = 'wss://www.eu99999.com/websocket'   // 正式站
}

/**
 *  公共 400 错误回调函数 （除了心跳包以外）
 * @param {String} errorMessage
 */
function publicErrorFn (err) {
    console.log(err);
    if (err.status == 420) {
        popup.confirm(err.errorMessage, [{name: '确定', callback: () => {
            router.push('sign_in');
        }}]);
    } else {
        popup.confirm(err.errorMessage);
    }
}

/**
 *  服务器链接成功后回调
 */
function openCallback() {
    console.log('服务器连接成功...');
    // ws.partner.getPartnerConfig()
    Tool.send('partner', 'getPartnerConfig').then(result => {
        let _data = result.data;
        let csLine = _data.partnerLive800Url[0] ? _data.partnerLive800Url[0].content : '';
        let qq = _data.partnerCSQQNumber[0] ? _data.partnerCSQQNumber[0].content : '';
        let csPhone = _data.partnerCSPhoneNumber[0] ? _data.partnerCSPhoneNumber[0].content : '';
        let wechat = {
            qcode: _data.partnerCSWechatQRUrl[0] ? _data.partnerCSWechatQRUrl[0].content : '',
            number: _data.partnerCSWechatNumber[0] ? _data.partnerCSWechatNumber[0].content : ''
        };
        store.commit('setState', {key: 'csLine', value: csLine});
        store.commit('setState', {key: 'csQQ', value: qq});
        store.commit('setState', {key: 'csPhone', value: csPhone});
        store.commit('setState', {key: 'csWechat', value: wechat});
        store.commit('setState', {key: 'platformConfig', value: result.data});
    });
    return new Promise(reslove => {
        let partnerId = Tool.getSession('partnerId');
        let token = Tool.getSession('token');
        ws.partner.authenticate({partnerId, token}, false, false).then(result => {
            store.dispatch('refreshUserInfo');
            startHeartBeat();
            reslove();
        }, err => {
            startHeartBeat();
            reslove();
        });
    });
}

/**
 *  开启心跳包
 */ 
function startHeartBeat() {
    if (window.heartbeatTimer) {
        clearInterval(window.heartbeatTimer);
    } else {
        window.heartbeatTimer = setInterval(function() {
            let partnerId = Tool.getSession('partnerId');
            let token = Tool.getSession('token');
            ws.partner.authenticate({partnerId, token}, false, false).catch(() => {});
        }, 35000);
    }
}

/**
 *  服务器关闭回调 
 */
function serverCloseHandler() {
    console.log('服务器连接关闭...');
}

/** 
 *  开启请求动画 
 */ 
function openLoadHandler () {
    console.log('开启请求动画');
}

/** 
 *  关闭请求动画 
 */ 
function endLoadHandler() {
    console.log('关闭请求动画');
}


// 初始化WS连接
WS.connect(serverUrl, platformId, openCallback, serverCloseHandler, publicErrorFn, openLoadHandler, endLoadHandler);

// let net = new WS(platformId, serverUrl, store, router, publicErrorFn, openCallback);

// Highcharts 自定义时间标签
Highcharts.dateFormats = {
    W: function(timestamp) {
        console.log(timestamp);
        return new Date(timestamp).getMonth() + 1;
    }
}

/**
 * 挂载全局对象 （需要添加到.eslintrc.js文件中）
 */

// webSocket
window.ws = WS;
// 工具函数
window.Tool = Tool;
// 弹窗 
window.popup = Popup;
// postMessage
// window.CreatedPostMessage = CreatedPostMessage;

window.Highcharts = Highcharts;

Vue.config.productionTip = false;


// 路由拦截
router.beforeEach((to, from, next) => {
    console.log(to.meta);
    if (to.meta.needLogin) {
        if (!Tool.getSession('token')) {
            store.commit('setState', {key: 'toRouter', value: to.path});
            next({ path: '/sign_in' });
        } else {
            if (to.meta.needRealPlayer && store.state.player.isTestPlayer) {
                popup.confirm('试玩帐号无此权限，请登陆真钱帐号或注册！',
                    [{name: '注册', callback: () => {
                        next({ path: '/sign_up' });
                    }}, {name: '登录', callback: () => {
                        next({ path: '/sign_in' });
                    }}]);
            } else {
                next();
            }
        }
    } else {
        next();
    }
});



window.onload = function() {
    window.addEventListener('resize', orientationHolder, false);
    orientationHolder();
    function orientationHolder () {
        let link = document.createElement('link');
        let hpStyleUrl = '/hengping.css';
        link.id = 'm_hengping';
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", hpStyleUrl);
        let mLink = document.querySelector('#m_hengping');
        let head = document.querySelector('head');
        if (window.screen.orientation.angle === 90 || window.screen.orientation.angle === 270) {
            console.log('安卓横屏');
            if (!mLink) {
                head.appendChild(link);
            }
        } else {
            console.log('安卓竖屏');
            if (mLink) {
                head.removeChild(mLink);
            }
        }
    }
}

if (Tool.versions().android) {
    window.addEventListener('resize', function () {
        if (document.activeElement.tagName == 'INPUT' ||
            document.activeElement.tagName == 'TEXTAREA') {
            window.setTimeout(function () {
                document.activeElement.scrollIntoViewIfNeeded();
            }, 0);
        }
    });
}



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')