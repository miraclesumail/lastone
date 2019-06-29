import ws from './../util/ws.js';
import util from './../util/util.js';

const serviceName = "player";
const functionNames = [
    'captcha',
    'create',
    'isValidUsername',
    'callBackToUser',
    'getDownLinePlayerInfo'
];

let player = ($global) => {
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
            console.log($global.establishedWs);
            return ws($global).send(sendData, useDefaultErrHandler, useDefaultLoadHandler);
        }
    });
    return functions;
};

export default player;