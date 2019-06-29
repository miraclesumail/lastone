import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/home_index.vue'

const ReportForm = () => import(/* webpackChunkName: "reportFormIndex" */ './views/reportForm/report_index.vue');
const AllForm = () => import(/* webpackChunkName: "reportFormIndex" */ './views/reportForm/all_form.vue');
const MemberForm = () => import(/* webpackChunkName: "reportFormIndex" */ './views/reportForm/member_form.vue');
const MyProxyForm = () => import(/* webpackChunkName: "reportFormIndex" */ './views/reportForm/myProxy_form.vue');
const MyProxyDetail = () => import(/* webpackChunkName: "reportFormIndex" */ './views/reportForm/myProxy_detail.vue');
const Commission = () => import(/* webpackChunkName: "commissionIndex" */ './views/commission/commission_index.vue');
const Withdrawal = () => import(/* webpackChunkName: "withdrawal" */ './views/commission/withdrawal.vue');
const CsService = () => import(/* webpackChunkName: "CsServiceIndex" */ './views/csService/cs_service_index.vue');

const Account = () => import(/* webpackChunkName: "Account" */ './views/account/account_index.vue');
const Popularize = () => import(/* webpackChunkName: "Popularize" */ './views/account/popularize.vue');
const PersonalInfo = () => import(/* webpackChunkName: "PersonalInfo" */ './views/account/personal_info.vue');
const UpdatePassword = () => import(/* webpackChunkName: "PersonalInfo" */ './views/account/update_password.vue');
const UpdateBank = () => import(/* webpackChunkName: "PersonalInfo" */ './views/account/update_bank.vue');
const UpdatePhone = () => import(/* webpackChunkName: "PersonalInfo" */ './views/account/update_phone.vue');
const DownSign = () => import(/* webpackChunkName: "PersonalInfo" */ './views/account/down_sign/down_sign.vue');
const CreditTransfer = () => import(/* webpackChunkName: "PersonalInfo" */ './views/account/credit_transfer/credit_transfer.vue');
const TransferPage = () => import(/* webpackChunkName: "PersonalInfo" */ './views/account/credit_transfer/transfer_page.vue');
const AmountRecord = () => import(/* webpackChunkName: "PersonalInfo" */ './views/account/amount_record/amount_record.vue');
const TransferInfo = () => import(/* webpackChunkName: "PersonalInfo" */ './views/account/amount_record/transfer_info.vue');
const DownList = () => import(/* webpackChunkName: "PersonalInfo" */ './views/account/down_list/down_list.vue');
const YjPage = () => import(/* webpackChunkName: "PersonalInfo" */ './views/account/down_list/yj_page.vue');


const SignIn = () => import(/* webpackChunkName: "signIn" */ './views/sign_in/sign_in_index.vue');
const signUp = () => import(/* webpackChunkName: "signUp" */ './views/sign_up/sign_up_index.vue');
const Cooperation = () => import(/* webpackChunkName: "other" */ './views/other/cooperation.vue');
const Join = () => import(/* webpackChunkName: "other" */ './views/other/join.vue');

const JoinCondition = () => import(/* webpackChunkName: "other" */ './views/other/join_condition.vue');
const JoinConditionItem1 = () => import('./views/other/join_condition_item1.vue');
const JoinConditionItem2 = () => import('./views/other/join_condition_item2.vue');
const JoinConditionItem3 = () => import('./views/other/join_condition_item3.vue');
const JoinConditionItem4 = () => import('./views/other/join_condition_item4.vue');

const About = () => import(/* webpackChunkName: "other" */ './views/other/about.vue');
const Collection = () => import(/* webpackChunkName: "other" */ './views/other/collection.vue');
const Download = () => import(/* webpackChunkName: "other" */ './views/other/download.vue');
const Leaderboard = () => import(/* webpackChunkName: "other" */ './views/other/leaderboard.vue');
const Pagcor = () => import(/* webpackChunkName: "other" */ './views/other/pagcor.vue');
const Program = () => import(/* webpackChunkName: "other" */ './views/other/program.vue');
const ProgramCommission = () => import(/* webpackChunkName: "other" */ './views/other/program_commission.vue');
const ProgramProxy = () => import(/* webpackChunkName: "other" */ './views/other/program_proxy.vue');

const Notification = () => import('./views/home/notification.vue');
const Mail = () => import('./views/home/mail.vue');

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/home',
			name: 'home',
			component: Home
		},
		{
			path: '/sign_in',
			name: 'signIn',
			component: SignIn
		},
		{
			path: '/sign_up',
			name: 'signUp',
			component: signUp
		},
		{
			path: '/report_form',
			name: 'reportForm',
            component: ReportForm,
            meta: { needLogin: true }
		},
		{
			path: '/allform',
			name: 'allform',
            component: AllForm,
            meta: { needLogin: true }
		},
		{
			path: '/memberform',
			name: 'memberform',
            component: MemberForm,
            meta: { needLogin: true }
		},
		{
			path: '/myproxyform',
			name: 'myproxyform',
            component: MyProxyForm,
            meta: { needLogin: true }
		},
		{
			path: '/myproxydetail',
			name: 'myproxydetail',
            component: MyProxyDetail,
            meta: { needLogin: true }
		},
		{
			path: '/commission',
			name: 'commission',
            component: Commission,
            meta: { needLogin: true }
		},
		{
			path: '/withdrawal',
			name: 'withdrawal',
            component: Withdrawal,
            meta: { needLogin: true }
		},
		{
			path: '/cs_service',
			name: 'csService',
			component: CsService
		},
        {
            path: '/account',
            name: 'account',
            component: Account,
            meta: { needLogin: true }
        },
        {
            path: '/updatepassword',
            name: 'updatepassword',
            component: UpdatePassword,
            meta: { needLogin: true }
        },
        {
            path: '/updatebank',
            name: 'updatebank',
            component: UpdateBank,
            meta: { needLogin: true }
        },
        {
            path: '/updatephone',
            name: 'updatephone',
            component: UpdatePhone,
            meta: { needLogin: true }
        },
        {
            path: '/downsign',
            name: 'downsign',
            component:DownSign,
        },
        {
            path: '/yjpage',
            name: 'yjpage',
            component:YjPage,
            meta: { needLogin: true }
        },
        {
            path: '/credittransfer',
            name: 'credittransfer',
            component:CreditTransfer,
            meta: { needLogin: true }
        },
        {
            path: '/transferpage',
            name: 'transferpage',
            component:TransferPage,
            meta: { needLogin: true }
        },
        {
            path: '/amountrecord',
            name: 'amountrecord',
            component:AmountRecord,
            meta: { needLogin: true }
        },
        {
            path: '/transferinfo',
            name: 'transferinfo',
            component:TransferInfo,
        },
        {
            path: '/downlist',
            name: 'downlist',
            component:DownList,
            meta: { needLogin: true }
        },
        {
            path: '/popularize',
            name: 'popularize',
            component: Popularize
        },
        {
            path: '/personal_info',
            name: 'personalInfo',
            component: PersonalInfo,
            meta: { needLogin: true }
        },
        {
            path: '/notification',
            name: 'notification',
            component: Notification
        },
        {
            path: '/mail',
            name: 'mail',
            component: Mail,
            meta: {
                needLogin: true,
                needRealPlayer: true
            }
        },
        {
            path: '/cooperation',
            name: 'cooperation',
            component: Cooperation
        },
        {
            path: '/join',
            name: 'join',
            component: Join
        },
        {
            path: '/join_condition',
            name: 'join_condition',
            component: JoinCondition,
            children: [
                {
                    path: '',
                    component: JoinConditionItem1,
                },
                {
                    path: 'item1',
                    name: 'join_condition_item1',
                    component: JoinConditionItem1,
                },
                {
                    path: 'item2',
                    name: 'join_condition_item2',
                    component: JoinConditionItem2,
                },
                {
                    path: 'item3',
                    name: 'join_condition_item3',
                    component: JoinConditionItem3,
                },
                {
                    path: 'item4',
                    name: 'join_condition_item4',
                    component: JoinConditionItem4,
                }
            ]
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/collection',
            name: 'collection',
            component: Collection
        },
        {
            path: '/download',
            name: 'download',
            component: Download
        },
        {
            path: '/leaderboard',
            name: 'leaderboard',
            component: Leaderboard
        },
        {
            path: '/pagcor',
            name: 'pagcor',
            component: Pagcor
        },
        {
            path: '/program',
            name: 'program',
            component: Program
        },
        {
            path: '/program_commission',
            name: 'program_commission',
            component: ProgramCommission
        },
        {
            path: '/program_proxy',
            name: 'program_proxy',
            component: ProgramProxy
        },
		{
			path: '*',
			redirect: '/home'
		}
	]
});
