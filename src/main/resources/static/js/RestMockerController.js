var RestMockerController = (function() {

    /* ================ PRIVATE ================ */

    /* ==== CONSTANTS ==== */
    const SERVER_URL = ''; // TODO

    /* ==== VARIABLES ==== */
    var stompClient = undefined;
    var stompIsConnected = undefined;
    var subscribedTopics = undefined;
    
    /* ================ PUBLIC ================ */
    const TESTING = true;

    var init = function (callback) {
	// TODO
	subscribedTopics = [];
	stompIsConnected = false;
    };

    var registerToServer = function(userName, callback) {
	console.info('Connecting to WS...');
	var socket = new SockJS('/stompendpoint');
	stompClient = Stomp.over(socket);

	stompClient.connect({}, function (frame) {
	    console.log(`Connected: ${frame}`);
	    stompIsConnected = true;
	});
	
	// TODO: axios realiza registro en el servidor
    };	
	
    var disconnectFromServer = function () {
	// TODO: axios informa al servidor para desconectarse
	
	console.assert(stompClient !== undefined);
	stompClient.disconnect();
	console.log('Disconnected');
    };	
	
    var subscribeToTopic = function(topic, topicCallback) {
	console.assert(topic instanceof String);

	console.assert(stompClient !== undefined);
	console.assert(stompIsConnected);
	
	stompClient.subscribe(topic, function (eventbody) {
	    var payload = JSON.parse(eventbody.body);
	    topicCallback(payload);
	});

	subscribedTopics.push(topic);
    };

    var publishInTopic = function (topic, payload) {
	console.assert(topic instanceof String);
	console.assert(subscribedTopics.includes(topic));
	console.assert(stompIsConnected);
	
	if (subscribedTopics.includes(topic) && stompIsConnected) {
	    stompClient.send(topic, {}, JSON.stringify(payload));
	}
    };

    return {
	testing: TESTING,
	init: init,
	registerToServer : registerToServer,
	disconnectFromServer : disconnectFromServer,
	publishInTopic : publishInTopic,
	subscribeToTopic : subscribeToTopic
    };
    
})();
