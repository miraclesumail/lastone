import ws from './../util/ws.js';
import util from './../util/util.js';

const serviceName = "partner";
const functionNames = [
    'authenticate',
    'getCommissionRate',
    'getPartnerFeeRate',
    'getCrewBetInfo',
    'getPartnerConfig',
    'fillBankInformation',
    'updatePassword',
    'get',
    'getSMSCode',
    'captcha',
    'login',
    'logout',
    'register',
    'isValidUsername',
    'getPartnerBillBoard',
    'getNewCrewInfo',
    'getCrewWithdrawInfo',
    'getCrewDepositInfo',
    'getCrewActiveInfo',
    'checkAllCrewDetail',
    'getPlayerSimpleList',
    'applyBonus',
    'getCommissionProposalList',
    'getMailList',
    'readMail',
    'deleteMail',
    'preditCommission',
    'sendSMSCodeToPlayer',
    'getPartnerTransferList',
    'getDownPartnerContribution',
    'getBonusRequestList',
    'cancelBonusRequest',
    'checkAllCrewDetail',
    'partnerCreditToPlayer',
    'getDownLinePlayerTimeSequence',
    'getDownLinePartnerInfo',
    'getDownLinePlayerInfo',
    'getPartnerTotalInfo'
];

let partner = ($global) => {
    let functions = {};
    functionNames.forEach(functionName => {
        functions[functionName] = (data, useDefaultErrHandler, useDefaultLoadHandler) => {
            if(util.isObject(data)) {
                data.platformId = $global.platformId;
            } else {
                data = {platformId: $global.platformId}
            }
            let sendData = {
                service: serviceName,
                functionName: functionName,
                data: data
            }
            return ws($global).send(sendData, useDefaultErrHandler, useDefaultLoadHandler);
        }
    });
    return functions;
};

export default partner;