import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        isLogin: false,                    // 是否登录
        showLoading: false,                // 显示loading
        username: '游客',                  // 账号
        id: '',                            // id
        qq: '未绑定',                       // qq 
        localBalance: 0,                   // 代理本地金额         
        commissionType: 0,                 // 代理佣金模式
        phoneNumber: '',                   // 电话号
        realName: '',                      // 真实姓名
        haveBankCard: false,               // 是否绑定银行卡
        bankInfo: {},                      // 银行资料
        csLine: '',                        // 800客服
        csPhone: '',                       // 联系客服电话
        csQQ: '',                          // 联系客服QQ
        csWechat: '',                      // 联系客服wechat
        platformConfig: '',                // 平台配置信息
        loginErrorCount: 0,                // 登录错误次数
        toRouter: '',                      // 前往的路由
        registrationTime: '',              // 注册时间
    },

    mutations: {
        // 设置state
        setState(state, obj) {
            state[obj.key] = obj.value;
        },

        // 设置loading
        setShowLoading(state, boolean) {
            state.showLoading = boolean;
        },

        // 设置登录状态
        setLogin(state, data) {
            state.isLogin = true;
            let token = Tool.getSession('token');
            if (!token) {
                Tool.setSession('token', data.token ? data.token : '');
            }
            let userData = data.data;
            Tool.setSession('partnerId', userData.partnerId);
            state.username = userData.partnerName;
            state.localBalance = userData.credits.toFixed(2);
            state.id = userData.partnerId;
            state.commissionType = userData.commissionType;
            state.realName = userData.realName;
            state.qq = userData.qq ? userData.qq : '未绑定';
            state.phoneNumber = userData.phoneNumber;
            state.registrationTime = new Date(userData.registrationTime).format('yyyy-MM-dd');
            if (!userData.bankAccount) {
                state.haveBankCard = false;
            } else {
                state.bankInfo.bankAccount = userData.bankAccount;
                state.bankInfo.bankName = userData.bankName;
                state.bankInfo.bankAccountName = userData.bankAccountName;
                state.bankInfo.bankAccountType = userData.bankAccountType;
                state.bankInfo.bankAccountProvince = userData.bankAccountProvince;
                state.bankInfo.bankAccountCity = userData.bankAccountCity;
                state.bankInfo.bankAccountCityId = userData.bankAccountCityId;
                state.bankInfo.bankAccountDistrict = userData.bankAccountDistrict;
                state.bankInfo.bankAddress = userData.bankAddress;
            }

        },

        // 登出
        setLogout(state) {
            state.isLogin = false;
            state.username = '游客';
            state.id = '';
            state.qq = '';
            state.localBalance = 0;
            state.commissionType = 0;
            state.phoneNumber = '';
            state.realName = '';
            state.bankInfo = {};
            state.haveBankCard = false;
            Tool.removeSession('token');
            Tool.removeSession('partnerId');
        },

    },

    actions: {
        // 刷新玩家信息
        refreshUserInfo({ commit, state }) {
            let token = Tool.getSession('token');
            if (token) {
                ws.partner.get().then(data => {
                    commit('setLogin', data);
                });
            } else {
                console.log('session中无token，刷新玩家信息失败');
            }
        },
    }
})
