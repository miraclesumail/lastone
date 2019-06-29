// 默认规则
let rules = {
    required: {
        test: /\S+/,
        message: '不能为空'
    },
}

let inputRules = {
    Number: /[^\d]/g,
    Chinese: /[^\u4e00-\u9fa5]/g,
    Letter: /[^a-z]/g,
    CeAndLe: /[^a-z\d]/g,
}


let Vue;

/**
 * 断言
 * @param {*} condition 判断条件
 * @param {String} message 提示信息
 */
function assert (condition, message) {
    if (!condition) {
        console.error('[light-verigy]:' + message);
        return 1;
    } else {
        return 0;
    }
}
/**
 * 创建新对象
 * @param {Object} obj 
 */
function assign (obj) {
    return Object.assign({}, obj);
}

/**
 * 验证函数（数据跟新时候调用）
 * @param {Object, Array, String} rule 实例中的验证规则 
 * @param {String} key                 实例中rules对象中的key
 * @param {String} val                 数据跟新后的值
 * @param {Boolean} isArray            是否是数组
 */
function checkFrom (rule, key, val, isArray) {
    if (assert(rule, '缺少效验规则')) {
        return;
    }

    if (Array.isArray(rule)) {
        return rule.map(item => {
            return checkFrom.call(this, item, key, val, true);
        }).indexOf(false) === -1;
    }

    const $errors = this.$verify.$errors;

    // rule实例中可以直接填字符串 也可以{test: '字符串', message: 'XXX'}
    let regexObj = '';
    if (typeof rule === 'string') {
        regexObj = assign(rules[rule]);
    } else {
        if (!assert(rule.test, '验证规则错误')) {
            regexObj = typeof rule.test === 'string' ? assign(rules[rule.test]) : rule;
        }
    }


    if (assert(regexObj, '没有填写验证规则') || assert(regexObj.test, '验证规则错误')) return;

    async function testFn(cb) {
        try {
            await cb(val).then(result => {
                valid = result;
                return errorFn.call(this);
            });
        } catch (e) {
            console.log(e);
        }
    }

    // 自定义的提示优先
    regexObj.message = rule.message || regexObj.message;

    // 错误提示可以使用function
    if (typeof regexObj.message === 'function') {
        regexObj.message = regexObj.message.call(this);
    }
    // test 可以填function来处理复杂的验证规则
    let valid = false;
    if (typeof regexObj.test === 'function') {
        if (regexObj.async) {
            valid = testFn.call(this, regexObj.test);
        } else {
            valid = regexObj.test.call(this, val);
            return errorFn.call(this);
        }
    } else {
        valid = regexObj.test.test(val);
        return errorFn.call(this);
    }
 
    function errorFn() {
        if (!isArray) {
            const oldError = $errors[key];
            if (valid) {
                Vue.delete($errors, key);
            } else if (!oldError) {
                Vue.set($errors, key, regexObj.message);
            }
        } else {
            const errorArr = $errors[key] || [];
            const oldErrorIndex = errorArr.indexOf(regexObj.message);
            if (valid) {
                oldErrorIndex > -1 && errorArr.splice(oldErrorIndex, 1);
                if (!errorArr.length) Vue.delete($errors, key);
            } else if (oldErrorIndex === -1) {
                errorArr.push(regexObj.message);
                Vue.set($errors, key, errorArr);
            }
        }
    
        const hasError = Boolean(Object.keys($errors).length);
        this.$verify.valid = !hasError;
        return valid;
    }


}

// 构造函数 
const LightVerify = function(_vm) {
    this.vm = _vm;
    let errorInit = {};
    let rules = this.vm.$options.rules;
    for(let key in rules) {
        if (Array.isArray(rules[key])) {
            errorInit[key] = [];
        } else {
            errorInit[key] = '';
        }
    }
    Vue.util.defineReactive(this, '$errors', errorInit);
    Vue.util.defineReactive(this, 'valid', false);
}

/**
 * 初始化函数
 */
function init() {
    const rules = this.$options.rules;
    if (!rules) return;
    this.$verify = new LightVerify (this);
    // 监听每个对应的data中的属性
    Object.keys(rules).forEach(key => {
        this.$watch(key, val => {
            checkFrom.call(this, rules[key], key, val);
        });
    });
}

// 手动效验
LightVerify.prototype.check = function (key) {
    const vm = this.vm;
    const rules = vm.$options.rules;
    key = key || Object.keys(rules);
    if (typeof key === 'string') {
        key = key.split();
    }
    return key.map(item => {
        return checkFrom.call(vm, rules[item], item, vm.$data[item]);
    }).indexOf(false) === -1;
}

let Directive = {
    bind (el, binding) {
        // let vm = vnode.context;
        // let errorClass = vm.$data.vaOptions ? vm.$data.vaOptions.errorClass : 'va-error';
        // let expression = binding.expression;
        let arg = binding.arg;
        // if (!vm.$options.rules) return;
      
        // el.addEventListener('focus', () => {
        //     Tool.removeClass(el, errorClass);
        // }, false);

        // el.addEventListener('blur', () => {
        //     vm.$verify.check(expression)
        //     let errorMsg = vm.$verify.$errors[expression];
        //     if (errorMsg) {
        //         Tool.addClass(el, errorClass);
        //     } else {
        //         Tool.removeClass(el, errorClass);
        //     }
        // }, false);

        if (arg) {
            el.addEventListener('input', () => {
                let argRule = inputRules[arg];
                let value = el.value;
                if (assert(argRule, '参数未找到')) return;
                if (argRule.test(value)) {
                    el.value = value.replace(argRule, '');
                }
            });
        }

    }
}

export default function (_Vue, opts) {
    Vue = _Vue;
    rules = Object.assign({}, rules, opts);
    Vue.directive('va', Directive);
    Vue.mixin({
        created: init
    });
}