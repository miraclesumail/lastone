/* $global.pendingRequests
 * Pending request list is a list where its items are added when a API request is triggered,
 * this is to allow WebSocket.onMessage() to complete the Promise of the aforemention request;
 * 
 * config.pendingRequestsExclusion
 * pending requests exclusion is a list of functions that are not require to complete any promises;
*/

let config = {
    // host: 'ws://devtest.wsweb.me:9280',
    // host: 'ws://localhost:9280',        // websocket host
    requestTimeoutDuration: 60000,      // request time out duration (in milliseconds)
    reconnectTimeoutDuration: 5000,     // reconnect web socket time out duration (in milliseconds)
    reconnectMaxTries: 10,              // amount of tries to reconnect web socket (in integer)
    defaultErrHandlerStatusExclusion: [404],  // API return status to not use defaultErrHandler
    pendingRequestsExclusion: ["notifyNewMail"],        // functions from API that doesn't need to cross check pending request list
    authenticateExclusion: ["authenticate", "getPartnerConfig"],    // functions from API that can be called without authentication
};

export default config;