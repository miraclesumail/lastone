import Button from '../../components/btn/button_index.vue'
import Header from '../../components/header.vue'
import Progress from '../../components/progress.vue'
import SelectDialog from '../../components/select_dialog.vue'

function plugin(Vue) {
    if (plugin.installed) {
        return;
    }
    Vue.component('Button', Button);
    Vue.component('Header', Header);
    Vue.component('Progress', Progress);
    Vue.component('SelectDialog', SelectDialog);

    Vue.filter('vipName', function (value) {
        let newValue = "LV"+(value+1);
        return newValue
    });

    Vue.filter('rewardStatus', function (value) {
        let status = {
            Success: '提案成功',
            Fail: '提案失败',
            Pending: '待审批',
            PrePending: '系统异常',
            Approved: '审批通过',
            Rejected: '审批拒绝',
            Cancel:'已取消',
            Processing: '处理中',
            AutoAudit: '自动审核',
            Undetermined: '提款待定',
            Recover: '恢复处理',
            CsPending: '待审核'
        }
        return status[value] ? status[value] : '---';
    });

    Vue.filter('topupType', function (value) {
        let type = {
            1: '手工充值',
            2: '在线充值',
            3: '支付宝充值',
            4: '微信充值',
            5: '快捷充值'
        }
        return type[value] ? type[value] : '---'; 
    });

    Vue.filter('dateFilter', function (value, fromat) {
        let date = new Date(value);
        return date.format(fromat);
    });

    Vue.filter('cmTypeFilter', function(value) {
        let cmType = ['1天-输赢值', '7天-输赢值', '半月-输赢值', '1月-输赢值', '7天-投注额'];
        if (value !== 0 &&!value) return '';
        return cmType[value];
    });

    Vue.directive('limit', {
        bind(el, binding) {
            let inputRules = {
                Number: /[^\d]/g,
                Chinese: /[^\u4e00-\u9fa5]/g,
                Letter: /[^a-z]/g,
                CeAndLe: /[^a-z\d]/g,
            }
            let arg = binding.arg;
            el.addEventListener('input', () => {
                let argRule = inputRules[arg];
                let value = el.value;
                if (argRule.test(value)) {
                    el.value = value.replace(argRule, '');
                }
            });
        }
    });

    Vue.directive('md', {
        bind: function(el, val) {
            let nameArr = val.value.split('|');
            let sendData = {
                page: nameArr[0],
                btn: nameArr[1],
            };
            el.onclick = function() {
                Tool.clickCount(sendData);
            }
        }
    });
}

export default plugin;