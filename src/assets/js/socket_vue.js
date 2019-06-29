/*
*websocket处理插件，
*heartBeat   websocket心机包组件保证链接不失活
    _heartBeat 心机包识别码
 * @example
 *  var ws = new  Socket(platformId,url,store);

 * ws.send 返回一个 Promise对象 向服务端发送请求  
    1：_silence参数控制是否不显示加载动画默认false显示
    1：_closeCONFIRM参数控制是否关闭错误提示框默认false不关闭
    open 心机包开关设置，开发环境可以关闭，上线必须开启
 * ws.from 提供一个服务端推送接口处理方案

*hank 2017.11.9
 */


/**
 * websocket 函数
 * 
 * @param {Number} platformId  平台ID 
 * @param {String} url  链接地址 
 * @param {Object} store  vuex   
 * @param {Object} router vue 路由对象
 * @param {Function} errorFn  公用错误函数 
 */

function Socket(platformId, url, store, router, errorFn, openCb) {
    this.errorFn = errorFn
    this.openCb = openCb;
    this.ws = '';
    this.url = url;
    this.connectCount = 0;
    this.store = store;
    this.router = router;
    this.platformId = platformId;
    // 连接次数
    this.count = 1;

    // 心机包设置
    this.heartBeat = {
        open: true,
        valid: true,
        intervalTime: 45000,
        timeOut: 14000,      // 规定时间内心机包未响应就重新连接
        checkQueue: {}
    };

    this.delayQueue = [];
    this.loadQueue = [];
    this.callback = {};
    this.fromCallback = [];
    this.onOff = false;
    this.init();
}

Socket.prototype = {
    init: function () {
        this.ws = new WebSocket(this.url);
        this.ws.onopen = this.onOpenCallback.bind(this);
        this.ws.onerror = this.onErrorCallback.bind(this);
        this.ws.onclose = this.onCloseCallback.bind(this);
        this.ws.onmessage = this.onMessageCallback.bind(this);
        return this;
    },
    onOpenCallback: function () {
        console.log('服务器连接成功...');
        this.connectCount++;
        let playerId = Tool.getSession('player') ? Tool.getSession('player').playerId : '';
        let token = Tool.isObjectEmpty(Tool.getSession('token')) ? '' : Tool.getSession('token'); 
        Tool.send('authenticate', {
            playerId: playerId,
            token: token
        }).then(() => {
            this.openStart();
            this.onOff = true;
            this.openCb && this.openCb();
        }).catch(() => { 
            this.onOff = true;
            this.openStart();
            this.openCb && this.openCb();
        });
    },
    openStart: function () {
        //连接成功后启动vue
        this.delayQueue.length > 0 && this.delayQueue.map((item) => {
            this.load(item);
        })
        this.delayQueue = [];
        this.heartBeat.open && this.startHeartBeat();
    },
    onMessageCallback: function (res) {
        let respData = JSON.parse(res.data);
        let name = respData.requestId || null;
        let callback = this.callback[name];
        if (respData.functionName === 'notifyNewMail') {
            this.fromCallback.map(item => {
                item.fun && item.fun(respData.data);
            });
            return;
        }
        const status = respData['data']['status'];
        if (callback && callback.data.data._heartBeat) {
            this.heartBeat.valid = true;
        }

        // 错误判断
        switch (status) {
            case 200:
                callback.promise.resolve(respData['data']);
                break;
            case 400:
                this.err400(respData.data.errorMessage, callback, respData);
                break;
            case 420:
                if (Tool.getSession('token')) {
                    this.store.commit('setLogout');
                } else {
                    this.router.push('/sign_in');
                }
                callback.promise.reject(respData['data']);
                break;
            case 404:
                callback.promise.reject(respData['data']);
                break;
            default:
                callback.promise.reject(respData['data']);
                !callback['quiet'] && this.errorFn(respData['data'].errorMessage);
                break;
        }
        delete this.callback[name];
        let closeLoading = false;
        for (let key in this.callback) {
            closeLoading = this.callback[key].closeLoading;
        }
        if (Tool.isObjectEmpty(this.callback)) {
            this.store.commit('setShowLoading', false);
        }

        if (closeLoading) {
            this.store.commit('setShowLoading', false);
        }
    },

    err400: function (msg, cb, respData) {
        switch (msg) {
            case '令牌未经过身份验证':
                cb.promise.reject(respData['data']);
                break;
            case '玩家IP不匹配':
                cb.promise.reject(respData['data']);
                // this.reLogin(msg);
                break;
            default:
                cb.promise.reject(respData['data']);
                !cb['quiet'] && this.errorFn(respData['data'].errorMessage);
                break;
        }
    },
    reLogin: function () {
    
    },

    onErrorCallback: function (event) {
        console.error('服务器连接发生错误', event);
    },

    onCloseCallback: function () {
        console.error('服务器连接关闭');
        this.close();
    },

    promiseFun: function (resolve, reject) {
        this.reject = reject;
        this.resolve = resolve;
    },

    createPromise: function () {
        var promise = new Promise(this.promiseFun.bind(this))
        promise.reject = this.reject;
        promise.resolve = this.resolve;
        return promise;
    },

    notify: function(functionName, fun) {
        this.fromCallback.push({
            functionName: functionName,
            fun: fun
        });
    },
    
    send: function (opt, quiet, closeLoading) {
        let promise = this.createPromise();
        if (opt.functionName == 'authenticate') {
            if (this.ws.readyState != WebSocket.OPEN) {
                !this.delayQueue.includes([opt, promise, quiet, closeLoading]) && this.delayQueue.push([opt, promise, quiet, closeLoading]);
                return promise;
            }
        } else {
            !closeLoading && this.store.commit('setShowLoading', true);
            if (this.ws.readyState != WebSocket.OPEN || !this.onOff) {
                !this.delayQueue.includes([opt, promise, quiet, closeLoading]) && this.delayQueue.push([opt, promise, quiet, closeLoading]);
                return promise;
            }
        }
        this.load([opt, promise, quiet, closeLoading]);
        return promise;
    },

    load: function (arr) {
        let index = 'RQ' + this.count,
        sendData = arr[0];
        this.callback[index] = {};
        if (!sendData.data) {
            sendData['data'] = {};
        }
        let playerId = Tool.getSession('player') ? Tool.getSession('player').playerId : '';
        sendData['data']['requestId'] = index;
        sendData['data']['platformId'] = this.platformId;
        if (sendData.functionName !== 'create' && playerId) {
            sendData['data']['playerId'] = playerId;
        }
        this.callback[index]['promise'] = arr[1];
        this.callback[index]['data'] = arr[0];
        this.callback[index]['quiet'] = arr[2];
        this.callback[index]['closeLoading'] = arr[3];
        this.ws.send(JSON.stringify(arr[0]));
        this.count++;
        return arr[1];
    },

    startHeartBeat: function () {
        let self = this;
        let playerId = Tool.getSession('player') ? Tool.getSession('player').playerId : '';
        let token = Tool.isObjectEmpty(Tool.getSession('token')) ? '' : Tool.getSession('token');
        this.heartBeatTimer = setInterval(() => {
            Tool.send('authenticate', {
                playerId: playerId, 
                token: token, 
                _heartBeat: true
            }, true, true).catch(() => {});
            this.heartBeat.valid = false;
            // 规定时间未响应就重新连接
            setTimeout(() => {
                !self.heartBeat.valid && self.close();
            }, this.heartBeat.timeOut);
        }, this.heartBeat.intervalTime);
    },

    close: function () {
        this.heartBeatTimer && clearInterval(this.heartBeatTimer);
        if (this.connectCount > 10) {
            popup.confirm("网络链接超时,请确认网络通畅后重试", [{name: '重试', callback: () => {
                this.store.commit('setLogout');
                window.location.reload();
            }}]);
            return;
        } else {
            setTimeout(() => {
                console.log('尝试重连 ' + this.connectCount);
                this.init();
            }, 5000);
        }
        return this;
    }
}

export default Socket
