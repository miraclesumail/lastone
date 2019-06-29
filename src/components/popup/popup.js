import Vue from 'vue'
import store from '../../store'
import router from '../../router'
import Confirm from './confirm.vue'
import CommissionInfo from './commission_info.vue'


const popup = {};
const PopupConfirm = Vue.extend(Confirm);
const PopupCommissionInfo = Vue.extend(CommissionInfo);
const div = document.createElement('div');

popup.confirm = (msg, btnList, title) => {
    document.body.appendChild(div);
    let config = {
        msg,
        btnList,
        title
    }
    let confirm = new PopupConfirm({
        store,
        router
    }).$mount(div);
    confirm.show(config);
}

popup.commissionInfo = () => {
    document.body.appendChild(div);
    let commissionInfo = new PopupCommissionInfo({
        store,
        router
    }).$mount(div);
    commissionInfo.show();
}

export default popup;
