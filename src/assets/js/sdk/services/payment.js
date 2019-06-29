import ws from './../util/ws.js';
import util from './../util/util.js';

const serviceName = "payment";
const functionNames = [
    'getProvinceList',
    'getCityList',
    'getDistrictList',
    'getBankTypeList'
];

let payment = ($global) => {
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

export default payment;
