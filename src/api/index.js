/*
 * 代理API
 * functionName: service
 */
export default {
    register: 'partner',                            // 注册
    login: 'partner',                               // 登录
    logout: 'partner',                              // 登出
    authenticate: 'partner',                        // 心跳包
    getSMSCode: 'partner',                          // 获取短信验证码
    getMailList: 'partner',                         // 获取站内信
    readMail: 'partner',                            // 标记站内信已读
    deleteMail: 'partner',                          // 删除邮件
    getPlatformAnnouncements: 'platform',           // 公告
    getFrontEndData:'platform',                     // 获取前端配置
    updatePhoneNumberWithSMS: 'partner',            // 修改手机号
    get: 'partner',                                 // 获取账号信息
    captcha: 'partner',                             // 获取登录验证码
    getPartnerCommissionValue: 'partner',           // 佣金详情
    getCrewDepositInfo: 'partner',                  // 下线玩家总存款信息
    getCrewWithdrawInfo: 'partner',                 // 下线玩家总提款信息
    getCrewActiveInfo: 'partner',                   // 下线玩家活跃信息
    getCrewBetInfo: 'partner',                      // 下线玩家投注信息
    fillBankInformation: 'partner',                 // 绑定银行卡
    updatePassword: 'partner',                      // 修改密码
    getPartnerPlayerPaymentReport: 'partner',       // 充值兑奖记录
    getDomainList: 'partner',                       // 获得推广域名
    applyBonus: 'partner',                          // 提款
    getCommissionRate: 'partner',                   // 获取佣金比例详情
    preditCommission: 'partner',                    // 获取预算代理佣金
    getPartnerFeeRate: 'partner',                   // 获取代理费用比例详情
    getBonusRequestList: 'partner',                 // 查询提款记录
    cancelBonusRequest: 'partner',                  // 取消提款记录
    getCommissionProposalList: 'partner',           // 查询佣金额度记录
    getPartnerConfig: 'partner',                    // 获取代理平台设置
    partnerCreditToPlayer: 'partner',               // 代理转账给下线
    getDownPartnerInfo: 'partner',                  // 获取下级代理信息
    getDownPartnerContribution: 'partner',          // 获取下级代理贡献值详情
    checkAllCrewDetail: 'partner',                  // 查询下线玩家详情
    getPartnerTransferList: 'partner',              // 获取代理转账记录
    getPartnerBillBoard:'partner',                  // 排行榜数据

    getConfig: 'platform',                          // 获取平台设置
    getBankTypeList: 'payment'                      // 获取银行卡类型列表
}
