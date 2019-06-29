// import API from '../../api'
import $store from '../../store'

let rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

/**
 * 去除多余的空格其他字符
 * @param {String} value
 */
function stripAndCollapse(value) {
    let tokens = value.match(rnothtmlwhite) || [];
    return tokens.join(" ");
}

/**
 * 将class字符串转为数组
 * @param {String} value
 */
function classToArray(value) {
    if (Array.isArray(value)) {
        return value;
    }

    if (typeof value === 'string') {
        return value.match(rnothtmlwhite) || []
    }

    return [];
}

//JAVA 时间格式转换
String.prototype.getDate = function () {
    let date = new Date(this);
    return date.format("yyyy-MM-dd hh:mm:ss");
}
//扩展Date对象的属性
Date.prototype.format = function (format) {
    let o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

let Tool = {
    assert(functionName, message) {
        console.error('[Tool-' + functionName + ']:' + message);
    },

    send: function (service, functionName, data, noQuiet, noCloseAnimation) {
        let _data = {};
        let partnerId = Tool.getSession('partnerId');
        partnerId = partnerId ? partnerId : undefined;
        _data.partnerId = partnerId;
        if (noQuiet === undefined) noQuiet = true;
        if (noCloseAnimation === undefined) noCloseAnimation = true;
        return ws[service][functionName](Object.assign(_data, data), noQuiet, noCloseAnimation);
    },

    /* 遍历数组和对象 */
    each: function (obj, callback) {
        let length, i = 0;
        if (Array.isArray(obj)) {
            length = obj.length
            for (; i < length; i++) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        } else {
            for (i in obj) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        }
        return obj;
    },

    /* 获取滚动出去的距离 */
    getPageScroll() {
        return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
    },

    /* Session 操作 */
    setSession(key, val) {
        sessionStorage.setItem(key, JSON.stringify(val))
    },

    getSession(key) {
        let val = sessionStorage.getItem(key);
        return JSON.parse(val);
    },

    removeSession(key) {
        sessionStorage.removeItem(key);
    },


    /**
     * Local 操作
     */
    setLocal(key, val) {
        localStorage.setItem(key, JSON.stringify(val))
    },

    getLocal(key) {
        let val = localStorage.getItem(key);
        return JSON.parse(val);
    },

    removeLocal(key) {
        localStorage.removeItem(key);
    },

    /**
     * 获取浏览器、手机等信息
     */
    versions() {
        let u = navigator.userAgent
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq",//是否QQ,
            isIosApp: /^.+(Mobile\/\w+)\s?$/.test(u),
            isAndroidApp: window.native ? true : false
        };

    },

    /**
     * 获取查询字符串
     * @example ?t=1  返回{t:1}
     * @returns {{}}
     */
    getSearch: function (href) {
        let search = {};
        let address = href;
        if (!address) return {};
        address = address.split('?');
        if (address.length > 1) {
            address = address[1].split('&');
            for (let i = 0, len = address.length; i < len; i++) {
                let key = address[i].split('=');
                search[key[0]] = key[1];
            }
        }

        return search;
    },

    // 判断是否是空对象
    isObjectEmpty: obj => {
        for (let name in obj) {
            if (obj.hasOwnProperty(name)) {
                return false;
            }
        }
        return true;
    },

    // 判断是否App打开
    isApp: () => {
        let isIosApp = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
        let isAndroidApp = window.native ? true : false;
        return isIosApp || isAndroidApp;
    },

    // 判断是否IosApp打开
    isIosApp: () => {
        return /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
    },

    // 判断是否AndroidApp打开
    isAndroidApp: () => {
        return window.native ? 1 : 0;
    },

    // 判断是否是测试服务器
    isTestServer: () => {
        return location.host.includes("devtest") || location.host.includes("-dev") || location.host.includes("cstest") || location.port.length > 3;
    },

    /**
     * 转BASE64
     * @param {*} buffer
     */
    arrayBufferToBase64(buffer) {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return 'data:image/png;base64,' + window.btoa(binary);
    },

    /**
     * 获取DOM 的 class
     * @param {DOM} el
     */
    getClass(el) {
        return el.getAttribute && el.getAttribute('class') || '';
    },

    /**
     * 添加类名
     * @param {DOM} el
     * @param {String} value
     */
    addClass(el, value) {
        let curValue = Tool.getClass(el);
        let cur = ' ' + stripAndCollapse(curValue) + ' ';
        let classes = classToArray(value);
        let finalValue;
        if (cur) {
            classes.forEach(clazz => {
                if (cur.indexOf(' ' + clazz + ' ') < 0) {
                    cur += clazz + ' ';
                }
            });

            finalValue = stripAndCollapse(cur);
            el.setAttribute('class', finalValue);
        }
    },

    /**
     * 移除类名
     * @param {DOM} el
     * @param {String} value
     */
    removeClass(el, value) {
        let curValue = Tool.getClass(el);
        let cur = ' ' + stripAndCollapse(curValue) + ' ';
        let classes = classToArray(value);
        let finalValue;
        if (cur) {
            classes.forEach((clazz) => {
                if (cur.indexOf(' ' + clazz + ' ') > -1) {
                    cur = cur.replace(' ' + clazz + ' ', ' ');
                }
            });

            finalValue = stripAndCollapse(cur);
            el.setAttribute('class', finalValue);
        }
    },

    /**
     * 保留2位小数且不四舍五入
     * @param  {string || number} num   要转换的数字
     * @param  {Number} point 需要保留小数几位
     * @return {number}
     */
    fixedNum(num, point) {
        if (num) {
            num = JSON.stringify(num)
            let arr = []
            if (num.indexOf('.') > 0) {
                arr = num.split('.')
            } else {
                arr.push(num)
                arr.push('00')
            }
            const dec = arr[1].slice(0, point)
            return parseFloat(arr[0] + '.' + dec)
        } else {
            return num
        }
    },
    /**
     * 将数值四舍五入后格式化.
     * @param num 数值(Number或者String)
     * @param cent 要保留的小数位(Number)
     * @param isThousand 是否需要千分位 0:不需要,1:需要(数值类型);
     * @return 格式的字符串,如'1,234,567.45'
     * @type String
     */
    formatNumber(num, cent = 0, isThousand = 1) {
        num = num.toString().replace(/\$|,/g, '');

        // 检查传入数值为数值类型
        if (isNaN(num))
            num = "0";

        // 获取符号(正/负数)
        let sign = (num == (num = Math.abs(num)));

        num = Math.floor(num * Math.pow(10, cent) + 0.50000000001);  // 把指定的小数位先转换成整数.多余的小数位四舍五入
        let cents = num % Math.pow(10, cent);              // 求出小数位数值
        num = Math.floor(num / Math.pow(10, cent)).toString();   // 求出整数位数值
        cents = cents.toString();               // 把小数位转换成字符串,以便求小数位长度

        // 补足小数位到指定的位数
        while (cents.length < cent)
            cents = "0" + cents;

        if (isThousand) {
            // 对整数部分进行千分位格式化.
            for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
                num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        }
        if (cent > 0)
            return (((sign) ? '' : '-') + num + '.' + cents);
        else
            return (((sign) ? '' : '-') + num);
    },

    /**
     * 数组内的对象排序
     * @param {Array} arr
     * @param {String} key
     * @param {String} _key
     */
    sort(arr, key, _key) {
        if (!Array.isArray(arr)) return;
        let tempArr = arr.slice();
        for (let i = 0; i < tempArr.length - 1; i++) {
            for (let j = 0; j < tempArr.length - 1; j++) {
                let value = Array.isArray(tempArr[j]) ? tempArr[j][0] : tempArr[j];
                let nextValue = Array.isArray(tempArr[j + 1]) ? tempArr[j + 1][0] : tempArr[j + 1];
                if (!_key) {
                    if (value[key] > nextValue[key]) {
                        let tempItem = tempArr[j];
                        tempArr[j] = tempArr[j + 1];
                        tempArr[j + 1] = tempItem;
                    }
                } else {
                    if (value[key][_key] > nextValue[key][_key]) {
                        let tempItem = tempArr[j];
                        tempArr[j] = tempArr[j + 1];
                        tempArr[j + 1] = tempItem;
                    }
                }
            }
        }
        return tempArr;
    },

    // 获取URL参数值
    getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
            index = window.location.hash.indexOf('?') + 1;
        let r = window.location.hash.substr(index).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },


    /* -----------------------------  业务逻辑相关 ------------------------------------- */

    /**
     *  获取前端配置数据
     */
    getFrontEndData: page => {
        return new Promise(resolve => {
            let data = '';
            ws.platform.getFrontEndData({page}).then(result => {
                try {
                    if (result.data) {
                        data = JSON.parse(result.data);
                    }
                } catch (e) {
                    Tool.assert('getFrontEndData', 'JSON数据错误');
                }
                if (data.list) {
                    Tool.setList(data.list);
                } else {
                    if (Array.isArray(data)) Tool.setList(data);
                }
                resolve(data);
            });
        });
    },

    setList(data) {
        let _list = [];
        for (let i = 0; i < data.length; i++) {
            if (Array.isArray(data[i])) {
                Tool.setList(data[i]);
            } else if (typeof data[i] === 'object') {
                if (data[i].isTest === undefined) {
                    for (let key in data[i]) {
                        if (Array.isArray(data[i][key])) {
                            Tool.setList(data[i][key]);
                        } else {
                            if (data[i].isTest) {
                                data.splice(i, 1);
                                i--;
                            }
                        }
                    }
                } else {
                    if (data[i].isTest) {
                        data.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        data = _list;
        return;
    },


    // 格式化投注，参考，用于进度条显示
    formatUpLevel(data) {
        const arr = [];
        data.forEach((item) => {
            const obj = {};
            const topUpObj = {};
            Tool.getPlayerStatus(item.consumptionPeriod, item.consumptionSourceProviderId).then(res => {
                //投注
                const consumptionAmount = Tool.fixedNum(res.consumptionAmount, 0);
                const consumptionPeriod = Tool.consumptionPeriodName(item.consumptionPeriod);
                obj.currentNum = consumptionAmount
                obj.targetNum = item.consumptionLimit
                obj.lockName = `投注(${consumptionPeriod})`
                arr.push(obj)

                //存款
                const topUpAmount = Tool.fixedNum(res.topUpAmount, 0);
                topUpObj.currentNum = Tool.fixedNum(topUpAmount)
                topUpObj.targetNum = item.topupLimit
                topUpObj.lockName = `存款(${consumptionPeriod})`
                arr.push(topUpObj)
            })
        });
        return arr;
    },

    // 获取流水 consumptionPeriod:周期；providerIds：大厅ID
    getPlayerStatus(consumptionPeriod, providerIds) {
        return new Promise((resolve, reject) => {
            switch (consumptionPeriod) {
                case "MONTH":
                    Tool.send('getPlayerMonthStatus', {providerIds}).then(res => {
                        resolve(res.data)
                    }, err => {
                        reject(err)
                    })
                    break;
                case "WEEK":
                    Tool.send('getPlayerWeekStatus', {providerIds}).then(res => {
                        resolve(res.data)
                    }, err => {
                        reject(err)
                    })
                    break;
                case "DAY":
                    Tool.send('getPlayerDayStatus', {providerIds}).then(res => {
                        resolve(res.data)
                    }, err => {
                        reject(err)
                    })
                    break;
            }
        });
    },

    // 消费周期中文
    consumptionPeriodName(name) {
        switch (name) {
            case "MONTH":
                return '月'
            case "WEEK":
                return '周'
            case "DAY":
                return '日'
            default:
                break;
        }
    },

    // 打开服务
    service(type) {
        let maintainMsg = '该方式正在维护中，请选择其他方式';
        if (type === 'cs') {
            if ($store.state.csLine) {
                const open = window.open('', '', 'width=800,height=600');
                open.location.href = $store.state.csLine + '&s=1' + '&enterurl=' + window.location.hostname
            } else {
                popup.confirm(maintainMsg, [{name: '确定'}, {name: '取消'}], '提示');
            }
        } else if (type === 'qq') {
            if ($store.state.qq) {
                const open = window.open('', '', 'width=800,height=520')
                open.location.href = `http://wpa.qq.com/msgrd?v=3&uin=${$store.state.qq}&site=qq&menu=yes`
            } else {
                popup.confirm(maintainMsg, [{name: '确定'}, {name: '取消'}], '提示');
            }
        } else if (type === 'phone') {
            popup.phoneCallback();
        } else if (type === 'wechat') {
            popup.confirm(`<img src="${$store.state.wechat.qcode}" style="display: inline-block; padding: 0.2rem;" /><p class="pz_text_color2" style="text-align: center;margin-bottom: 0.15rem;">${$store.state.wechat.number}</p>`,
                [{
                    name: '打开微信客户端', callback: () => {
                        let ow = window.location;
                        ow.href = 'weixin://';
                        if (ow.href !== 'weixin://') {
                            popup.confirm('打开失败，请检查微信是否已经安装');
                        }
                    }
                }], '二维码')
        }
    },

    // 前端配置跳转处理 调用请用Tool.pzOpen.call(this, item)
    pzOpen(item) {
        if (item.clickEvent === 'new-window' && item.result) {
            window.open(item.result);
        } else if (item.clickEvent === 'to-iframe' && item.iframe) {
            this.$router.push({
                name: 'promotionDetail',
                query: {
                    urls: item.iframe,
                    rewardCode: encodeURIComponent(item.eventCode)
                }
            });
            Tool.setSession('actname', item.name);
        } else if (item.clickEvent === 'to-activity' && item.activityCode) {
            this.$router.push({
                path: '/promotions/allPromotions',
                query: {
                    rewardCode: encodeURIComponent(item.activityCode)
                }
            });
        } else if (item.clickEvent === 'to-router' && item.toRouter) {
            this.$router.push('/' + item.toRouter);
        } else if (item.clickEvent === 'open-game' && item.gameCode) {
            const data = {
                gameId: item.gameCode,
                clientType: 2,
                clientDomainName: `http://${window.location.host}`
            }
            if (this.$store.state.isLogin) {
                Tool.send('getLoginURL', data).then(res => {
                    popup.confirm(
                        '确定开始游戏？',
                        [
                            {
                                name: '确定',
                                callback: () => {
                                    window.open(res.data.gameURL);
                                }
                            },
                            {name: '取消'}
                        ],
                        '提示'
                    );
                });
            } else {
                popup.confirm('请先登录', [{
                    name: '确定', callback: () => {
                        this.$router.push('/sign_in');
                    }
                }]);
            }
        }
    },

    /* 埋点分析 */
    clickCount: (data, isRegisterBtn) => {
        let sendData = {
            device: 'H5',
            pageName: data.page,
            buttonName: data.btn,
            domain: window.location.origin,
        }
        if (isRegisterBtn) {
            if (Tool.isApp()) {
                sendData.registerClickApp = true;
            } else {
                sendData.registerClickH5 = true;
            }
        }
        Tool.send('clickCount', sendData, true, true);
    },
}

export default Tool;
