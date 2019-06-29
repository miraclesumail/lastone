import util from './util.js';
import config from './../config.js';


let ws = ($global) => {
    return {
        connect: (host, platformId, onOpenHandler, onCloseHandler, defaultErrHandler, defaultLoadHandler, defaultLoadEndHandler) => {
            $global.platformId = platformId;
            $global.defaultErrHandler = defaultErrHandler;
            $global.defaultLoadHandler = defaultLoadHandler;
            $global.defaultLoadEndHandler = defaultLoadEndHandler;

            return new Promise((resolve, reject) => {
                $global.establishedWs = new WebSocket(host);

                $global.establishedWs.onopen = async function(e) {
                    console.log(`[open] Connection established to ${host}`);
                    $global.reconnecting = false;
                    if(onOpenHandler) {
                        await onOpenHandler().catch(err => {
                            console.log(`[open - onopenhandler]`, err);
                        });
                        $global.readySend = true;
                        for(let key in $global.pendingRequests) {
                            !$global.pendingRequests[key].hasBeenSend && $global.establishedWs.send(JSON.stringify($global.pendingRequests[key].sendData));
                        }
                    }
                };

                $global.establishedWs.onmessage = function(event) {
                    let returnDataRaw = JSON.parse(event.data);
                    let requestId = returnDataRaw.requestId;
                    let serviceName = returnDataRaw.service;
                    let functionName = returnDataRaw.functionName;
                    let requestName = `${serviceName}_${functionName}_${requestId}`.toLowerCase();
                    let returnData = returnDataRaw.data;
                    let returnStatus = returnData.status;

                    // create event and pass it out of SDK for handling, if function name in exception list
                    if(config.pendingRequestsExclusion.indexOf(functionName.toLowerCase()) >= 0) {
                        let wsEvent = new Event('onmessage');
                        wsEvent.data = returnDataRaw;
                        $global.wsEvent.dispatchEvent(wsEvent);
                        return;
                    }

                    // ignore if it doesnt have any function in queue
                    if(!$global.pendingRequests.hasOwnProperty(requestName)) {
                        return;
                    }

                    if(returnStatus == 200) {
                        $global.pendingRequests[requestName].resolve(returnData);
                    } else {
                        if($global.pendingRequests[requestName].useDefaultErrHandler && defaultErrHandler 
                            && config.defaultErrHandlerStatusExclusion.indexOf(returnStatus) < 0) {
                            defaultErrHandler(returnData);
                        }
                        $global.pendingRequests[requestName].reject(returnData);
                    }

                    delete $global.pendingRequests[requestName];

                    if(defaultLoadEndHandler && util.isEmptyObj($global.pendingRequests)) {
                        defaultLoadEndHandler();
                    }
                };

                $global.establishedWs.onclose = function(event) {
                    $global.readySend = false;
                    if(event.wasClean) {
                        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
                    } else {
                        // e.g. server process killed or network down
                        // event.code is usually 1006 in this case
                        console.log('[close] Connection died');
                    }
                    if(!$global.reconnecting) {
                        ws($global).reconnect(host, platformId, onOpenHandler, onCloseHandler, defaultErrHandler, defaultLoadHandler, defaultLoadEndHandler).catch(err=>{
                            if(onCloseHandler) {
                                onCloseHandler();
                            }
                        });
                    }
                };

                $global.establishedWs.onerror = function(error) {
                    console.log(`[error] ${error.message}`);
                };
            })
        },

        reconnect: (host, platformId, onOpenHandler, onCloseHandler, defaultErrHandler, defaultLoadHandler, defaultLoadEndHandler) => {
            $global.reconnecting = true;
            return new Promise((resolve, reject) => {
                let count = 0;
                let reconnect = setInterval(()=>{
                    count++;
                    if($global.establishedWs.readyState != WebSocket.OPEN && count > config.reconnectMaxTries) {
                        clearInterval(reconnect);
                        reject({errorMessage: "Connection is not ready."});
                    } else if ($global.establishedWs.readyState == WebSocket.OPEN) {
                        clearInterval(reconnect);
                        $global.reconnecting = false;
                        resolve();
                    } else {
                        ws($global).connect(host, platformId, onOpenHandler, onCloseHandler, defaultErrHandler, defaultLoadHandler, defaultLoadEndHandler);
                    }
                }, config.reconnectTimeoutDuration);
            })
        },

        close: () => {
            $global.establishedWs.close(1000, "connection closed deliberately.");
        },

        send: (sendData, useDefaultErrHandler, useDefaultLoadHandler) => {
            if(!sendData) {
                return Promise.reject({errorMessage: "send data required."});
            }
            useDefaultErrHandler = typeof useDefaultErrHandler === "boolean" ? useDefaultErrHandler : true;
            useDefaultLoadHandler = typeof useDefaultLoadHandler === "boolean" ? useDefaultLoadHandler : true;

            sendData.data.requestId = $global.requestId + 1;

            let serviceName = sendData.service;
            let functionName = sendData.functionName;
            let requestName = `${serviceName}_${functionName}_${sendData.data.requestId}`.toLowerCase();

            if(!serviceName) {
                return Promise.reject({errorMessage: "service name not found"});
            }
            if(!functionName) {
                return Promise.reject({errorMessage: "function name not found"});
            }
            if(!$global.hasOwnProperty('pendingRequests')) {
                $global.pendingRequests = {};
            }
            
            // if(!$global.establishedWs || $global.establishedWs.readyState != WebSocket.OPEN) {
            //     return Promise.reject({errorMessage: "Connection is not ready."});
            // }

            return sendRequest();
            
            function sendRequest() {
                return new Promise((resolve,reject) => {
                    $global.pendingRequests[requestName] = {
                        resolve: resolve,
                        reject: reject,
                        sendData: sendData,
                        hasBeenSend: false,
                        useDefaultErrHandler: useDefaultErrHandler,
                        useDefaultLoadHandler: useDefaultLoadHandler,
                    };

                    if($global.readySend || config.authenticateExclusion.map(item => {return requestName.indexOf(item.toLowerCase()) !== -1}).indexOf(true) !== -1) {
                        $global.pendingRequests[requestName].hasBeenSend = true;
                        $global.establishedWs.send(JSON.stringify(sendData));
                    }
                    if(useDefaultLoadHandler && $global.defaultLoadHandler) {
                        $global.defaultLoadHandler();
                    }
                    // promise will wait for response before rejecting as timed out.
                    $global.readySend && setTimeout(() => {
                        if(!$global.pendingRequests[requestName]) return;
                        console.log(requestName + ' request time out...');
                        reject({errorMessage: "request timed out"});
                        if($global.pendingRequests[requestName].useDefaultErrHandler && $global.defaultErrHandler) {
                            $global.defaultErrHandler({errorMessage: '请求超时。'});
                        }
                        delete $global.pendingRequests[requestName];
                        if($global.defaultLoadEndHandler && util.isEmptyObj($global.pendingRequests)) {
                            $global.defaultLoadEndHandler();
                        }
                    }, config.requestTimeoutDuration);
                });
            }
        },
    }
}

export default ws;