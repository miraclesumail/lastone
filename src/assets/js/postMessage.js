import store from '../../store'
import router from '../../router'
let self = '';

function CreatedPostMessage(url, data) {
    self = this;
    this.url = url;
    const str = JSON.stringify(new Date());
    const hash = str.slice(1, 14);
    let srcs = url + '?v=' + hash;
    let iframe = `<iframe src="${srcs}" frameborder="0" width="100%"  height="${window.innerHeight - (54 + 46)}"></iframe>`;
    let iframeBox = document.getElementsByClassName('d_promotion_detail')[0];
    iframeBox.innerHTML = iframe;
    this.iframe = iframeBox.querySelector('iframe');
    this.iframe.onload = function() {
        self.send({
            type: 'htmlInit',
            data: data
        });
    }
}

let _proto = CreatedPostMessage.prototype;

_proto.send = function(msg) {
    let data = Object.assign({ pwd: 'xjw' }, msg)
    this.iframe.contentWindow.postMessage(data, this.url);
}

window.addEventListener('message', function(e) {
    let type = e.data.type; 
    // 路由跳转
    if (type === 'router') routerTo(e.data.data.path);
    // 数据请求（2019/01/21新增）
    if (type === 'api') api(e.data);
    // 刷新数据（2019/01/21新增）
    if (type === 'refreshData') refreshData(e.data.data);
    // 弹窗
    if (type === 'popup') popupFn(e.data.data);
    // 客服服务
    if (type === 'service') serviceFn(e.data.data);
}, false);


/**
 * 跳转路由
 * @param {String} path 
 */
function routerTo(path) {
    router.push(path);
}


/**
 * 请求API
 * @param {Object} data 
 */
function api(data) {
    Tool.send(data.data.functionName, data.data.data, data.data.quiet, data.data.closeAnimation).then(result => {
        self.send({
            type: 'api',
            data: result,
            _index_: data._index_,
        });
    }).catch(err => {
        self.send({
            type: 'api',
            data: err,
            _index_: data._index_,
            err: true
        });
    });
}

/**
 * 刷新数据
 * @param {Number} data 1 余额  2积分
 */
function refreshData(data) {
    if (data == 1) {
        store.dispatch('refreshBalance');
    } else if (data == 2) {
        store.dispatch('setUserPoint');
    }
}

/**
 * 弹窗
 * @param {Object} data 
 */
function popupFn(data) {
    if (data.type === 'confirm') {
        var btnList = eval(data.btnList);
        popup.confirm(data.msg, btnList);
    } else if (data.type === 'message') {
        console.log(data)
        popup.message(data.msg, data.status);
    }
}

/**
 * 打开客服等
 * @param {String} type 
 */
function serviceFn(type) {
    Tool.service(type);
}

export default CreatedPostMessage;