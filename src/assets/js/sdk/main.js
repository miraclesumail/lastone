import ws from './util/ws.js';
import partnerServices from './services/partner.js';
import paymentServices from './services/payment.js';
import platformServices from './services/platform.js';
import playerServices from './services/player.js';

let $global = {
    wsEvent: new EventTarget(),
    pendingRequests: {},
    establishedWs: {},
    platformId: null,
    requestId: 0,
    readySend: false
};

let FPMS = {
    //ws connection
    connect: ws($global).connect,
    //ws server triggered event
    wsEvent: $global.wsEvent,
    //services
    partner: partnerServices($global),
    payment: paymentServices($global),
    platform: platformServices($global),
    player: playerServices($global),

    //for dev use only
    // close: ws($global).close,
    // send: ws($global).send,
    // global: $global,
    //****/
};

export default FPMS;